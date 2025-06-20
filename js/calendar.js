/**
 * Calendar functionality for June Calendar Landing Page
 */

/**
 * Initialize calendar
 */
function initCalendar() {
    console.log('Initializing calendar...');
    
    // Get calendar grid element
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) {
        console.error('Calendar grid element not found');
        return;
    }
    
    // Clear existing content
    calendarGrid.innerHTML = '';
    
    // Get days with events
    const daysWithEvents = getDaysWithEvents();
    console.log('Days with events:', daysWithEvents);
    
    // Create calendar days for June 2025
    createCalendarDays(calendarGrid);
    
    // Add event indicators to days with events
    addEventIndicators(calendarGrid, daysWithEvents);
    
    // Initialize day selection
    initDaySelection();
    
    // Initialize day detail panel
    initDayDetailPanel();
    
    // Make sure the 'all' filter is active by default
    const allFilter = document.querySelector('.category-filter[data-category="all"]');
    if (allFilter) {
        allFilter.classList.add('active');
    }
    
    console.log('Calendar initialized successfully');
    
    // Add a small delay and then check if calendar days were properly created
    setTimeout(() => {
        const days = document.querySelectorAll('.calendar-day');
        console.log(`Calendar has ${days.length} day cells (including empty cells)`);
        const daysWithEventsElements = document.querySelectorAll('.calendar-day.has-events');
        console.log(`Calendar has ${daysWithEventsElements.length} days with events`);
    }, 100);
}

/**
 * Create calendar days for June 2025
 * @param {HTMLElement} calendarGrid - The calendar grid element
 */
function createCalendarDays(calendarGrid) {
    console.log('Creating calendar days');
    // June 2025 starts on a Sunday (day 0)
    const firstDayOfWeek = 0;
    const daysInMonth = 30; // June has 30 days
    
    // Add empty cells for days before the 1st if needed
    if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
    }
    
    // Create days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.setAttribute('role', 'gridcell');
        dayCell.setAttribute('tabindex', '0');
        dayCell.setAttribute('aria-label', `June ${i}, 2025`);
        dayCell.setAttribute('data-day', i);
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = i;
        
        dayCell.appendChild(dayNumber);
        
        // Add event preview container
        const eventPreview = document.createElement('div');
        eventPreview.className = 'event-preview';
        dayCell.appendChild(eventPreview);
        
        calendarGrid.appendChild(dayCell);
    }
    
    // Add empty cells at the end to complete the grid if needed
    const totalCells = firstDayOfWeek + daysInMonth;
    const rowsNeeded = Math.ceil(totalCells / 7);
    const totalCellsNeeded = rowsNeeded * 7;
    const emptyCellsAtEnd = totalCellsNeeded - totalCells;
    
    for (let i = 0; i < emptyCellsAtEnd; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    console.log(`Created ${daysInMonth} days and ${firstDayOfWeek + emptyCellsAtEnd} empty cells`);
}

/**
 * Add event indicators to days with events
 * @param {HTMLElement} calendarGrid - The calendar grid element
 * @param {Array} daysWithEvents - Array of day numbers with events
 */
function addEventIndicators(calendarGrid, daysWithEvents) {
    daysWithEvents.forEach(day => {
        const dayCell = calendarGrid.querySelector(`.calendar-day[data-day="${day}"]`);
        if (dayCell) {
            dayCell.classList.add('has-events');
            
            // Get events for this day
            const events = getEventsForDay(day);
            
            // Create event indicators container if it doesn't exist
            let indicatorsContainer = dayCell.querySelector('.event-indicators');
            if (!indicatorsContainer) {
                indicatorsContainer = document.createElement('div');
                indicatorsContainer.className = 'event-indicators';
                dayCell.appendChild(indicatorsContainer);
            }
            
            // Add event indicators by category
            const categories = new Set(events.map(event => event.type));
            categories.forEach(category => {
                const indicator = document.createElement('div');
                indicator.className = `event-indicator ${category}`;
                indicator.setAttribute('title', getEventCategory(category)?.name || category);
                indicatorsContainer.appendChild(indicator);
            });
            
            // Add event preview
            const eventPreview = dayCell.querySelector('.event-preview');
            if (eventPreview && events.length > 0) {
                // Clear any existing content
                eventPreview.innerHTML = '';
                
                // Add preview text with truncation
                const previewText = document.createElement('div');
                previewText.className = 'preview-text';
                
                // Truncate title if too long
                const title = events[0].title;
                previewText.textContent = title.length > 20 ? title.substring(0, 18) + '...' : title;
                
                eventPreview.appendChild(previewText);
                
                // Add more events indicator if needed
                if (events.length > 1) {
                    const moreText = document.createElement('div');
                    moreText.className = 'more-events';
                    moreText.textContent = `+${events.length - 1} more`;
                    eventPreview.appendChild(moreText);
                }
            }
        }
    });
}

