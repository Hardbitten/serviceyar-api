import moment from "moment-jalaali";


export const log = (msg) => {
  console.log(`[${moment().format("YYYY/MM/DD hh:mm")} ${process.env.APP_NAME}]: ${msg}`);
};