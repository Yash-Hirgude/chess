import Piece from "./Piece";

class King extends Piece {
    constructor(color) {
        super("king", color);
        this._isCastlePossible = true;
    }

    isMovePossible(selectedI, selectedJ, moveI, moveJ, board) {
        if (board[moveI][moveJ]?.pieceColor === this._pieceColor) return false;
        this._isCastlePossible = false;
        if((moveI === selectedI && moveJ === selectedJ+1) || (moveI === selectedI && moveJ === selectedJ-1) ||
            (moveI === selectedI+1 && moveJ === selectedJ) || (moveI === selectedI-1 && moveJ === selectedJ) ||
            (moveI === selectedI+1 && moveJ === selectedJ+1) || (moveI === selectedI-1 && moveJ === selectedJ-1) ||
            (moveI === selectedI+1 && moveJ === selectedJ-1) || (moveI === selectedI-1 && moveJ === selectedJ+1) ) return true;
        return false;
    };

    get isCastlePossible() {
        return this._isCastlePossible;
    }
    setCastleFalse() {
        this._isCastlePossible = false;
    }
}

export default King;