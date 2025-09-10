import Piece from "./Piece";

class Pawn extends Piece {
    constructor(color) {
        super("pawn", color);
    }

    isMovePossible(selectedI, selectedJ, moveI, moveJ, board, isWhite, isMultiplayer) {
        console.log(selectedI, selectedJ, moveI, moveJ, board, isWhite, isMultiplayer);
        if (board[moveI][moveJ]?.pieceColor === this._pieceColor) return false;
        if (!isMultiplayer) {
            if (this._pieceColor === "black") {
                if (selectedI === moveI && selectedJ === 6 && selectedJ - 2 === moveJ && !board[selectedI][selectedJ - 1] && !board[moveI][moveJ]) return true;
                if (selectedI === moveI && selectedJ - 1 === moveJ && !board[moveI][moveJ]) return true;
                if (selectedI + 1 === moveI && selectedJ - 1 === moveJ && board[moveI][moveJ]) return true;
                if (selectedI - 1 === moveI && selectedJ - 1 === moveJ && board[moveI][moveJ]) return true;
            }
            else {
                if (selectedI === moveI && selectedJ === 1 && selectedJ + 2 === moveJ && !board[selectedI][selectedJ + 1] && !board[moveI][moveJ]) return true;
                if (selectedI === moveI && selectedJ + 1 === moveJ && !board[moveI][moveJ]) return true;
                if (selectedI + 1 === moveI && selectedJ + 1 === moveJ && board[moveI][moveJ]) return true;
                if (selectedI - 1 === moveI && selectedJ + 1 === moveJ && board[moveI][moveJ]) return true;
            }
            return false;
        }else {
            if( ( (isWhite && this._pieceColor == 'white') || (!isWhite && this._pieceColor == 'black') )){
                if (selectedI === moveI && selectedJ === 6 && selectedJ - 2 === moveJ && !board[selectedI][selectedJ - 1] && !board[moveI][moveJ]) return true;
                if (selectedI === moveI && selectedJ - 1 === moveJ && !board[moveI][moveJ]) return true;
                if (selectedI + 1 === moveI && selectedJ - 1 === moveJ && board[moveI][moveJ]) return true;
                if (selectedI - 1 === moveI && selectedJ - 1 === moveJ && board[moveI][moveJ]) return true;
            }
            return false;
        }
    };
}

export default Pawn;