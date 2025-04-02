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
    
    // Calculate metrics
    const metrics = {
      totalOpportunities: records.length,
      activeOpportunities: records.filter(item => item.Active === 'Yes').length,
      totalValue: records.reduce((sum, item) => {
        const value = parseFloat(item.Award$ || 0);
        return sum + (isNaN(value) ? 0 : value);
      }, 0),
      avgResponseDays: calculateAverageResponseDays(records),
      
      // Department metrics
      departments: calculateDepartmentMetrics(records),
      
      // Notice type metrics
      noticeTypes: calculateNoticeTypeMetrics(records),
      
      // Set-aside metrics
      setAsides: calculateSetAsideMetrics(records),
      
      // Value range metrics
      valueRanges: calculateValueRangeMetrics(records),
      
      // Timeline metrics
      timeline: calculateTimelineMetrics(records)
    };
    
    // Return the metrics
    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error processing metrics:', error);
    res.status(500).json({ error: 'Failed to calculate metrics' });
  }
}

// Helper functions
function calculateAverageResponseDays(records) {
  const validRecords = records.filter(item => 
    item.PostedDate && item.ResponseDeadLine
  );
  
  if (validRecords.length === 0) return null;
  
  const totalDays = validRecords.reduce((sum, item) => {
    const postedDate = new Date(item.PostedDate);
    const responseDate = new Date(item.ResponseDeadLine);
    
    if (isNaN(postedDate.getTime()) || isNaN(responseDate.getTime())) {
      return sum;
    }
    
    const diffTime = Math.abs(responseDate - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return sum + diffDays;
  }, 0);
  
  return Math.round(totalDays / validRecords.length);
}

function calculateDepartmentMetrics(records) {
  const departments = {};
  
  records.forEach(item => {
    const dept = item['Department/Ind.Agency'] || 'Unknown';
    
    if (!departments[dept]) {
      departments[dept] = 0;
    }
    
    departments[dept]++;
  });
  
  return Object.entries(departments)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function calculateNoticeTypeMetrics(records) {
  const types = {};
  
  records.forEach(item => {
    const type = item.Type || 'Unknown';
    
    if (!types[type]) {
      types[type] = 0;
    }
    
    types[type]++;
  });
  
  return Object.entries(types)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function calculateSetAsideMetrics(records) {
  const setAsides = {};
  
  records.forEach(item => {
    const setAside = item['Set-Aside'] || 'None';
    
    if (!setAsides[setAside]) {
      setAsides[setAside] = 0;
    }
    
    setAsides[setAside]++;
  });
  
  return Object.entries(setAsides)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function calculateValueRangeMetrics(records) {
  const ranges = {
    '$0 - $25K': 0,
    '$25K - $100K': 0,
    '$100K - $500K': 0,
    '$500K - $1M': 0,
    '$1M - $5M': 0,
    '$5M+': 0
  };
  
  records.forEach(item => {
    const value = parseFloat(item.Award$ || 0);
    
    if (isNaN(value)) return;
    
    if (value < 25000) {
      ranges['$0 - $25K']++;
    } else if (value < 100000) {
      ranges['$25K - $100K']++;
    } else if (value < 500000) {
      ranges['$100K - $500K']++;
    } else if (value < 1000000) {
      ranges['$500K - $1M']++;
    } else if (value < 5000000) {
      ranges['$1M - $5M']++;
    } else {
      ranges['$5M+']++;
    }
  });
  
  return Object.entries(ranges)
    .map(([range, count]) => ({ range, count }));
}

function calculateTimelineMetrics(records) {
  const months = {};
  
  records.forEach(item => {
    if (!item.PostedDate) return;
    
    try {
      const date = new Date(item.PostedDate);
      if (isNaN(date.getTime())) return;
      
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[month]) {
        months[month] = 0;
      }
      
      months[month]++;
    } catch (e) {
      // Skip invalid dates
    }
  });
  
  return Object.entries(months)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));
}
