import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeState = (props) => {

  const initialState = 'light';
  const [state, setState] = useState(initialState);
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
