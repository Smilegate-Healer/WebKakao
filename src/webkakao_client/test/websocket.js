const SockJS = require("sockjs-client")
const Stomp = require("webstomp-client")

const sock = new SockJS("/chat")
const stompClient = Stomp.over(sock, {
  heartbeat: false
})

var chatroomId = 1

stompClient.connect({}, (frame) => {
  console.log("Successfully connected")

  stompClient.subscribe("/topic/chatroom/" + chatroomId, (msg) => {
    console.log("sub")
    console.log(msg)
  })

  const stdin = process.stdin

  stdin.setEncoding("utf8")

  stdin.on("data", (key) => {
    if(key === "\u0003") process.exit()
    else {
      stompClient.send("/chatroom/" + chatroomId, JSON.stringify({
        msg_type: "m",
        msg: key,
        sender: 1 
      }))
    }
})
}, (err) => {
  console.log(err)
})
