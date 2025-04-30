'use client';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
