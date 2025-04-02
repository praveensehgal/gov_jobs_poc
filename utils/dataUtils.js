// Helper functions for data processing
const dataUtils = {
  // Read and parse CSV data
  parseCSV: (csvString) => {
    if (!csvString) return [];
    
    const lines = csvString.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const results = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      // Handle commas within quoted fields
      let row = [];
      let inQuotes = false;
      let currentValue = '';
      
      for (let char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      // Add the last value
      row.push(currentValue.trim());
      
      // Create object from headers and row values
      if (row.length >= headers.length) {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        results.push(obj);
      }
    }
    
    return results;
  },
  
  // Format currency values
  formatCurrency: (value) => {
    if (!value || isNaN(parseFloat(value))) return '$0';
    
    const num = parseFloat(value);
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(1)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(1)}K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  },
  
  // Format dates
  formatDate: (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  },
  
  // Get color scale for visualizations
  getColorScale: (index, total) => {
    const colors = [
      '#1a365d', // primary
      '#2c7a7b', // secondary
      '#dd6b20', // accent
      '#6b46c1', // purple
      '#38a169', // success
      '#d69e2e', // warning
      '#e53e3e'  // danger
    ];
    
    if (index < colors.length) {
      return colors[index];
    }
    
    // Generate colors for larger datasets
    const baseColor = colors[index % colors.length];
    const lightenFactor = Math.floor(index / colors.length) * 15;
    
    // Simple lightening function
    return lightenColor(baseColor, lightenFactor);
  }
};

// Helper function to lighten a hex color
function lightenColor(hex, percent) {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  
  // Lighten
  r = Math.min(255, r + percent);
  g = Math.min(255, g + percent);
  b = Math.min(255, b + percent);
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default dataUtils;
