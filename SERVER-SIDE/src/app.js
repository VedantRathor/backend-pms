require('dotenv').config();
const db = require('../models/index')
const express = require('express')
const app = new express()
const multer = require('multer');
const path = require('path');
const router = require('../routes/router')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')    
// const { Server } = require('socket.io')
// const server = http.createServer(app)
const userinfo = db.userinfo
const project = db.project
const assignment = db.assignment
const task = db.tasks   
const log = db.log
const notification = db.notification
// const io = new Server(server, {
//     cors: {
//         origin: 'https://project-managementt-system.netlify.app',
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     }
// })
// Initialize Socket.IO with the server

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins // Specify your exact origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No Content
    }
    
    next();
});


app.use(cors({
    origin: 'https://project-managementt-system.netlify.app', // Adjust to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
// const users = new Map();
    
// io.on('connection', (socket) => {   

//     socket.on('new-user-connected', (user_id) => {
//         console.log('connected',user_id) ;
//         const mysocket = users.get(user_id)
//         if( mysocket ){
//             mysocket.emit('render-my-notification',(user_id));
//         }
//     })

//     socket.on('disconnect', () => {
//         users.forEach((value, key) => {
//             if (value == socket) {
//                 users.delete(key)
//                 console.log('user disconnected')
//             }
//         })
//     });
    

//     socket.on('logout',()=>{
//         console.log('user logged out')
//         users.forEach((value, key) => {
//             if (value == socket) {
//                 users.delete(key)
//                 console.log('disconnected')
//             }
//         })
//     })
// })

// app.use((req, res, next) => {
//     req.users = users;
//     next();
    
//   });
  app.use("/uploaded-image", express.static(path.join(__dirname, "uploads")));
app.use(router);




app.listen(process.env.PORT, () => {
    console.log('Listening OK at 7007')
})