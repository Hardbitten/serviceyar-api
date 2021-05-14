const SocketService = (socket) => {
  console.log("someone connected");

  socket.on("disconnected", (socket) => {
    console.log("someone disconnected");
  });
};

export default SocketService;
