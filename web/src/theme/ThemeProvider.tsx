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
  // const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  // const [themeName, _setThemeName] = useState(curThemeName);
  const themeName = 'PureLightTheme';
  const theme = themeCreator(themeName);
  // const setThemeName = (themeName: string): void => {
  //   localStorage.setItem('appTheme', themeName);
  //   _setThemeName(themeName);
  // };

  console.log("ThemeProviderWrapper render start")
  console.log("ThemeProviderWrapper children", props.children)
  console.log("ThemeProviderWrapper theme", theme)


  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  // return (
  //   <CacheProvider value={muiCache}>

  //   </CacheProvider>
  // );
};

export default ThemeProviderWrapper;
