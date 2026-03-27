import { io } from "socket.io-client";

export const initializeSocketConnection = () => {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  return socket;
};
