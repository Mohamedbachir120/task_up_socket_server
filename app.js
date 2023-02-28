const express = require('express');
const app = express()

app.use(express.json())

const server = require('http').createServer(app)


const io = require('socket.io')(server,{
    cors:{origin:'http://localhost:5173'}
})

io.on('connection',(socket)=>{
    // socket.on('sendNotificationToUser',(obj)=> {
    //     console.log(obj);
    //     socket.broadcast.emit('receiveNotificationToUser'+obj.user,obj.message)
    // })
    app.post('/send_notification', function (req, res) {
        socket.broadcast.emit('receiveNotificationToUser'+req.body.id,req.body)
    
        res.send({"success":true,"message":"Notification sent successfully"});
      });
  
    socket.on('disconnect',(socket)=>{
            console.log('disconnect');
    })
})


const port = 3000

server.listen(port, ()=>{
        console.log('server is running on port'+port)
})