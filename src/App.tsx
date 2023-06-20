import { useContext } from 'react';
import { context } from './context';
import './App.css';
import Game from './Game';
import PreGame from './PreGame';


function App() {
  const { difficulty } = useContext(context);
  console.log(difficulty);
  return difficulty ? <Game /> : <PreGame />
}

export default App;