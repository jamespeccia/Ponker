const express = require("express");
const router = express.Router();
var server = require('http').Server(router);
var io = require('socket.io')(server);

let gameRoomPins = ["12345"];
let gameRooms = [];

// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         const { pin } = data;
//     });
// });
//
// gameRooms.push(io);
//

router.post("/join", (req, res) => {
    const {pin} = req.body;

    if (gameRoomPins.includes(pin)) {
        return res.status(200).json({message: "ROOM_EXISTS"}).end();
    }
    return res.status(400).json({message: "ROOM_DOES_NOT_EXIST"}).end();
});

router.post("/emit", (req, res) => {
    const {pin} = req.body;

    if (gameRooms.includes(pin))
        return res.status(200).json({message: "ROOM_EXISTS"});

    return res.status(400).json({message: "ROOM_DOES_NOT_EXIST"});
});

router.post("/create", (req, res) => {
    const {pin} = req.body;

    if (gameRooms.includes(pin))
        return res.status(200).json({message: "ROOM_EXISTS"});

    return res.status(400).json({message: "ROOM_DOES_NOT_EXIST"});
});

module.exports = router;