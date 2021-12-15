import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes/Routes';
import ThemeState from './context/Theme/ThemeState';
import MyThemeProvider from './context/Theme/MyThemeProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeState>
          <MyThemeProvider>
            <Navbar />
            <Routes />
          </MyThemeProvider>
        </ThemeState>
      </BrowserRouter>
    </div>
  );
}

export default App;
