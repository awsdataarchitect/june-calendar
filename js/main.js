/**
 * Main JavaScript for June Calendar Landing Page
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    // Initialize mobile menu functionality
    initMobileMenu();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize hero section interactivity
    initHeroInteractivity();

    // Initialize category legend
    initCategoryLegend();

    // Initialize category filters
    initCategoryFilters();

    // Initialize calendar
    initCalendar();

    // Initialize featured days carousel - disabled, using carousel-fix.js instead
    // initFeaturedDays();

    // Initialize reveal animations
    initRevealAnimations();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';

        // Clone navigation links for mobile menu
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const mobileNavLinks = navLinks.cloneNode(true);
            mobileMenu.appendChild(mobileNavLinks);
            document.body.appendChild(mobileMenu);
        }
    }

    const mobileMenu = document.querySelector('.mobile-menu');

    // Toggle mobile menu on button click
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');

            // Toggle aria-expanded attribute for accessibility
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize hero section interactivity
 */
function initHeroInteractivity() {
    // Animate calendar day numbers in hero
    const heroCalendarDay = document.getElementById('heroCalendarDay');
    if (heroCalendarDay) {
        const significantDays = [1, 5, 8, 12, 14, 19, 21, 23, 27, 30];
        let currentIndex = 0;

        // Initial value
        heroCalendarDay.textContent = significantDays[0];

        // Update day number every 2 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % significantDays.length;

            // Add flip animation class
            heroCalendarDay.classList.add('flipping');

            // Update text after a short delay (during animation)
            setTimeout(() => {
                heroCalendarDay.textContent = significantDays[currentIndex];
                heroCalendarDay.classList.remove('flipping');
            }, 250);
        }, 2000);
    }

    // Parallax effect for hero background elements
    const heroSection = document.querySelector('.hero-section');
    const heroElements = document.querySelectorAll('.hero-element');
    const heroDecorations = document.querySelectorAll('.hero-decoration');

    if (heroSection) {
        window.addEventListener('scroll', function () {
            // Only apply parallax if hero section is visible
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                const scrollPosition = window.pageYOffset;

                // Move hero elements at different speeds
                heroElements.forEach((element, index) => {
                    const speed = 0.05 + (index * 0.02);
                    element.style.transform = `translateY(${scrollPosition * speed}px)`;
                });

                // Move decorations in opposite direction
                heroDecorations.forEach((decoration, index) => {
                    const speed = 0.08 + (index * 0.03);
                    decoration.style.transform = `translateY(${-scrollPosition * speed}px)`;
                });
            }
        });
    }

    // Interactive hover effect for hero button
    const heroButton = document.querySelector('.hero-content .btn');
    if (heroButton) {
        heroButton.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--x-pos', `${x}px`);
            this.style.setProperty('--y-pos', `${y}px`);
        });
    }

    // Change navigation background on scroll
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Initialize category legend
 */
function initCategoryLegend() {
    const legendContainer = document.querySelector('.legend-items');
    if (!legendContainer) return;

    // Clear existing content
    legendContainer.innerHTML = '';

    // Get category legend data
    const legendData = getCategoryLegendData();

    // Create legend items
    legendData.forEach(category => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';

        const colorIndicator = document.createElement('div');
        colorIndicator.className = `legend-color ${category.id}`;
        colorIndicator.style.backgroundColor = category.color;

        const nameElement = document.createElement('div');
        nameElement.className = 'legend-name';
        nameElement.textContent = category.name;

        const countElement = document.createElement('div');
        countElement.className = 'legend-count';
        countElement.textContent = `(${category.count})`;

        legendItem.appendChild(colorIndicator);
        legendItem.appendChild(nameElement);
        legendItem.appendChild(countElement);

        legendContainer.appendChild(legendItem);
    });
}

/**
 * Initialize category filters
 */
function initCategoryFilters() {
    console.log('Initializing category filters');
    const categoryFilters = document.querySelectorAll('.category-filter');

    if (!categoryFilters.length) {
        console.error('No category filters found');
        return;
    }

    console.log(`Found ${categoryFilters.length} category filters`);

    // Create a live region for accessibility announcements if it doesn't exist
    if (!document.querySelector('.calendar-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.className = 'calendar-live-region visually-hidden';
        liveRegion.setAttribute('aria-live', 'polite');
        document.querySelector('.calendar-container').appendChild(liveRegion);
    }

    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            console.log('Filter clicked:', this.getAttribute('data-category'));

            // If this filter is already active, reset to 'all'
            if (this.classList.contains('active') && this.getAttribute('data-category') !== 'all') {
                // Find the 'all' filter and click it
                const allFilter = document.querySelector('.category-filter[data-category="all"]');
                if (allFilter) {
                    allFilter.click();
                }
                return;
            }

            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));

            // Add active class to clicked filter with animation
            this.classList.add('active');

            // Get selected category
            const category = this.getAttribute('data-category');

            // Add a small delay before filtering to allow button animation to be visible
            setTimeout(() => {
                // Filter calendar days based on category
                filterCalendarByCategory(category);
            }, 100);
        });
    });

    // Add keyboard navigation for accessibility
    categoryFilters.forEach(filter => {
        filter.setAttribute('tabindex', '0');
        filter.setAttribute('role', 'button');
        filter.setAttribute('aria-pressed', filter.classList.contains('active') ? 'true' : 'false');

        filter.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Update aria-pressed when active state changes
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const isActive = filter.classList.contains('active');
                    filter.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                }
            });
        });

        observer.observe(filter, { attributes: true });
    });
}

