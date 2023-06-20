import { ReactNode, createContext, useState } from 'react';

interface ContextData {
    difficulty: string,
    name: string,
    clicks: number,
    setDifficulty: (newDiff: string) => void,
    setName: (newName: string) => void,
    setClicks: (newClicks: number) => void,
}

const context = createContext<ContextData>({ 
    difficulty: '', 
    name: '',
    clicks: 0,
    setDifficulty: () => {},
    setName: () => {},
    setClicks: () => {}
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [difficulty, setDifficulty] = useState<string>('');
    const [name, setName] = useState<string>(localStorage.getItem("name") ? JSON.parse(localStorage.getItem("name") as string) : "");
    const [clicks, setClicks] = useState<number>(0);
  
    const contextValue = { difficulty, name, clicks, setDifficulty, setName, setClicks };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };