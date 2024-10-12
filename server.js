const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// 當玩家連接到伺服器時
io.on('connection', (socket) => {
    console.log('A player connected: ' + socket.id);

    // 當玩家斷開連接時
    socket.on('disconnect', () => {
        console.log('A player disconnected: ' + socket.id);
    });

    // 接收來自客戶端的移動信息
    socket.on('playerMove', (data) => {
        // 將玩家移動信息發送給其他玩家
        socket.broadcast.emit('playerMove', data);
    });
});

// 伺服器監聽指定端口
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
