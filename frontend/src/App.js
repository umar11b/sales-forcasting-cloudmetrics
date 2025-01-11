import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [metrics, setMetrics] = useState({ cpu: 0, memory: 0, network: 0, diskIO: 0 });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);

      setChartData((prevData) => ({
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, data.cpu],
          },
        ],
      }));
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>CloudMetrics Dashboard</h1>
      <div>
        <strong>CPU:</strong> {metrics.cpu}% &nbsp; | &nbsp;
        <strong>Memory:</strong> {metrics.memory} GB &nbsp; | &nbsp;
        <strong>Network:</strong> {metrics.network} Mbps &nbsp; | &nbsp;
        <strong>Disk I/O:</strong> {metrics.diskIO} MBps
      </div>
      <Line data={chartData} />
    </div>
  );
}

export default App;
