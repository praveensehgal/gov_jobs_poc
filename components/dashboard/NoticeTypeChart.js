import React from 'react';

export default function NoticeTypeChart({ data }) {
  if (!data || !data.noticeTypes) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Opportunities by Notice Type</h3>
        <div className="h-64 bg-gray-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Loading notice type data...</p>
        </div>
      </div>
    );
  }

  // Sort notice types by count in descending order
  const sortedTypes = [...data.noticeTypes].sort((a, b) => b.count - a.count);
  
  // Calculate total for percentage
  const total = sortedTypes.reduce((sum, type) => sum + type.count, 0);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Opportunities by Notice Type</h3>
      <div className="h-64 flex items-center">
        <div className="w-full">
          {/* Horizontal Bar Chart */}
          {sortedTypes.map((type, index) => {
            const percentage = (type.count / total) * 100;
            return (
              <div key={index} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{type.name}</span>
                  <span className="font-medium">{type.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-secondary h-2.5 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
