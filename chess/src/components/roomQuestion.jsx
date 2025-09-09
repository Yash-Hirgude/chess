import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router';

function RoomQuestion({ open }) {
    const navigate = useNavigate();

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogContentText>
                    <Button onClick={() => { navigate('/create-room',{state:'create'}) }}>Create Room</Button>
                </DialogContentText>
                <DialogContentText>
                    <Button onClick={() => { navigate('/create-room',{state:'join'}) }}>Join Room</Button>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default RoomQuestion;