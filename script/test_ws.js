
const sock = require('socket')

const url = 'wss://echo.websocket.org'

try {
    const ws = new sock.WebSocket(url)

    ws.setOnTextMessageListener((message) => {
        console.log(message)
    });
    ws.setOnBytesMessageListener((message) => {
        console.log(message)
    });
    ws.setOnOpenListener((message) => {
        console.log(message)
    });
    ws.setOnClosingListener((code, message) => {
        console.log(code, message)
    });
    ws.setOnClosedListener((code, message) => {
        console.log(code, message)
    });
    ws.setOnErrorListener((message) => {
        console.log(message)
    });
    ws.connect()
    setInterval(() => {
        ws.sendMessage('Hello, WebSocket!')
    }, 1000)
} catch (error) {
    console.log(error.message)
}
