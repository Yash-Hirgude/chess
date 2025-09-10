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
    const [OpponentLeftAlert, setOpponentLeftAlert] = useState(false);
    const [isWhite,setIsWhite] = useState(false);


    useEffect(() => {
        socket.emit("getMe");
        const handleMe = (id) => {
            setMe(id);
        };
        socket.on("me", handleMe);

        return () => {
            socket.off("me", handleMe);
        }
    }, []);

    function startGame() {
        socket.emit('startGame', { to: opponentId, joinerId: me });
        // setGameBoard([
        //     [new Rook("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Rook("white")],
        //     [new Knight("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Knight("white")],
        //     [new Bishop("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Bishop("white")],
        //     [new King("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Queen("white")],
        //     [new Queen("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new King("white")],
        //     [new Bishop("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Bishop("white")],
        //     [new Knight("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Knight("white")],
        //     [new Rook("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Rook("white")]
        // ])
        setIsMultiplayer(true);
        setIsYourChance(false);
        setIsWhite(false);
        setIsWhiteChance(false);
        setGameOver(false);
        setOpponentLeftAlert(false)
        alert('Your Piece color is Black! White makes the first move');
        navigate('/board');
    }

    // socket events (inside useEffect to avoid duplicate listeners)
    // If we register socket listeners directly in the component body, they will be added again on every re-render.
    // That causes one event emission to trigger multiple listeners. 
    // By using useEffect with a cleanup (socket.off), we ensure each listener is only attached once 
    // and properly removed when the component unmounts or re-renders.

    useEffect(() => {
        // start game

        const handleStartGame = (data) => {
            setGameBoard([
                [new Rook("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Rook("white")],
                [new Knight("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Knight("white")],
                [new Bishop("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Bishop("white")],
                [new King("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Queen("white")],
                [new Queen("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new King("white")],
                [new Bishop("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Bishop("white")],
                [new Knight("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Knight("white")],
                [new Rook("black"), new Pawn("black"), null, null, null, null, new Pawn("white"), new Rook("white")]
            ])
            setOpponentId(data.joinerId);
            setIsMultiplayer(true);
            setIsYourChance(true);
            setIsWhite(true);
            setIsWhiteChance(true);
            setGameOver(false);
            setOpponentLeftAlert(false);
            navigate('/board');
            alert('Your Piece color is White! You make the first move')
        };
        socket.on('startGame', handleStartGame);

        // receiving move

        const handleMoveReceived = (data) => {
            let board = GameBoard.map(row => row.map(square => square ? square : null));
            setIsYourChance(true);

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
            if (data.replaced === 'yes') {
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
        }

        socket.on('moveReceived', handleMoveReceived);


        // clear socket
        const handleClearSocket = () => {
            setOpponentId('');
            if (!GameOver) {
                setOpponentLeftAlert(true);
                alert('Opponent Left');
            }
            navigate('/');
        };
        socket.on('clearSocket', handleClearSocket);


        // cleanup on re render
        return () => {
            socket.off("clearSocket", handleClearSocket);
            socket.off("moveReceived", handleMoveReceived);
            socket.off("startGame", handleStartGame);
        };
    }, [GameBoard, GameOver])

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
        setGameOver,
        OpponentLeftAlert,
        setOpponentLeftAlert,
        isWhite
    }}>
        {children}
    </BoardContext.Provider>);
}

export { ContextProvider, BoardContext };