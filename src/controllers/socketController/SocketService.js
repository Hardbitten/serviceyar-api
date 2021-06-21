import User from "../../model/userModel";

const userSockets = new Map();

const SocketService = (socket) => {
  try {
    if (socket.type === "user") {
      //user
      console.log("user connected");

      userSockets.set(socket.user.id, socket);
      console.log("socket.user.id", socket.user.id);
      socket.on("disconnect", (socket) => {
        console.log("user disconnected");
      });

      //########
    } else if (socket.type === "driver") {
      //driver
      console.log("driver connected");

      socket.on("onDriverLocationChange", async (data) => {
        console.log("data", data);
        const users = await User.find({
          driverId: socket.driver.id,
        });

        for (const user of users) {
          let entries = [...userSockets.entries()].map(([k]) => {
            if (k === user.id) return k;
          });
          const userKey = entries.filter((item) => item !== undefined)[0];
          const userSocket = userSockets.get(userKey);
          if (userSocket) {
            userSocket.emit("onDriverLocationChange", data);
          }
        }
      });
      socket.on("disconnect", (socket) => {
        console.log("driver disconnected");
      });
    }
  } catch (err) {
    console.log("THIS IS FROM SOCKETSERVICE HANDDLER CATCH ERR", err);
    return;
  }
};

export default SocketService;
