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
    
    // Apply filters if provided
    let filteredData = [...records];
    const { query } = req;
    
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredData = filteredData.filter(item => 
        (item.Title && item.Title.toLowerCase().includes(searchTerm)) ||
        (item['Department/Ind.Agency'] && item['Department/Ind.Agency'].toLowerCase().includes(searchTerm)) ||
        (item.Description && item.Description.toLowerCase().includes(searchTerm))
      );
    }
    
    if (query.department) {
      filteredData = filteredData.filter(item => 
        item['Department/Ind.Agency'] && item['Department/Ind.Agency'].includes(query.department)
      );
    }
    
    if (query.type) {
      filteredData = filteredData.filter(item => 
        item.Type && item.Type === query.type
      );
    }
    
    if (query.setAside) {
      filteredData = filteredData.filter(item => 
        item['Set-Aside'] && item['Set-Aside'].includes(query.setAside)
      );
    }
    
    if (query.active) {
      filteredData = filteredData.filter(item => 
        item.Active === query.active
      );
    }
    
    // Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Return the data
    res.status(200).json({
      total: filteredData.length,
      page,
      limit,
      data: paginatedData
    });
  } catch (error) {
    console.error('Error processing opportunities:', error);
    res.status(500).json({ error: 'Failed to fetch opportunities data' });
  }
}
