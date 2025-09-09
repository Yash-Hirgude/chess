import React, { createContext, useState, useEffect } from 'react';
import Rook from '../Utils/Rook';
import King from '../Utils/King';
import Knight from '../Utils/Knight';
import Bishop from '../Utils/Bishop';
import Queen from '../Utils/Queen';
import Pawn from '../Utils/Pawn';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router';

const socket = io('http://localhost:8000/');

const BoardContext = createContext();

const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
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
    let [isMultiplayer, setIsMultiplayer] = useState(false);
    let [isYourChance, setIsYourChance] = useState(false);
    const [me, setMe] = useState('');
    const [opponentId, setOpponentId] = useState('');


    useEffect(() => {
        console.log('print id');
        socket.emit("getMe");
        socket.on("me", (id) => {
            setMe(id);
            console.log("here is your id:", id);
        });
    }, []);

    function startGame() {
        socket.emit('startGame', { to: opponentId, joinerId: me });
        console.log('sending...', me, opponentId);
        setIsMultiplayer(true);
        setIsYourChance(false);
        setIsWhiteChance(false);
        navigate('/board');
    }

    socket.on('startGame', (data) => {
        setOpponentId(data.joinerId)
        // console.log(data)
        console.log('receiving', me, data);
        setIsMultiplayer(true);
        setIsYourChance(true);
        setIsWhiteChance(true);
        navigate('/board');
    })

    function sendMove(selectedI, selectedJ, moveI, moveJ) {
        socket.emit('moveSent', { to: opponentId, selectedI: selectedI, selectedJ: selectedJ, moveI: moveI, moveJ: moveJ });
    }

    socket.on('moveReceived', (data) => {
        let board = GameBoard.map(row => row.map(square => square ? square : null));
        setIsYourChance(true);
        console.log('receiving board');
        console.log(data.selectedI, data.selectedJ, data.moveI, data.moveJ);
        let fallenPieceColor;
        if (board[data.moveI][data.moveJ]) fallenPieceColor = board[data.moveI][data.moveJ]?.pieceColor;
        let fallenPieceName = board[data.moveI][data.moveJ]?.pieceName;
        if (board[data.moveI][data.moveJ]) FallenPiece[fallenPieceColor === 'black' ? 1 : 0].push(board[data.selectedI][data.selectedJ]);
        board[data.moveI][data.moveJ] = board[data.selectedI][data.selectedJ];
        if (fallenPieceName === 'king') {
            alert(isWhiteChance ? 'Black Won' : 'White Won');
            navigate('/');
            window.location.reload();
            // return;
        }
        board[data.selectedI][data.selectedJ] = null;
        console.log(board);
        setGameBoard(board);
    })

    
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
        setIsWhiteChance,
        isMultiplayer,
        setIsMultiplayer,
        isYourChance,
        setIsYourChance,
        me,
        opponentId,
        setOpponentId,
        startGame,
        sendMove
    }}>
        {children}
    </BoardContext.Provider>);
}

export { ContextProvider, BoardContext };