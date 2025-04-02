import React from 'react';

export default function Header({ filters, onFilterChange, onClearFilters }) {
  return (
    <header className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          {/* Logo and Title */}
          <div>
            <h1 className="text-2xl font-bold text-white">Contract Opportunities Explorer</h1>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full sm:w-64 px-4 py-2 rounded-md focus:outline-none"
                value={filters?.search || ''}
                onChange={(e) => onFilterChange('search', e.target.value)}
              />
              {filters?.search && (
                <button 
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  onClick={() => onFilterChange('search', '')}
                >
                  ✕
                </button>
              )}
            </div>
            
            <button 
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition-colors"
              onClick={onClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="mt-4 flex flex-wrap gap-2">
          <select 
            className="px-3 py-1 rounded-md text-sm bg-white"
            value={filters?.department || ''}
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="DEPT OF DEFENSE">Department of Defense</option>
            <option value="GENERAL SERVICES ADMINISTRATION">General Services Administration</option>
            <option value="VETERANS AFFAIRS">Veterans Affairs</option>
            <option value="HOMELAND SECURITY">Homeland Security</option>
          </select>
          
          <select 
            className="px-3 py-1 rounded-md text-sm bg-white"
            value={filters?.type || ''}
            onChange={(e) => onFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Solicitation">Solicitation</option>
            <option value="Award Notice">Award Notice</option>
            <option value="Special Notice">Special Notice</option>
            <option value="Sources Sought">Sources Sought</option>
          </select>
          
          <select 
            className="px-3 py-1 rounded-md text-sm bg-white"
            value={filters?.setAside || ''}
            onChange={(e) => onFilterChange('setAside', e.target.value)}
          >
            <option value="">All Set-Asides</option>
            <option value="Small Business">Small Business</option>
            <option value="8(a)">8(a)</option>
            <option value="HUBZone">HUBZone</option>
            <option value="SDVOSB">Service-Disabled Veteran-Owned</option>
            <option value="WOSB">Women-Owned</option>
          </select>
          
          <select 
            className="px-3 py-1 rounded-md text-sm bg-white"
            value={filters?.active || ''}
            onChange={(e) => onFilterChange('active', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Yes">Active Only</option>
            <option value="No">Inactive Only</option>
          </select>
        </div>
      </div>
    </header>
  );
}
