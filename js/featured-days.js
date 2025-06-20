/**
 * Static replacement for featured days section
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Replacing featured days with static content');
    
    // Replace the featured days section with static content
    const featuredSection = document.querySelector('.featured-days');
    if (!featuredSection) {
        console.error('Featured days section not found');
        return;
    }
    
    // Replace with static HTML
    featuredSection.innerHTML = `
        <div class="container">
            <h2 class="featured-days-title">Featured Days in June</h2>
            <div class="static-featured-grid">
                <!-- Juneteenth -->
                <div class="static-featured-card">
                    <div class="static-featured-image juneteenth-bg">
                        <div class="static-featured-date">June 19</div>
                    </div>
                    <div class="static-featured-content">
                        <h4 class="static-featured-title">Juneteenth</h4>
                        <p class="static-featured-description">Commemorates the emancipation of enslaved African Americans in the United States.</p>
                        <a href="#calendar" class="static-featured-link" data-day="19">Learn more</a>
                    </div>
                </div>
                
                <!-- Summer Solstice -->
                <div class="static-featured-card">
                    <div class="static-featured-image solstice-bg">
                        <div class="static-featured-date">June 21</div>
                    </div>
                    <div class="static-featured-content">
                        <h4 class="static-featured-title">Summer Solstice</h4>
                        <p class="static-featured-description">The longest day of the year in the Northern Hemisphere, marking the start of summer.</p>
                        <a href="#calendar" class="static-featured-link" data-day="21">Learn more</a>
                    </div>
                </div>
                
                <!-- Flag Day -->
                <div class="static-featured-card">
                    <div class="static-featured-image flag-day-bg">
                        <div class="static-featured-date">June 14</div>
                    </div>
                    <div class="static-featured-content">
                        <h4 class="static-featured-title">Flag Day (USA)</h4>
                        <p class="static-featured-description">Commemorates the adoption of the flag of the United States on June 14, 1777.</p>
                        <a href="#calendar" class="static-featured-link" data-day="14">Learn more</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add click events to the "Learn more" links
    const learnMoreLinks = featuredSection.querySelectorAll('.static-featured-link');
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const day = parseInt(this.getAttribute('data-day'), 10);
            navigateToDay(day);
        });
    });
    
    // Add click events to the cards
    const featuredCards = featuredSection.querySelectorAll('.static-featured-card');
    featuredCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const link = this.querySelector('.static-featured-link');
            if (e.target !== link && !link.contains(e.target)) {
                const day = parseInt(link.getAttribute('data-day'), 10);
                navigateToDay(day);
            }
        });
    });
    
    function navigateToDay(day) {
        // Scroll to calendar section
        document.getElementById('calendar').scrollIntoView({ behavior: 'smooth' });
        
        // Show day detail after a short delay
        setTimeout(() => {
            const dayCell = document.querySelector(`.calendar-day[data-day="${day}"]`);
            if (dayCell) {
                dayCell.click();
            }
        }, 500);
    }
});