import { useContext, useEffect, useState } from "react";
import { context } from "./context";
import ReactCardFlip from 'react-card-flip';
import generateMatrix from '../generateMatrix';


function Game() {
	const [grid, setGrid] = useState<string[][]>([]);
	const [activeCell, setActiveCell] = useState<number[][]>([]);
	const [timeoutID, setTimeoutID] = useState<number | null>(null);
	const [completedCellsCount, setCompletedCellsCount] = useState<number>(0);
	const [gridLength, setGridLength] = useState<number>(0);
	const [success, setSuccess] = useState<boolean>(false);

	const { difficulty, clicks, setDifficulty, setClicks } = useContext(context);
	
	// This sets gridLength according to the difficulty selected.
	useEffect(() => {
		if (difficulty === "Easy")
			setGridLength(4);
		else if (difficulty === "Medium")
			setGridLength(6);
		else
			setGridLength(8);
	}, [difficulty]);

	// This sets the grid according to the gridLength.
	useEffect(() => {
		setGrid(generateMatrix(gridLength));
	}, [gridLength]);

	// This sets resets the activeCell if both the tiles matches
	// This also helps to restart the game by reseting the grid when the activeCell finally get sets to active
	useEffect(() => {
		if (activeCell.length === 2 && grid[activeCell[0][0]][activeCell[0][1]] === grid[activeCell[1][0]][activeCell[1][1]]){
			const newGrid = [...grid];
			newGrid[activeCell[0][0]][activeCell[0][1]] = '';
			newGrid[activeCell[1][0]][activeCell[1][1]] = '';
			setTimeout(() => {
				setCompletedCellsCount(completedCellsCount + 2);
				setGrid(newGrid);
			}, 1000);	 
		}
		if (activeCell.length === 0 && completedCellsCount === -1){
			setCompletedCellsCount(0);
			setGrid(generateMatrix(gridLength));
		}
	}, [activeCell, grid]);

	// This sets success to true if all the tiles are matched
	// This also helps to restart the game by reseting the value of activeCells and others 
	useEffect(() => {
		if (gridLength !== 0 && completedCellsCount === gridLength * gridLength){
			setSuccess(true);
		}
		if (completedCellsCount === -1) {
			setActiveCell([]);
			setGrid([]);
			setClicks(0);
			setTimeoutID(null);
			setSuccess(false);
		}
	}, [completedCellsCount]);

	// This appends indices of new clicked tiles to activeCells
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

	// This checks if an arr of length two exists in activeCells
	function exists(arr: number[]): boolean {
		return activeCell.some(a => a[0] === arr[0] && a[1] === arr[1]);
	}

	// This initiates the restart process
	function handleRestart() {
		setCompletedCellsCount(-1);
	}

	// This resets the game, so that the player goes back to the pregame menu
	function handleReset() {
		setDifficulty("");
		setClicks(0);
		setActiveCell([]);
		setGrid([]);
		setCompletedCellsCount(0);
		setSuccess(false);
	}

	return (
		<div className='flex flex-col gap-4 md:flex-row md:items-center justify-center md:gap-8 bg-[#025464] h-screen select-none'>
		  <div className='flex flex-col items-center gap-1 md:gap-2 text-2xl font-bold text-gray-700'>
			{grid.map((row, rowIndex) => (
			  <div key={rowIndex} className='flex gap-1 md:gap-2'>
				{row.map((cell, colIndex) => {
				  if (cell !== '')
					return (
					  <ReactCardFlip isFlipped={exists([rowIndex, colIndex])} flipDirection='horizontal' key={colIndex}>
						<div onClick={() => handleClick(rowIndex, colIndex)} className='flex w-10 h-10 md:w-20 md:h-20 bg-[#E57C23] hover:cursor-pointer rounded-[10px]'></div>
						<div className='flex items-center justify-center w-10 h-10 md:w-20 md:h-20 text-3xl md:text-5xl rounded-[10px] bg-[#E8AA42] hover:cursor-pointer'>{cell}</div>
					  </ReactCardFlip>
					);
				  else
					return (
					  <div key={colIndex} className='w-10 h-10 md:w-20 md:h-20 bg-[#d2ae6e] rounded-[10px]'></div>
					);
				})}
			  </div>
			))}
		  </div>
		  <div className='flex flex-col items-center justify-center gap-4 mt-5 md:mt-0'>
			<div className="flex justify-center items-center gap-5 md:flex-col">
				<button onClick={handleRestart} className='bg-[#F8F1F1] p-3 text-md md:text-xl font-medium text-gray-700 rounded-md hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black'>{success ? "New Game" : "Restart"}</button>
				<button onClick={handleReset} className='bg-[#F8F1F1] p-3 text-md md:text-xl font-medium text-gray-700 rounded-md hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black'>Back</button>
			</div>
			<div className='flex justify-center text-gray-900 font-serif font-bold p-2 rounded-full w-32 md:w-40 text-xl md:text-2xl bg-gray-300'>Clicks: {clicks}</div>
		  </div>
		</div>
	  );
	  
}

export default Game;