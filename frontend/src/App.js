import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [chartData, setChartData] = useState({
    labels: ['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [20, 30, 40, 50, 60],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>CloudMetrics Dashboard</h1>
      <Line data={chartData} />
    </div>
  );
}

export default App;
