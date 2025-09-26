// Vehicle Detail Page JavaScript

// Vehicle data - this would normally come from a database or API
const vehicleData = {
    id: 1,
    title: "2022 Piaggio Ape E City FX",
    images: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNGRjAwMDAiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMwMEE2RjYiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMxMEI5ODEiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNGRjYzNDciLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+",
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM4QjVDQjYiLz4KPHN2ZyB4PSIxNjAiIHk9IjExMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE5IDdIMTdWNUgxNVY3SDEzVjlIMTVWMTFIMTdWOUgxOVY3Wk0xOSAxM0gxN1YxNUgxNVYxM0gxM1YxMUgxNVY5SDE3VjExSDE5VjEzWiIvPgo8L3N2Zz4KPC9zdmc+"
    ],
    year: "2022",
    model: "Piaggio Ape E City FX",
    km: "15,000 km",
    location: "Bangalore",
    price: "₹2,85,000",
    emi: "₹4,500"
};

// Global variables
let currentImageIndex = 0;
let vehicleInitialized = false;

// Initialize vehicle page
function initializeVehiclePage() {
    if (vehicleInitialized) return;
    
    console.log('Initializing vehicle page...');
    
    // Load vehicle data from URL parameters or localStorage
    loadVehicleData();
    
    // Initialize image carousel
    initializeImageCarousel();
    
        // Initialize lead capture functionality with delay to ensure DOM is ready
        setTimeout(() => {
            initializeLeadCapture();
        }, 100);
    
    // Initialize thumbnail navigation
    initializeThumbnailNavigation();
    
    // Initialize sharing functionality
    initializeSharing();
    
    // Initialize more like this slider with delay
    setTimeout(() => {
        initializeMoreLikeThis();
    }, 500);
    
    vehicleInitialized = true;
    console.log('Vehicle page initialized successfully');
}

// Load vehicle data from URL parameters or localStorage
function loadVehicleData() {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleId = urlParams.get('id');
    
    // Try to load vehicle data from localStorage first
    const storedData = localStorage.getItem('currentVehicleData');
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            Object.assign(vehicleData, parsedData);
            console.log('Loaded vehicle data from localStorage:', parsedData);
        } catch (error) {
            console.log('Error parsing stored vehicle data:', error);
        }
    }
    
    if (vehicleId) {
        console.log('Loading vehicle data for ID:', vehicleId);
        // In a real app, you would fetch vehicle data based on ID
    }
    
    // Update the page with vehicle data
    updateVehicleDetails();
}

// Update vehicle details on the page
function updateVehicleDetails() {
    // Helper function to safely update element text
    function safeUpdateText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        } else {
            console.log(`Element not found: ${elementId}`);
        }
    }
    
    // Update main vehicle details
    safeUpdateText('vehicleTitle', vehicleData.title || `${vehicleData.year} ${vehicleData.model}`);
    safeUpdateText('vehicleSpecs', `${vehicleData.km} · ${vehicleData.year}`);
    safeUpdateText('vehiclePrice', vehicleData.price);
    safeUpdateText('vehicleEmi', vehicleData.emi);
    safeUpdateText('breadcrumbCurrent', vehicleData.title || `${vehicleData.year} ${vehicleData.model}`);
    
    // Update Car Overview widget (only if elements exist)
    safeUpdateText('registrationYear', vehicleData.registrationYear || 'Sep 2022');
    safeUpdateText('fuelType', vehicleData.fuelType || 'Electric');
    safeUpdateText('kmsDriven', vehicleData.km || '15,000 km');
    safeUpdateText('transmission', vehicleData.transmission || 'Manual');
    safeUpdateText('engineCapacity', vehicleData.engineCapacity || 'Electric');
    safeUpdateText('ownership', vehicleData.ownership || '1st');
    safeUpdateText('makeYear', vehicleData.makeYear || 'Aug 2022');
    safeUpdateText('spareKey', vehicleData.spareKey || 'Yes');
    safeUpdateText('vehicleNumber', vehicleData.vehicleNumber || 'KA53**5209');
    safeUpdateText('insurance', vehicleData.insurance || 'Need renewal');
    safeUpdateText('insuranceType', vehicleData.insuranceType || 'Plans from ₹2,474/y');
    safeUpdateText('evLocation', vehicleData.location || 'Bangalore');

    // Update Car Specifications widget (only if elements exist)
    safeUpdateText('spareWheel', vehicleData.spareWheel || 'Yes');
    safeUpdateText('chargerAvailable', vehicleData.chargerAvailable || 'Yes');
    safeUpdateText('batteryCondition', vehicleData.batteryCondition || 'Good');
    safeUpdateText('toolKitAvailable', vehicleData.toolKitAvailable || 'Yes');
}

// Initialize image carousel
function initializeImageCarousel() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.getElementById('thumbnails');
    
    if (!mainImage || !thumbnails) {
        console.log('Image carousel elements not found');
        return;
    }
    
    // Set initial image
    mainImage.src = vehicleData.images[0];
    
    // Create thumbnails
    createThumbnails();
    
    console.log('Image carousel initialized');
}

// Create thumbnail images
function createThumbnails() {
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.innerHTML = '';
    
    vehicleData.images.forEach((imageSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imageSrc;
        thumbnail.alt = `Vehicle Image ${index + 1}`;
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
            updateActiveThumbnail();
        });
        
        thumbnails.appendChild(thumbnail);
    });
}

// Update main image
function updateMainImage() {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = vehicleData.images[currentImageIndex];
            mainImage.style.opacity = '1';
        }, 150);
    }
}

// Update active thumbnail
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Initialize thumbnail navigation
function initializeThumbnailNavigation() {
    const prevThumb = document.getElementById('prevThumb');
    const nextThumb = document.getElementById('nextThumb');
    const thumbnails = document.getElementById('thumbnails');
    
    if (!prevThumb || !nextThumb || !thumbnails) return;
    
    prevThumb.addEventListener('click', () => {
        thumbnails.scrollBy({ left: -100, behavior: 'smooth' });
    });
    
    nextThumb.addEventListener('click', () => {
        thumbnails.scrollBy({ left: 100, behavior: 'smooth' });
    });
}

