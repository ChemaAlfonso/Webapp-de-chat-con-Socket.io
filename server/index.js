var express = require('express');

//Importar express
var app = express();

//Levantar servidor
var server = require('http').Server(app);

//Importar socket IO
var io = require('socket.io')(server);

//cargar ruta por defecto con use para usar un middleware
app.use(express.static('client'));


//Rutas
app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

//Aray de mensajes
var messages = [{
    id: 1,
    text: 'Bienvenido al chat de chema',
    nickname: 'Bot - Chema'

}];

//Abrir conexion al socket
io.on('connection', function (socket) {
    console.log('Usuario conectado ' + socket.handshake.address + "se ha conectado");

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });

});

server.listen(6677, function ()
{
    console.log('Servidor corriendo correctamente en http://localhost:6677');    
});