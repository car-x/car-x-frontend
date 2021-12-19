import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes/Routes';
import MyStates from './context/State/State';
import MyThemeProvider from './context/Theme/MyThemeProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyStates>
          <MyThemeProvider>
            <Navbar />
            <Routes />
          </MyThemeProvider>
        </MyStates>
      </BrowserRouter>
    </div>
  );
}

export default App;
