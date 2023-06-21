import { useEffect, useState, useContext } from 'react';
import { context } from './context';

interface WinnerType {
    name: string,
    clicks: number,
    difficulty: string
}

function Leaderboard() {
    const [ winners, setWinners ] = useState<WinnerType[]>([]);

    const { difficulty } = useContext(context);

    // Fetches the latest data from the server
    useEffect(() => {
        async function callBackend() {
            fetch(`https://teal-magnificent-coyote.cyclic.app/entry/${difficulty}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(async (response) => await response.json())
                .then((data) => setWinners(data))
                .catch((err) => {
                    console.log(err.message);
        })} 
        callBackend();
        setInterval( callBackend , 30000);
    }, []);

    return (
        <div className={`${winners.length ? "": "hidden"} flex flex-col items-center justify-center gap-5`}>
            <h1 className="text-[#F8F1F1] text-2xl md:text-3xl font-extrabold">Leaderboard</h1>
            <div className='border-white border-2 rounded-lg p-5 w-2/3 md:m-1/3'>
                {winners.map((winner, index) => (
                    <div key={index} className='flex gap-5 items-center justify-evenly border-white border-2 rounded-lg p-5'>
                        <div className='text-[#F8F1F1] text-lg'>{index + 1}</div>
                        <div className='text-[#F8F1F1] text-lg'>{winner.name}</div>
                        <div className='text-[#F8F1F1] text-lg'>{winner.clicks}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;