import http from 'http';
import app from './src/app.js';
import { setupWebSocket } from './src/services/websocket.js';

const server = http.createServer(app);
setupWebSocket(server);

const port = 5000
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
