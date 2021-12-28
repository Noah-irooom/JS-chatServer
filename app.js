// server

const express = require("express") // 라이브러리가져오고 express사용 -> require : node_modules에서 바로 가져와
const app = express(); // express실행한 내용을 app에 담아
const path = require("path") // node js 기본 모듈

console.log("안녕")
console.log("기억")
// console.log(__dirname) : C:\Users\user\COMPUTER_SCIENCE\JS_project\chat
// 서버 실행시 보여줄 파일을 지정할 수 있다.
app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000; // 지정된 포트가 없다면 5000


app.listen(PORT, ()=>console.log(`server is running ${PORT}`)) 
// node app.js 터미널 입력후
// localhost:5000로 접근하면 html파일을 볼수 있다.

