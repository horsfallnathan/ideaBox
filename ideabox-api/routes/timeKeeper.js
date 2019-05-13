const express = require("express");
const router = express.Router();

router.post("/set-deadline", (req, res, next) => {
  const { value } = req.body;
  console.log(value);
  const period = Date.parse(value.endDate) - Date.parse(value.startDate);
  const days = Math.floor(period / (1000 * 60 * 60 * 24));
  const hours = Math.floor((period / (1000 * 60 * 60)) % 24);
  const timeLeft = { days: days, hours: hours };
  console.log(timeLeft);
  res.json(timeLeft);
});

module.exports = router;
