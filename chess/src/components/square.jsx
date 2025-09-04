import React, { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../context/BoardContext';
import Bishop from '../Utils/Bishop';
import King from '../Utils/King';
import Knight from '../Utils/Knight';
import Queen from '../Utils/Queen';
import Rook from '../Utils/Rook';
import PieceSelection from './pieceSelection';

function Square({ i, j, bgColor }) {

    const [displaySymbol, setDisplaySymbol] = useState(null);
    let { GameBoard, selectedI, selectedJ, FallenPiece, setSelectedI, setSelectedJ, setGameBoard, isWhiteChance, setIsWhiteChance } = useContext(BoardContext);
    const [piece, setPiece] = useState(GameBoard[i][j]?.pieceName);
    const [open,setOpen] = useState(false);
    let bgColorMap = {
        'black': 'bg-[#4A3E3C]',
        'white': 'bg-[#5A5350]'
    }
    function closeHandler(replacement){
        setOpen(false);
        if(replacement === 'queen'){
            if(GameBoard[i][j]?.pieceColor === "white"){
                GameBoard[i][j] = new Queen('white');
            }else{
                GameBoard[i][j] = new Queen('black');
            }
        }else if(replacement === 'knight'){
            if(GameBoard[i][j]?.pieceColor === "white"){
                GameBoard[i][j] = new Knight('white');
            }else{
                GameBoard[i][j] = new Knight('black');
            }
        }else if(replacement === 'bishop'){
            if(GameBoard[i][j]?.pieceColor === "white"){
                GameBoard[i][j] = new Bishop('white');
            }else{
                GameBoard[i][j] = new Bishop('black');
            }
        }else if(replacement === 'rook'){
            if(GameBoard[i][j]?.pieceColor === "white"){
                GameBoard[i][j] = new Rook('white');
            }else{
                GameBoard[i][j] = new Rook('black');
            }
            GameBoard[i][j]?.setCastleFalse();
        }
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
        if (selectedI === null || selectedJ === null) {
            setSelectedI(i);
            setSelectedJ(j);
        } else {
            let canReplace = GameBoard[selectedI][selectedJ].isMovePossible(selectedI, selectedJ, i, j, GameBoard);
            let canCastle = false;
            if( (GameBoard[selectedI][selectedJ]?.pieceName === 'rook' && GameBoard[i][j]?.pieceName === 'king') || 
                (GameBoard[selectedI][selectedJ]?.pieceName === 'king' && GameBoard[i][j]?.pieceName === 'rook')) {
                if(GameBoard[selectedI][selectedJ]?.pieceName === 'rook') canCastle = GameBoard[selectedI][selectedJ]?.checkCastlePossible(selectedI,selectedJ,i,j,GameBoard);
                else canCastle = GameBoard[i][j]?.checkCastlePossible(selectedI,selectedJ,i,j,GameBoard)
            }
            if (!canReplace && !canCastle) {
                setSelectedI(null);
                setSelectedJ(null);
                return;
            }
            else if(canReplace){
                setIsWhiteChance(!isWhiteChance);
                let fallenPieceColor;
                if (GameBoard[i][j]) fallenPieceColor = GameBoard[i][j]?.pieceColor;
                let fallenPieceName = GameBoard[i][j]?.pieceName;
                GameBoard[i][j] = GameBoard[selectedI][selectedJ];
                if (fallenPieceName === 'king') {
                    alert(isWhiteChance ? 'White Won' : 'Black Won');
                    window.location.reload();
                    return;
                }
                if (GameBoard[i][j]) FallenPiece[fallenPieceColor === 'black' ? 1 : 0].push(GameBoard[selectedI][selectedJ]);
                GameBoard[selectedI][selectedJ] = null;
                if ( (j === 0 && GameBoard[i][j]?.pieceName === 'pawn' && GameBoard[i][j]?.pieceColor === 'black') || 
                    (j === 7 && GameBoard[i][j]?.pieceName === 'pawn' && GameBoard[i][j]?.pieceColor === 'white') ) {
                    setOpen(true);
                }
                setGameBoard(GameBoard);
                setSelectedI(null);
                setSelectedJ(null);
            }
            else if(canCastle){
                setIsWhiteChance(!isWhiteChance);
                if(GameBoard[i][j]?.pieceName === 'king'){
                    if(selectedI<i){
                        GameBoard[i-2][j] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[i-1][j] = new Rook(GameBoard[i][j]?.pieceColor);
                    }else{
                        GameBoard[i+2][j] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[i+1][j] = new Rook(GameBoard[i][j]?.pieceColor);
                    }
                
                }else{
                    if(selectedI<i){
                        GameBoard[selectedI+2][selectedJ] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[selectedI+1][selectedJ] = new Rook(GameBoard[i][j]?.pieceColor);
                    }else{
                        GameBoard[selectedI-2][selectedJ] = new King(GameBoard[i][j]?.pieceColor);
                        GameBoard[selectedI-1][selectedJ] = new Rook(GameBoard[i][j]?.pieceColor);
                    }
                }
                GameBoard[i][j] = null;
                GameBoard[selectedI][selectedJ] = null;
                setGameBoard(GameBoard);
                setSelectedI(null);
                setSelectedJ(null);
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
        <div className={`h-[12.5%] w-full ${bgColorMap[bgColor]}`} onClick={clickHandler}>
            <PieceSelection open={open} closeHandler={closeHandler} />
            <div className={`lg:text-[500%] md:text-[400%] text-[300%] text-center`}>
                {displaySymbol}
            </div>
        </div>
    )
}

export default Square;