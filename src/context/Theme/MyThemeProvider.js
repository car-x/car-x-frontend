import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useContext } from 'react';
import themeContext from './ThemeContext';

const MyThemeProvider = (props) => {
  let myTheme = useContext(themeContext);
  let darkTheme = createTheme({
    palette: {
      mode: myTheme.state,
    }
  });
  return (
    <ThemeProvider theme={darkTheme}>
      {props.children}
    </ThemeProvider>
  )
}

export default MyThemeProvider;
