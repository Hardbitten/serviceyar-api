import { createHash } from "crypto";
import moment from "moment";

// return True if Object is Empty
export const isEmpty = function (value) {
  try {
    return (
      value == null ||
      value == undefined ||
      Object.keys(value).length == 0 ||
      value == "undefinde" ||
      value.length === 0
    );
  } catch (e) {
    throw e;
  }
};

// Generate UniqueCode numeric and alphabet [ Default Length is 6 ]
export const generateUniqueCode = async (length = 6) => {
  let data = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "code";
  for (var i = 0; i < length; i++)
    code += data.charAt(Math.floor(Math.random() * data.length));

  return await code;
};

// Shuffle the array param
export const shuffle = (arra1) => {
  var ctr = arra1.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
};

export const InitInt = (x) => {
  if (parseInt(x) < 10) x = "0" + x;
  return x;
};

export const lowerCase = (value) => {
  return value.toLowerCase();
};

export const difference = function (a, b) {
  return Math.abs(a - b);
};

export const hash = (value) => {
  if (value) {
    const md5sum = createHash("md5");
    return md5sum.update(value).digest("hex");
  } else return false;
};
