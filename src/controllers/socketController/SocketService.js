import User from "../../model/userModel";

const SocketService = (socket) => {
  console.log("someone connected");
  // // let use = {};
  // let token = socket.handshake.query.token
  // const latlng = Data.location
  // const [lng, lat] = latlng.split(',')
  // const unit = Data.unit
  // const distance = Data.distance
  // const Multiplier = unit === "km" ? 0.001 : 1
  // const radius = unit == "km" ? distance / 6378.1 : distance / 1
  // const user = await User.findOne({
  //   userName: "mohamad"
  // })
  // const distances = await User.aggregate([

  //   {
  //     $geoNear: {
  //       near: {
  //         type: 'Point',
  //         coordinates: [lng * 1, lat * 1]
  //       },
  //       spherical: true,
  //       distanceField: "distance",
  //       distanceMultiplier: Multiplier
  //     }
  //   },
  //   {
  //     $project: {
  //       distance: 1,
  //       userName: 1,
  //       _id: 0
  //     }
  //   }

  // ])
  // console.log(distances);
  // const users = await User.find({
  //   location: {
  //     loc: {
  //       $geoWithin: {
  //         $centerSphere: [
  //           [-88, 30], 10 / 3963.2
  //         ]
  //       }
  //     }
  //   }

  // })
  // console.log(users);
  // socket.emit("sendResponse", distances)

  socket.on("disconnected", (socket) => {
    console.log("someone disconnected");
  });
};

export default SocketService;
