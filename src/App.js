import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './Components/navBar';

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
