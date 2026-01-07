import React from 'react';
import { Box, Paper } from '@mui/material';

function Avatar({ name, dialog, style }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        ...style
      }}
    >
      <Box
        component="img"
        src={`/images/${name === 'Mario' || name === 'Zoey' ? name.toLowerCase() : name}.png`}
        alt={name}
        sx={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          borderRadius: 1,
          border: '2px solid rgba(255, 215, 0, 0.5)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}
      />
      {dialog && (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: 2,
            minWidth: 200,
            maxWidth: 300,
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              border: '5px solid transparent',
              borderBottomColor: 'rgba(0, 0, 0, 0.7)'
            }
          }}
        >
          <Box
            sx={{
              color: 'white',
              textAlign: 'center',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              lineHeight: 1.4
            }}
          >
            {dialog}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default Avatar;
