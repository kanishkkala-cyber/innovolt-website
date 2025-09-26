// Component loader for header and footer
class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
    }

    async loadHeader() {
        if (this.loadedComponents.has('header')) {
            return;
        }

        try {
            const response = await fetch('header.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const headerHTML = await response.text();
            
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                // Extract only the header section from the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(headerHTML, 'text/html');
                const headerElement = doc.querySelector('header');
                if (headerElement) {
                    headerPlaceholder.innerHTML = headerElement.outerHTML;
                } else {
                    // Fallback to full HTML if header not found
                    headerPlaceholder.innerHTML = headerHTML;
                }
                this.loadedComponents.add('header');
                console.log('Header loaded successfully');
            }
        } catch (error) {
            console.error('Error loading header:', error);
            // Fallback: try to load from local file
            this.loadHeaderFallback();
        }
    }

    async loadFooter() {
        if (this.loadedComponents.has('footer')) {
            return;
        }

        try {
            const response = await fetch('footer.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const footerHTML = await response.text();
            
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                // Extract only the footer section from the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(footerHTML, 'text/html');
                const footerElement = doc.querySelector('footer');
                if (footerElement) {
                    footerPlaceholder.innerHTML = footerElement.outerHTML;
                } else {
                    // Fallback to full HTML if footer not found
                    footerPlaceholder.innerHTML = footerHTML;
                }
                this.loadedComponents.add('footer');
                console.log('Footer loaded successfully');
            }
        } catch (error) {
            console.error('Error loading footer:', error);
            // Fallback: try to load from local file
            this.loadFooterFallback();
        }
    }

    loadHeaderFallback() {
        // Fallback for when fetch fails (file:// protocol)
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            // Load only the header content (no popups)
            headerPlaceholder.innerHTML = `
                <!-- Header Section -->
                <header class="header">
                    <div class="container">
                        <!-- Mobile Menu Button -->
                        <button class="menu-btn" id="menuBtn" type="button">
                            <i class="fas fa-bars"></i>
                        </button>

                        <!-- Logo -->
                        <div class="logo" onclick="window.location.href='index.html'" style="cursor: pointer;">
                            <svg width="140" height="50" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <text x="2" y="35" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#EF4444" font-style="italic" letter-spacing="-1px">innovolt</text>
                            </svg>
                        </div>

                        <!-- Search Bar -->
                        <div class="search-bar">
                            <div class="search-input-group">
                                <i class="fas fa-search search-icon"></i>
                                <input type="text" class="search-input" placeholder="Search by model" id="searchInput">
                                <div class="animated-placeholder" id="animatedPlaceholder">
                                    <span class="static-text">Search by </span>
                                    <span class="rotating-text" id="rotatingText">model</span>
                                </div>
                            </div>
                        </div>

                        <!-- Header Actions -->
                        <div class="action-buttons">
                            <!-- Location Selector -->
                            <button class="location-btn" id="locationBtn" type="button">
                                <i class="fas fa-map-marker-alt"></i>
                                <span id="locationText">Select City</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>

                            <!-- Call Us Button -->
                            <button class="call-btn" id="callBtn" type="button">
                                <i class="fas fa-phone"></i>
                                <span>Call us</span>
                            </button>

                            <!-- Liked Cars -->
                            <button class="liked-btn" id="likedBtn" type="button">
                                <i class="fas fa-heart"></i>
                                <span class="liked-count">0</span>
                            </button>

                            <!-- Compare Cars -->
                            <button class="compare-btn" id="compareBtn" type="button">
                                <i class="fas fa-balance-scale"></i>
                                <span class="compare-count">0</span>
                            </button>
                        </div>
                    </div>
                </header>
            `;
            this.loadedComponents.add('header');
            console.log('Header loaded via fallback');
        }
    }

    loadFooterFallback() {
        // Fallback for when fetch fails (file:// protocol)
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            // Load footer content directly
            footerPlaceholder.innerHTML = `
                <footer class="footer">
                    <div class="footer-container">
                        <div class="footer-content">
                            <!-- Brand Section -->
                            <div class="footer-brand-section">
                                <div class="footer-logo" onclick="window.location.href='index.html'" style="cursor: pointer;">
                                    <svg width="140" height="48" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <text x="2" y="32" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#EF4444" font-style="italic" letter-spacing="-0.5px">innovolt</text>
                                    </svg>
                                </div>
                                <div class="powered-by-inline">
                                    <span class="separator">|</span>
                                    <span class="powered-by-text-inline">powered by <span class="turno-brand-inline">TURNO</span></span>
                                </div>
                            </div>

                            <!-- Footer Sections -->
                            <div class="footer-sections">
                                <!-- Company Section -->
                                <div class="footer-section">
                                    <h3 class="footer-heading">COMPANY</h3>
                                    <ul class="footer-links">
                                        <li><a href="about.html">About Us</a></li>
                                        <li><a href="contact.html">Contact Us</a></li>
                                        <li><a href="terms.html">Terms & Conditions</a></li>
                                        <li><a href="privacy.html">Privacy Policy</a></li>
                                        <li><a href="refund.html">Refund Policy</a></li>
                                    </ul>
                                </div>

                                <!-- Electric Commercial Vehicles Section -->
                                <div class="footer-section vehicles-section">
                                    <h3 class="footer-heading">ELECTRIC COMMERCIAL VEHICLES</h3>
                                    <div class="vehicles-flex-container">
                                        <div class="vehicles-column">
                                            <ul class="footer-links">
                                                <li><a href="#piaggio">Piaggio</a></li>
                                                <li><a href="#mahindra">Mahindra</a></li>
                                                <li><a href="#etrio">Etrio</a></li>
                                            </ul>
                                        </div>
                                        <div class="vehicles-column">
                                            <ul class="footer-links">
                                                <li><a href="#euler">Euler</a></li>
                                                <li><a href="#montra">Montra Super Auto</a></li>
                                                <li><a href="#piaggio-ecity">Piaggio E City Fx</a></li>
                                            </ul>
                                        </div>
                                        <div class="vehicles-column">
                                            <ul class="footer-links">
                                                <li><a href="#bajaj">Bajaj RE E TEC 9.0</a></li>
                                                <li><a href="#mahindra-treo">Mahindra Treo Plus</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- Buy Used 3 Wheelers Section -->
                                <div class="footer-section cities-footer-section">
                                    <h3 class="footer-heading">BUY USED 3 WHEELERS EV IN</h3>
                                    <div class="cities-flex-container">
                                        <div class="cities-column">
                                            <ul class="footer-links">
                                                <li><a href="#bangalore">Bangalore</a></li>
                                                <li><a href="#hyderabad">Hyderabad</a></li>
                                                <li><a href="#lucknow">Lucknow</a></li>
                                            </ul>
                                        </div>
                                        <div class="cities-column">
                                            <ul class="footer-links">
                                                <li><a href="#delhi">Delhi</a></li>
                                                <li><a href="#pune">Pune</a></li>
                                                <li><a href="#kanpur">Kanpur</a></li>
                                            </ul>
                                        </div>
                                        <div class="cities-column">
                                            <ul class="footer-links">
                                                <li><a href="#chennai">Chennai</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-bottom">
                            <div class="footer-contact">
                                <div class="contact-layout">
                                    <div class="company-details">
                                        <p>Blubble Private Limited,</p>
                                        <p>Industrial Plot Bearing No 7-A1, 3rd Cross Rd, Devasandra Industrial Estate,</p>
                                        <p>Krishnarajapura, Near VR Mall, Bengaluru, Karnataka - 560048.</p>
                                    </div>
                                    <div class="contact-info">
                                        <button class="contact-btn phone-btn" type="button">
                                            <i class="fas fa-phone"></i> 080-47484881
                                        </button>
                                        <button class="contact-btn email-btn" type="button">
                                            <i class="fas fa-envelope"></i> innovoltsales@turno.club
                                        </button>
                                    </div>
                                </div>
                                <p class="copyright">© Blubble Pvt Ltd | All rights reserved | The Turno brand is owned by Blubble Private Limited</p>
                            </div>
                        </div>
                    </div>
                </footer>
            `;
            this.loadedComponents.add('footer');
            console.log('Footer loaded via fallback');
        }
    }

    async loadAllComponents() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);
        
        // After components are loaded, initialize functionality with retry mechanism
        this.initializeHeaderFunctionality();
    }
    
    initializeHeaderFunctionality() {
        let attempts = 0;
        const maxAttempts = 10;
        
        const tryInitialize = () => {
            attempts++;
            
            // Check if header elements are available
            const searchInput = document.getElementById('searchInput');
            const likedBtn = document.getElementById('likedBtn');
            const compareBtn = document.getElementById('compareBtn');
            const locationBtn = document.getElementById('locationBtn');
            const callBtn = document.getElementById('callBtn');
            
            if (searchInput || likedBtn || compareBtn || locationBtn || callBtn) {
                console.log('Header elements found, initializing functionality...');
                
                // Initialize all functionality
                if (typeof initializeAllFunctionality === 'function') {
                    initializeAllFunctionality();
                }
                
                // Initialize specific header functions
                if (typeof initializeHeaderButtons === 'function') {
                    initializeHeaderButtons();
                }
                
                if (typeof initializeSearchBar === 'function') {
                    initializeSearchBar();
                }
                
                if (typeof initializeCallWidget === 'function') {
                    // Add a small delay to ensure header elements are fully loaded
                    setTimeout(() => {
                        initializeCallWidget();
                    }, 50);
                }
                
                // Initialize menu functionality
                this.initializeMenuFunctionality();
                
                console.log('Header functionality initialized successfully');
            } else if (attempts < maxAttempts) {
                console.log(`Header elements not ready, retrying... (attempt ${attempts}/${maxAttempts})`);
                setTimeout(tryInitialize, 200);
            } else {
                console.log('Max attempts reached, header functionality may not work properly');
            }
        };
        
        // Start trying to initialize
        setTimeout(tryInitialize, 100);
    }
    
    initializeMenuFunctionality() {
        const menuBtn = document.getElementById('menuBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const slidingMenu = document.getElementById('slidingMenu');
        const menuClose = document.getElementById('menuClose');
        
        if (menuBtn && menuOverlay && slidingMenu) {
            console.log('Initializing menu functionality...');
            
            // Open menu
            menuBtn.addEventListener('click', () => {
                menuOverlay.classList.add('active');
                slidingMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Close menu
            const closeMenu = () => {
                menuOverlay.classList.remove('active');
                slidingMenu.classList.remove('active');
                document.body.style.overflow = '';
            };
            
            if (menuClose) {
                menuClose.addEventListener('click', closeMenu);
            }
            
            menuOverlay.addEventListener('click', closeMenu);
            
            // Close with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && slidingMenu.classList.contains('active')) {
                    closeMenu();
                }
            });
            
            console.log('Menu functionality initialized');
        }
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const loader = new ComponentLoader();
    loader.loadAllComponents();
});
