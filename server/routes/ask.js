const express = require("express");
const router = express.Router();
const { askLLM } = require("../utils/agent");
const { queryDatabase } = require("../utils/db");

router.post("/", async (req, res) => {
  const question = req.body.question;
  const { sql, answer, chartSpec } = await askLLM(question);
  const result = await queryDatabase(sql);

  const chartData = chartSpec ? {
    labels: result.map(row => row[chartSpec.x]),
    datasets: [{ label: chartSpec.label, data: result.map(row => row[chartSpec.y]) }]
  } : null;

  res.json({ answer, table: result, chartData });
});

module.exports = router;