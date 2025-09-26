// Global initialization flag
let isInitialized = false;
let initializationAttempts = 0;
const maxInitializationAttempts = 20;

// Function to check if core elements are present
function checkElementsReady() {
    // Check for core elements that should be present on most pages
    const coreElements = [
        'searchInput', 'searchPlaceholder', 'rotatingText'
    ];
    
    let coreReady = true;
    coreElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.log(`Core element not found: ${id}`);
            coreReady = false;
        }
    });
    
    // If core elements are ready, we can proceed
    // Other elements like buttons may not be present on all pages
    return coreReady;
}

// Main initialization function
function initializeAllFunctionality() {
    if (isInitialized) {
        return;
    }
    
    // Check if elements are ready
    initializationAttempts++;
    if (!checkElementsReady()) {
        if (initializationAttempts < maxInitializationAttempts) {
            console.log(`Core elements not ready, retrying in 200ms... (attempt ${initializationAttempts}/${maxInitializationAttempts})`);
            setTimeout(initializeAllFunctionality, 200);
            return;
        } else {
            console.log('Max initialization attempts reached, proceeding anyway...');
        }
    }
    
    isInitialized = true;
    
    // Immediately load and display counts from localStorage
    loadAndDisplayCounts();
    
    // Function to get car data from HTML elements
    function getCarDataFromHTML(carId) {
        const carWidget = document.querySelector(`[data-car-id="${carId}"]`).closest('.car-widget');
        if (!carWidget) return {};
        
        const title = carWidget.querySelector('.car-title')?.textContent || '';
        const image = carWidget.querySelector('.car-image')?.src || '';
        const price = carWidget.querySelector('.current-price')?.textContent || '';
        const emi = carWidget.querySelector('.emi-text')?.textContent || '';
        const kilometers = carWidget.querySelector('.spec-tag')?.textContent || '';
        const owners = carWidget.querySelectorAll('.spec-tag')[1]?.textContent || '';
        const location = carWidget.querySelector('.car-location span')?.textContent || '';
        
        // Enhanced car data with realistic values based on car ID
        const carData = {
            title: title,
            image: image,
            price: price,
            emi: emi,
            kilometers: kilometers,
            owners: owners,
            location: location
        };
        
        // Add realistic data based on car ID if HTML data is missing
        if (!title || !price) {
            const enhancedData = getEnhancedCarData(carId);
            return { ...carData, ...enhancedData };
        }
        
        return carData;
    }
    
    // Enhanced car data for better comparison
    function getEnhancedCarData(carId) {
        const carDataMap = {
            '2': {
                title: '2023 Euler HiLoad',
                price: '₹3,85,000',
                owners: '1st Owner',
                kilometers: '15,800 km',
                age: '1 year',
                registrationYear: '2023',
                location: 'Bangalore'
            },
            '3': {
                title: 'Mahindra Treo Zor',
                price: '₹2,80,000',
                owners: '2nd Owner',
                kilometers: '30,000 km',
                age: '3 years',
                registrationYear: '2021',
                location: 'Hyderabad'
            },
            '4': {
                title: 'Mahindra Treo Plus',
                price: '₹3,20,000',
                owners: '1st Owner',
                kilometers: '15,000 km',
                age: '1 year',
                registrationYear: '2023',
                location: 'Delhi'
            }
        };
        
        return carDataMap[carId] || {
            title: `EV Vehicle ${carId}`,
            price: '₹2,50,000',
            owners: '1st Owner',
            kilometers: '25,000 km',
            age: '2 years',
            registrationYear: '2022',
            location: 'Bangalore'
        };
    }
    
    // Make car data function globally accessible
    window.getCarDataFromHTML = getCarDataFromHTML;
    
    // Initialize all functionality
    initializeMenu();
    initializeCallWidget();
    initializeLocationPopup();
    initializeSearchBar();
    initializeCarWidgetLinks();
    
    // Retry search bar initialization after a delay (in case header loads late)
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        const rotatingText = document.getElementById('rotatingText');
        if (searchInput && rotatingText && !window.searchBarInterval) {
            console.log('Retrying search bar initialization...');
            initializeSearchBar();
        }
    }, 2000);
    initializeLocationSlider();
    initializeFAQ();
    initializeCarWidgets();
    initializeCarSlider();
    initializeCitiesSlider();
    initializeLogoClicks();
    initializeContactForm();
    initializeViewCarsButton();
    
    // Initialize header functionality
    initializeHeaderButtons();
}

