// Catalogue Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample car data
    const carData = [
        {
            id: 1,
            title: "2022 Piaggio Ape E City FX",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmMDAwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaWFnZ2lvPC90ZXh0Pjwvc3ZnPg==",
            kilometers: "15,000 km",
            owners: "1st Owner",
            price: "₹2,85,000",
            emi: "₹4,500",
            location: "Bangalore",
            brand: "Piaggio E City Fx",
            year: "2022"
        },
        {
            id: 2,
            title: "2021 Mahindra Treo Plus",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwZmYwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NYWhpbmRyYTwvdGV4dD48L3N2Zz4=",
            kilometers: "25,000 km",
            owners: "1st Owner",
            price: "₹3,20,000",
            emi: "₹5,200",
            location: "Delhi",
            brand: "Mahindra Treo Plus",
            year: "2021"
        },
        {
            id: 3,
            title: "2023 Etrio Turito",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "8,500 km",
            owners: "1st Owner",
            price: "₹4,15,000",
            emi: "₹6,800",
            location: "Hyderabad",
            brand: "Etrio",
            year: "2023"
        },
        {
            id: 4,
            title: "2022 Euler HiLoad EV",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "18,000 km",
            owners: "1st Owner",
            price: "₹3,75,000",
            emi: "₹6,200",
            location: "Pune",
            brand: "Euler",
            year: "2022"
        },
        {
            id: 5,
            title: "2021 Montra Super Auto",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "22,000 km",
            owners: "2nd Owner",
            price: "₹2,95,000",
            emi: "₹4,800",
            location: "Lucknow",
            brand: "Montra Super Auto",
            year: "2021"
        },
        {
            id: 6,
            title: "2023 Bajaj RE E TEC 9.0",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "12,000 km",
            owners: "1st Owner",
            price: "₹3,45,000",
            emi: "₹5,700",
            location: "Kanpur",
            brand: "Bajaj RE E TEC 9.0",
            year: "2023"
        },
        {
            id: 7,
            title: "2022 Piaggio Ape E City FX",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmMDAwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaWFnZ2lvPC90ZXh0Pjwvc3ZnPg==",
            kilometers: "20,000 km",
            owners: "1st Owner",
            price: "₹2,65,000",
            emi: "₹4,200",
            location: "Chennai",
            brand: "Piaggio E City Fx",
            year: "2022"
        },
        {
            id: 8,
            title: "2021 Mahindra Treo Plus",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwZmYwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NYWhpbmRyYTwvdGV4dD48L3N2Zz4=",
            kilometers: "30,000 km",
            owners: "2nd Owner",
            price: "₹2,85,000",
            emi: "₹4,600",
            location: "Bangalore",
            brand: "Mahindra Treo Plus",
            year: "2021"
        },
        {
            id: 9,
            title: "2023 Etrio Turito",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "5,000 km",
            owners: "1st Owner",
            price: "₹4,35,000",
            emi: "₹7,200",
            location: "Delhi",
            brand: "Etrio",
            year: "2023"
        },
        {
            id: 10,
            title: "2022 Euler HiLoad EV",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "16,000 km",
            owners: "1st Owner",
            price: "₹3,85,000",
            emi: "₹6,400",
            location: "Hyderabad",
            brand: "Euler",
            year: "2022"
        },
        {
            id: 11,
            title: "2021 Montra Super Auto",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "28,000 km",
            owners: "2nd Owner",
            price: "₹2,75,000",
            emi: "₹4,500",
            location: "Pune",
            brand: "Montra Super Auto",
            year: "2021"
        },
        {
            id: 12,
            title: "2023 Bajaj RE E TEC 9.0",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMDBmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdWxlci9FdHJpbzwvdGV4dD48L3N2Zz4=",
            kilometers: "9,000 km",
            owners: "1st Owner",
            price: "₹3,55,000",
            emi: "₹5,900",
            location: "Lucknow",
            brand: "Bajaj RE E TEC 9.0",
            year: "2023"
        }
    ];

    let filteredCars = [...carData];
    let displayedCars = 6;
    let currentSort = 'relevance';

    // Initialize catalogue
    function initializeCatalogue() {
        renderCars();
        setupFilters();
        setupSorting();
        setupLoadMore();
    }

    // Render cars based on current filters
    function renderCars() {
        const carsGrid = document.getElementById('carsGrid');
        const resultsCount = document.getElementById('results-count');
        
        if (!carsGrid) return;

        // Clear existing cars
        carsGrid.innerHTML = '';

        // Get cars to display
        const carsToShow = filteredCars.slice(0, displayedCars);

        // Update results count
        resultsCount.textContent = `${filteredCars.length} Used 3W EVs Available`;

        // Render each car
        carsToShow.forEach(car => {
            const carWidget = createCarWidget(car);
            carsGrid.appendChild(carWidget);
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = displayedCars < filteredCars.length ? 'block' : 'none';
        }
    }

    // Create car widget HTML
    function createCarWidget(car) {
        const widget = document.createElement('div');
        widget.className = 'car-widget';
        widget.innerHTML = `
            <div class="car-image-container">
                <img src="${car.image}" alt="${car.title}" class="car-image">
                <div class="car-actions">
                    <button class="car-heart-btn" type="button" data-car-id="${car.id}">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="car-compare-btn" type="button" data-car-id="${car.id}">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                </div>
                <div class="car-badge">
                    <span class="badge-text">INNOVOLT</span>
                    <span class="badge-premium">PREMIUM</span>
                </div>
            </div>
            <div class="car-details">
                <h3 class="car-title">${car.title}</h3>
                <div class="car-specs">
                    <span class="spec-tag">${car.kilometers}</span>
                    <span class="spec-tag">${car.owners}</span>
                </div>
                <div class="car-pricing">
                    <span class="current-price">${car.price}</span>
                    <span class="emi-text">EMI ${car.emi}</span>
                </div>
                <div class="car-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${car.location}</span>
                </div>
            </div>
        `;
        
        // Add event listeners for the buttons
        const heartBtn = widget.querySelector('.car-heart-btn');
        const compareBtn = widget.querySelector('.car-compare-btn');
        
        if (heartBtn) {
            heartBtn.addEventListener('click', function() {
                toggleLike(car.id);
            });
        }
        
        if (compareBtn) {
            compareBtn.addEventListener('click', function() {
                toggleCompare(car.id);
            });
        }
        
        return widget;
    }

    // Setup filter functionality
    function setupFilters() {
        const locationInputs = document.querySelectorAll('input[name="location"]');
        const brandInputs = document.querySelectorAll('input[name="brand"]');
        const clearFiltersBtn = document.getElementById('clearFilters');

        // Location filter
        locationInputs.forEach(input => {
            input.addEventListener('change', function() {
                applyFilters();
            });
        });

        // Brand filter
        brandInputs.forEach(input => {
            input.addEventListener('change', function() {
                applyFilters();
            });
        });

        // Clear filters
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                locationInputs.forEach(input => {
                    if (input.value === 'all') input.checked = true;
                    else input.checked = false;
                });
                brandInputs.forEach(input => {
                    if (input.value === 'all') input.checked = true;
                    else input.checked = false;
                });
                applyFilters();
            });
        }
    }

    // Apply filters
    function applyFilters() {
        const selectedLocation = document.querySelector('input[name="location"]:checked').value;
        const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
            .map(input => input.value);

        filteredCars = carData.filter(car => {
            const locationMatch = selectedLocation === 'all' || car.location === selectedLocation;
            const brandMatch = selectedBrands.includes('all') || selectedBrands.includes(car.brand);
            return locationMatch && brandMatch;
        });

        displayedCars = 6;
        renderCars();
    }


    // Setup sorting
    function setupSorting() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                currentSort = this.value;
                sortCars();
                renderCars();
            });
        }
    }

    // Sort cars
    function sortCars() {
        switch (currentSort) {
            case 'price-low':
                filteredCars.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, '')));
                break;
            case 'price-high':
                filteredCars.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, '')));
                break;
            case 'year-new':
                filteredCars.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                break;
            case 'year-old':
                filteredCars.sort((a, b) => parseInt(a.year) - parseInt(b.year));
                break;
            case 'km-low':
                filteredCars.sort((a, b) => parseInt(a.kilometers.replace(/[km,]/g, '')) - parseInt(b.kilometers.replace(/[km,]/g, '')));
                break;
            default:
                // Keep original order for relevance
                break;
        }
    }

    // Setup load more
    function setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                displayedCars += 6;
                renderCars();
            });
        }
    }

    // Toggle like functionality
    function toggleLike(carId) {
        // Use the global function from script.js
        if (typeof window.toggleLike === 'function') {
            window.toggleLike(carId);
        } else {
            console.log('toggleLike function not available yet');
        }
    }

    // Toggle compare functionality
    function toggleCompare(carId) {
        // Use the global function from script.js
        if (typeof window.toggleCompare === 'function') {
            window.toggleCompare(carId);
        } else {
            console.log('toggleCompare function not available yet');
        }
    }

    // Initialize car widget links
    function initializeCarWidgetLinks() {
        console.log('Initializing car widget links...');
        
        // Add click listeners to all car widgets
        const carWidgets = document.querySelectorAll('.car-widget');
        carWidgets.forEach((widget, index) => {
            // Make the entire widget clickable (except for action buttons)
            widget.style.cursor = 'pointer';
            
            widget.addEventListener('click', (e) => {
                // Don't navigate if clicking on action buttons
                if (e.target.closest('.car-actions') || e.target.closest('.car-heart-btn') || e.target.closest('.car-compare-btn')) {
                    return;
                }
                
                // Get vehicle data from the widget
                const titleElement = widget.querySelector('.car-title');
                const yearElement = widget.querySelector('.car-year');
                const kmElement = widget.querySelector('.car-km');
                const locationElement = widget.querySelector('.car-location');
                const priceElement = widget.querySelector('.car-price');
                const emiElement = widget.querySelector('.car-emi');
                
                if (titleElement) {
                    const vehicleTitle = titleElement.textContent.trim();
                    const vehicleYear = yearElement ? yearElement.textContent.trim() : '2022';
                    const vehicleKm = kmElement ? kmElement.textContent.trim() : '15,000 km';
                    const vehicleLocation = locationElement ? locationElement.textContent.trim() : 'Bangalore';
                    const vehiclePrice = priceElement ? priceElement.textContent.trim() : '₹2,85,000';
                    const vehicleEmi = emiElement ? emiElement.textContent.trim() : '₹4,500';
                    
                    // Store vehicle data in localStorage for the vehicle page
                    const vehicleData = {
                        id: index + 1,
                        title: vehicleTitle,
                        year: vehicleYear,
                        model: vehicleTitle,
                        km: vehicleKm,
                        location: vehicleLocation,
                        price: vehiclePrice,
                        emi: vehicleEmi,
                        images: [
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNGRjAwMDAiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMwMEE2RjYiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMxMEI5ODEiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNGRjYzNDciLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM4QjVDQjYiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+"
                        ]
                    };
                    
                    localStorage.setItem('currentVehicleData', JSON.stringify(vehicleData));
                    
                    // Navigate to vehicle page
                    window.location.href = `vehicle.html?id=${vehicleData.id}`;
                }
            });
        });
        
        console.log(`Initialized ${carWidgets.length} car widget links`);
    }

    // Initialize when page loads
    initializeCatalogue();
    initializeCarWidgetLinks();
});
