const http = require("http")

const PORT = 8900
const HOST = '127.0.0.1'

const serverHandle = require("../app.js")

const server = http.createServer(serverHandle)

server.listen(PORT, HOST, () => {
    console.log(`I'm listening at  http://localhost:${PORT}`);
    console.log(`I'm listening at  http://${HOST}:${PORT}`);
});