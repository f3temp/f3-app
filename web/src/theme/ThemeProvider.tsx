import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';

import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";

export const muiCache = createCache({
  'key': 'mui',
  'prepend': true,
});


export const ThemeContext = React.createContext(
  (themeName: string): void => { }
);


type Props = {
  children?: React.ReactNode
};

const ThemeProviderWrapper: React.FC<Props> = (props) => {
  const themeName = 'PureLightTheme';
  const theme = themeCreator(themeName);

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProviderWrapper;
