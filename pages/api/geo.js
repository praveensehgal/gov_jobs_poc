import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default function handler(req, res) {
  try {
    // Read the CSV file
    const filePath = path.join(process.cwd(), 'data', 'opportunities.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse CSV data
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    // Calculate geographical metrics
    const states = calculateStateMetrics(records);
    
    // Return the geo data
    res.status(200).json({
      states
    });
  } catch (error) {
    console.error('Error processing geo data:', error);
    res.status(500).json({ error: 'Failed to calculate geographical metrics' });
  }
}

// Helper function
function calculateStateMetrics(records) {
  const states = {};
  
  records.forEach(item => {
    // Extract state from the Place of Performance
    let state = 'Unknown';
    
    if (item['Place of Performance']) {
      // Try to extract state code (usually 2 letters at the end)
      const match = item['Place of Performance'].match(/[A-Z]{2}$/);
      if (match) {
        state = match[0];
      }
    }
    
    if (!states[state]) {
      states[state] = 0;
    }
    
    states[state]++;
  });
  
  return Object.entries(states)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);
}
