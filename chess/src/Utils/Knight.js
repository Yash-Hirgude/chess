import Piece from "./Piece";

class Knight extends Piece{
    constructor(color){
        super("knight",color);
    }

    isMovePossible(selectedI,selectedJ,moveI,moveJ,board){
        if(board[moveI][moveJ]?.pieceColor === this._pieceColor) return false;
        if(moveI === selectedI+1){
            if(selectedJ+2===moveJ) return true;
            if(selectedJ-2===moveJ) return true;
        }else if(moveI === selectedI+2){
            if(selectedJ+1===moveJ) return true;
            if(selectedJ-1===moveJ) return true;
        }else if(moveI === selectedI-1){
            if(selectedJ+2===moveJ) return true;
            if(selectedJ-2===moveJ) return true;
        }else if(moveI === selectedI-2){
            if(selectedJ+1===moveJ) return true;
            if(selectedJ-1===moveJ) return true;
        }
        return false;
    };
}

export default Knight;