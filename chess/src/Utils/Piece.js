class Piece{
    constructor(pieceName, color){
        this._pieceName = pieceName;
        this._pieceColor = color;
        this._isActive = true;
    }

    get pieceName(){
        return this._pieceName;
    }

    get pieceColor(){
        return this._pieceColor
    }

    get isActive(){
        return this._isActive;
    }

    set isActive(val){
        this._isActive = val;
    }
    _moveDiagonalLeftDown(selectedI, selectedJ, moveI, moveJ, board) {
        selectedI--;
        selectedJ--;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[selectedI][selectedJ]) return false;
        while (selectedJ > moveJ && selectedI > moveI) {
            if (board[selectedI][selectedJ]) return false;
            selectedI--;
            selectedJ--;
        }
        return true;
    }
    _moveDiagonalRightDown(selectedI, selectedJ, moveI, moveJ, board) {
        selectedI++;
        selectedJ--;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[selectedI][selectedJ]) return false;
        while (selectedJ > moveJ && selectedI < moveI) {
            if (board[selectedI][selectedJ]) return false;
            selectedI++;
            selectedJ--;
        }
        return true;
    }
    _moveDiagonalLeftUp(selectedI, selectedJ, moveI, moveJ, board) {
        selectedI--;
        selectedJ++;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[selectedI][selectedJ]) return false;
        while (selectedJ < moveJ && selectedI > moveI) {
            if (board[selectedI][selectedJ]) return false;
            selectedI--;
            selectedJ++;
        }
        return true;
    }
    _moveDiagonalRightUp(selectedI, selectedJ, moveI, moveJ, board) {
        selectedI++;
        selectedJ++;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[selectedI][selectedJ]) return false;
        while (selectedJ < moveJ && selectedI < moveI) {
            if (board[selectedI][selectedJ]) return false;
            selectedI++;
            selectedJ++;
        }
        return true;
    }
    _moveUp(selectedI, selectedJ, moveI, moveJ, board) {
        selectedJ++;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[moveI][selectedJ]) return false;
        while (selectedJ < moveJ) {
            if (board[moveI][selectedJ]) return false;
            selectedJ++;
        }
        return true;
    }
    _moveDown(selectedI, selectedJ, moveI, moveJ, board) {
        selectedJ--;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[moveI][selectedJ]) return false;
        while (selectedJ > moveJ) {
            if (board[moveI][selectedJ]) return false;
            selectedJ--;
        }
        return true;
    }
    _moveRight(selectedI, selectedJ, moveI, moveJ, board) {
        selectedI++;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[selectedI][moveJ]) return false;
        while (selectedI < moveI) {
            if (board[selectedI][moveJ]) return false;
            selectedI++;
        }
        return true;
    }
    _moveLeft(selectedI, selectedJ, moveI, moveJ, board) {
        selectedI--;
        if(selectedJ === moveJ && selectedI === moveI) return true;
        if (board[selectedI][moveJ]) return false;
        while (selectedI > moveI) {
            if (board[selectedI][moveJ]) return false;
            selectedI--;
        }
        return true;
    }
}

export default Piece;