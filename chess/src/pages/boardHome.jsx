import React,{useContext} from 'react';
import Board from '../components/board';
import { useLocation } from 'react-router-dom';


function BoardHome() {
    const location = useLocation();
    const receivedData = location.state;
    return (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <Board device={receivedData} />
            </div>
    );

}

export default BoardHome;