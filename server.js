require('dotenv').config();
const app = require('./server/app');
const http = require('http');

const server = http.createServer(app);

const port = 3000 || process.env.port;

server.listen(port, () => {
    console.log(`connected on port: ${port}`);
});


