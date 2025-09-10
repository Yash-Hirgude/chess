import React, { useContext, useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import Bishop from '../Utils/Bishop';
import King from '../Utils/King';
import Knight from '../Utils/Knight';
import Queen from '../Utils/Queen';
import Rook from '../Utils/Rook';
import PieceSelection from './pieceSelection';
import { useNavigate } from 'react-router';

function Square({ i, j, bgColor }) {

    const [displaySymbol, setDisplaySymbol] = useState(null);
    let { GameBoard, selectedI, selectedJ, FallenPiece, setSelectedI, setSelectedJ, setGameBoard, isWhiteChance, setIsWhiteChance, isMultiplayer, isYourChance, setIsYourChance, sendMove, setGameOver, isWhite } = useContext(BoardContext);
    const [piece, setPiece] = useState(GameBoard[i][j]?.pieceName);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    let bgColorMap = {
        'black': 'bg-[#4A3E3C]',
        'white': 'bg-[#5A5350]'
    }
    function closeHandler(replacement) {
        setOpen(false);
        if (replacement === 'queen') {
            if (GameBoard[i][j]?.pieceColor === "white") {
                GameBoard[i][j] = new Queen('white');
            } else {
                GameBoard[i][j] = new Queen('black');
            }
        } else if (replacement === 'knight') {
            if (GameBoard[i][j]?.pieceColor === "white") {
                GameBoard[i][j] = new Knight('white');
            } else {
                GameBoard[i][j] = new Knight('black');
            }
        } else if (replacement === 'bishop') {
            if (GameBoard[i][j]?.pieceColor === "white") {
                GameBoard[i][j] = new Bishop('white');
            } else {
                GameBoard[i][j] = new Bishop('black');
            }
        } else if (replacement === 'rook') {
            if (GameBoard[i][j]?.pieceColor === "white") {
                GameBoard[i][j] = new Rook('white');
            } else {
                GameBoard[i][j] = new Rook('black');
            }
            GameBoard[i][j]?.setCastleFalse();
        }

        sendMove(selectedI, selectedJ, i, j, 'no', 'yes', GameBoard[i][j].pieceName, GameBoard[i][j].pieceColor);
        setSelectedI(null);
        setSelectedJ(null);
    }
    function clickHandler() {
        if (((selectedI === null && selectedJ === null) && GameBoard[i][j] === null) || (selectedI === i && selectedJ === j)) {
            return;
        }
        if ((selectedI === null && selectedJ === null) &&
            ((isWhiteChance && GameBoard[i][j]?.pieceColor !== "white") ||
                (!isWhiteChance && GameBoard[i][j]?.pieceColor !== "black"))) {
            return;
        }
        if (isMultiplayer && !isYourChance) return;
        if (selectedI === null || selectedJ === null) {
            setSelectedI(i);
            setSelectedJ(j);
        } else {
            console.log(selectedI, selectedJ, i, j);
            let canReplace = GameBoard[selectedI][selectedJ].isMovePossible(selectedI, selectedJ, i, j, GameBoard, isWhite, isMultiplayer);
            let canCastle = false;
            if ((GameBoard[selectedI][selectedJ]?.pieceName === 'rook' && GameBoard[i][j]?.pieceName === 'king') ||
                (GameBoard[selectedI][selectedJ]?.pieceName === 'king' && GameBoard[i][j]?.pieceName === 'rook')) {
                if (GameBoard[selectedI][selectedJ]?.pieceName === 'rook') canCastle = GameBoard[selectedI][selectedJ]?.checkCastlePossible(selectedI, selectedJ, i, j, GameBoard);
                else canCastle = GameBoard[i][j]?.checkCastlePossible(selectedI, selectedJ, i, j, GameBoard)
            }
            if (!canReplace && !canCastle) {
                setSelectedI(null);
                setSelectedJ(null);
                return;
            }
            else if (canReplace) {
                // console.log(selectedI,selectedJ,i,j);
                if (!isMultiplayer) setIsWhiteChance(!isWhiteChance);
                else setIsYourChance(false);
                let fallenPieceColor;
                if (GameBoard[i][j]) fallenPieceColor = GameBoard[i][j]?.pieceColor;
                let fallenPieceName = GameBoard[i][j]?.pieceName;
                GameBoard[i][j] = GameBoard[selectedI][selectedJ];
                if (GameBoard[i][j]) FallenPiece[fallenPieceColor === 'black' ? 1 : 0].push(GameBoard[selectedI][selectedJ]);
                GameBoard[selectedI][selectedJ] = null;
                let isReplaced = false;
                if ((j === 0 && GameBoard[i][j]?.pieceName === 'pawn' && GameBoard[i][j]?.pieceColor === 'black') ||
                    (j === 7 && GameBoard[i][j]?.pieceName === 'pawn' && GameBoard[i][j]?.pieceColor === 'white')) {
                    isReplaced = true;
                    setOpen(true);
                }
                setGameBoard(GameBoard);
                if (!isReplaced) sendMove(selectedI, selectedJ, i, j, 'no', 'no', 'null', 'null');
                if (fallenPieceName === 'king') {
                    setGameOver(true);
                    alert(isWhiteChance ? 'White Won' : 'Black Won');
                    navigate('/');
                    window.location.reload();
                }
                if (!isReplaced) {
                    setSelectedI(null);
                    setSelectedJ(null);
                }
            }
            else if (canCastle) {
                if (!isMultiplayer) setIsWhiteChance(!isWhiteChance);
                else setIsYourChance(false);
                if (GameBoard[i][j]?.pieceName === 'king') {
                    if (selectedI < i) {
                        GameBoard[i - 2][j] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[i - 1][j] = new Rook(GameBoard[i][j]?.pieceColor);
                    } else {
                        GameBoard[i + 2][j] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[i + 1][j] = new Rook(GameBoard[i][j]?.pieceColor);
                    }

                } else {
                    if (selectedI < i) {
                        GameBoard[selectedI + 2][selectedJ] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[selectedI + 1][selectedJ] = new Rook(GameBoard[i][j]?.pieceColor);
                    } else {
                        GameBoard[selectedI - 2][selectedJ] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[selectedI - 1][selectedJ] = new Rook(GameBoard[i][j]?.pieceColor);
                    }
                }
                GameBoard[i][j] = null;
                GameBoard[selectedI][selectedJ] = null;
                setGameBoard(GameBoard);
                sendMove(selectedI, selectedJ, i, j, 'yes', 'no', 'null', 'null');
                setSelectedI(null);
                setSelectedJ(null);


                // sendMove();

            }
        }
    }
    function getPieceWhite() {
        switch (piece) {
            case "king":
                setDisplaySymbol('♔')
                break;
            case "queen":
                setDisplaySymbol('♕')
                break;
            case "rook":
                setDisplaySymbol('♖')
                break;
            case "bishop":
                setDisplaySymbol('♗')
                break;
            case "knight":
                setDisplaySymbol('♘')
                break;
            case "pawn":
                setDisplaySymbol('♙')
                break;
            default:
                setDisplaySymbol('')
                break;
        }
    }
    function getPieceBlack() {
        switch (piece) {
            case "king":
                setDisplaySymbol('♚')
                break;
            case "queen":
                setDisplaySymbol('♛')
                break;
            case "rook":
                setDisplaySymbol('♜')
                break;
            case "bishop":
                setDisplaySymbol('♝')
                break;
            case "knight":
                setDisplaySymbol('♞')
                break;
            case "pawn":
                setDisplaySymbol('♟')
                break;
            default:
                setDisplaySymbol('')
                break;
        }
    }
    useEffect(() => {
        setPiece(GameBoard[i][j]?.pieceName)
        GameBoard[i][j]?.pieceColor === "white" ? getPieceWhite() : getPieceBlack();

    })
    return (
        <div className={`h-[18%] md:h-[12.5%] w-full ${bgColorMap[bgColor]}`} onClick={clickHandler}>
            <PieceSelection open={open} closeHandler={closeHandler} />
            <div className={`h-full w-full flex items-center justify-center text-center text-[8.125vh] md:text-[6.875vh] sm:text-[5.625vh]`}> 
                {displaySymbol}
            </div>
        </div>
    )
}

export default Square;