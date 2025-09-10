import React, { useEffect, useState, useContext } from 'react';
import '../index.css'
import Square from './square';
import { BoardContext } from '../context/BoardContext';

function Board({ device }) {

    let {setIsMultiplayer} = useContext(BoardContext);

    const [board, setBoard] = useState([]);
    if (device === 'single-device') setIsMultiplayer(false);
    else setIsMultiplayer(true);

        useEffect(() => {
            if (board.length) return;
            let boardTemp = [];
            for (let i = 0; i < 8; i++) {
                let newRow = [];
                for (let j = 0; j < 8; j++) {
                    newRow.push(<Square i={i} j={j} bgColor={`${(i + j) % 2 === 0 ? "black" : "white"}`} key={`${i}-${j}`} />);
                }
                boardTemp = [...boardTemp, newRow];
            }
            setBoard(boardTemp);
        }, []);

    return (

        <div className="aspect-square w-[100vw] max-w-[90vh] flex flex-row justify-center items-center border-stone-700 border-2">
            {
                board.map((row, idx) => {
                    return <div key={idx} className="w-full h-full">{row}</div>
                })
            }


        </div>
    )
}

export default Board;