/**
 * Initialize day selection functionality
 */
function initDaySelection() {
    const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            const dayNumber = parseInt(this.getAttribute('data-day'), 10);
            selectDay(dayNumber);
        });
        
        // Add keyboard support
        day.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const dayNumber = parseInt(this.getAttribute('data-day'), 10);
                selectDay(dayNumber);
            }
        });
    });
}

/**
 * Select a day and show its details
 * @param {number} dayNumber - The day number to select
 */
function selectDay(dayNumber) {
    // Remove selected class from all days
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Add selected class to the clicked day
    const selectedDay = document.querySelector(`.calendar-day[data-day="${dayNumber}"]`);
    if (selectedDay) {
        selectedDay.classList.add('selected');
    }
    
    // Show day detail panel
    showDayDetail(dayNumber);
}

/**
 * Initialize day detail panel
 */
function initDayDetailPanel() {
    const closeButton = document.querySelector('.day-detail-close');
    if (closeButton) {
        closeButton.addEventListener('click', hideDayDetail);
    }
    
    // Add keyboard support for closing panel
    const dayDetailPanel = document.getElementById('dayDetailPanel');
    if (dayDetailPanel) {
        dayDetailPanel.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideDayDetail();
            }
        });
    }
}

/**
 * Show day detail panel with events for the selected day
 * @param {number} dayNumber - The day number to show details for
 */
function showDayDetail(dayNumber) {
    const dayDetailPanel = document.getElementById('dayDetailPanel');
    const dayDetailDate = document.getElementById('dayDetailDate');
    const eventList = document.querySelector('.event-list');
    
    if (!dayDetailPanel || !dayDetailDate || !eventList) {
        console.error('Day detail panel elements not found');
        return;
    }
    
    // Update date in panel header
    dayDetailDate.textContent = `June ${dayNumber}, 2025`;
    
    // Clear existing event content
    eventList.innerHTML = '';
    
    // Get events for the selected day
    const events = getEventsForDay(dayNumber);
    
    if (events.length === 0) {
        // No events for this day
        const noEvents = document.createElement('div');
        noEvents.className = 'no-events';
        noEvents.textContent = 'No events for this day';
        eventList.appendChild(noEvents);
    } else {
        // Create event items
        events.forEach(event => {
            const eventItem = createEventItem(event);
            eventList.appendChild(eventItem);
        });
    }
    
    // Show the panel
    dayDetailPanel.classList.add('active');
    dayDetailPanel.setAttribute('aria-hidden', 'false');
    
    // Set focus to the panel for accessibility
    dayDetailPanel.focus();
    
    // Add related events if available
    addRelatedEvents(dayNumber, events);
}

/**
 * Create an event item for the day detail panel
 * @param {Object} event - The event data
 * @returns {HTMLElement} - The event item element
 */
function createEventItem(event) {
    const eventItem = document.createElement('div');
    eventItem.className = `event-item ${event.type}`;
    
    const eventHeader = document.createElement('div');
    eventHeader.className = 'event-header';
    
    const eventTitle = document.createElement('h4');
    eventTitle.className = 'event-title';
    eventTitle.textContent = event.title;
    
    const eventType = document.createElement('div');
    eventType.className = 'event-type';
    
    // Get category information
    const category = getEventCategory(event.type);
    if (category) {
        eventType.textContent = category.name;
        eventType.style.backgroundColor = category.color;
    }
    
    eventHeader.appendChild(eventTitle);
    eventHeader.appendChild(eventType);
    
    const eventContent = document.createElement('div');
    eventContent.className = 'event-content';
    
    // Add image if available
    if (event.imageUrl) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'event-image';
        
        const image = document.createElement('img');
        image.dataset.src = event.imageUrl;
        image.alt = event.title;
        image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160"%3E%3C/svg%3E';
        image.classList.add('lazy-image');
        
        imageContainer.appendChild(image);
        eventContent.appendChild(imageContainer);
    }
    
    const eventDescription = document.createElement('div');
    eventDescription.className = 'event-description';
    eventDescription.textContent = event.fullDescription || event.description;
    
    eventContent.appendChild(eventDescription);
    
    // Add links if available
    if (event.links && event.links.length > 0) {
        const eventLinks = document.createElement('div');
        eventLinks.className = 'event-links';
        
        event.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.title;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            
            eventLinks.appendChild(linkElement);
        });
        
        eventContent.appendChild(eventLinks);
    }
    
    eventItem.appendChild(eventHeader);
    eventItem.appendChild(eventContent);
    
    return eventItem;
}