// Initialize book vehicle popup
// Lead Capture Functionality
function initializeLeadCapture() {
    const bookVehicleBtn = document.getElementById('bookVehicleBtn');
    const leadPopupOverlay = document.getElementById('leadPopupOverlay');
    const leadPopup = document.getElementById('leadPopup');
    const leadPopupClose = document.getElementById('leadPopupClose');
    const leadForm = document.getElementById('leadForm');
    const leadFormSection = document.getElementById('leadFormSection');
    const leadThankYouSection = document.getElementById('leadThankYouSection');
    const closeLeadThankYou = document.getElementById('closeLeadThankYou');

    // Open popup when FREE TEST DRIVE button is clicked
    if (bookVehicleBtn) {
        console.log('FREE TEST DRIVE button found, adding event listener');
        
        // Ensure button is clickable
        bookVehicleBtn.style.pointerEvents = 'auto';
        bookVehicleBtn.style.cursor = 'pointer';
        bookVehicleBtn.style.position = 'relative';
        bookVehicleBtn.style.zIndex = '10';
        
        bookVehicleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('FREE TEST DRIVE button clicked - opening lead capture');
            openLeadPopup();
        });
        
        // Also add touch events for mobile
        bookVehicleBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('FREE TEST DRIVE button touched - opening lead capture');
            openLeadPopup();
        });
    } else {
        console.error('FREE TEST DRIVE button not found!');
    }

    // Close popup when close button is clicked
    if (leadPopupClose) {
        console.log('Close button found, adding event listeners');
        
        // Multiple event types to ensure it works
        leadPopupClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            closeLeadPopup();
        });
        
        leadPopupClose.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button touched');
            closeLeadPopup();
        });
        
        // Ensure button is clickable
        leadPopupClose.style.pointerEvents = 'auto';
        leadPopupClose.style.cursor = 'pointer';
        leadPopupClose.style.zIndex = '1000';
    } else {
        console.error('Close button not found!');
    }

    // Close popup when overlay is clicked
    if (leadPopupOverlay) {
        leadPopupOverlay.addEventListener('click', (e) => {
            if (e.target === leadPopupOverlay) {
                closeLeadPopup();
            }
        });
    }

    // Handle form submission
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Lead form submitted');
            
            // Validate checkbox
            const termsCheckbox = document.getElementById('leadTerms');
            if (!termsCheckbox.checked) {
                // Add visual feedback
                termsCheckbox.classList.add('error');
                termsCheckbox.focus();
                
                // Show error message
                let errorMsg = document.getElementById('termsError');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.id = 'termsError';
                    errorMsg.style.color = '#ef4444';
                    errorMsg.style.fontSize = '12px';
                    errorMsg.style.marginTop = '5px';
                    termsCheckbox.parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Please accept the terms and conditions to continue.';
                
                // Remove error styling after 3 seconds
                setTimeout(() => {
                    termsCheckbox.classList.remove('error');
                    if (errorMsg) {
                        errorMsg.textContent = '';
                    }
                }, 3000);
                
                return;
            }
            
            handleLeadSubmission();
        });
    }

    // Close thank you section
    if (closeLeadThankYou) {
        closeLeadThankYou.addEventListener('click', (e) => {
            e.preventDefault();
            closeLeadPopup();
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && leadPopupOverlay && leadPopupOverlay.classList.contains('active')) {
            console.log('Escape key pressed, closing popup');
            closeLeadPopup();
        }
    });

    function openLeadPopup() {
        console.log('openLeadPopup called');
        console.log('leadPopupOverlay:', leadPopupOverlay);
        console.log('leadPopup:', leadPopup);
        
        if (leadPopupOverlay && leadPopup) {
            // Force visibility with inline styles for testing
            leadPopupOverlay.style.display = 'block';
            leadPopupOverlay.style.opacity = '1';
            leadPopupOverlay.style.visibility = 'visible';
            leadPopupOverlay.classList.add('active');
            
            leadPopup.style.display = 'block';
            leadPopup.style.opacity = '1';
            leadPopup.style.visibility = 'visible';
            leadPopup.classList.add('active');
            
            // Ensure all form inputs are visible
            const phoneInput = document.getElementById('leadPhone');
            if (phoneInput) {
                phoneInput.style.display = 'block';
                phoneInput.style.visibility = 'visible';
                phoneInput.style.opacity = '1';
                phoneInput.style.width = '100%';
                phoneInput.style.height = 'auto';
                phoneInput.style.padding = '12px 16px';
                phoneInput.style.border = '2px solid #d1d5db';
                phoneInput.style.borderRadius = '8px';
                console.log('Phone input styled and made visible');
            } else {
                console.error('Phone input not found!');
            }
            
            document.body.style.overflow = 'hidden';
            console.log('Lead popup opened successfully');
        } else {
            console.error('Lead popup elements not found!');
        }
    }

    function closeLeadPopup() {
        console.log('closeLeadPopup called');
        
        if (leadPopupOverlay && leadPopup) {
            // Force close with inline styles
            leadPopupOverlay.style.display = 'none';
            leadPopupOverlay.style.opacity = '0';
            leadPopupOverlay.style.visibility = 'hidden';
            leadPopupOverlay.classList.remove('active');
            
            leadPopup.style.display = 'none';
            leadPopup.style.opacity = '0';
            leadPopup.style.visibility = 'hidden';
            leadPopup.classList.remove('active');
            
            // Reset body scroll
            document.body.style.overflow = '';
            
            // Reset form and show form section
            if (leadForm) {
                leadForm.reset();
            }
            if (leadFormSection && leadThankYouSection) {
                leadFormSection.style.display = 'block';
                leadThankYouSection.style.display = 'none';
            }
            
            console.log('Lead popup closed successfully');
        } else {
            console.error('Popup elements not found for closing');
        }
    }

    function handleLeadSubmission() {
        const formData = new FormData(leadForm);
        const leadData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            terms: formData.get('terms'),
            vehicle: window.vehicleData ? (window.vehicleData.title || `${window.vehicleData.year} ${window.vehicleData.model}`) : 'Unknown Vehicle',
            timestamp: new Date().toISOString()
        };

        console.log('Lead data collected:', leadData);

        // Store lead data in localStorage (in a real app, this would be sent to a server)
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
        existingLeads.push(leadData);
        localStorage.setItem('leads', JSON.stringify(existingLeads));

        // Show thank you message
        if (leadFormSection && leadThankYouSection) {
            leadFormSection.style.display = 'none';
            leadThankYouSection.style.display = 'block';
        }

        console.log('Lead submitted successfully');
    }

    console.log('Lead capture functionality initialized');
    console.log('Button element:', bookVehicleBtn);
    console.log('Popup overlay:', leadPopupOverlay);
    console.log('Popup element:', leadPopup);
}

