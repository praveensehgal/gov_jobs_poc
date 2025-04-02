import React from 'react';

export default function TimelineChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Opportunities Timeline</h3>
        <div className="h-64 bg-gray-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Loading timeline data...</p>
        </div>
      </div>
    );
  }

  // Sort data by month
  const sortedData = [...data].sort((a, b) => a.month.localeCompare(b.month));
  
  // Get the max count for scaling
  const maxCount = Math.max(...sortedData.map(item => item.count));
  
  // Format month labels
  const formatMonth = (monthStr) => {
    try {
      const [year, month] = monthStr.split('-');
      return `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(month) - 1]} ${year}`;
    } catch (e) {
      return monthStr;
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Opportunities Timeline</h3>
      <div className="h-64 px-4">
        <div className="relative h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
            <div>{maxCount}</div>
            <div>{Math.floor(maxCount * 0.75)}</div>
            <div>{Math.floor(maxCount * 0.5)}</div>
            <div>{Math.floor(maxCount * 0.25)}</div>
            <div>0</div>
          </div>
          
          {/* Chart area */}
          <div className="ml-12 h-full flex items-end">
            <div className="w-full flex items-end justify-between">
              {sortedData.map((item, index) => {
                const height = (item.count / maxCount) * 100;
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-secondary rounded-t-sm" 
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-top-left">
                      {formatMonth(item.month)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
