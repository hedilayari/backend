const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model(
  "iot",
  new Schema({ url: String, hum: Number, temp: Number , poid:Number,latitude:Number , longitude:Number , timestamp:Date  }),
  "iot"
);