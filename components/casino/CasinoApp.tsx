"use client";

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// @ts-ignore
import Game from './Game';
// @ts-ignore
import { isMobile } from '@/lib/casino/utils/deviceDetection';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFD700',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#8B0000',
            paper: '#006400',
        },
    },
});

export default function CasinoApp() {
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        setIsMobileDevice(isMobile);
    }, []);

    const dndOptions = {
        enableMouseEvents: true,
        enableTouchEvents: true,
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DndProvider backend={isMobileDevice ? TouchBackend : HTML5Backend} options={dndOptions}>
                <Game />
            </DndProvider>
        </ThemeProvider>
    );
}
