const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config');
require('./routes/pet.routes')(app);


const server = app.listen(8000, () => console.log('Listening on port 8000'));

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log('server side socket id:' + socket.id);

    socket.on('remove_pet', (_id) => {
        console.log("remove_pet");
        console.log(_id);
        socket.broadcast.emit('pet_removed', _id)
    })
} )