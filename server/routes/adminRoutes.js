const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/check-admin", auth, role("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
