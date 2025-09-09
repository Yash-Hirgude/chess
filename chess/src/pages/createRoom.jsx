import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router';
import { ContextProvider } from '../context/BoardContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BoardContext } from '../context/BoardContext';

function CreateRoom({ createRoom }) {
    const location = useLocation();
    const receivedData = location.state;
    const [id, setId] = useState('Id comes Here')
    let { me, opponentId, setOpponentId, startGame } = useContext(BoardContext);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-100 px-4">
            {receivedData === 'create' ? (
                <div className="text-center p-6 max-w-md bg-white rounded-2xl shadow-lg">
                    <p className="text-xl font-semibold text-gray-800 mb-4">{me ? me : 'id comes here'}</p>
                    <p className="text-gray-600">Send this ID to your friend.</p>
                    <CopyToClipboard text={me}>
                        <button className="btn sm-btn-sm md-btn-md mb-4  lg-btn-lg btn-style-manual" type='button'>

                            Copy Id
                        </button>

                    </CopyToClipboard>
                </div>

            ) : (
                <div className="flex flex-col items-center gap-4 p-6 max-w-md w-full bg-white rounded-2xl shadow-lg">
                    <input
                        type="text"
                        value={opponentId}
                        onChange={(e) => { setOpponentId(e.target.value) }}
                        placeholder="Enter the Room ID here"
                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button onClick={() => {
                        startGame();
                    }} className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Join Room
                    </button>
                </div>
            )}
        </div>

    )
}

export default CreateRoom;