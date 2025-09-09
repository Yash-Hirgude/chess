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
        console.log('move details...', data.selectedI, data.selectedJ, data.moveI, data.moveJ)
        io.to(data.to).emit('moveReceived', { selectedI: data.selectedI, selectedJ: data.selectedJ, moveI: data.moveI, moveJ: data.moveJ, castled: data.castled, replaced: data.replaced ,pieceName: data.pieceName, pieceColor: data.pieceColor  });
    });
    // socket.on('pieceReplacement', (data) => {
    //     console.log('forwarding replaced piece');
    //     io.to(data.to).emit('pieceReplacement', { i: data.i, j: data.j, pieceName: data.pieceName, pieceColor: data.pieceColor })
    // })

});


server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));