import React from 'react';
import dataUtils from '../../utils/dataUtils';

export default function ValueDistributionChart({ data }) {
  if (!data || !data.valueRanges) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Opportunities by Value Range</h3>
        <div className="h-64 bg-gray-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Loading value distribution data...</p>
        </div>
      </div>
    );
  }

  // Sort value ranges by their minimum value
  const sortedRanges = [...data.valueRanges].sort((a, b) => {
    const aMin = parseFloat(a.range.split('-')[0].replace(/[^0-9.]/g, '')) || 0;
    const bMin = parseFloat(b.range.split('-')[0].replace(/[^0-9.]/g, '')) || 0;
    return aMin - bMin;
  });
  
  // Get the maximum count for scaling
  const maxCount = Math.max(...sortedRanges.map(range => range.count));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Opportunities by Value Range</h3>
      <div className="h-64 flex items-end justify-between px-4">
        {sortedRanges.map((range, index) => {
          const height = (range.count / maxCount) * 100;
          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-12 bg-accent rounded-t-sm" 
                style={{ height: `${height}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-top-left">
                {range.range}
              </div>
              <div className="text-xs font-medium mt-1">
                {range.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
