// server

const express = require("express") // 라이브러리가져오고 express사용 -> require : node_modules에서 바로 가져와
const app = express(); // express실행한 내용을 app에 담아
const path = require("path") // node js 기본 모듈

// 우리가사용하는건 웹소켓 ! 따라서  HTTP 필요함
const http = require("http")
const server = http.createServer(app);
const socketIO = require("socket.io")
const io = socketIO(server);
const moment = require("moment") // 시간 포맷 처리


// 서버 실행시 보여줄 파일을 지정할 수 있다.
app.use(express.static(path.join(__dirname, "src")))// console.log(__dirname) : C:\Users\user\COMPUTER_SCIENCE\JS_project\chat
const PORT = process.env.PORT || 5000; // 지정된 포트가 없다면 5000

io.on("connection",(socket)=>{
    socket.on("chatting",(data)=>{
        // server -> client front
        const {name, msg} = data;
        io.emit("chatting", {
            name,
            msg,
            time : moment(new Date()).format("h:mm A") 
                // ex) YYYY-MM-DD HH:mm:ss
        }) // data : client가  보낸 내용
    })
})

server.listen(PORT, ()=>console.log(`server is running ${PORT}`)) 
// node app.js 터미널 입력후
// localhost:5000로 접근하면 html파일을 볼수 있다.


