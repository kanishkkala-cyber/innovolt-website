import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarWidget from '../components/CarWidget';
import LocationSearch from '../components/LocationSearch';
import CustomDropdown from '../components/CustomDropdown';
import RangeSlider from '../components/RangeSlider';
import apiService from '../services/api';

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Fixed at 12 items per page
  
  // Filter states
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedModels, setSelectedModels] = useState(['all']);
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 10000000 }); // Very wide initial range to show all
  const [yearRange, setYearRange] = useState({ min: 2000, max: new Date().getFullYear() + 1 }); // Very wide initial range to show all
  
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sort options for the dropdown
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'year-new', label: 'Year: Newest First' },
    { value: 'year-old', label: 'Year: Oldest First' },
    { value: 'km-low', label: 'Kilometers: Low to High' }
  ];

  // Dynamic filter options (will be populated from data)
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 100000, max: 350000 });
  const [yearRangeData, setYearRangeData] = useState({ min: 2022, max: 2024 });

  // Initialize filters from URL parameters
  useEffect(() => {
    const location = searchParams.get('location');
    const model = searchParams.get('model');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    if (location) {
      setSelectedLocation([location]); // Convert single location to array
    }
    
    if (model) {
      setSelectedModels([model]);
    }
    
    if (minPrice && maxPrice) {
      setBudgetRange({ 
        min: parseInt(minPrice), 
        max: parseInt(maxPrice) 
      });
    }
  }, [searchParams]);

  // Fetch cars from backend and populate filter options
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await apiService.getCars();
        console.log(`📊 [CATALOGUE] Received ${carsData.length} vehicles from API`);
        setCars(carsData);
        setFilteredCars(carsData);
        
        // Extract unique locations
        const locations = [...new Set(carsData.map(car => car.location.split(',')[0]))].sort();
        setAvailableLocations(locations);
        
        // Extract unique models
        const models = [...new Set(carsData.map(car => car.brand))].sort();
        setAvailableModels(models);
        
        // Extract price range from actual data
        const prices = carsData
          .map(car => parseInt(car.price.replace(/[₹,]/g, '')) || 0)
          .filter(price => price > 0);
        const minPrice = prices.length > 0 ? Math.min(...prices) : 100000;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 350000;
        
        // Extract year range from actual data
        const years = carsData
          .map(car => parseInt(car.year) || 0)
          .filter(year => year > 0 && !isNaN(year));
        const minYear = years.length > 0 ? Math.min(...years) : 2020;
        const maxYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();
        
        setPriceRange({ min: minPrice, max: maxPrice });
        setBudgetRange({ min: minPrice, max: maxPrice });
        
        setYearRangeData({ min: minYear, max: maxYear });
        setYearRange({ min: minYear, max: maxYear });
        
        console.log(`📊 [CATALOGUE] Auto-detected ranges - Price: ₹${minPrice} to ₹${maxPrice}, Year: ${minYear} to ${maxYear}`);
        
      } catch (err) {
        setError('Failed to load cars. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filters
  useEffect(() => {
    // Show loading with smooth transition
    setFilterLoading(true);
    
    // Store timeout IDs for cleanup
    let timeoutId2, timeoutId3;
    
    // Add a small delay to ensure smooth transition
    const timeoutId1 = setTimeout(() => {
      let filtered = [...cars];

      // Location filter
      if (selectedLocation.length > 0) {
        filtered = filtered.filter((car) => 
          selectedLocation.some(loc => car.location.includes(loc))
        );
      }

      // Model filter
      if (!selectedModels.includes('all')) {
        filtered = filtered.filter((car) => selectedModels.includes(car.brand));
      }

      // Budget filter
      const beforeBudgetFilter = filtered.length;
      filtered = filtered.filter((car) => {
        const price = parseInt(car.price.replace(/[₹,]/g, '')) || 0;
        // Include vehicles with price 0 or invalid (missing price data)
        if (price === 0 || !car.price || car.price.trim() === '') {
          return true; // Include vehicles with missing/invalid prices
        }
        return price >= budgetRange.min && price <= budgetRange.max;
      });
      if (beforeBudgetFilter !== filtered.length) {
        console.log(`💰 [FILTER] Budget filter (₹${budgetRange.min}-₹${budgetRange.max}) filtered out ${beforeBudgetFilter - filtered.length} vehicles`);
      }

      // Year filter
      const beforeYearFilter = filtered.length;
      filtered = filtered.filter((car) => {
        const year = parseInt(car.year) || 0;
        // Handle "N/A" years - include them or exclude them?
        if (car.year === 'N/A' || isNaN(year) || year === 0) {
          return true; // Include vehicles with invalid/missing years
        }
        return year >= yearRange.min && year <= yearRange.max;
      });
      if (beforeYearFilter !== filtered.length) {
        console.log(`📅 [FILTER] Year filter (${yearRange.min}-${yearRange.max}) filtered out ${beforeYearFilter - filtered.length} vehicles`);
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

      console.log(`✅ [CATALOGUE] Final filtered count: ${filtered.length} vehicles (from ${cars.length} total)`);
      
      // Update filtered cars with a slight delay for smooth transition
      timeoutId2 = setTimeout(() => {
        setFilteredCars(filtered);
        setCurrentPage(1); // Reset to first page when filters change
        
        // Hide loading after results are updated
        timeoutId3 = setTimeout(() => {
          setFilterLoading(false);
        }, 200);
      }, 150);
    }, 50); // Small delay before starting filter to show loading state
    
    return () => {
      clearTimeout(timeoutId1);
      if (timeoutId2) clearTimeout(timeoutId2);
      if (timeoutId3) clearTimeout(timeoutId3);
    };
  }, [cars, selectedLocation, selectedModels, budgetRange, yearRange, sortBy]);

  const handleModelChange = (model) => {
    if (model === 'all') {
      setSelectedModels(['all']);
    } else {
      setSelectedModels((prev) => {
        const newModels = prev.filter((m) => m !== 'all');
        if (newModels.includes(model)) {
          const updated = newModels.filter((m) => m !== model);
          return updated.length === 0 ? ['all'] : updated;
        } else {
          return [...newModels, model];
        }
      });
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleClearFilters = () => {
    setSelectedLocation([]);
    setSelectedModels(['all']);
    setBudgetRange({ min: 100000, max: 350000 });
    setYearRange({ min: 2022, max: 2024 });
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

          {/* Budget Filter */}
          <div className="filter-section">
            <RangeSlider
              min={priceRange.min}
              max={priceRange.max}
              value={budgetRange}
              onChange={setBudgetRange}
              label="Budget"
              formatValue={(value) => `₹${(value / 100000).toFixed(1)}L`}
              step={10000}
            />
          </div>

          {/* Location Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Location</h4>
            <LocationSearch
              availableLocations={availableLocations}
              selectedLocations={selectedLocation}
              onLocationChange={handleLocationChange}
              placeholder="Search for cities..."
            />
          </div>

          {/* Model Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Model</h4>
            <div className="filter-options">
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="model-all"
                  checked={selectedModels.includes('all')}
                  onChange={() => handleModelChange('all')}
                />
                <label htmlFor="model-all">All Models</label>
              </div>
              {availableModels.map((model) => (
                <div key={model} className="filter-option">
                  <input
                    type="checkbox"
                    id={`model-${model}`}
                    checked={selectedModels.includes(model)}
                    onChange={() => handleModelChange(model)}
                  />
                  <label htmlFor={`model-${model}`}>{model}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Year Filter */}
          <div className="filter-section">
            <RangeSlider
              min={yearRangeData.min}
              max={yearRangeData.max}
              value={yearRange}
              onChange={setYearRange}
              label="Registration Year"
              formatValue={(value) => value.toString()}
              step={1}
            />
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
              <CustomDropdown
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Select sorting option"
              />
            </div>
          </div>

          {/* Cars Grid */}
          <div className="cars-grid" style={{ position: 'relative' }}>
            <div 
              className={`filter-loading-overlay ${filterLoading ? 'active' : ''}`}
            >
              <div className="loading-spinner" style={{ 
                borderWidth: '4px',
                borderColor: '#f3f4f6',
                borderTopColor: '#EF4444',
                animationDuration: '0.8s'
              }}></div>
              <p style={{ 
                marginTop: '16px',
                color: '#6b7280',
                fontSize: '14px',
                fontWeight: 500
              }}>Loading vehicles...</p>
            </div>
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
              currentCars.map((car) => (
                <CarWidget key={car.id} car={car} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {filteredCars.length > 0 && (
            <div className="pagination-container">
              {/* Pagination controls */}
              <div className="pagination-controls">
                <button 
                  className="pagination-btn prev-btn" 
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                  Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`page-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 || 
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="page-ellipsis">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button 
                  className="pagination-btn next-btn" 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Catalogue;

