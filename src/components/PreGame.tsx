import { MouseEvent, useContext } from "react";
import { context } from "./context";

function PreGame() {
	const { setDifficulty, name, setName } = useContext(context);

	function handleSubmit(e: { preventDefault: () => void; }) {
		e.preventDefault();
		localStorage.setItem("name", JSON.stringify(name));
	}

	function handleDifficulty(e: MouseEvent ) {
		setDifficulty((e.target as HTMLInputElement).value);
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen p-10 md:p-0 gap-3 bg-[#025464]'>
			
			<p className="text-white text-center font-extrabold tracking-wider text-2xl md:text-3xl">Can you remember a few cards to <br /> to defeat others?</p>
			<form className="flex flex-col justify-center items-center p-10 md:text-lg" onSubmit={handleSubmit} >
				<input onChange={(e) => setName(e.target.value)} type="text" className="py-1 px-3 rounded-lg" placeholder="Enter your Name: " value={name}/>
				<button type="submit" className="bg-gray-800 text-white active:invert font-bold py-2 px-3 md:px-4 rounded-lg my-3">Save</button>
			</form>

			<h1 className='text-[#F8F1F1] text-2xl md:text-3xl font-extrabold'>Choose your difficulty</h1>
			<div className='flex items-center justify-center gap-7 md:gap-10 p-10 md:p-16'>
				<button className='bg-[#F8F1F1] p-3 text-md md:text-xl font-semibold text-gray-700 rounded-xl hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black' onClick={handleDifficulty} value={"Easy"}>Easy</button>
				<button className='bg-[#F8F1F1] p-3 text-md md:text-xl font-semibold text-gray-700 rounded-xl hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black' onClick={handleDifficulty} value={"Medium"}>Medium</button>
				<button className='bg-[#F8F1F1] p-3 text-md md:text-xl font-semibold text-gray-700 rounded-xl hover:bg-[#c8c2c2] active:bg-[#aeabab] active:text-black hover:text-black' onClick={handleDifficulty} value={"Hard"}>Hard</button>
			</div>
		</div>
	)
}

export default PreGame;