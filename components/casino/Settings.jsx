import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography
} from '@mui/material';

const PLAYER1_AVATARS = [
  'Mario',
  'Alexander',
  'Ethan',
  'Liam',
  'Lucas',
  'Noah',
  'James'
];

const PLAYER2_AVATARS = [
  'Zoey',
  'Amelia',
  'Charlotte',
  'Emma',
  'Olivia',
  'Sophia'
];

const CARD_BACKS = [
  { id: 'card-back-1', name: 'Velvet Whisper' },
  { id: 'card-back-2', name: 'Golden Filigree' },
  { id: 'card-back-3', name: 'Mystic Weave' },
  { id: 'card-back-4', name: 'Celestial Swirl' },
  { id: 'card-back-5', name: 'Opulent Dawn' },
  { id: 'card-back-6', name: 'Ethereal Bloom' },
  { id: 'card-back-7', name: 'Shadowed Lace' },
  { id: 'card-back-8', name: 'Harmonic Fade' },
  { id: 'card-back-9', name: 'Crystal Veil' },
  { id: 'card-back-10', name: 'Enchanted Foliage' },
  { id: 'card-back-11', name: 'Silken Mirage' },
  { id: 'card-back-12', name: 'Radiant Ember' },
  { id: 'card-back-13', name: 'Tranquil Gradient' }
];

const BACKGROUNDS = [
  { id: 'background-1', name: 'Forest Glade' },
  { id: 'background-2', name: 'Mountain Vista' },
  { id: 'background-3', name: 'Ocean Sunset' },
  { id: 'background-4', name: 'Desert Dunes' },
  { id: 'background-5', name: 'Snowy Peak' },
  { id: 'background-6', name: 'Autumn Woods' },
  { id: 'background-7', name: 'Misty Valley' }
];

const Settings = ({ settings, onSettingsChange }) => {
  const [open, setOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState({
    ...settings
  });

  const handleClose = () => {
    setOpen(false);
    setTempSettings(settings);
  };

  const handleOpen = () => {
    setTempSettings({
      ...settings
    });
    setOpen(true);
  };

  const handleSave = () => {
    onSettingsChange(tempSettings);
    setOpen(false);
  };

  return (
    <>
      <Button
        id="settings-button"
        onClick={handleOpen}
        sx={{ display: 'none' }}
      >
        Settings
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: '#1b5e20',
            color: 'white',
            minWidth: 400
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          Game Settings
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              Background Theme
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'white' }}>Background Theme</InputLabel>
              <Select
                value={tempSettings.background}
                onChange={(e) => setTempSettings({ ...tempSettings, background: e.target.value })}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                }}
              >
                {BACKGROUNDS.map(bg => (
                  <MenuItem key={bg.id} value={bg.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="img"
                        src={`/images/${bg.id}.png`}
                        alt={bg.name}
                        sx={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Typography>{bg.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              Player 1 Avatar
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'white' }}>Player 1 Avatar</InputLabel>
              <Select
                value={tempSettings.player1Avatar}
                onChange={(e) => setTempSettings({ ...tempSettings, player1Avatar: e.target.value })}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                }}
              >
                {PLAYER1_AVATARS.map(avatar => (
                  <MenuItem key={avatar} value={avatar}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="img"
                        src={`/images/${avatar === 'Mario' || avatar === 'Zoey' ? avatar.toLowerCase() : avatar}.png`}
                        alt={avatar}
                        sx={{ width: 40, height: 40, objectFit: 'cover' }}
                      />
                      <Typography>{avatar}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              Player 2 Avatar
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'white' }}>Player 2 Avatar</InputLabel>
              <Select
                value={tempSettings.player2Avatar}
                onChange={(e) => setTempSettings({ ...tempSettings, player2Avatar: e.target.value })}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                }}
              >
                {PLAYER2_AVATARS.map(avatar => (
                  <MenuItem key={avatar} value={avatar}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="img"
                        src={`/images/${avatar === 'Mario' || avatar === 'Zoey' ? avatar.toLowerCase() : avatar}.png`}
                        alt={avatar}
                        sx={{ width: 40, height: 40, objectFit: 'cover' }}
                      />
                      <Typography>{avatar}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              Card Back Style
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'white' }}>Card Back Style</InputLabel>
              <Select
                value={tempSettings.cardBack}
                onChange={(e) => setTempSettings({ ...tempSettings, cardBack: e.target.value })}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                }}
              >
                {CARD_BACKS.map(back => (
                  <MenuItem key={back.id} value={back.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="img"
                        src={`/images/${back.id}.png`}
                        alt={back.name}
                        sx={{ width: 40, height: 56, objectFit: 'cover' }}
                      />
                      <Typography>{back.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              Draw Count
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'white' }}>Draw Count</InputLabel>
              <Select
                value={tempSettings.drawCount}
                onChange={(e) => setTempSettings({ ...tempSettings, drawCount: e.target.value })}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
                }}
              >
                <MenuItem value={1}>Draw 1</MenuItem>
                <MenuItem value={3}>Draw 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', p: 2, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;
