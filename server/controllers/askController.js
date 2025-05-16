// server/controllers/askController.js
const { askQuestion } = require('../utils/agent');

const handleAsk = async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await askQuestion(question);
    res.json({ answer });
  } catch (err) {
    console.error('Error in handleAsk:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { handleAsk };
