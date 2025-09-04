import Piece from "./Piece";

class Rook extends Piece {
    constructor(color) {
        super("rook", color);
        this._isCastlePossible = true;
    }

    isMovePossible(selectedI, selectedJ, moveI, moveJ, board) {
        if (board[moveI][moveJ]?.pieceColor === this._pieceColor) return false;
        if (moveI !== selectedI && moveJ !== selectedJ) return false;
        this._isCastlePossible = false;
        if (moveJ > selectedJ) {
            return super._moveUp(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveJ < selectedJ) {
            return super._moveDown(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI > selectedI) {
            return super._moveRight(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI < selectedI) {
            return super._moveLeft(selectedI, selectedJ, moveI, moveJ, board);
        }
    };

    checkCastlePossible(selectedI, selectedJ, moveI, moveJ, board) {
        if(!board[selectedI][selectedJ].isCastlePossible || !board[moveI][moveJ].isCastlePossible) return false;
        board[selectedI][selectedJ].setCastleFalse();
        board[moveI][moveJ].setCastleFalse();
        if(selectedI < moveI && selectedJ === moveJ){
            selectedI++;
            while(selectedI<moveI){
                if(board[selectedI][selectedJ] !== null) return false;
                selectedI++;
            }
            return true;
        }else if(selectedI > moveI && selectedJ === moveJ){
            selectedI--;
            while(selectedI>moveI){
                if(board[selectedI][selectedJ] !== null) return false;
                selectedI--;
            }
            return true;
        }
    }

    get isCastlePossible() {
        return this._isCastlePossible;
    }
    setCastleFalse() {
        this._isCastlePossible = false;
    }
}

export default Rook;