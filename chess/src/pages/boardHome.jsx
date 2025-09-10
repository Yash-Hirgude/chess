import React, { useContext, useEffect } from 'react';
import Board from '../components/board';
import { useLocation } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import Rook from '../Utils/Rook';
import Pawn from '../Utils/Pawn';
import King from '../Utils/King';
import Queen from '../Utils/Queen';
import Bishop from '../Utils/Bishop';
import Knight from '../Utils/Knight';


function BoardHome() {
    const location = useLocation();
    const receivedData = location.state;
    let { setSelectedI, setSelectedJ, setGameBoard, setIsWhiteChance, setIsYourChance, setFallenPiece, setIsMultiplayer, setOpponentId, clearSocketConnection, opponentId } = useContext(BoardContext)

    useEffect(() => {
        return () => {
            setOpponentId('');
            setSelectedI(null);
            setSelectedJ(null);
            setIsWhiteChance(true);
            setIsYourChance(false);
            setFallenPiece([[],[]]);
            setIsMultiplayer(false);

            setGameBoard([
                [new Rook("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Rook("black")],
                [new Knight("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Knight("black")],
                [new Bishop("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Bishop("black")],
                [new King("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Queen("black")],
                [new Queen("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new King("black")],
                [new Bishop("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Bishop("black")],
                [new Knight("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Knight("black")],
                [new Rook("white"), new Pawn("white"), null, null, null, null, new Pawn("black"), new Rook("black")]
            ]);

            // add socket connection remove code here
            if(opponentId) clearSocketConnection();


        }
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Board device={receivedData} />
        </div>
    );

}

export default BoardHome;