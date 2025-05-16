const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function askLLM(question) {
  const prompt = `Given the vague business question, return a SQL query, answer summary, and optional chart spec as JSON. Question: "${question}"`;

  const res = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(res.data.choices[0].message.content);
}

module.exports = { askLLM };