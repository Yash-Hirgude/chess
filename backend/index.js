const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(
    server,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    }
);

app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send('Server is running. ');
});

io.on('connection', (socket) => {
    console.log('user connected, ', socket.id);
    socket.on("getMe", () => {
        socket.emit("me", socket.id);
    });

    socket.on('startGame', (data) => {
        io.to(data.to).emit('startGame', data);
    });

    socket.on('moveSent', (data) => {
        console.log('board received on server');
        console.log('move details...',data.selectedI,data.selectedJ,data.moveI,data.moveJ)
        io.to(data.to).emit('moveReceived', { selectedI: data.selectedI, selectedJ: data.selectedJ, moveI: data.moveI, moveJ: data.moveJ });
    });
    // socket.on('disconnect',()=>{
    //     socket.broadcast.emit("callended");
    // });

    // socket.on("calluser",({userToCall,signalData,from,name})=>{
    //     io.to(userToCall).emit("calluser",{signal: signalData,from,name});
    // });

    // socket.on("answercall",(data)=>{
    //     io.to(data.to).emit("callAccepted",{signal:data.signal,name:data.receiverName});
    // });
    // socket.on('messageSent',(data)=>{

    //     io.to(data.to).emit('receivedMessage',{msg:data.data});
    // });
    // socket.on('userLeft',(data)=>{

    //     io.to(data.to).emit('userleft',{msg:data.data});
    // });

});


server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));