/**
 * Add related events to the day detail panel
 * @param {number} dayNumber - The current day number
 * @param {Array} currentEvents - The events for the current day
 */
function addRelatedEvents(dayNumber, currentEvents) {
    if (currentEvents.length === 0) return;
    
    const eventList = document.querySelector('.event-list');
    if (!eventList) return;
    
    // Get all events
    const allEvents = getAllEvents();
    
    // Get categories of current events
    const currentCategories = new Set(currentEvents.map(event => event.type));
    
    // Find related events (same categories but different days)
    const relatedEvents = allEvents.filter(event => {
        return event.day !== dayNumber && currentCategories.has(event.type);
    });
    
    // Sort by day proximity to current day
    relatedEvents.sort((a, b) => {
        const distA = Math.abs(a.day - dayNumber);
        const distB = Math.abs(b.day - dayNumber);
        return distA - distB;
    });
    
    // Take up to 3 related events
    const topRelatedEvents = relatedEvents.slice(0, 3);
    
    if (topRelatedEvents.length > 0) {
        // Create related events section
        const relatedSection = document.createElement('div');
        relatedSection.className = 'related-events';
        
        const relatedTitle = document.createElement('h4');
        relatedTitle.className = 'related-title';
        relatedTitle.textContent = 'Related Events';
        
        relatedSection.appendChild(relatedTitle);
        
        // Create related event items
        topRelatedEvents.forEach(event => {
            const relatedItem = document.createElement('div');
            relatedItem.className = 'related-item';
            
            const relatedDay = document.createElement('div');
            relatedDay.className = 'related-day';
            relatedDay.textContent = `June ${event.day}`;
            
            const relatedTitle = document.createElement('div');
            relatedTitle.className = 'related-event-title';
            relatedTitle.textContent = event.title;
            
            relatedItem.appendChild(relatedDay);
            relatedItem.appendChild(relatedTitle);
            
            // Add click event to navigate to related day
            relatedItem.addEventListener('click', () => {
                selectDay(event.day);
            });
            
            relatedSection.appendChild(relatedItem);
        });
        
        eventList.appendChild(relatedSection);
    }
}

/**
 * Hide day detail panel
 */
function hideDayDetail() {
    const dayDetailPanel = document.getElementById('dayDetailPanel');
    if (dayDetailPanel) {
        dayDetailPanel.classList.remove('active');
        dayDetailPanel.setAttribute('aria-hidden', 'true');
        
        // Return focus to the selected day
        const selectedDay = document.querySelector('.calendar-day.selected');
        if (selectedDay) {
            selectedDay.focus();
        }
    }
}

/**
 * Filter calendar by category
 * @param {string} category - The category to filter by ('all' for all categories)
 */
function filterCalendarByCategory(category) {
    console.log('Filtering calendar by category:', category);
    const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
    
    if (category === 'all') {
        // Show all days with events
        calendarDays.forEach(day => {
            day.classList.remove('filtered-out');
        });
    } else {
        // Get days with events in the selected category
        const daysWithCategoryEvents = getDaysWithCategoryEvents(category);
        console.log('Days with category events:', daysWithCategoryEvents);
        
        // Filter days
        calendarDays.forEach(day => {
            const dayNumber = parseInt(day.getAttribute('data-day'), 10);
            
            if (daysWithCategoryEvents.includes(dayNumber)) {
                day.classList.remove('filtered-out');
                day.style.opacity = '1';
            } else {
                day.classList.add('filtered-out');
                day.style.opacity = '0.4';
            }
        });
    }
    
    // Add visual feedback for filtered state
    document.querySelector('.calendar-container').classList.add('filtered');
    setTimeout(() => {
        document.querySelector('.calendar-container').classList.remove('filtered');
    }, 500);
    
    // Update aria-live region to announce filter change
    const liveRegion = document.querySelector('.calendar-live-region');
    if (liveRegion) {
        const categoryName = category === 'all' ? 'All Events' : getEventCategory(category)?.name || category;
        liveRegion.textContent = `Calendar filtered by ${categoryName}`;
    }
}