// Initialize header buttons functionality
function initializeHeaderButtons() {
    console.log('Initializing header buttons...');
    
    // Liked button
    const likedBtn = document.getElementById('likedBtn');
    if (likedBtn) {
        console.log('Found liked button, adding event listener');
        likedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Liked button clicked!');
            if (typeof openLikedCarsPopup === 'function') {
                openLikedCarsPopup();
            } else {
                console.log('openLikedCarsPopup function not available');
            }
        });
    } else {
        console.log('Liked button not found - may not be available on this page');
    }
    
    // Compare button
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        console.log('Found compare button, adding event listener');
        compareBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Compare button clicked!');
            if (typeof openComparePopup === 'function') {
                openComparePopup();
            } else {
                console.log('openComparePopup function not available');
            }
        });
    } else {
        console.log('Compare button not found - may not be available on this page');
    }
    
    // Location button
    const locationBtn = document.getElementById('locationBtn');
    if (locationBtn) {
        console.log('Found location button, adding event listener');
        locationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Location button clicked!');
            if (typeof openLocationPopup === 'function') {
                openLocationPopup();
            } else {
                console.log('openLocationPopup function not available');
            }
        });
    } else {
        console.log('Location button not found - may not be available on this page');
    }
    
    // Call us button functionality is handled in initializeCallWidget()
}

