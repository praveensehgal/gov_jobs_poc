import React from 'react';

export default function DepartmentChart({ data }) {
  if (!data || !data.departments) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Opportunities by Department</h3>
        <div className="h-64 bg-gray-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Loading department data...</p>
        </div>
      </div>
    );
  }

  // Sort departments by count in descending order
  const sortedDepartments = [...data.departments].sort((a, b) => b.count - a.count);
  
  // Get top 5 departments
  const topDepartments = sortedDepartments.slice(0, 5);
  
  // Calculate total for percentage
  const total = topDepartments.reduce((sum, dept) => sum + dept.count, 0);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Opportunities by Department</h3>
      <div className="space-y-4">
        {topDepartments.map((dept, index) => {
          const percentage = Math.round((dept.count / total) * 100);
          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate" title={dept.name}>{dept.name}</span>
                <span className="font-medium">{dept.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
