import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarWidget from '../components/CarWidget';
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
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedModels, setSelectedModels] = useState(['all']);
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 1000000 });
  const [yearRange, setYearRange] = useState({ min: 2020, max: 2024 });
  
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(true);
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
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [yearRangeData, setYearRangeData] = useState({ min: 2020, max: 2024 });

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

  // Fetch cars from backend and populate filter options
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await apiService.getCars();
        setCars(carsData);
        setFilteredCars(carsData);
        
        // Extract unique locations
        const locations = [...new Set(carsData.map(car => car.location.split(',')[0]))].sort();
        setAvailableLocations(locations);
        
        // Extract unique models
        const models = [...new Set(carsData.map(car => car.brand))].sort();
        setAvailableModels(models);
        
        // Extract price range
        const prices = carsData.map(car => {
          const priceStr = car.price.replace(/[₹,]/g, '');
          return parseInt(priceStr) || 0;
        });
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange({ min: minPrice, max: maxPrice });
        setBudgetRange({ min: minPrice, max: maxPrice });
        
        // Extract year range
        const years = carsData.map(car => parseInt(car.year)).filter(year => !isNaN(year));
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        setYearRangeData({ min: minYear, max: maxYear });
        setYearRange({ min: minYear, max: maxYear });
        
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
      filtered = filtered.filter((car) => car.location.includes(selectedLocation));
    }

    // Model filter
    if (!selectedModels.includes('all')) {
      filtered = filtered.filter((car) => selectedModels.includes(car.brand));
    }

    // Budget filter
    filtered = filtered.filter((car) => {
      const price = parseInt(car.price.replace(/[₹,]/g, '')) || 0;
      return price >= budgetRange.min && price <= budgetRange.max;
    });

    // Year filter
    filtered = filtered.filter((car) => {
      const year = parseInt(car.year) || 0;
      return year >= yearRange.min && year <= yearRange.max;
    });

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
    setCurrentPage(1); // Reset to first page when filters change
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
    setSelectedLocation('all');
    setSelectedModels(['all']);
    setBudgetRange({ min: priceRange.min, max: priceRange.max });
    setYearRange({ min: yearRangeData.min, max: yearRangeData.max });
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
              <CustomDropdown
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Select sorting option"
              />
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

