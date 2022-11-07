import type React from 'react';

export type ThemeModes = 'light' | 'dark' | 'system';
export type SeThemeMode = React.Dispatch<React.SetStateAction<ThemeModes>>;
