import React from 'react';
import Board from '../components/board';
import { ContextProvider } from '../context/BoardContext';

function Home() {

    return (
        <ContextProvider>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <Board />
            </div>
        </ContextProvider>
    );

}

export default Home;