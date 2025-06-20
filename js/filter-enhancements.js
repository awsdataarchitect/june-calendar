/**
 * Fix for category filters
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying filter fixes');
    
    // Get all category filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    if (!categoryFilters.length) {
        console.error('No category filters found');
        return;
    }
    
    console.log(`Found ${categoryFilters.length} category filters`);
    
    // Remove existing click listeners (this is a bit aggressive but necessary)
    categoryFilters.forEach(filter => {
        const newFilter = filter.cloneNode(true);
        filter.parentNode.replaceChild(newFilter, filter);
    });
    
    // Get the fresh filters
    const freshFilters = document.querySelectorAll('.category-filter');
    
    // Add new click listeners
    freshFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('Filter clicked:', category);
            
            // If this filter is already active, reset to 'all'
            if (this.classList.contains('active') && category !== 'all') {
                console.log('Resetting to all events');
                const allFilter = document.querySelector('.category-filter[data-category="all"]');
                if (allFilter) {
                    // Remove active class from all filters
                    freshFilters.forEach(f => f.classList.remove('active'));
                    
                    // Add active class to 'all' filter
                    allFilter.classList.add('active');
                    
                    // Filter by 'all'
                    resetAllFilters();
                }
                return;
            }
            
            // Don't do anything else if this filter is already active
            if (this.classList.contains('active')) {
                return;
            }
            
            // Remove active class from all filters
            freshFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Filter calendar days based on category
            if (category === 'all') {
                resetAllFilters();
            } else {
                applyFilter(category);
            }
        });
    });
    
    // Function to reset all filters
    function resetAllFilters() {
        console.log('Resetting all filters');
        
        // Show all days with events
        const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
        calendarDays.forEach(day => {
            day.classList.remove('filtered-out');
            day.style.opacity = '1';
        });
        
        // Add visual feedback
        const calendarContainer = document.querySelector('.calendar-container');
        if (calendarContainer) {
            calendarContainer.classList.add('filtered');
            setTimeout(() => {
                calendarContainer.classList.remove('filtered');
            }, 500);
        }
        
        // Update aria-live region
        const liveRegion = document.querySelector('.calendar-live-region');
        if (liveRegion) {
            liveRegion.textContent = 'Calendar showing all events';
        }
    }
    
    // Function to apply a filter
    function applyFilter(category) {
        console.log('Applying filter:', category);
        
        // Get days with events in the selected category
        const daysWithCategoryEvents = getDaysWithCategoryEvents(category);
        console.log('Days with category events:', daysWithCategoryEvents);
        
        // Filter days
        const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
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
        
        // Add visual feedback
        const calendarContainer = document.querySelector('.calendar-container');
        if (calendarContainer) {
            calendarContainer.classList.add('filtered');
            setTimeout(() => {
                calendarContainer.classList.remove('filtered');
            }, 500);
        }
        
        // Update aria-live region
        const liveRegion = document.querySelector('.calendar-live-region');
        if (liveRegion) {
            const categoryName = getEventCategory(category)?.name || category;
            liveRegion.textContent = `Calendar filtered by ${categoryName}`;
        }
    }
});