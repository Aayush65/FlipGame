import { createContext, useState } from 'react';
import './App.css';
import Game from './Game';
import PreGame from './PreGame';

export const context = createContext<{
  difficulty: number, clicks: number, grid: string[][], activeCell: number[][], timeoutID: number | null, completedCellsCount: number, success: boolean,
  setDifficulty: (newDiff: number) => void,
  setClicks: (newClicks: number) => void,
  setGrid: (newGrid: string[][]) => void,
  setActiveCell: (newActiveCell: number[][]) => void,
  setTimeoutID: (newTimeoutID: number | null) => void,
  setCompletedCellsCount: (newCompletedCellsCount: number) => void,
  setSuccess: (newSuccess: boolean) => void
}>({
  difficulty: 0, clicks: 0, grid: [], activeCell: [], timeoutID: null, completedCellsCount: 0, success: false, 
  setDifficulty: () => {}, 
  setClicks: () => {},
  setGrid: () => {},
  setActiveCell: () => {},
  setTimeoutID: () => {},
  setCompletedCellsCount: () => {},
  setSuccess: () => {}
});

function App() {
  const [difficulty, setDifficulty] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [activeCell, setActiveCell] = useState<number[][]>([]);
  const [timeoutID, setTimeoutID] = useState<number | null>(null);
  const [completedCellsCount, setCompletedCellsCount] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  
  return (
    <context.Provider value={{
      difficulty, clicks, grid, activeCell, timeoutID, completedCellsCount, success,
      setDifficulty, setClicks, setGrid, setActiveCell, setTimeoutID, setCompletedCellsCount, setSuccess
    }}>
      {difficulty !== 0 ? <Game /> : <PreGame />}
    </context.Provider>
  )
}

export default App;