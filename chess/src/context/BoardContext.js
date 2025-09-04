import React, { createContext, useState } from 'react';
import Rook from '../Utils/Rook';
import King from '../Utils/King';
import Knight from '../Utils/Knight';
import Bishop from '../Utils/Bishop';
import Queen from '../Utils/Queen';
import Pawn from '../Utils/Pawn';

const BoardContext = createContext();

const ContextProvider = ({ children }) => {
    const [GameBoard, setGameBoard] = useState([
        [new Rook("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Rook("black")],
        [new Knight("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Knight("black")],
        [new Bishop("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Bishop("black")],
        [new King("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Queen("black")],
        [new Queen("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new King("black")],
        [new Bishop("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Bishop("black")],
        [new Knight("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Knight("black")],
        [new Rook("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Rook("black")]
    ]);
    let [selectedI, setSelectedI] = useState(null);
    let [selectedJ, setSelectedJ] = useState(null);
    let [FallenPiece, setFallenPiece] = useState([[], []]);          // FallenPiece[0] will contain fallen pieces with white color and FallenPiece[1] will contain FallenPieces with black color.
    let [isWhiteChance, setIsWhiteChance] = useState(true);
    // let []
    return (<BoardContext.Provider value={{
        GameBoard,
        selectedI,
        selectedJ,
        setSelectedI,
        setSelectedJ,
        FallenPiece,
        setFallenPiece,
        setGameBoard,
        isWhiteChance,
        setIsWhiteChance
    }}>
        {children}
    </BoardContext.Provider>);
}

export { ContextProvider, BoardContext };