import React, { createContext, useState, useEffect } from 'react';
import Rook from '../Utils/Rook';
import King from '../Utils/King';
import Knight from '../Utils/Knight';
import Bishop from '../Utils/Bishop';
import Queen from '../Utils/Queen';
import Pawn from '../Utils/Pawn';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000/';

const socket = io(serverUrl);

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
    const [GameOver, setGameOver] = useState(false);


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

    // socket events

    socket.on('startGame', (data) => {
        setOpponentId(data.joinerId)
        // console.log(data)
        console.log('receiving', me, data);
        setIsMultiplayer(true);
        setIsYourChance(true);
        setIsWhiteChance(true);
        navigate('/board');
    })

    socket.on('moveReceived', (data) => {
        let board = GameBoard.map(row => row.map(square => square ? square : null));
        setIsYourChance(true);
        console.log('receiving board');
        console.log(data.selectedI, data.selectedJ, data.moveI, data.moveJ);

        if (data.castled !== 'yes') {
            let fallenPieceColor;
            if (board[data.moveI][data.moveJ]) fallenPieceColor = board[data.moveI][data.moveJ]?.pieceColor;
            let fallenPieceName = board[data.moveI][data.moveJ]?.pieceName;
            if (board[data.moveI][data.moveJ]) FallenPiece[fallenPieceColor === 'black' ? 1 : 0].push(board[data.selectedI][data.selectedJ]);
            board[data.moveI][data.moveJ] = board[data.selectedI][data.selectedJ];
            if (fallenPieceName === 'king') {
                setGameOver(true);
                alert(isWhiteChance ? 'Black Won' : 'White Won');
                navigate('/');
                window.location.reload();
                // return;
            }
            board[data.selectedI][data.selectedJ] = null;
        } else {
            console.log('castled');
            if (board[data.moveI][data.moveJ]?.pieceName === 'king') {
                if (data.selectedI < data.moveI) {
                    board[data.moveI - 2][data.moveJ] = new King(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                    board[data.moveI - 1][data.moveJ] = new Rook(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                } else {
                    board[data.moveI + 2][data.moveJ] = new King(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                    board[data.moveI + 1][data.moveJ] = new Rook(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                }

            } else {
                if (data.selectedI < data.moveI) {
                    board[data.selectedI + 2][data.selectedJ] = new King(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                    board[data.selectedI + 1][data.selectedJ] = new Rook(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                } else {
                    board[data.selectedI - 2][data.selectedJ] = new King(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                    board[data.selectedI - 1][data.selectedJ] = new Rook(GameBoard[data.moveI][data.moveJ]?.pieceColor);
                }
            }
            board[data.moveI][data.moveJ] = null;
            board[data.selectedI][data.selectedJ] = null;
        }
        console.log('before replacing');

        if (data.replaced === 'yes') {
            console.log('replaced received');
            if (data.pieceName === 'queen') {
                board[data.moveI][data.moveJ] = new Queen(data.pieceColor);
            } else if (data.pieceName === 'knight') {
                board[data.moveI][data.moveJ] = new Knight(data.pieceColor);
            } else if (data.pieceName === 'bishop') {
                board[data.moveI][data.moveJ] = new Bishop(data.pieceColor);
            } else if (data.pieceName === 'rook') {
                board[data.moveI][data.moveJ] = new Rook(data.pieceColor);
                board[data.moveI][data.moveJ]?.setCastleFalse();
            }
        }

        setGameBoard(board)
    })

    socket.on('clearSocket', () => {
        setOpponentId('');
        console.log('opponent left');
        if(!GameOver) alert('Opponent Left');
        navigate('/');
    })

    // On Click handlers

    function sendMove(selectedI, selectedJ, moveI, moveJ, castled, replaced, pieceName, pieceColor) {
        socket.emit('moveSent', { to: opponentId, selectedI: selectedI, selectedJ: selectedJ, moveI: moveI, moveJ: moveJ, castled: castled, replaced: replaced, pieceName: pieceName, pieceColor: pieceColor });
    }

    function clearSocketConnection() {
        socket.emit('clearSocket', { to: opponentId });
        setOpponentId('');
    }


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
        sendMove,
        clearSocketConnection,
        GameOver,
        setGameOver
    }}>
        {children}
    </BoardContext.Provider>);
}

export { ContextProvider, BoardContext };