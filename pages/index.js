import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import MetricsCards from '../components/dashboard/MetricsCards';
import DepartmentChart from '../components/dashboard/DepartmentChart';
import NoticeTypeChart from '../components/dashboard/NoticeTypeChart';
import SetAsideChart from '../components/dashboard/SetAsideChart';
import ValueDistributionChart from '../components/dashboard/ValueDistributionChart';
import GeoMap from '../components/dashboard/GeoMap';
import TimelineChart from '../components/dashboard/TimelineChart';
import OpportunitiesTable from '../components/dashboard/OpportunitiesTable';

export default function Home() {
  const [metrics, setMetrics] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    type: '',
    setAside: '',
    active: ''
  });

  // Fetch metrics data
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setError('Failed to load metrics data. Please try again later.');
      }
    };

    fetchMetrics();
  }, []);

  // Fetch geo data
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch('/api/geo');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Error fetching geo data:', error);
        setError('Failed to load geographical data. Please try again later.');
      }
    };

    fetchGeoData();
  }, []);

  // Fetch opportunities data with filters
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        // Build query string from filters
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
        
        const response = await fetch(`/api/opportunities?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOpportunities(data.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        setError('Failed to load opportunities data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      department: '',
      type: '',
      setAside: '',
      active: ''
    });
  };

  // Display error message if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Contract Opportunities Dashboard</title>
        <meta name="description" content="Dashboard for government contract opportunities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onClearFilters={handleClearFilters} 
      />

      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Metrics Cards */}
            <section className="mb-6">
              <MetricsCards data={metrics} />
            </section>
            
            {/* Charts - First Row */}
            <section className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DepartmentChart data={metrics} />
              <NoticeTypeChart data={metrics} />
              <SetAsideChart data={metrics} />
            </section>
            
            {/* Charts - Second Row */}
            <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValueDistributionChart data={metrics} />
              <TimelineChart data={metrics?.timeline} />
            </section>
            
            {/* Map */}
            <section className="mb-6">
              <GeoMap data={geoData} />
            </section>
            
            {/* Opportunities Table */}
            <section className="mb-6">
              <OpportunitiesTable data={opportunities} loading={loading} />
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
