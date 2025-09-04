import Piece from "./Piece";

class Queen extends Piece {
    constructor(color) {
        super("queen", color);
    }

    isMovePossible(selectedI, selectedJ, moveI, moveJ, board) {
        if(board[moveI][moveJ]?.pieceColor === this._pieceColor) return false;
        if (selectedI === moveI && moveJ > selectedJ) {
            return super._moveUp(selectedI, selectedJ, moveI, moveJ, board);
        } else if (selectedI === moveI && moveJ < selectedJ) {
            return super._moveDown(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI > selectedI && selectedJ === moveJ) {
            return super._moveRight(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI < selectedI && selectedJ === moveJ) {
            return super._moveLeft(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI > selectedI && moveJ > selectedJ) {
            return super._moveDiagonalRightUp(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI < selectedI && moveJ < selectedJ) {
            return super._moveDiagonalLeftDown(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI > selectedI && moveJ < selectedJ) {
            return super._moveDiagonalRightDown(selectedI, selectedJ, moveI, moveJ, board);
        } else if (moveI < selectedI && moveJ > selectedJ) {
            return super._moveDiagonalLeftUp(selectedI, selectedJ, moveI, moveJ, board);
        }
        return false;
    };
}

export default Queen;