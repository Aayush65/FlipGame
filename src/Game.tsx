import { useContext, useEffect } from "react";
import { context } from "./App";
import ReactCardFlip from 'react-card-flip';
import generateMatrix from './generateMatrix';


function Game() {
	const { grid, clicks, activeCell, timeoutID, difficulty, completedCellsCount, setClicks, setActiveCell, setTimeoutID, setDifficulty, setGrid, setCompletedCellsCount, setSuccess } = useContext(context);

  useEffect(() => {
    setGrid(generateMatrix(difficulty));
  }, [difficulty]);

  useEffect(() => {
    if (activeCell.length == 2 && grid[activeCell[0][0]][activeCell[0][1]] === grid[activeCell[1][0]][activeCell[1][1]]){
      const newGrid = [...grid];
        newGrid[activeCell[0][0]][activeCell[0][1]] = '';
        newGrid[activeCell[1][0]][activeCell[1][1]] = '';
        setTimeout(() => { setGrid(newGrid); setCompletedCellsCount(completedCellsCount + 2); } , 1000);
    }
  }, [activeCell, grid])

	function handleClick(r: number, c: number) {
		setClicks(clicks + 1);
		if (activeCell.length == 2 && timeoutID) {
			clearTimeout(timeoutID);
			setTimeoutID(null);
			setActiveCell([[r, c]]);
			return
		}
		if (activeCell.length == 1 && activeCell[0][0] === r && activeCell[0][1] === c)
			return;
		setActiveCell([...activeCell, [r, c]]);
		if (activeCell.length == 1) {
			const timeout = setTimeout(() => setActiveCell([]), 1000);
			setTimeoutID(timeout);
		}
	}

	function exists(arr: number[]): boolean {
		return activeCell.some(a => a[0] === arr[0] && a[1] === arr[1]);
	}

	function handleReset() {
		setDifficulty(0);
		setClicks(0);
		setActiveCell([]);
		setGrid([]);
		setCompletedCellsCount(0);
		setSuccess(false);
	}

	return (
		<div className='flex items-center justify-center gap-20'>
			<div className='flex flex-col items-center gap-1 text-2xl font-bold text-gray-700'>
				{grid.map((row, rowIndex) => (
					<div key={rowIndex} className='flex gap-1'>
						{row.map((cell, colIndex) => {
							if (cell !== '')
								return (
									<ReactCardFlip isFlipped={exists([rowIndex, colIndex])} flipDirection='horizontal' key={colIndex}>
										<div onClick={() => handleClick(rowIndex, colIndex)} className='flex w-20 h-20 bg-[#E57C23] hover:cursor-pointer rounded-[10px]'></div>
										<div className='flex items-center justify-center w-20 h-20 text-5xl rounded-[10px] bg-[#E8AA42] select-none hover:cursor-pointer'>{cell}</div>
									</ReactCardFlip>
								)
							else
								return (
									<div key={colIndex} className='w-20 h-20 bg-[#d2ae6e] rounded-[10px] select-none'></div>
								)
						})}
					</div>
				))}
			</div>
			<div className='flex flex-col items-center justify-center gap-8 mt-5'>
				<button onClick={handleReset} className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-md hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black'>Reset</button>
				<div className='text-[#F8F1F1] text-3xl'>Clicks: {clicks}</div>
			</div>
		</div>
	)
}

export default Game;