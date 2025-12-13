const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
