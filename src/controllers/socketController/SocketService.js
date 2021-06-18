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
      for (const user of users) {
        const userSocket = userSockets.get(user._id);
        if (userSocket) {
          userSocket.emit("sendDriverLocation", {});
        }
      }
    });
    socket.on("disconnected", (socket) => {
      console.log("driver disconnected");
    });
  }
};

export default SocketService;
