/**
 * Accessibility enhancements for June Calendar Landing Page
 */

/**
 * Initialize accessibility enhancements
 */
function initAccessibility() {
    // Add ARIA attributes to dynamic elements
    addAriaAttributes();
    
    // Set up focus management
    setupFocusManagement();
    
    // Add screen reader announcements
    setupScreenReaderAnnouncements();
    
    // Add keyboard navigation enhancements
    enhanceKeyboardNavigation();
}

/**
 * Add ARIA attributes to dynamic elements
 */
function addAriaAttributes() {
    // Add ARIA attributes to calendar days
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach((day, index) => {
        // Skip empty days
        if (day.classList.contains('empty')) {
            day.setAttribute('aria-hidden', 'true');
            return;
        }
        
        const dayNumber = day.getAttribute('data-day');
        if (!dayNumber) return;
        
        // Set appropriate ARIA attributes
        day.setAttribute('role', 'button');
        day.setAttribute('aria-label', `June ${dayNumber}, 2025`);
        
        // If the day has events, add more descriptive label
        if (!day.classList.contains('no-events')) {
            const events = getEventsForDay(parseInt(dayNumber));
            if (events && events.length > 0) {
                const eventTypes = new Set(events.map(event => event.type));
                const eventCount = events.length;
                
                let ariaLabel = `June ${dayNumber}, 2025. ${eventCount} event`;
                if (eventCount > 1) ariaLabel += 's';
                ariaLabel += `: ${events.map(e => e.title).join(', ')}`;
                
                day.setAttribute('aria-label', ariaLabel);
            }
        } else {
            day.setAttribute('aria-disabled', 'true');
        }
    });
    
    // Add ARIA attributes to day detail panel
    const dayDetailPanel = document.getElementById('dayDetailPanel');
    if (dayDetailPanel) {
        dayDetailPanel.setAttribute('role', 'dialog');
        dayDetailPanel.setAttribute('aria-labelledby', 'dayDetailDate');
        dayDetailPanel.setAttribute('aria-hidden', 'true');
        
        // When panel becomes active, update aria-hidden
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const isActive = dayDetailPanel.classList.contains('active');
                    dayDetailPanel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                }
            });
        });
        
        observer.observe(dayDetailPanel, { attributes: true });
    }
    
    // Add ARIA attributes to category filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.setAttribute('role', 'button');
        filter.setAttribute('aria-pressed', filter.classList.contains('active') ? 'true' : 'false');
        
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
    
    // Add ARIA attributes to featured carousel
    const featuredCarousel = document.querySelector('.featured-carousel');
    if (featuredCarousel) {
        featuredCarousel.setAttribute('role', 'region');
        featuredCarousel.setAttribute('aria-label', 'Featured days in June');
        
        // Add ARIA attributes to featured day cards
        const featuredCards = featuredCarousel.querySelectorAll('.featured-day-card');
        featuredCards.forEach(card => {
            card.setAttribute('role', 'article');
            
            const dayNumber = card.querySelector('.featured-day-date')?.textContent.replace('June ', '');
            const title = card.querySelector('.featured-day-title')?.textContent;
            
            if (dayNumber && title) {
                card.setAttribute('aria-label', `Featured event: ${title} on June ${dayNumber}`);
            }
        });
    }
}

/**
 * Set up focus management for interactive elements
 */
function setupFocusManagement() {
    // Trap focus in day detail panel when open
    const dayDetailPanel = document.getElementById('dayDetailPanel');
    if (dayDetailPanel) {
        // Get all focusable elements in the panel
        const getFocusableElements = () => {
            return Array.from(
                dayDetailPanel.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            );
        };
        
        // Track last focused element before panel opened
        let lastFocusedElement = null;
        
        // Watch for panel opening
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const isActive = dayDetailPanel.classList.contains('active');
                    
                    if (isActive) {
                        // Store last focused element
                        lastFocusedElement = document.activeElement;
                        
                        // Focus first focusable element in panel
                        const focusableElements = getFocusableElements();
                        if (focusableElements.length > 0) {
                            setTimeout(() => {
                                focusableElements[0].focus();
                            }, 100);
                        }
                        
                        // Add keydown event listener to trap focus
                        document.addEventListener('keydown', trapFocus);
                    } else {
                        // Remove keydown event listener
                        document.removeEventListener('keydown', trapFocus);
                        
                        // Restore focus to last focused element
                        if (lastFocusedElement) {
                            setTimeout(() => {
                                lastFocusedElement.focus();
                            }, 100);
                        }
                    }
                }
            });
        });
        
        observer.observe(dayDetailPanel, { attributes: true });
        
        // Function to trap focus within the panel
        function trapFocus(e) {
            // Check if panel is active
            if (!dayDetailPanel.classList.contains('active')) return;
            
            // Handle Escape key to close panel
            if (e.key === 'Escape') {
                const closeButton = dayDetailPanel.querySelector('.day-detail-close');
                if (closeButton) closeButton.click();
                return;
            }
            
            // Only trap Tab key
            if (e.key !== 'Tab') return;
            
            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) return;
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // If Shift+Tab on first element, move to last element
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
            // If Tab on last element, move to first element
            else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

/**
 * Set up screen reader announcements
 */
function setupScreenReaderAnnouncements() {
    // Create screen reader announcement element if it doesn't exist
    if (!document.getElementById('sr-announcer')) {
        const announcer = document.createElement('div');
        announcer.id = 'sr-announcer';
        announcer.className = 'visually-hidden';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
    }
    
    // Function to make announcements to screen readers
    window.announceToScreenReader = function(message) {
        const announcer = document.getElementById('sr-announcer');
        if (announcer) {
            announcer.textContent = message;
            
            // Clear after a delay
            setTimeout(() => {
                announcer.textContent = '';
            }, 3000);
        }
    };
    
    // Announce category filter changes
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                const category = this.getAttribute('data-category');
                const categoryName = category === 'all' ? 'all events' : `${category} events`;
                announceToScreenReader(`Filtered to show ${categoryName}`);
            }
        });
    });
    
    // Announce day selection
    document.addEventListener('click', function(e) {
        const dayCell = e.target.closest('.calendar-day');
        if (dayCell && !dayCell.classList.contains('empty') && !dayCell.classList.contains('no-events')) {
            const day = dayCell.getAttribute('data-day');
            if (day) {
                announceToScreenReader(`Selected June ${day}, 2025`);
            }
        }
    });
}

/**
 * Enhance keyboard navigation
 */
function enhanceKeyboardNavigation() {
    // Add keyboard navigation for category filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach((filter, index) => {
        filter.setAttribute('tabindex', '0');
        
        filter.addEventListener('keydown', function(e) {
            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.click();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (index < categoryFilters.length - 1) {
                        categoryFilters[index + 1].focus();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (index > 0) {
                        categoryFilters[index - 1].focus();
                    }
                    break;
            }
        });
    });
    
    // Add keyboard navigation for featured carousel
    const featuredCarousel = document.querySelector('.featured-carousel');
    if (featuredCarousel) {
        const cards = featuredCarousel.querySelectorAll('.featured-day-card');
        cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            
            card.addEventListener('keydown', function(e) {
                switch (e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        const link = this.querySelector('.featured-day-link');
                        if (link) link.click();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (index < cards.length - 1) {
                            cards[index + 1].focus();
                        }
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (index > 0) {
                            cards[index - 1].focus();
                        }
                        break;
                }
            });
        });
    }
}

// Initialize accessibility enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', initAccessibility);