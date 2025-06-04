import React, { useState } from 'react';
import {
  Container, Typography, Box, Select, MenuItem,
  FormControl, InputLabel, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, BarElement, CategoryScale,
  LinearScale, Tooltip, Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const banks = ['JP Morgan', 'Wells Fargo', 'Bank of America'];

export default function ExtractMetrics() {
  const [selectedBank, setSelectedBank] = useState('');
  const [bankData, setBankData] = useState(null);

  const handleExtract = async () => {
    try {
      // 🔥 Replace this with real API call
      const response = await fetch('/mock/bank-metrics.json'); // Local file or real endpoint
      const data = await response.json();
      const result = data.banks[selectedBank];
      setBankData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const getChartData = () => {
    const labels = Object.keys(bankData.metrics['30+ Delinquency Rate (%)']);
    return {
      labels,
      datasets: [
        {
          label: '30+ Delinquency Rate (%)',
          data: Object.values(bankData.metrics['30+ Delinquency Rate (%)']).map((v) =>
            parseFloat(v.replace('%', ''))
          ),
          backgroundColor: '#42a5f5',
        },
        {
          label: '90+ Delinquency Rate (%)',
          data: Object.values(bankData.metrics['90+ Delinquency Rate (%)']).map((v) =>
            parseFloat(v.replace('%', ''))
          ),
          backgroundColor: '#66bb6a',
        }
      ]
    };
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>📊 Extract Bank Metrics</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Bank</InputLabel>
          <Select value={selectedBank} label="Select Bank" onChange={(e) => setSelectedBank(e.target.value)}>
            {banks.map((bank) => (
              <MenuItem key={bank} value={bank}>{bank}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleExtract}
          disabled={!selectedBank}
        >
          🚀 Extract Data
        </Button>
      </Box>

      {bankData && (
        <>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>{selectedBank} - Metrics</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  {Object.keys(bankData.metrics['30+ Delinquency Rate (%)']).map((q) => (
                    <TableCell key={q}>{q}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(bankData.metrics).map(([metric, values]) => (
                  <TableRow key={metric}>
                    <TableCell>{metric}</TableCell>
                    {Object.values(values).map((v, idx) => (
                      <TableCell key={idx}>{v}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Box sx={{ background: '#fff', p: 2 }}>
            <Bar
              data={getChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
