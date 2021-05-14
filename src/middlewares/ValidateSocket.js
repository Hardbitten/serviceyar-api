export const SocketConnection = (socket, next) => {
  socket.on("connecting", (socket) => {
    console.log("someone connected");

    socket.on("disconnected", (socket) => {
      console.log("someone disconnected");
    });
  });
};
