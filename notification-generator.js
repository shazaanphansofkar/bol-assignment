import WebSocket from "ws";

// Replace with your WebSocket server URL
const socket = new WebSocket("ws://localhost:7071/notifications/ws?userId=0");

// Connection opened
socket.addEventListener("open", (event) => {
  console.log("WebSocket is connected.");

  // Send a message to the server
  const generator = () => {
    const notification = {
      title: "Alert5",
      message: "Something 5 happened",
      userId: 1
    };
    socket.send(JSON.stringify(notification));
  };

  setInterval(() => {
    generator();
  }, 5000);
});

// Handle errors
socket.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

// Handle connection close
socket.addEventListener("close", () => {
  console.log("WebSocket connection closed.");
});
// generateMessage();
