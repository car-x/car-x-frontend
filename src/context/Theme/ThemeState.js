import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const ThemeState = (props) => {

  const initialState = 'light';
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setState('dark')
    }
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setState('light');
    }
  }, [])
  const themeToggler = () => {
    setState(state => state === 'light' ? 'dark' : 'light');
  }
  return (
    <ThemeContext.Provider value={{ state, themeToggler }}>
      {props.children}
    </ThemeContext.Provider >
  )
}

export default ThemeState;
