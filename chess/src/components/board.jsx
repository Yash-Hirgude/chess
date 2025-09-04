import React, { useEffect, useState } from 'react';
import '../index.css'
import Square from './square';

function Board(){

    const [board, setBoard] = useState([]);

    useEffect(()=>{
        if(board.length) return;
        let boardTemp = [];
        for(let i = 0;i<8;i++){
            let newRow = [];
            for(let j = 0;j<8;j++){
                newRow.push(<Square i={i} j={j} bgColor={`${(i+j)%2 === 0 ? "black" : "white"}`} key= {`${i}-${j}`} />);
            }
            // setBoard((preBoard)=>[...preBoard,(<div className='block w-full h-full'>{newRow}</div>)]);
            boardTemp = [...boardTemp,newRow];
        }
        setBoard(boardTemp);
    },[]);

    return (
        
    <div className="aspect-square w-[100vw] max-w-[90vh] flex flex-row justify-center items-center border-stone-700 border-2">
        {
            board.map((row,idx)=>{
                return <div key = {idx} className="w-full h-full">{row}</div>
            })
        }


    </div>
    // <div>

    // </div>

    )
}

export default Board;