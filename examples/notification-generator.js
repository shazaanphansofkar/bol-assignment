import WebSocket from "ws";

// import content from '.examples/dummy-notifications.json';
import { readFileSync } from 'fs';


// Replace with your WebSocket server URL
const socket = new WebSocket("ws://localhost:7071/notifications/ws?userId=0");


const dummyNotifications = JSON.parse(
  readFileSync('./examples/dummy-notifications.json', 'utf-8')
);

// const dummyNotifications = JSON.parse(content);


let timeInterval;

// Connection opened
socket.addEventListener("open", (event) => {
  console.log("WebSocket is connected.");

  // Send a message to the server
  const generator = () => {
    const index = Math.floor(Math.random() * 50);
    socket.send(JSON.stringify(dummyNotifications[index]));
  };

  timeInterval = setInterval(() => {
    generator();
  }, 5000);
});

// Handle errors
socket.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

// Handle connection close
socket.addEventListener("close", () => {
  clearInterval(timeInterval);
  console.log("WebSocket connection closed.");
});