// Make functions globally accessible
window.initializeVehiclePage = initializeVehiclePage;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing vehicle page...');
    setTimeout(() => {
        initializeVehiclePage();
    }, 100);
});

// Also initialize on window load as backup
window.addEventListener('load', () => {
    if (!vehicleInitialized) {
        console.log('Window loaded, initializing vehicle page...');
        setTimeout(() => {
            initializeVehiclePage();
        }, 200);
    }
    
    // Ensure header functionality is initialized on this page
    setTimeout(() => {
        if (typeof window.initializeAllFunctionality === 'function') {
            console.log('Re-initializing header functionality on vehicle page...');
            window.initializeAllFunctionality();
        }
    }, 1000);
});

// Initialize sharing functionality
function initializeSharing() {
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const closeShareModal = document.getElementById('closeShareModal');
    const shareButtons = document.querySelectorAll('.share-btn');
    
    if (!shareBtn || !shareModal) {
        console.log('Share elements not found');
        return;
    }
    
    // Open share modal
    shareBtn.addEventListener('click', () => {
        shareModal.style.display = 'block';
    });
    
    // Close share modal
    closeShareModal.addEventListener('click', () => {
        shareModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });
    
    // Handle share button clicks
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            shareVehicle(platform);
        });
    });
}

// Share vehicle function
function shareVehicle(platform) {
    const vehicleTitle = document.getElementById('vehicleTitle')?.textContent || 'Electric Vehicle';
    const vehiclePrice = document.getElementById('vehiclePrice')?.textContent || 'Price not available';
    const vehicleSpecs = document.getElementById('vehicleSpecs')?.textContent || 'Specs not available';
    
    const shareText = `Check out this ${vehicleTitle} - ${vehicleSpecs} for ${vehiclePrice}!`;
    const shareUrl = window.location.href;
    
    let shareLink = '';
    
    switch (platform) {
        case 'whatsapp':
            shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            break;
        case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            break;
        case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'linkedin':
            shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'telegram':
            shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
            break;
        case 'email':
            shareLink = `mailto:?subject=${encodeURIComponent(vehicleTitle)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Link copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Link copied to clipboard!');
            });
            return;
    }
    
    if (shareLink) {
        window.open(shareLink, '_blank', 'width=600,height=400');
    }
    
    // Close modal after sharing
    document.getElementById('shareModal').style.display = 'none';
}

// Initialize more like this slider
function initializeMoreLikeThis() {
    console.log('Initializing More like this...');
    const slider = document.getElementById('carsSlider');
    const prevBtn = document.getElementById('moreLikePrevBtn');
    const nextBtn = document.getElementById('moreLikeNextBtn');
    
    console.log('Elements found:', { slider: !!slider, prevBtn: !!prevBtn, nextBtn: !!nextBtn });
    
    if (!slider || !prevBtn || !nextBtn) {
        console.log('More like this elements not found');
        return;
    }
    
    let currentIndex = 0;
    const cardsPerView = 4; // Number of cards visible at once
    let totalCards = 0;
    
    // Sample car data (in real app, this would come from an API)
    const sampleCars = [
        {
            id: 1,
            title: "2022 Piaggio Ape E-City",
            specs: "28.5k km · 2nd Owner",
            price: "₹2.45 lakh",
            emi: "EMI ₹8,900/m*",
            location: "Mumbai",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjODdDRUYiLz4KPHRleHQgeD0iMTUwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFmMjkzNyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGlhZ2dpbyBBcGUgRS1DaXR5PC90ZXh0Pgo8L3N2Zz4="
        },
        {
            id: 2,
            title: "2022 Mahindra Treo Plus",
            specs: "15K km · 1st Owner",
            price: "₹2.85 lakh",
            emi: "EMI ₹4,500/m*",
            location: "Bangalore",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1haGluZHJhIFRyZW8gUGx1czwvdGV4dD4KPC9zdmc+"
        },
        {
            id: 3,
            title: "2021 Etrio Electric",
            specs: "12K km · 1st Owner",
            price: "₹2.45 lakh",
            emi: "EMI ₹3,800/m*",
            location: "Bangalore",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPkV0cmlvIEVsZWN0cmljPC90ZXh0Pgo8L3N2Zz4="
        },
        {
            id: 4,
            title: "2022 Euler HiLoad Electric",
            specs: "18K km · 1st Owner",
            price: "₹3.15 lakh",
            emi: "EMI ₹4,900/m*",
            location: "Bangalore",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPkV1bGVyIEhpTG9hZDwvdGV4dD4KPC9zdmc+"
        },
        {
            id: 5,
            title: "2021 Montra Super Auto",
            specs: "20K km · 2nd Owner",
            price: "₹1.95 lakh",
            emi: "EMI ₹3,200/m*",
            location: "Bangalore",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1vbnRyYSBTdXBlciBBdXRvPC90ZXh0Pgo8L3N2Zz4="
        },
        {
            id: 6,
            title: "2022 Piaggio E City Fx",
            specs: "14K km · 1st Owner",
            price: "₹2.25 lakh",
            emi: "EMI ₹3,600/m*",
            location: "Bangalore",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBpYWdnaW8gRSBDaXR5IEZ4PC90ZXh0Pgo8L3N2Zz4="
        },
        {
            id: 7,
            title: "2021 Bajaj RE E TEC 9.0",
            specs: "16K km · 1st Owner",
            price: "₹2.75 lakh",
            emi: "EMI ₹4,200/m*",
            location: "Bangalore",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJhamFqIFJFIEEgRSBURUMgOS4wPC90ZXh0Pgo8L3N2Zz4="
        },
        {
            id: 8,
            title: "2022 Mahindra Treo Plus",
            specs: "22K km · 2nd Owner",
            price: "₹2.65 lakh",
            emi: "EMI ₹4,100/m*",
            location: "Mumbai",
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1haGluZHJhIFRyZW8gUGx1czwvdGV4dD4KPC9zdmc+"
        }
    ];
    
    // Filter cars by current vehicle's location (simple algorithm)
    const currentLocation = vehicleData?.location || 'Bangalore';
    const currentVehicleId = vehicleData?.id || 0;
    console.log('Current location:', currentLocation, 'Current vehicle ID:', currentVehicleId);
    
    const similarCars = sampleCars.filter(car => 
        car.location === currentLocation && car.id !== currentVehicleId
    );
    
    console.log('Similar cars from same location:', similarCars.length);
    
    // If not enough cars from same location, add others
    if (similarCars.length < 4) {
        const otherCars = sampleCars.filter(car => 
            car.location !== currentLocation && car.id !== currentVehicleId
        );
        similarCars.push(...otherCars.slice(0, 4 - similarCars.length));
        console.log('Added other cars, total now:', similarCars.length);
    }
    
    totalCards = similarCars.length;
    
    // Fallback: if no cars found, show all sample cars
    if (totalCards === 0) {
        console.log('No similar cars found, showing all sample cars');
        similarCars.push(...sampleCars);
        totalCards = similarCars.length;
    }
    
    // Render car cards
    function renderCars() {
        console.log('Rendering cars:', similarCars.length, 'cars');
        slider.innerHTML = '';
        similarCars.forEach((car, index) => {
            console.log(`Creating card ${index + 1}:`, car.title);
            const carCard = createCarCard(car);
            slider.appendChild(carCard);
        });
        updateSliderButtons();
        console.log('Cars rendered successfully');
    }
    
    // Create individual car card
    function createCarCard(car) {
        const card = document.createElement('div');
        card.className = 'car-card';
        
        // Parse specs for tags
        const specsArray = car.specs.split(' · ');
        const mileage = specsArray[0] || 'N/A';
        const owner = specsArray[1] || '1st Owner';
        
        card.innerHTML = `
            <div class="car-image-container">
                <img src="${car.image}" alt="${car.title}" class="car-image">
                <div class="car-actions">
                    <button class="car-action-btn compare" onclick="event.stopPropagation(); toggleCompare(${car.id})">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                    <button class="car-action-btn heart" onclick="event.stopPropagation(); toggleLike(${car.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="car-details">
                <h3 class="car-title">${car.title}</h3>
                <div class="car-specs">
                    <span class="car-spec-tag">${mileage}</span>
                    <span class="car-spec-tag">${owner}</span>
                </div>
                <div class="car-pricing">
                    <div class="car-emi">${car.emi}</div>
                    <div class="car-price">${car.price}</div>
                </div>
                <div class="car-location">
                    <i class="fas fa-map-marker-alt"></i>
                    Innovolt Hub, ${car.location}
                </div>
            </div>
        `;
        
        // Add click handler for card navigation
        card.addEventListener('click', () => {
            localStorage.setItem('currentVehicleData', JSON.stringify(car));
            window.location.href = 'vehicle.html';
        });
        
        return card;
    }
    
    // Update slider position
    function updateSlider() {
        // Get responsive card width
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        let cardWidth;
        if (isSmallMobile) {
            cardWidth = 270; // 260px + 10px gap
        } else if (isMobile) {
            cardWidth = 295; // 280px + 15px gap
        } else {
            cardWidth = 320; // 300px + 20px gap
        }
        
        const translateX = -currentIndex * cardWidth;
        console.log('Updating slider - currentIndex:', currentIndex, 'translateX:', translateX, 'cardWidth:', cardWidth);
        slider.style.transform = `translateX(${translateX}px)`;
        updateSliderButtons();
    }
    
    // Update button states
    function updateSliderButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        console.log('Previous button clicked, currentIndex:', currentIndex);
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
            console.log('Moved to index:', currentIndex);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        console.log('Next button clicked, currentIndex:', currentIndex);
        if (currentIndex < totalCards - cardsPerView) {
            currentIndex++;
            updateSlider();
            console.log('Moved to index:', currentIndex);
        }
    });
    
    // Update the subtitle with current car model
    const currentCarModelElement = document.getElementById('currentCarModel');
    if (currentCarModelElement && vehicleData) {
        currentCarModelElement.textContent = `${vehicleData.year} ${vehicleData.model}`;
    }
    
    // Initialize
    console.log('Starting initialization...');
    renderCars();
    updateSlider();

    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlider();
    });

    console.log('More like this slider initialized with', totalCards, 'cards');
}
