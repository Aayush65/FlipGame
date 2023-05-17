import { useEffect, useState } from 'react';
import generateMatrix from './generateMatrix';
import './App.css';


function App() {
  const [difficulty, setDifficulty] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>([]);
  const [activeCell, setActiveCell] = useState<number[][]>([]);

  function exists(arr: number[]): boolean {
    return activeCell.some(a => a[0] === arr[0] && a[1] === arr[1]);
  }

  useEffect(() => {
    setGrid(generateMatrix(difficulty));
  }, [difficulty]);
  
  function handleDifficulty(e: any) {
    const newDiff = parseInt(e.target.id);
    if (newDiff == 1)
      setDifficulty(4);
    else if (newDiff == 2)
      setDifficulty(6);
    else
      setDifficulty(8);
  }

  function handleClick(r: number, c: number) {
    setClicks(clicks + 1);
    if (activeCell.length == 2) {
      return
    }
    if (activeCell.length == 1) {
      if (activeCell[0][0] === r && activeCell[0][1] === c)
        return;
      if (grid[activeCell[0][0]][activeCell[0][1]] === grid[r][c]) {
        setTimeout(() => {
          const newGrid = [...grid];
          newGrid[activeCell[0][0]][activeCell[0][1]] = '';
          newGrid[r][c] = '';
          setGrid(newGrid);
        }, 1000);
      }
    } 
    setActiveCell([...activeCell, [r, c]]);
    if (activeCell.length == 1) {
      setTimeout(() => setActiveCell([]), 1000);
    }
  }

  function handleReset() {
    setDifficulty(0);
    setActiveCell([]);
    setGrid([]);
  }

  if (difficulty !== 0)
    return (
      <div className='flex items-center justify-center gap-20'>
        <div className='flex flex-col items-center gap-1 text-2xl font-bold text-gray-700'>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className='flex gap-1'>
              {row.map((cell, colIndex) => {
                if (exists([rowIndex, colIndex]))
                  return (
                    <div key={colIndex} className='flex items-center justify-center w-20 h-20 text-5xl rounded-[10px] bg-[#E8AA42] select-none hover:cursor-pointer'>{cell}</div>
                  )
                else if (cell !== '')
                  return (
                    <div key={colIndex} onClick={() => handleClick(rowIndex, colIndex)} className='flex w-20 h-20 bg-[#E57C23] hover:cursor-pointer rounded-[10px]'></div>
                  )
                else
                  return (
                    <div key={colIndex} className='w-20 h-20 bg-[#d9ab5d] rounded-[10px] select-none'></div>
                  )
                })}
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center justify-center gap-8 mt-5'>
          <button onClick={handleReset} className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-md'>Reset</button>
          <div className='text-[#F8F1F1] text-4xl'>Clicks: {clicks}</div>
        </div>
      </div>
    )
  else
    return (
      <div className='flex flex-col items-center justify-center p-32'>
        <h1 className='text-[#F8F1F1] text-[2rem] block'>Choose the difficulty you want to play the <span>Flip Game</span></h1>
        <div className='flex items-center justify-center gap-10 p-20'>
          <button className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-xl' id='1' onClick={handleDifficulty}>Easy</button>
          <button className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-xl' id='2' onClick={handleDifficulty}>Medium</button>
          <button className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-xl' id='3' onClick={handleDifficulty}>Hard</button>
        </div>
      </div>
    )
}

export default App
