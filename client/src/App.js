import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div>

      <Route exact path= '/'>
        <LandingPage/>
        </Route>
      
    </div>
  );
}

export default App;
