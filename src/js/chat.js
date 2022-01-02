"use strict"
// client

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container");

// 엔터 누르면 전송되도록
chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13){
        send()
    }
})
function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value,
    }
    socket.emit("chatting", param)
    chatInput.value = ""
}

// 클릭하면 대화명과 대화내용이 전송
sendButton.addEventListener("click",send)


// server -> client가 받아내는 부분
socket.on("chatting",(data)=>{
    console.log(data)
    const {name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
        // scroll 값 읽어서 그 위치로 이동시켜줄것이다.
}) // 서버에서 보낸 채팅아이디 : "chatting"
// console.log(socket)

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent": "received") // 이름가 같으면
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
}

