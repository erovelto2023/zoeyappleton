import React, { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box, Paper } from '@mui/material';
import { getEmptyImage } from 'react-dnd-html5-backend';

const ItemTypes = {
  CARD: 'card',
  FOUNDATION: 'foundation',
  TABLEAU: 'tableau'
};

const getCardValue = (value) => {
  const values = { 'A': 1, 'J': 11, 'Q': 12, 'K': 13 };
  return values[value] || parseInt(value);
};

const isAlternateColor = (card1, card2) => {
  const redSuits = ['hearts', 'diamonds'];
  return redSuits.includes(card1.suit) !== redSuits.includes(card2.suit);
};

const getSuitSymbol = (suit) => {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
    default: return '';
  }
};

const Card = memo(function Card({ 
  card, 
  placeholder, 
  style, 
  onClick, 
  onDrop, 
  index, 
  tableauIndex, 
  isFoundation, 
  foundationIndex,
  source = 'tableau', // can be 'tableau', 'waste', or 'foundation'
  settings = { cardBack: 'card-back-1' }
}) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: () => {
      return {
        card,
        sourceIndex: index,
        sourceTableau: tableauIndex,
        source,
        isTopCard: true
      };
    },
    canDrag: () => card && card.faceUp && !placeholder,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [card, index, tableauIndex, source]);

  React.useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  const redSuits = ['hearts', 'diamonds'];
  
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      if (!monitor.didDrop() && onDrop) {
        console.log('Dropping card:', { item, isFoundation, tableauIndex });
        if (isFoundation) {
          onDrop(item, { isFoundation: true, foundationIndex });
        } else {
          onDrop(item, { targetCard: card, targetIndex: index, targetTableau: tableauIndex });
        }
      }
    },
    canDrop: (item, monitor) => {
      if (!item || !item.card || isDragging) return false;
      
      if (isFoundation) {
        // For foundation piles, check if it's an Ace for empty pile or next card in sequence
        if (!card) {
          return item.card.value === 'A';
        }
        return (
          item.card.suit === card.suit &&
          getCardValue(item.card.value) === getCardValue(card.value) + 1
        );
      }
      
      // For tableau piles
      if (!card) {
        return item.card.value === 'K'; // Empty tableau only accepts Kings
      }
      
      return (
        isAlternateColor(item.card, card) &&
        getCardValue(item.card.value) === getCardValue(card.value) - 1
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (!card || !item.card) return;
      
      // Add any hover effects or preview updates here if needed
    }
  }), [card, index, tableauIndex, onDrop, isFoundation, foundationIndex, isDragging]);

  // Combine drag and drop refs
  const ref = React.useCallback(node => {
    drag(drop(node));
  }, [drag, drop]);

  if (placeholder) {
    return (
      <Paper
        ref={drop}
        sx={{
          width: 80,
          height: 120,
          border: '2px dashed rgba(255, 255, 255, 0.3)',
          borderRadius: 1,
          backgroundColor: isOver && canDrop ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          transition: 'all 0.2s'
        }}
        onClick={onClick}
      />
    );
  }

  const getColor = (suit) => {
    return ['hearts', 'diamonds'].includes(suit) ? '#ff0000' : '#000000';
  };

  return (
    <Box
      ref={ref}
      onClick={onClick}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: card?.faceUp ? 'pointer' : 'default',
        position: 'relative',
        transform: isDragging ? 'scale(1.05)' : 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        width: 100,
        height: 140,
        ...style
      }}
    >
      <Box
        ref={drop}
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: card?.faceUp ? 'white' : 'transparent',
          borderRadius: 1,
          border: placeholder ? '2px dashed rgba(255, 215, 0, 0.5)' : '1px solid rgba(0, 0, 0, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: card ? (redSuits.includes(card.suit) ? 'red' : 'black') : 'rgba(255, 255, 255, 0.5)',
          position: 'relative',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          ...(card && !card.faceUp && {
            backgroundImage: `url(/images/${settings.cardBack}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }),
          '&:hover': card?.faceUp ? {
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
          } : {},
          ...(isOver && canDrop && {
            backgroundColor: card?.faceUp ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
            border: '2px solid rgba(0, 255, 0, 0.5)',
            boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)'
          }),
          ...(isOver && !canDrop && {
            backgroundColor: card?.faceUp ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
            border: '2px solid rgba(255, 0, 0, 0.5)',
            boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)'
          })
        }}
      >
        {card?.faceUp && (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                color: getColor(card.suit),
                fontFamily: 'serif',
                fontWeight: 'bold',
                pointerEvents: 'none'
              }}
            >
              <Box sx={{ 
                fontSize: '1.2rem',
                lineHeight: 1,
                mb: 0.5,
              }}>
                {card.value}
              </Box>
              <Box sx={{ 
                fontSize: '1.5rem',
                lineHeight: 1,
              }}>
                {getSuitSymbol(card.suit)}
              </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                transform: 'rotate(180deg)',
                color: getColor(card.suit),
                fontFamily: 'serif',
                fontWeight: 'bold',
                pointerEvents: 'none'
              }}
            >
              <Box sx={{ 
                fontSize: '1.2rem',
                lineHeight: 1,
                mb: 0.5,
              }}>
                {card.value}
              </Box>
              <Box sx={{ 
                fontSize: '1.5rem',
                lineHeight: 1,
              }}>
                {getSuitSymbol(card.suit)}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
});

export default Card;
