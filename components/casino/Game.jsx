import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Card from './Card';
import Avatar from './Avatar';
import Advertisement from './Advertisement';
import Settings from './Settings';
import dialogsData from '@/lib/casino/data/dialogs.json';

function Game() {
  const [settings, setSettings] = useState({
    player1Avatar: 'Mario',
    player2Avatar: 'Zoey',
    cardBack: 'card-back-1',
    drawCount: 1,
    background: 'background-1'
  });

  const [gameState, setGameState] = useState({
    stock: [],
    waste: [],
    foundations: [[], [], [], []],
    tableaus: [[], [], [], [], [], [], []],
    lastClickTime: 0,
    lastClickedCard: null,
    dialog: {},
    undoStack: []
  });

  const { stock, waste, foundations, tableaus, lastClickTime, lastClickedCard, dialog, undoStack } = gameState;

  const updateGameState = useCallback((updates) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const createDeck = () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];

    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value, faceUp: false, id: `${value}-${suit}` });
      }
    }

    return shuffle(deck);
  };

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const dealCards = (deck) => {
    const newTableaus = [[], [], [], [], [], [], []];
    let cardIndex = 0;

    // Deal cards to tableaus
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        newTableaus[j].push({
          ...deck[cardIndex],
          faceUp: i === j
        });
        cardIndex++;
      }
    }

    // Remaining cards go to stock
    const newStock = deck.slice(28).map(card => ({ ...card, faceUp: false }));

    updateGameState({
      stock: newStock,
      waste: [],
      foundations: [[], [], [], []],
      tableaus: newTableaus,
      undoStack: []
    });
  };

  const initializeGame = useCallback(() => {
    const newDeck = createDeck();
    dealCards(newDeck);
    updateGameState({
      dialog: {
        [settings.player1Avatar]: dialogsData[settings.player1Avatar][Math.floor(Math.random() * dialogsData[settings.player1Avatar].length)],
        [settings.player2Avatar]: dialogsData[settings.player2Avatar][Math.floor(Math.random() * dialogsData[settings.player2Avatar].length)]
      }
    });
  }, [settings.player1Avatar, settings.player2Avatar, updateGameState]);

  // Initialize game when settings change
  useEffect(() => {
    initializeGame();
  }, [settings.cardBack, settings.player1Avatar, settings.player2Avatar, settings.drawCount, initializeGame]);

  const getRandomBackground = useCallback(() => {
    const backgrounds = Array.from({ length: 7 }, (_, i) => `background-${i + 1}`);
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  }, []);

  // Handle background changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGameState({ background: getRandomBackground() });
    }, 30000);

    return () => clearInterval(intervalId);
  }, [getRandomBackground, updateGameState]);

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const handleCardDrop = useCallback((source, target) => {
    if (!source || !source.card) return;
    console.log('Drop attempt:', { source, target });

    const { card: sourceCard, sourceIndex, sourceTableau, source: sourceType } = source;
    let cardsToMove = [];
    let updates = {};
    let sourceStack = null;

    // Handle moving multiple cards from tableau
    if (typeof sourceTableau === 'number' && sourceIndex !== undefined) {
      const newTableaus = [...tableaus];
      sourceStack = newTableaus[sourceTableau];
      if (sourceStack && sourceStack.length > sourceIndex) {
        // Get all cards from sourceIndex to end
        cardsToMove = sourceStack.splice(sourceIndex);

        // Flip the next card in the source tableau if it exists
        if (sourceStack.length > 0 && !sourceStack[sourceStack.length - 1].faceUp) {
          sourceStack[sourceStack.length - 1].faceUp = true;
        }

        updates.tableaus = newTableaus;
      }
    } else if (sourceType === 'waste') {
      const newWaste = [...waste];
      const card = newWaste.pop();
      if (card) {
        cardsToMove = [card];
        updates.waste = newWaste;
      }
    }

    if (cardsToMove.length === 0) return;

    // Handle moving to foundation
    if (target.isFoundation) {
      const foundationIndex = target.foundationIndex;
      const foundation = foundations[foundationIndex];
      const cardToMove = cardsToMove[0]; // Only move one card to foundation

      if (cardsToMove.length === 1 && canMoveToFoundation(cardToMove, foundation)) {
        const newFoundations = [...foundations];
        newFoundations[foundationIndex] = [...foundation, cardToMove];
        updates.foundations = newFoundations;
      } else {
        // Return cards to source if move is invalid
        if (sourceType === 'waste') {
          const newWaste = updates.waste || [...waste];
          newWaste.push(...cardsToMove);
          updates.waste = newWaste;
        } else if (sourceStack) {
          sourceStack.push(...cardsToMove);
        }
        return;
      }
    }
    // Handle moving to tableau
    else if (target.targetTableau !== undefined) {
      const targetTableauIndex = target.targetTableau;
      const targetStack = tableaus[targetTableauIndex];
      const targetCard = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;

      if (canMoveToTableau(cardsToMove[0], targetCard)) {
        const newTableaus = updates.tableaus || [...tableaus];
        newTableaus[targetTableauIndex] = [...targetStack, ...cardsToMove];
        updates.tableaus = newTableaus;
      } else {
        // Return cards to source if move is invalid
        if (sourceType === 'waste') {
          const newWaste = updates.waste || [...waste];
          newWaste.push(...cardsToMove);
          updates.waste = newWaste;
        } else if (sourceStack) {
          sourceStack.push(...cardsToMove);
        }
        return;
      }
    }

    // Save current state for undo
    const currentState = {
      stock,
      waste,
      foundations,
      tableaus,
      dialog,
      undoStack
    };

    // Update game state with all changes and add to undo stack
    updateGameState({
      ...updates,
      undoStack: [...undoStack, currentState]
    });
  }, [tableaus, waste, foundations, stock, dialog, undoStack]);

  const canMoveToFoundation = (card, foundation) => {
    if (!card) return false;
    if (foundation.length === 0) return card.value === 'A';
    const topCard = foundation[foundation.length - 1];
    return card.suit === topCard.suit &&
      getCardValue(card.value) === getCardValue(topCard.value) + 1;
  };

  const canMoveToTableau = (sourceCard, targetCard) => {
    if (!sourceCard) return false;
    if (!targetCard) return sourceCard.value === 'K';
    return isAlternateColor(sourceCard, targetCard) &&
      getCardValue(sourceCard.value) === getCardValue(targetCard.value) - 1;
  };

  const moveCard = useCallback((sourcePile, targetPile, sourceIndex, targetIndex) => {
    const sourceCards = getCardsFromPile(sourcePile);
    const targetCards = getCardsFromPile(targetPile);
    const movedCards = sourceCards.splice(sourceIndex);
    targetCards.push(...movedCards);

    updateGameState({
      [sourcePile]: sourceCards,
      [targetPile]: targetCards,
      undoStack: [...undoStack, { sourcePile, targetPile, sourceIndex, targetIndex, cards: movedCards }]
    });
  }, [undoStack, updateGameState]);

  const handleDrop = useCallback((item, targetPile, targetIndex) => {
    if (canMoveToFoundation(item.card, targetPile) || canMoveToTableau(item.card, targetPile)) {
      moveCard(item.sourcePile, targetPile, item.sourceIndex, targetIndex);
    }
  }, [canMoveToFoundation, canMoveToTableau, moveCard]);

  const getCardsFromPile = (pile) => {
    switch (pile) {
      case 'stock':
        return stock;
      case 'waste':
        return waste;
      case 'foundations':
        return foundations;
      case 'tableaus':
        return tableaus;
      default:
        return [];
    }
  };

  const findValidFoundation = (card) => {
    // Find a valid foundation pile for the card
    for (let i = 0; i < foundations.length; i++) {
      const foundation = foundations[i];
      if (card.value === 'A' && foundation.length === 0) {
        return i;
      }
      if (foundation.length > 0) {
        const topCard = foundation[foundation.length - 1];
        if (card.suit === topCard.suit &&
          getCardValue(card.value) === getCardValue(topCard.value) + 1) {
          return i;
        }
      }
    }
    return -1;
  };

  const moveToFoundation = useCallback((source, foundationIndex) => {
    if (!source || !source.card) return;
    const { card, sourceIndex, sourceTableau } = source;
    let newCard = null;

    // Remove from source
    if (sourceTableau === 'waste') {
      const newWaste = [...waste];
      if (newWaste.length > 0) {
        newCard = newWaste.pop();
        updateGameState({ waste: newWaste });
      }
    } else if (typeof sourceTableau === 'number') {
      const newTableaus = [...tableaus];
      const sourceStack = newTableaus[sourceTableau];
      if (sourceStack && sourceStack.length > 0) {
        newCard = sourceStack.pop();
        if (sourceStack.length > 0) {
          sourceStack[sourceStack.length - 1].faceUp = true;
        }
        updateGameState({ tableaus: newTableaus });
      }
    }

    // Only add to foundation if we successfully removed a card
    if (newCard) {
      const newFoundations = [...foundations];
      newFoundations[foundationIndex] = [...newFoundations[foundationIndex], { ...newCard, faceUp: true }];
      updateGameState({ foundations: newFoundations });
    }
  }, [foundations, waste, tableaus]);

  const moveToTableau = useCallback((source, targetTableauIndex) => {
    if (!source || !source.card) return;
    const { sourceTableau, sourceIndex } = source;
    let movedCards = null;

    // Remove from source
    if (sourceTableau === 'waste') {
      const newWaste = [...waste];
      if (newWaste.length > 0) {
        movedCards = [newWaste.pop()];
        updateGameState({ waste: newWaste });
      }
    } else if (typeof sourceTableau === 'number') {
      const newTableaus = [...tableaus];
      const sourceStack = newTableaus[sourceTableau];
      if (sourceStack && sourceStack.length > sourceIndex) {
        movedCards = sourceStack.splice(sourceIndex);
        if (sourceStack.length > 0) {
          sourceStack[sourceStack.length - 1].faceUp = true;
        }
        updateGameState({ tableaus: newTableaus });
      }
    }

    // Only update target tableau if we successfully moved cards
    if (movedCards && movedCards.length > 0) {
      const newTableaus = [...tableaus];
      const targetStack = newTableaus[targetTableauIndex] || [];
      newTableaus[targetTableauIndex] = [...targetStack, ...movedCards];
      updateGameState({ tableaus: newTableaus });
    }
  }, [tableaus]);

  const handleCardClick = useCallback((card, source, index) => {
    const currentTime = new Date().getTime();

    // Handle double click
    if (lastClickedCard &&
      lastClickedCard.card?.id === card?.id &&
      currentTime - lastClickTime < 300) {
      // Try to move to foundation
      if (card.faceUp) {
        const foundationIndex = findValidFoundation(card);
        if (foundationIndex !== -1) {
          const sourceData = {
            card,
            sourceIndex: index,
            sourceTableau: typeof source === 'number' ? source : source // handle both number and string cases
          };
          moveToFoundation(sourceData, foundationIndex);
          updateGameState({ dialog: { [settings.player1Avatar]: dialogsData[settings.player1Avatar][Math.floor(Math.random() * dialogsData[settings.player1Avatar].length)], [settings.player2Avatar]: dialogsData[settings.player2Avatar][Math.floor(Math.random() * dialogsData[settings.player2Avatar].length)] } });
        }
      }
    }

    updateGameState({
      lastClickTime: currentTime,
      lastClickedCard: { card, source, index }
    });
  }, [lastClickTime, lastClickedCard, foundations, waste, tableaus, findValidFoundation, moveToFoundation]);

  const resetGame = useCallback(() => {
    const newDeck = createDeck();
    dealCards(newDeck);
    updateGameState({
      undoStack: [],
      background: getRandomBackground()
    });
  }, []);

  const checkWinCondition = useCallback(() => {
    // Check if all foundations are complete (13 cards each)
    return foundations.every(foundation => foundation.length === 13);
  }, [foundations]);

  useEffect(() => {
    if (checkWinCondition()) {
      // Handle win condition
      updateGameState({
        dialog: {
          [settings.player1Avatar]: "Congratulations! You've won!",
          [settings.player2Avatar]: "Great job! Want to play again?"
        }
      });
    }
  }, [foundations, checkWinCondition]);

  const getCardValue = (value) => {
    const values = { 'A': 1, 'J': 11, 'Q': 12, 'K': 13 };
    return values[value] || parseInt(value);
  };

  const isAlternateColor = (card1, card2) => {
    const redSuits = ['hearts', 'diamonds'];
    return redSuits.includes(card1.suit) !== redSuits.includes(card2.suit);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setGameState(previousState);
      setGameState(prev => ({
        ...prev,
        undoStack: prev.undoStack.slice(0, -1)
      }));
    }
  };

  const drawCards = () => {
    if (stock.length === 0) {
      // When stock is empty, flip waste pile back to stock
      const newStock = [...waste].reverse().map(card => ({ ...card, faceUp: false }));
      updateGameState({
        stock: newStock,
        waste: []
      });
      return;
    }

    const count = Math.min(settings.drawCount || 1, stock.length);
    const newStock = [...stock];
    const drawn = [];

    // Draw cards one at a time and flip them
    for (let i = 0; i < count; i++) {
      const card = newStock.pop();
      drawn.push({ ...card, faceUp: true });
    }

    updateGameState({
      stock: newStock,
      waste: [...waste, ...drawn]
    });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      paddingTop: '80px', // Clear the fixed navbar
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(/images/${settings.background}.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white'
    }}>
      <Box sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        bgcolor: 'rgba(0,0,0,0.4)',
        gap: 3
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => document.getElementById('settings-button').click()}
          sx={{
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#115293'
            }
          }}
        >
          Settings
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={resetGame}
          sx={{
            bgcolor: '#dc004e',
            '&:hover': {
              bgcolor: '#9a0036'
            }
          }}
        >
          New Game
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleUndo}
          disabled={undoStack.length === 0}
          sx={{
            bgcolor: '#2e7d32',
            '&:hover': {
              bgcolor: '#1b5e20'
            }
          }}
        >
          Undo
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
        <Avatar
          name={settings.player1Avatar}
          dialog={dialog[settings.player1Avatar]}
        />
        <Avatar
          name={settings.player2Avatar}
          dialog={dialog[settings.player2Avatar]}
        />
      </Box>

      {/* Game board */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6, width: '100%', maxWidth: 1200 }}>
          <Box onClick={drawCards} sx={{ cursor: 'pointer', position: 'relative' }}>
            {stock.length > 0 ? (
              <Card
                card={{ faceUp: false }}
                settings={settings}
              />
            ) : (
              <Box
                sx={{
                  width: 100,
                  height: 140,
                  border: '2px dashed rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (waste.length > 0) {
                    const newStock = [...waste].reverse().map(card => ({ ...card, faceUp: false }));
                    updateGameState({
                      stock: newStock,
                      waste: []
                    });
                  }
                }}
              />
            )}
          </Box>
          <Box sx={{ ml: 4, position: 'relative', minWidth: '100px' }}>
            {waste.slice(-settings.drawCount).map((card, i) => (
              <Box
                key={card.id}
                sx={{
                  position: 'absolute',
                  left: `${i * 20}px`,
                  top: 0,
                  zIndex: i + 1
                }}
              >
                <Card
                  card={card}
                  index={waste.length - settings.drawCount + i}
                  source="waste"
                  onClick={() => handleCardClick(card, 'waste', waste.length - settings.drawCount + i)}
                  onDrop={handleCardDrop}
                  settings={settings}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: 1 }} />
          {foundations.map((foundation, i) => (
            <Box key={i} sx={{ mx: 2 }}>
              <Card
                placeholder={foundation.length === 0}
                card={foundation[foundation.length - 1]}
                isFoundation={true}
                foundationIndex={i}
                source="foundation"
                onDrop={handleCardDrop}
                settings={settings}
                style={{
                  border: '2px dashed rgba(255, 215, 0, 0.3)',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 1200 }}>
          {tableaus.map((tableau, i) => (
            <Box key={i} sx={{ mx: 2 }}>
              {tableau.map((card, j) => (
                <Card
                  key={card.id}
                  card={card}
                  index={j}
                  tableauIndex={i}
                  source="tableau"
                  onClick={() => handleCardClick(card, i, j)}
                  onDrop={handleCardDrop}
                  settings={settings}
                  style={{
                    position: 'relative',
                    marginTop: j > 0 ? '-110px' : 0,
                    zIndex: j,
                  }}
                />
              ))}
              {tableau.length === 0 && (
                <Card
                  placeholder
                  tableauIndex={i}
                  onDrop={handleCardDrop}
                  settings={settings}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Advertisement />
      </Box>
      <Settings
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </Box>
  );
}

export default Game;
