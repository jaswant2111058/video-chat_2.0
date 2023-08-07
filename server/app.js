const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	

	console.log(socket.id)
	
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("calling", (data) => {
		//console.log("callint to incomming :/n",data)
		io.to(data.idToCall).emit("IncomingCall", data)
		
	})
	socket.on("readyToAccept",(data)=>{
		console.log("readyToCall",data)
		io.to(data.mySocketId).emit("ReadyToCall",data)
	})
 
	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))
