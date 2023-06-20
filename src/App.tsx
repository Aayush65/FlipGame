import { useContext } from 'react';
import { context } from './components/context';
import './App.css';
import Game from './components/Game';
import PreGame from './components/PreGame';


function App() {
  const { difficulty } = useContext(context);
  return difficulty ? <Game /> : <PreGame />
}

export default App;