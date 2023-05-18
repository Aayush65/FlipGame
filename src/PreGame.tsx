import { useContext } from "react";
import { context } from "./App";

function PreGame() {
	const { setDifficulty } = useContext(context);
	
	function handleDifficulty(e: any) {
		const newDiff = e.target.id;
		if (newDiff == 1)
			setDifficulty(4);
		else if (newDiff == 2)
			setDifficulty(6);
		else
			setDifficulty(8);
	}

	return (
		<div className='flex flex-col items-center justify-center p-32'>
			<h1 className='text-[#F8F1F1] text-[2rem] block'>Choose the difficulty you want to play the <span>Flip Game</span></h1>
			<div className='flex items-center justify-center gap-10 p-20'>
				<button className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-xl hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black' id='1' onClick={handleDifficulty}>Easy</button>
				<button className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-xl hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black' id='2' onClick={handleDifficulty}>Medium</button>
				<button className='bg-[#F8F1F1] p-3 text-xl font-medium text-gray-700 rounded-xl hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black' id='3' onClick={handleDifficulty}>Hard</button>
			</div>
		</div>
	)
}

export default PreGame;