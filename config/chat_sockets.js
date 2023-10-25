// //this is the server side socket.io installation
// module.exports.chatSockets = function(socketServer){
//     // let io = require('socket.io')(socketServer);
//     const io = require("socket.io")(socketServer);

//     io.sockets.on('connection', function(socket){
//         console.log('New connection received',socket.id);

//         socket.on('disconnect', function(){
//             console.log('Socket Disconnected!');
//         });

//         socket.on('join_room', function(data){
//             console.log('Joining Request received --', data);

//             //to join the socket to that room:
//             socket.join(data.chatroom);
            
//             //to emit a notification that an user joined the room to the other users in that room:
//             io.initEngine(data.chatroom).emit('user_joined', data);
//         });

        
//     })

// }