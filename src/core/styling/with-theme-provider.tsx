import React from 'react';

import { ThemeProvider } from './styling';
import { theme } from './theme';

export function withThemeProvider<Props extends Record<string, unknown>>(
  Component: React.ComponentType<Props>,
) {
  return function WithThemeProvider(props: Props) {
    return (
      <ThemeProvider value={theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };
}
