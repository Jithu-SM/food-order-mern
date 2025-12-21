const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  logout
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/profile", auth, getProfile);

module.exports = router;
