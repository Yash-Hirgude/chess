import Button from "@mui/material/Button"
import React,{useState} from "react"
import RoomQuestion from "../components/roomQuestion";
import { useNavigate } from 'react-router';

function Home() {
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    className="py-3 px-6 w-64 sm:w-auto text-lg font-semibold rounded-xl border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
                    onClick={() => { navigate('/board',{state:'single-device'}) }}
                >
                    Offline Multiplayer
                </button>
                
                <button
                    type="button"
                    className="py-3 px-6 w-64 sm:w-auto text-lg font-semibold rounded-xl border border-gray-300 bg-white text-gray-800 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
                    onClick={()=>{setOpen(true)}}
                >
                    Online Multiplayer
                </button>
                <RoomQuestion open={open}/>
            </div>
        </div>

    )
}

export default Home;