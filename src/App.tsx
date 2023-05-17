import { useState } from 'react';
import './App.css';


function App() {
  const [grid, setGrid] = useState<number[][]>([[1,2,3,4],[2,3,4,1],[5,6,7,8],[7,6,8,5]]);
  const [activeCell, setActiveCell] = useState<number[][]>([]);

  function exists(arr: number[]): boolean {
    return activeCell.some(a => a[0] == arr[0] && a[1] == arr[1]);
  }

  function handleClick(r: number, c: number) {
    if (activeCell.length == 2) {
      return
    }
    if (activeCell.length == 1) {
      if (grid[activeCell[0][0]][activeCell[0][1]] === grid[r][c]) {
        setTimeout(() => {
          const newGrid = [...grid];
          newGrid[activeCell[0][0]][activeCell[0][1]] = 0;
          newGrid[r][c] = 0;
          setGrid(newGrid);
        }, 1000);
      }
    } 
    setActiveCell([...activeCell, [r, c]]);
    if (activeCell.length == 1) {
      setTimeout(() => setActiveCell([]), 1000);
    }
  }

  return (
    <div className='flex flex-col items-center gap-1 mt-32 text-2xl font-bold text-gray-700'>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-1'>
          {row.map((cell, colIndex) => {
            if (cell !== 0)
              return (
                <div key={colIndex} onClick={() => handleClick(rowIndex, colIndex)} className='flex items-center justify-center w-20 h-20 bg-green-400 select-none hover:cursor-pointer hover:bg-green-500'>{exists([rowIndex, colIndex]) ? cell : ''}</div>
              )
            else
              return (
                <div key={colIndex} className='w-20 h-20'></div>
              )
            })}
        </div>
      ))}
    </div>
  )
}

export default App