// Function to immediately load and display counts from localStorage
function loadAndDisplayCounts() {
    // Load data from localStorage
    const likedCars = JSON.parse(localStorage.getItem('likedCars')) || [];
    const comparedCars = JSON.parse(localStorage.getItem('comparedCars')) || [];
    
    // Update count displays immediately
    const likedCountElement = document.querySelector('#likedBtn .action-count');
    if (likedCountElement) {
        likedCountElement.textContent = likedCars.length;
    }
    
    const compareCountElement = document.querySelector('#compareBtn .action-count');
    if (compareCountElement) {
        compareCountElement.textContent = comparedCars.length;
    }
    
    // Update heart button states
    likedCars.forEach(carId => {
        const heartBtn = document.querySelector(`[data-car-id="${carId}"]`);
        if (heartBtn) {
            heartBtn.classList.add('liked');
        }
    });
    
    // Update compare button states
    comparedCars.forEach(carId => {
        const compareBtn = document.querySelector(`[data-car-id="${carId}"]`);
        if (compareBtn) {
            compareBtn.classList.add('added');
        }
    });
}

    // Menu functionality
    function initializeMenu() {
        const menuBtn = document.getElementById('menuBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const slidingMenu = document.getElementById('slidingMenu');
        const menuClose = document.getElementById('menuClose');

        if (menuBtn && menuOverlay && slidingMenu && menuClose) {
            function openMenu() {
                menuOverlay.classList.add('active');
                slidingMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                menuOverlay.classList.remove('active');
                slidingMenu.classList.remove('active');
                document.body.style.overflow = '';
            }

            menuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });

            menuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });

            menuOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
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

    // Call widget functionality
    function initializeCallWidget(retryCount = 0) {
        console.log('Initializing call sliding popup...');
        
        const callBtn = document.getElementById('callBtn');
        const callPopup = document.getElementById('callSlidingPopup');
        const popupClose = document.getElementById('callPopupClose');
        const popupForm = document.getElementById('callPopupForm');
        const phoneInput = document.getElementById('callPhoneInput');
        const thankYou = document.getElementById('callThankYou');
        const popupContent = document.querySelector('.call-popup-content');

        console.log('Call popup elements:', {
            callBtn: !!callBtn,
            callPopup: !!callPopup,
            popupClose: !!popupClose,
            popupForm: !!popupForm,
            phoneInput: !!phoneInput,
            thankYou: !!thankYou,
            popupContent: !!popupContent
        });

        // If elements not found, retry after a short delay (max 5 retries)
        if ((!callBtn || !callPopup || !popupClose) && retryCount < 5) {
            console.log(`Call popup elements not found, retrying in 100ms... (attempt ${retryCount + 1}/5)`);
            setTimeout(() => {
                initializeCallWidget(retryCount + 1);
            }, 100);
            return;
        }

        // If still not found after retries, log error and return
        if (!callBtn || !callPopup || !popupClose) {
            console.error('Call popup elements not found after 5 retries:', {
                callBtn: !!callBtn,
                callPopup: !!callPopup,
                popupClose: !!popupClose
            });
            return;
        }

        if (callBtn && callPopup && popupClose) {
            let isPopupOpen = false;

            function toggleCallPopup() {
                isPopupOpen = !isPopupOpen;
                if (isPopupOpen) {
                    callPopup.style.display = 'block';
                    // Small delay to ensure display is set before animation
                    setTimeout(() => {
                        callPopup.classList.add('active');
                    }, 10);
                } else {
                    callPopup.classList.remove('active');
                    // Hide after animation completes
                    setTimeout(() => {
                        callPopup.style.display = 'none';
                    }, 300);
                }
                console.log('Call popup toggled:', isPopupOpen ? 'open' : 'closed');
            }
            
            // Make function globally accessible
            window.openCallWidget = toggleCallPopup;

            function closeCallPopup() {
                isPopupOpen = false;
                callPopup.classList.remove('active');
                // Hide after animation completes
                setTimeout(() => {
                    callPopup.style.display = 'none';
                }, 300);
                resetCallPopup();
            }

            function showThankYouMessage() {
                popupContent.style.display = 'none';
                thankYou.style.display = 'block';
                
                setTimeout(() => {
                    closeCallPopup();
                }, 3000);
            }

            function resetCallPopup() {
                popupContent.style.display = 'block';
                thankYou.style.display = 'none';
                if (popupForm) {
                    popupForm.reset();
                }
            }

            // Event listeners
            callBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Call button clicked!');
                toggleCallPopup();
            });

            popupClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeCallPopup();
            });

            // Close popup when clicking outside
            document.addEventListener('click', function(e) {
                if (isPopupOpen && !callPopup.contains(e.target) && !callBtn.contains(e.target)) {
                    closeCallPopup();
                }
            });

            if (popupForm) {
                popupForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const phoneNumber = phoneInput ? phoneInput.value.trim() : '';
                    
                    if (phoneNumber && phoneNumber.length === 10) {
                        console.log('Phone number submitted:', phoneNumber);
                        showThankYouMessage();
                    } else {
                        alert('Please enter a valid 10-digit phone number');
                    }
                });
            }

            console.log('Call sliding popup initialized successfully');
        } else {
            console.error('Call popup elements not found:', {
                callBtn: !!callBtn,
                callPopup: !!callPopup,
                popupClose: !!popupClose
            });
        }
    }

    // Location popup functionality
    function initializeLocationPopup() {
        const locationBtn = document.getElementById('locationBtn');
        const locationPopupOverlay = document.getElementById('locationPopupOverlay');
        const locationPopup = document.getElementById('locationPopup');
        const locationPopupClose = document.getElementById('locationPopupClose');
        const locationText = document.getElementById('locationText');


        if (locationBtn && locationPopupOverlay && locationPopup && locationPopupClose) {
            function openLocationPopup() {
                locationPopupOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            // Make function globally accessible
            window.openLocationPopup = openLocationPopup;

            function closeLocationPopup() {
                locationPopupOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            function selectCity(cityName) {
                if (locationText) {
                    locationText.textContent = cityName;
                }
                localStorage.setItem('selectedCity', cityName);
                closeLocationPopup();
            }

            locationBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openLocationPopup();
            });

            locationPopupClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeLocationPopup();
            });

            locationPopupOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeLocationPopup();
            });

            // City selection
            const cityItems = document.querySelectorAll('.city-item');
            cityItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const cityName = this.getAttribute('data-city');
                    selectCity(cityName);
                });
            });

            // Load saved city from localStorage
            const savedCity = localStorage.getItem('selectedCity');
            if (savedCity && locationText) {
                locationText.textContent = savedCity;
            }
        }
    }

    // Search bar functionality
    function initializeSearchBar() {
        console.log('Initializing search bar...');
        const searchInput = document.getElementById('searchInput');
        const searchPlaceholder = document.getElementById('searchPlaceholder');
        const rotatingText = document.getElementById('rotatingText');
        console.log('Search bar elements found:', !!searchInput, !!searchPlaceholder, !!rotatingText);

        if (searchInput && searchPlaceholder && rotatingText) {
            const words = ['location', 'price', 'model', 'company'];
            let currentIndex = 0;

            function updateRotatingText() {
                // Add slide out effect
                rotatingText.style.transform = 'translateY(-25px)';
                rotatingText.style.opacity = '0';
                
                setTimeout(() => {
                    // Change text
                    rotatingText.textContent = words[currentIndex];
                    currentIndex = (currentIndex + 1) % words.length;
                    
                    // Add slide in effect
                    rotatingText.style.transform = 'translateY(25px)';
                    rotatingText.style.opacity = '0';
                    
                    setTimeout(() => {
                        rotatingText.style.transform = 'translateY(0)';
                        rotatingText.style.opacity = '1';
                    }, 50);
                }, 200);
            }

            // Start rotation immediately
            updateRotatingText();
            const rotationInterval = setInterval(updateRotatingText, 2000);
            console.log('Search bar animation started!');
            
            // Store interval for cleanup
            window.searchBarInterval = rotationInterval;

            // Hide placeholder on focus
            searchInput.addEventListener('focus', function() {
                searchPlaceholder.style.opacity = '0';
            });

            // Show placeholder on blur if empty
            searchInput.addEventListener('blur', function() {
                if (this.value === '') {
                    searchPlaceholder.style.opacity = '1';
                }
            });

            // Search on Enter
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const searchTerm = this.value.trim();
                    if (searchTerm) {
                        console.log('Searching for:', searchTerm);
                        // Add search functionality here
                    }
                }
            });
        }
    }

    // Location slider functionality
    function initializeLocationSlider() {
        const locationsSlider = document.getElementById('locationsSlider');
        const prevBtn = document.getElementById('sliderPrev');
        const nextBtn = document.getElementById('sliderNext');

        if (locationsSlider && prevBtn && nextBtn) {
            let currentIndex = 0;
            const cards = locationsSlider.querySelectorAll('.location-card');
            const cardWidth = 280 + 24; // card width + gap

            function updateSliderButtons() {
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                nextBtn.style.opacity = currentIndex >= cards.length - 1 ? '0.5' : '1';
            }

            function slideLocations(direction) {
                if (direction === 'prev' && currentIndex > 0) {
                    currentIndex--;
                } else if (direction === 'next' && currentIndex < cards.length - 1) {
                    currentIndex++;
                }

                const translateX = -currentIndex * cardWidth;
                locationsSlider.style.transform = `translateX(${translateX}px)`;
                updateSliderButtons();
            }

            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                slideLocations('prev');
            });

            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                slideLocations('next');
            });

            updateSliderButtons();
        }
    }

    // FAQ functionality
    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            if (question && answer && icon) {
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.faq-icon');
                            if (otherAnswer && otherIcon) {
                                otherAnswer.style.maxHeight = '0';
                                otherIcon.style.transform = 'rotate(0deg)';
                            }
                        }
                    });

                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                        answer.style.maxHeight = '0';
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }

    // Global arrays to store liked and compared cars (with localStorage persistence)
    let likedCars = JSON.parse(localStorage.getItem('likedCars')) || [];
    let comparedCars = JSON.parse(localStorage.getItem('comparedCars')) || [];

    // Global toggle functions for like and compare
    window.toggleLike = function(carId) {
        const heartBtn = document.querySelector(`[data-car-id="${carId}"]`);
        if (!heartBtn) return;
        
        const isLiked = heartBtn.classList.contains('liked');
        
        if (isLiked) {
            heartBtn.classList.remove('liked');
            likedCars = likedCars.filter(id => id !== carId);
        } else {
            heartBtn.classList.add('liked');
            likedCars.push(carId);
        }
        
        localStorage.setItem('likedCars', JSON.stringify(likedCars));
        updateLikedCount();
        console.log('Updated liked cars:', likedCars);
    };

    window.toggleCompare = function(carId) {
        const compareBtn = document.querySelector(`[data-car-id="${carId}"]`);
        if (!compareBtn) return;
        
        const isAdded = compareBtn.classList.contains('added');
        
        if (isAdded) {
            compareBtn.classList.remove('added');
            comparedCars = comparedCars.filter(id => id !== carId);
        } else {
            if (comparedCars.length < 3) {
                compareBtn.classList.add('added');
                comparedCars.push(carId);
            } else {
                alert('You can compare maximum 3 cars');
                return;
            }
        }
        
        localStorage.setItem('comparedCars', JSON.stringify(comparedCars));
        updateCompareCount();
        console.log('Updated compared cars:', comparedCars);
    };

    // Car widgets functionality
    function initializeCarWidgets() {

        // Update liked count
        function updateLikedCount() {
            const likedCountElement = document.querySelector('#likedBtn .action-count');
            console.log('Updating liked count, element found:', !!likedCountElement, 'count:', likedCars.length);
            if (likedCountElement) {
                likedCountElement.textContent = likedCars.length;
                console.log('Updated liked count to:', likedCars.length);
            } else {
                console.log('Liked count element not found - trying alternative selector');
                // Try alternative selector
                const altElement = document.querySelector('.liked-btn .action-count');
                if (altElement) {
                    altElement.textContent = likedCars.length;
                    console.log('Updated liked count using alternative selector');
                }
            }
            localStorage.setItem('likedCars', JSON.stringify(likedCars));
        }

        // Update compare count
        function updateCompareCount() {
            const compareCountElement = document.querySelector('#compareBtn .action-count');
            if (compareCountElement) {
                compareCountElement.textContent = comparedCars.length;
                console.log('Updated compare count to:', comparedCars.length);
            } else {
                console.log('Compare count element not found - trying alternative selector');
                // Try alternative selector
                const altElement = document.querySelector('.compare-btn .action-count');
                if (altElement) {
                    altElement.textContent = comparedCars.length;
                    console.log('Updated compare count using alternative selector');
                }
            }
            localStorage.setItem('comparedCars', JSON.stringify(comparedCars));
        }

        // Initialize counts on page load with retry mechanism
        function initializeCounts() {
            const likedCountElement = document.querySelector('#likedBtn .action-count');
            const compareCountElement = document.querySelector('#compareBtn .action-count');
            
            if (likedCountElement && compareCountElement) {
                updateLikedCount();
                updateCompareCount();
            } else {
                // Try to update counts even if elements not found (for localStorage sync)
                updateLikedCount();
                updateCompareCount();
                console.log('Count elements not found - counts updated in localStorage only');
            }
        }
        
        initializeCounts();

        // Heart button functionality
        const heartButtons = document.querySelectorAll('.car-heart-btn');
        console.log('Found heart buttons:', heartButtons.length);
        heartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const carId = this.getAttribute('data-car-id');
                const isLiked = this.classList.contains('liked');
                
                console.log('Heart button clicked for car:', carId, 'isLiked:', isLiked);
                
                if (isLiked) {
                    this.classList.remove('liked');
                    likedCars = likedCars.filter(id => id !== carId);
                } else {
                    this.classList.add('liked');
                    likedCars.push(carId);
                }
                
                console.log('Updated liked cars:', likedCars);
                updateLikedCount();
            });
        });

        // Compare button functionality
        const compareButtons = document.querySelectorAll('.car-compare-btn');
        compareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const carId = this.getAttribute('data-car-id');
                const isAdded = this.classList.contains('added');
                
                if (isAdded) {
                    this.classList.remove('added');
                    comparedCars = comparedCars.filter(id => id !== carId);
                } else {
                    if (comparedCars.length < 3) {
                        this.classList.add('added');
                        comparedCars.push(carId);
                    } else {
                        alert('You can compare maximum 3 cars');
                        return;
                    }
                }
                
                updateCompareCount();
            });
        });

        // Liked cars popup functionality
        const likedBtn = document.getElementById('likedBtn');
        const likedCarsOverlay = document.getElementById('likedCarsOverlay');
        const likedCarsPopup = document.getElementById('likedCarsPopup');
        const likedCarsClose = document.getElementById('likedCarsClose');
        const likedCarsContainer = document.getElementById('likedCarsContainer');

        if (likedBtn && likedCarsOverlay && likedCarsPopup && likedCarsClose && likedCarsContainer) {
            function openLikedCarsPopup() {
                likedCarsOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                renderLikedCars();
            }
            
            // Make function globally accessible
            window.openLikedCarsPopup = openLikedCarsPopup;

            function closeLikedCarsPopup() {
                likedCarsOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            function renderLikedCars() {
                likedCarsContainer.innerHTML = '';
                
                if (likedCars.length === 0) {
                    likedCarsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No cars liked yet</p>';
                    return;
                }

                likedCars.forEach((carId, index) => {
                    // Find the original car widget
                    const originalWidget = document.querySelector(`[data-car-id="${carId}"]`).closest('.car-widget');
                    
                    if (originalWidget) {
                        // Clone the entire car widget
                        const clonedWidget = originalWidget.cloneNode(true);
                        
                        // Remove the original action buttons and add remove button
                        const clonedActions = clonedWidget.querySelector('.car-actions');
                        if (clonedActions) {
                            clonedActions.innerHTML = `
                                <button class="liked-car-heart-btn" data-car-id="${carId}">
                                    <i class="fas fa-heart"></i>
                                </button>
                            `;
                        }
                        
                        // Add remove functionality to the cloned widget
                        const removeBtn = clonedWidget.querySelector('.liked-car-heart-btn');
                        if (removeBtn) {
                            removeBtn.addEventListener('click', function(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFromLiked(carId);
                            });
                        }
                        
                        // Add to container
                        likedCarsContainer.appendChild(clonedWidget);
                    }
                });
            }

            function removeFromLiked(carId) {
                likedCars = likedCars.filter(id => id !== carId);
                updateLikedCount();
                renderLikedCars();
                
                // Update main heart button
                const mainHeartBtn = document.querySelector(`[data-car-id="${carId}"]`);
                if (mainHeartBtn) {
                    mainHeartBtn.classList.remove('liked');
                }
            }

            likedBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openLikedCarsPopup();
            });

            likedCarsClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeLikedCarsPopup();
            });

            likedCarsOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeLikedCarsPopup();
            });
        }

        // Compare cars popup functionality
        const compareBtn = document.getElementById('compareBtn');
        const comparePopupOverlay = document.getElementById('comparePopupOverlay');
        const comparePopup = document.getElementById('comparePopup');
        const comparePopupClose = document.getElementById('comparePopupClose');
        const compareVehiclesContainer = document.getElementById('compareVehiclesContainer');
        const compareNowBtn = document.getElementById('compareNowBtn');

        if (compareBtn && comparePopupOverlay && comparePopup && comparePopupClose && compareVehiclesContainer && compareNowBtn) {
            function openComparePopup() {
                comparePopupOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                renderCompareVehicles();
            }
            
            // Make function globally accessible
            window.openComparePopup = openComparePopup;
            
            // Comparison Results Popup functionality
            const comparisonResultsOverlay = document.getElementById('comparisonResultsOverlay');
            const comparisonResultsPopup = document.getElementById('comparisonResultsPopup');
            const comparisonResultsClose = document.getElementById('comparisonResultsClose');
            const comparisonTableContainer = document.getElementById('comparisonTableContainer');

            function openComparisonResultsPopup() {
                if (comparisonResultsOverlay && comparisonResultsPopup) {
                    comparisonResultsOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    renderComparisonTable();
                }
            }

            function closeComparisonResultsPopup() {
                if (comparisonResultsOverlay && comparisonResultsPopup) {
                    comparisonResultsOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            function renderComparisonTable() {
                if (!comparisonTableContainer) return;
                
                comparisonTableContainer.innerHTML = '';
                
                if (comparedCars.length < 2) {
                    comparisonTableContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Please select at least 2 cars to compare</p>';
                    return;
                }

                // Create comparison table
                const table = document.createElement('table');
                table.className = 'comparison-table';
                
                // Table header
                const headerRow = document.createElement('tr');
                headerRow.innerHTML = '<th>Parameters</th>';
                comparedCars.forEach(carId => {
                    const car = window.getCarDataFromHTML ? window.getCarDataFromHTML(carId) : {};
                    headerRow.innerHTML += `<th>${car.title || 'Car ' + carId}</th>`;
                });
                table.appendChild(headerRow);

                // Comparison parameters
                const parameters = [
                    { key: 'price', label: 'Price', getValue: (car) => car.price || '₹2,50,000' },
                    { key: 'owners', label: 'No. of Owners', getValue: (car) => car.owners || '1st Owner' },
                    { key: 'kilometers', label: 'Kilometers Driven', getValue: (car) => car.kilometers || '25,000 km' },
                    { key: 'age', label: 'Age of Car', getValue: (car) => car.age || getCarAge(car) },
                    { key: 'registration', label: 'Registration Date', getValue: (car) => car.registrationYear || getRegistrationDate(car) },
                    { key: 'location', label: 'Location', getValue: (car) => car.location || 'Bangalore' }
                ];

                // Add parameter rows
                parameters.forEach(param => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td class="parameter-label">${param.label}</td>`;
                    
                    comparedCars.forEach(carId => {
                        const car = window.getCarDataFromHTML ? window.getCarDataFromHTML(carId) : {};
                        const value = param.getValue(car);
                        row.innerHTML += `<td class="parameter-value">${value}</td>`;
                    });
                    
                    table.appendChild(row);
                });

                comparisonTableContainer.appendChild(table);
            }

            // Helper functions for car data
            function getCarAge(car) {
                // Extract age from car data or calculate from title
                if (car.title) {
                    const yearMatch = car.title.match(/(\d{4})/);
                    if (yearMatch) {
                        const carYear = parseInt(yearMatch[1]);
                        const currentYear = new Date().getFullYear();
                        return `${currentYear - carYear} years`;
                    }
                }
                return '2 years'; // Default
            }

            function getRegistrationDate(car) {
                // Extract registration date from car data
                if (car.title) {
                    const yearMatch = car.title.match(/(\d{4})/);
                    if (yearMatch) {
                        return yearMatch[1];
                    }
                }
                return '2022'; // Default
            }

            // Event listeners for comparison results popup
            if (comparisonResultsClose) {
                comparisonResultsClose.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeComparisonResultsPopup();
                });
            }

            if (comparisonResultsOverlay) {
                comparisonResultsOverlay.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeComparisonResultsPopup();
                });
            }

            // Make function globally accessible
            window.openComparisonResultsPopup = openComparisonResultsPopup;

            function closeComparePopup() {
                comparePopupOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            function renderCompareVehicles() {
                compareVehiclesContainer.innerHTML = '';
                
                if (comparedCars.length === 0) {
                    compareVehiclesContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No cars selected for comparison</p>';
                    compareNowBtn.disabled = true;
                    return;
                }

                comparedCars.forEach(carId => {
                    // Find the original car widget
                    const originalWidget = document.querySelector(`[data-car-id="${carId}"]`).closest('.car-widget');
                    
                    if (originalWidget) {
                        // Clone the entire car widget
                        const clonedWidget = originalWidget.cloneNode(true);
                        
                        // Remove the original action buttons and add remove button
                        const clonedActions = clonedWidget.querySelector('.car-actions');
                        if (clonedActions) {
                            clonedActions.innerHTML = `
                                <button class="compare-vehicle-remove" data-car-id="${carId}">
                                    <i class="fas fa-times"></i>
                                </button>
                            `;
                        }
                        
                        // Add remove functionality to the cloned widget
                        const removeBtn = clonedWidget.querySelector('.compare-vehicle-remove');
                        if (removeBtn) {
                            removeBtn.addEventListener('click', function(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                removeFromCompare(carId);
                            });
                        }
                        
                        // Add to container
                        compareVehiclesContainer.appendChild(clonedWidget);
                    }
                });

                compareNowBtn.disabled = comparedCars.length < 2;
            }

            function removeFromCompare(carId) {
                comparedCars = comparedCars.filter(id => id !== carId);
                updateCompareCount();
                renderCompareVehicles();
                
                // Update main compare button
                const mainCompareBtn = document.querySelector(`[data-car-id="${carId}"]`);
                if (mainCompareBtn) {
                    mainCompareBtn.classList.remove('added');
                }
            }

            compareBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openComparePopup();
            });

            comparePopupClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeComparePopup();
            });
            
            const comparePopupBack = document.getElementById('comparePopupBack');
            if (comparePopupBack) {
                comparePopupBack.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeComparePopup();
                });
            }

            comparePopupOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeComparePopup();
            });

            compareNowBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (comparedCars.length >= 2) {
                    openComparisonResultsPopup();
                    closeComparePopup();
                }
            });
        }
    }

    // Logo click functionality
    function initializeLogoClicks() {
        const logos = document.querySelectorAll('.logo, .footer-logo, .menu-logo, .menu-footer-logo');
        logos.forEach(logo => {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'index.html';
            });
        });
    }

    // Contact form functionality
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const phone = formData.get('phone');
                const message = formData.get('message');
                
                if (name && email && phone && message) {
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                } else {
                    alert('Please fill in all fields');
                }
            });
        }
    }

    // View Cars button functionality
    function initializeViewCarsButton() {
        const viewCarsBtn = document.getElementById('viewCarsBtn');
        if (viewCarsBtn) {
            viewCarsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const howItWorksSection = document.getElementById('how-it-works');
                if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Car Slider Functionality
    let currentSlide = 0;
    let totalSlides = 0;
    let slidesToShow = 3; // Default for desktop

    function initializeCarSlider() {
        const slider = document.getElementById('carSlider');
        const prevBtn = document.getElementById('carSliderPrev');
        const nextBtn = document.getElementById('carSliderNext');
        
        if (!slider || !prevBtn || !nextBtn) return;
        
        const carWidgets = slider.querySelectorAll('.car-widget');
        totalSlides = carWidgets.length;
        
        // Set initial state
        updateSlidesToShow();
        updateSliderPosition();
        updateSliderButtons();
        
        // Event listeners
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSliderPosition();
                updateSliderButtons();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const maxSlide = Math.max(0, totalSlides - slidesToShow);
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSliderPosition();
                updateSliderButtons();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            updateSlidesToShow();
            updateSliderPosition();
            updateSliderButtons();
        });
    }

    function updateSlidesToShow() {
        const width = window.innerWidth;
        if (width <= 480) {
            slidesToShow = 1;
        } else if (width <= 768) {
            slidesToShow = 2;
        } else if (width <= 1024) {
            slidesToShow = 3;
        } else {
            slidesToShow = 4;
        }
    }

    function updateSliderPosition() {
        const slider = document.getElementById('carSlider');
        if (!slider) return;
        
        const slideWidth = 320; // 300px width + 20px gap
        const translateX = -currentSlide * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;
    }

    function updateSliderButtons() {
        const prevBtn = document.getElementById('carSliderPrev');
        const nextBtn = document.getElementById('carSliderNext');
        
        if (!prevBtn || !nextBtn) return;
        
        const maxSlide = Math.max(0, totalSlides - slidesToShow);
        
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= maxSlide;
    }

    // Cities Slider Functionality
    let citiesCurrentSlide = 0;
    let citiesTotalSlides = 0;
    let citiesSlidesToShow = 5; // Default for desktop

    function initializeCitiesSlider() {
        const slider = document.getElementById('citiesSlider');
        const prevBtn = document.getElementById('citiesSliderPrev');
        const nextBtn = document.getElementById('citiesSliderNext');
        
        if (!slider || !prevBtn || !nextBtn) return;
        
        const cityCards = slider.querySelectorAll('.city-card');
        citiesTotalSlides = cityCards.length;
        
        // Set initial state
        updateCitiesSlidesToShow();
        updateCitiesSliderPosition();
        updateCitiesSliderButtons();
        
        // Event listeners
        prevBtn.addEventListener('click', () => {
            if (citiesCurrentSlide > 0) {
                citiesCurrentSlide--;
                updateCitiesSliderPosition();
                updateCitiesSliderButtons();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const maxSlide = Math.max(0, citiesTotalSlides - citiesSlidesToShow);
            if (citiesCurrentSlide < maxSlide) {
                citiesCurrentSlide++;
                updateCitiesSliderPosition();
                updateCitiesSliderButtons();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            updateCitiesSlidesToShow();
            updateCitiesSliderPosition();
            updateCitiesSliderButtons();
        });
    }

    function updateCitiesSlidesToShow() {
        const width = window.innerWidth;
        if (width <= 480) {
            citiesSlidesToShow = 1;
        } else if (width <= 768) {
            citiesSlidesToShow = 2;
        } else if (width <= 1024) {
            citiesSlidesToShow = 3;
        } else {
            citiesSlidesToShow = 5;
        }
    }

    function updateCitiesSliderPosition() {
        const slider = document.getElementById('citiesSlider');
        if (!slider) return;
        
        const slideWidth = 220; // 200px width + 20px gap
        const translateX = -citiesCurrentSlide * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;
    }

    function updateCitiesSliderButtons() {
        const prevBtn = document.getElementById('citiesSliderPrev');
        const nextBtn = document.getElementById('citiesSliderNext');
        
        if (!prevBtn || !nextBtn) return;
        
        const maxSlide = Math.max(0, citiesTotalSlides - citiesSlidesToShow);
        
        prevBtn.disabled = citiesCurrentSlide === 0;
        nextBtn.disabled = citiesCurrentSlide >= maxSlide;
    }

// Start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAllFunctionality();
});

// Also try when window loads (backup)
window.addEventListener('load', function() {
    if (!isInitialized) {
        initializeAllFunctionality();
    }
});

// Make functions globally accessible for all pages
window.initializeAllFunctionality = initializeAllFunctionality;
window.initializeHeaderButtons = initializeHeaderButtons;
window.initializeSearchBar = initializeSearchBar;
window.initializeCallWidget = initializeCallWidget;