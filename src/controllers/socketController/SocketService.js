import User from "../../model/userModel";

const userSockets = new Map();

const SocketService = (socket) => {
  if (socket.type === "user") {
    //user
    console.log("user connected");

    userSockets.set(socket.user.id, socket);
    socket.on("disconnected", (socket) => {
      console.log("user disconnected");
    });

    //########
  } else if (socket.type === "driver") {
    //driver
    console.log("driver connected");

    socket.on("onDriverLocationChange", async (data) => {
      const users = await User.find({ driverId: socket.driver.id });
      let usersKey = [...userSockets.entries()].map(([k]) => k);
      for (const user of usersKey) {
        const userSocket = userSockets.get(user);
        if (userSocket) {
          userSocket.emit("onDriverLocationChange", data);
        }
      }
    });
    socket.on("disconnected", (socket) => {
      console.log("driver disconnected");
    });
  }
};

export default SocketService;
