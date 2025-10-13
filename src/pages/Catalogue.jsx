import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarWidget from '../components/CarWidget';
import apiService from '../services/api';

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState(6);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState(['all']);
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize filters from URL parameters
  useEffect(() => {
    const location = searchParams.get('location');
    const brand = searchParams.get('brand');
    
    if (location) {
      setSelectedLocation(location);
    }
    if (brand) {
      setSelectedBrands([brand]);
    }
  }, [searchParams]);

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCars();
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (err) {
        setError('Failed to load cars. Please try again.');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...cars];

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter((car) => car.location === selectedLocation);
    }

    // Brand filter
    if (!selectedBrands.includes('all')) {
      filtered = filtered.filter((car) => selectedBrands.includes(car.brand));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => 
          parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''))
        );
        break;
      case 'price-high':
        filtered.sort((a, b) => 
          parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''))
        );
        break;
      case 'year-new':
        filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case 'year-old':
        filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        break;
      case 'km-low':
        filtered.sort((a, b) => 
          parseInt(a.kilometers.replace(/[km,]/g, '')) - parseInt(b.kilometers.replace(/[km,]/g, ''))
        );
        break;
      default:
        break;
    }

    setFilteredCars(filtered);
    setDisplayedCars(6); // Reset displayed cars when filters change
  }, [cars, selectedLocation, selectedBrands, sortBy]);

  const handleBrandChange = (brand) => {
    if (brand === 'all') {
      setSelectedBrands(['all']);
      setSearchParams(prev => {
        prev.delete('brand');
        return prev;
      });
    } else {
      setSelectedBrands((prev) => {
        const newBrands = prev.filter((b) => b !== 'all');
        if (newBrands.includes(brand)) {
          const updated = newBrands.filter((b) => b !== brand);
          return updated.length === 0 ? ['all'] : updated;
        } else {
          return [...newBrands, brand];
        }
      });
      setSearchParams(prev => {
        prev.set('brand', brand);
        return prev;
      });
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setSearchParams(prev => {
      if (location === 'all') {
        prev.delete('location');
      } else {
        prev.set('location', location);
      }
      return prev;
    });
  };

  const handleClearFilters = () => {
    setSelectedLocation('all');
    setSelectedBrands(['all']);
    setSearchParams({});
  };

  const handleLoadMore = () => {
    setDisplayedCars((prev) => prev + 6);
  };

  return (
    <main className="catalogue-main">
      <div className="catalogue-container">
        {/* Left Sidebar - Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear All
            </button>
          </div>

          {/* Location Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Location</h4>
            <div className="filter-options">
              {['all', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Lucknow', 'Kanpur', 'Chennai'].map((loc) => (
                <div key={loc} className="filter-option">
                  <input
                    type="radio"
                    id={`location-${loc}`}
                    name="location"
                    value={loc}
                    checked={selectedLocation === loc}
                    onChange={() => handleLocationChange(loc)}
                  />
                  <label htmlFor={`location-${loc}`}>
                    {loc === 'all' ? 'All Locations' : loc}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Brand</h4>
            <div className="filter-options">
              {['all', 'Piaggio E City Fx', 'Mahindra Treo Plus', 'Etrio', 'Euler', 'Montra Super Auto', 'Bajaj RE E TEC 9.0'].map((brand) => (
                <div key={brand} className="filter-option">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={`brand-${brand}`}>
                    {brand === 'all' ? 'All Brands' : brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="catalogue-content">
          {/* Results Header */}
          <div className="results-header">
            <div className="results-count">
              <h2>{filteredCars.length} Used 3W EVs Available</h2>
            </div>
            <div className="sort-options">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
                <option value="km-low">Kilometers: Low to High</option>
              </select>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="cars-grid">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading cars...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
                <button 
                  className="retry-btn" 
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="no-cars-container">
                <p>No cars found matching your criteria.</p>
                <button className="clear-filters-btn" onClick={handleClearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredCars.slice(0, displayedCars).map((car) => (
                <CarWidget key={car.id} car={car} />
              ))
            )}
          </div>

          {/* Load More Button */}
          {displayedCars < filteredCars.length && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More Cars
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Catalogue;

