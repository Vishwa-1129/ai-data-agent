import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [table, setTable] = useState([]);
  const [chartData, setChartData] = useState(null);

  const askQuestion = async () => {
    const res = await axios.post("/ask", { question: query });
    setAnswer(res.data.answer);
    setTable(res.data.table || []);
    setChartData(res.data.chartData || null);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Ask Your Business Question</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: "60%", padding: 10 }}
      />
      <button onClick={askQuestion} style={{ marginLeft: 10, padding: 10 }}>Ask</button>

      <div style={{ marginTop: 20 }}>
        <h3>Answer:</h3>
        <p>{answer}</p>
      </div>

      {table.length > 0 && (
        <div>
          <h3>Table:</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>{Object.keys(table[0]).map((key, i) => <th key={i}>{key}</th>)}</tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {chartData && (
        <div>
          <h3>Chart:</h3>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;