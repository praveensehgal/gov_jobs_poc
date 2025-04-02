import React from 'react';

export default function SetAsideChart({ data }) {
  if (!data || !data.setAsides) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Opportunities by Set-Aside</h3>
        <div className="h-64 bg-gray-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Loading set-aside data...</p>
        </div>
      </div>
    );
  }

  // Sort set-asides by count in descending order
  const sortedSetAsides = [...data.setAsides].sort((a, b) => b.count - a.count);
  
  // Calculate total for percentage
  const total = sortedSetAsides.reduce((sum, item) => sum + item.count, 0);

  // Donut chart visualization
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Opportunities by Set-Aside</h3>
      <div className="h-64 flex items-center justify-center">
        <div className="relative w-40 h-40">
          {/* Simple donut chart representation */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {sortedSetAsides.map((item, index, array) => {
              // Calculate the percentage and angles for the pie slice
              const percentage = (item.count / total) * 100;
              const previousPercentage = array
                .slice(0, index)
                .reduce((sum, prevItem) => sum + (prevItem.count / total) * 100, 0);
              
              // Convert percentages to angles for the SVG arc
              const startAngle = (previousPercentage / 100) * 360;
              const endAngle = ((previousPercentage + percentage) / 100) * 360;
              
              // Calculate the SVG arc path
              const x1 = 50 + 35 * Math.cos((startAngle - 90) * (Math.PI / 180));
              const y1 = 50 + 35 * Math.sin((startAngle - 90) * (Math.PI / 180));
              const x2 = 50 + 35 * Math.cos((endAngle - 90) * (Math.PI / 180));
              const y2 = 50 + 35 * Math.sin((endAngle - 90) * (Math.PI / 180));
              
              // Determine if the arc should be drawn as a large arc
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              // Generate a color based on index
              const colors = ['#1a365d', '#2c7a7b', '#dd6b20', '#6b46c1', '#38a169', '#d69e2e', '#e53e3e'];
              const color = colors[index % colors.length];
              
              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={color}
                />
              );
            })}
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>
        
        {/* Legend */}
        <div className="ml-8">
          {sortedSetAsides.slice(0, 5).map((item, index) => {
            const colors = ['#1a365d', '#2c7a7b', '#dd6b20', '#6b46c1', '#38a169', '#d69e2e', '#e53e3e'];
            const color = colors[index % colors.length];
            
            return (
              <div key={index} className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                <span className="text-sm">{item.name || 'None'}: {item.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
