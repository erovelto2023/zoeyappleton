import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import adsData from '@/lib/casino/data/advertisements.json';

function Advertisement() {
  const [currentAd, setCurrentAd] = useState(null);

  useEffect(() => {
    const updateAd = () => {
      const randomAd = adsData.ads[Math.floor(Math.random() * adsData.ads.length)];
      setCurrentAd(randomAd);
    };

    // Initial ad
    updateAd();

    // Update ad every 10-15 seconds
    const getRandomInterval = () => Math.floor(Math.random() * (15000 - 10000) + 10000);
    let intervalId = null;

    const scheduleNextUpdate = () => {
      intervalId = setTimeout(() => {
        updateAd();
        scheduleNextUpdate(); // Schedule next update with a new random interval
      }, getRandomInterval());
    };

    scheduleNextUpdate();

    return () => {
      if (intervalId) clearTimeout(intervalId);
    };
  }, []);

  if (!currentAd) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: 'rgba(255, 215, 0, 0.5)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box
        component="a"
        href={currentAd.link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'gold',
            mb: 1,
            fontWeight: 'bold'
          }}
        >
          {currentAd.title}
        </Typography>
        <Typography
          sx={{
            color: 'white',
            opacity: 0.9
          }}
        >
          {currentAd.content}
        </Typography>
      </Box>
    </Paper>
  );
}

export default Advertisement;
