import Piece from "./Piece";

class Bishop extends Piece{
    constructor(color){
        super("bishop",color);
    }

    isMovePossible(selectedI,selectedJ,moveI,moveJ,board){
        if(board[moveI][moveJ]?.pieceColor === this._pieceColor) return false;
        if(moveJ>selectedJ && moveI>selectedI){
            return super._moveDiagonalRightUp(selectedI,selectedJ,moveI,moveJ,board);
        }else if(moveJ<selectedJ && moveI<selectedI){
            return super._moveDiagonalLeftDown(selectedI,selectedJ,moveI,moveJ,board);
        }else if(moveI>selectedI && moveJ<selectedJ){
            return super._moveDiagonalRightDown(selectedI,selectedJ,moveI,moveJ,board);
        }else if(moveI<selectedI && moveJ>selectedJ){
            return super._moveDiagonalLeftUp(selectedI,selectedJ,moveI,moveJ,board);
        }
    };
}

export default Bishop;