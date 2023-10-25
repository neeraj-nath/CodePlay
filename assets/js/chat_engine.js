// // This is the front end | user side socket.io connection -->
// class ChatEngine{
//     constructor(chatBoxId, userEmail){
//         this.chatBox = $(`#${chatBoxId}`); // review this line ###
//         this.userEmail = userEmail;

//         this.socket = io.connect('http://localhost:1000'); //###
//         //io is a library available to us as soon as we use the socket io cdn script tag..


//         if(this.userEmail){
//             this.connectionHandler(); // because it must be initialised 
//         }

//     }
//     connectionHandler(){
//         let self = this;
//         this.socket.on('connect',function(){
//             console.log("Connection Established via Socket");
            
//             self.socket.emit('join_room', {
//                 user_email : self.userEmail,
//                 chatroom: 'codeial'
//             });

//             self.socket.on('user_joined', function(data){
//                 console.log('A user joined:', data);
//             });
//         })

//     }
// }

