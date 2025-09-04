import React from 'react';
// import DialogActions from '@material-ui/core/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PieceSelection({ open, closeHandler }) {
    return (
        <Dialog open={open}>
            <DialogTitle>
                Choose a Piece to replace with Pawn
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    <Button onClick={() => { closeHandler('queen') }}>Queen</Button>
                </DialogContentText>
                <DialogContentText>
                    <Button onClick={() => { closeHandler('knight') }}>Knight</Button>
                </DialogContentText>
                <DialogContentText>
                    <Button onClick={() => { closeHandler('bishop') }}>Bishop</Button>
                </DialogContentText>
                <DialogContentText>
                    <Button onClick={() => { closeHandler('rook') }}>Rook</Button>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default PieceSelection;