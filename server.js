import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 }); // Create a WebSocket server on port 8080;

//Connection Event
// Socket: Represents the individual connection between the server and a client.
// Request: Contains information about the client's request, such as headers and URL.

wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress; // Get the client's IP Address.

  socket.on("message", (rawData) => {
    const message = rawData.toString();

    console.log({ rawData: rawData, message: message });

    wss.clients.forEach((client) => {
      // DIFFERENT STATES
      // 0: CONNECTING - The connection is not yet open.
      // 1: OPEN - The connection is open and ready to communicate.
      // 2: CLOSING - The connection is in the process of closing.
      // 3: CLOSED - The connection is closed or couldn't be opened.
      //   if (client.readyState === 1) {
      //     client.send(`Server Broadcast: ${message} from ${ip}`);
      //   }

      // Instead of using the numeric value 1, we can use the WebSocket.OPEN constant for better readability and maintainability.
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server Broadcast: ${message} from ${ip}`);
      }
    });
  });

  socket.on("error", (error) => {
    console.error(`Error: ${error.message}: ${ip}`);
  });

  socket.on("close", () => {
    console.log("Client Disconnected.");
  });
});
