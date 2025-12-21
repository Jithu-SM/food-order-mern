const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/check-user", auth, role("user"), (req, res) => {
  res.json({ message: "User access granted" });
});

module.exports = router;