// This function is now moved to carousel.js
// Keeping this comment as a reference

// This function is now moved to carousel.js
// Keeping this comment as a reference

/**
 * Initialize reveal animations with Intersection Observer
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }
}
/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * Throttle function to limit the rate at which a function is executed
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Optimize scroll and resize event handlers
 */
function optimizeEventHandlers() {
    // Replace scroll handlers with debounced/throttled versions
    const scrollHandlers = {
        'updateCarouselPagination': debounce(updateCarouselPagination, 100),
        'handleScroll': throttle(handleScroll, 50)
    };

    // Replace resize handlers with debounced versions
    const resizeHandlers = {
        'checkOverflow': debounce(checkOverflow, 150),
        'adjustLayout': debounce(adjustLayout, 200)
    };

    // Function to handle scroll events
    function handleScroll() {
        // Check if navigation should be sticky
        const mainNav = document.querySelector('.main-nav');
        if (mainNav) {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        }

        // Handle parallax effects
        const heroSection = document.querySelector('.hero-section');
        const heroElements = document.querySelectorAll('.hero-element');
        const heroDecorations = document.querySelectorAll('.hero-decoration');

        if (heroSection) {
            // Only apply parallax if hero section is visible
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                const scrollPosition = window.pageYOffset;

                // Move hero elements at different speeds
                heroElements.forEach((element, index) => {
                    const speed = 0.05 + (index * 0.02);
                    element.style.transform = `translateY(${scrollPosition * speed}px)`;
                });

                // Move decorations in opposite direction
                heroDecorations.forEach((decoration, index) => {
                    const speed = 0.08 + (index * 0.03);
                    decoration.style.transform = `translateY(${-scrollPosition * speed}px)`;
                });
            }
        }
    }

    // Function to adjust layout on resize
    function adjustLayout() {
        // Adjust calendar grid for mobile
        const calendarGrid = document.querySelector('.calendar-grid');
        if (calendarGrid) {
            if (window.innerWidth < 768) {
                // Mobile layout adjustments
                document.querySelectorAll('.event-preview').forEach(preview => {
                    preview.style.display = 'none';
                });
            } else {
                // Desktop layout adjustments
                document.querySelectorAll('.event-preview').forEach(preview => {
                    preview.style.display = 'block';
                });
            }
        }

        // Adjust featured carousel
        const featuredCarousel = document.querySelector('.featured-carousel');
        if (featuredCarousel) {
            checkOverflow();
        }
    }

    // Function to check if carousel has overflow
    function checkOverflow() {
        const carousel = document.querySelector('.featured-carousel');
        if (carousel) {
            if (carousel.scrollWidth > carousel.clientWidth) {
                carousel.classList.add('has-overflow');
            } else {
                carousel.classList.remove('has-overflow');
            }
        }
    }

    // Add optimized event listeners
    window.addEventListener('scroll', throttle(handleScroll, 50));
    window.addEventListener('resize', debounce(adjustLayout, 200));

    // Initial call to set up the layout
    adjustLayout();
}

/**
 * Initialize code splitting
 */
function initCodeSplitting() {
    // Load non-critical scripts after page load
    window.addEventListener('load', () => {
        // Array of scripts to load after page load
        const deferredScripts = [
            // Add paths to non-critical scripts here
        ];

        // Load each script dynamically
        deferredScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });
    });
}

/**
 * Optimize DOM operations
 */
function optimizeDOMOperations() {
    // Use document fragments for batch DOM operations
    function createDayElements(days) {
        const fragment = document.createDocumentFragment();

        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            fragment.appendChild(dayElement);
        });

        return fragment;
    }

    // Reduce DOM reflows by batching style changes
    function updateStyles(elements, styles) {
        // Read phase - gather all measurements at once
        const measurements = elements.map(el => ({
            width: el.offsetWidth,
            height: el.offsetHeight,
            top: el.offsetTop,
            left: el.offsetLeft
        }));

        // Write phase - apply all style changes at once
        elements.forEach((el, i) => {
            const m = measurements[i];
            Object.keys(styles).forEach(prop => {
                el.style[prop] = typeof styles[prop] === 'function'
                    ? styles[prop](m)
                    : styles[prop];
            });
        });
    }

    // Expose utility functions
    window.optimizeDOMOperations = {
        createDayElements,
        updateStyles
    };
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Optimize event handlers
    optimizeEventHandlers();

    // Initialize code splitting
    initCodeSplitting();

    // Optimize DOM operations
    optimizeDOMOperations();

    // Add passive event listeners where appropriate
    addPassiveEventListeners();
}

/**
 * Add passive event listeners for better scroll performance
 */
function addPassiveEventListeners() {
    // Check if browser supports passive event listeners
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) { }

    // Add passive listeners for touch events
    if (supportsPassive) {
        const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
        passiveEvents.forEach(eventName => {
            document.addEventListener(eventName, function () { }, { passive: true });
        });
    }
}

// Initialize performance optimizations when DOM is loaded
document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);