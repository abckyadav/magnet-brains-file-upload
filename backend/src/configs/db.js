const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://fw12_158:fw12_158@cluster0.lqrz4.mongodb.net/file-upload"
  );
};
