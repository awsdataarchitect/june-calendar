/**
 * Image loading optimization for June Calendar Landing Page
 */

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Check if the browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the image is in the viewport
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Set the src attribute to the value of data-src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Set the srcset attribute to the value of data-srcset
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    // Add loaded class for fade-in effect
                    img.classList.add('loaded');
                    
                    // Stop observing the image
                    observer.unobserve(img);
                }
            });
        }, {
            // Options
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        // Select all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            // Add a placeholder class
            img.classList.add('lazy-image');
            
            // Start observing the image
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        loadImagesImmediately();
    }
}

/**
 * Fallback function to load all images immediately
 */
function loadImagesImmediately() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
        }
        
        img.classList.add('loaded');
    });
}

/**
 * Create responsive image with srcset
 * @param {string} basePath - Base path for the image
 * @param {string} filename - Image filename without extension
 * @param {string} extension - Image file extension
 * @param {Array} sizes - Array of sizes to generate srcset
 * @param {string} alt - Alt text for the image
 * @param {boolean} lazy - Whether to use lazy loading
 * @returns {HTMLImageElement} - The created image element
 */
function createResponsiveImage(basePath, filename, extension, sizes, alt, lazy = true) {
    const img = document.createElement('img');
    img.alt = alt || '';
    
    // Generate srcset
    const srcset = sizes.map(size => 
        `${basePath}/${filename}-${size}w.${extension} ${size}w`
    ).join(', ');
    
    // Set appropriate sizes attribute
    img.sizes = '(max-width: 768px) 100vw, 50vw';
    
    if (lazy) {
        // For lazy loading, set data attributes
        img.dataset.src = `${basePath}/${filename}-${sizes[0]}w.${extension}`;
        img.dataset.srcset = srcset;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"%3E%3C/svg%3E';
        img.classList.add('lazy-image');
    } else {
        // For immediate loading
        img.src = `${basePath}/${filename}-${sizes[0]}w.${extension}`;
        img.srcset = srcset;
    }
    
    return img;
}

/**
 * Optimize background images with responsive loading
 */
function optimizeBackgroundImages() {
    const bgElements = document.querySelectorAll('[data-bg]');
    
    if ('IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgUrl = element.dataset.bg;
                    
                    // Create a new image to preload
                    const preloadImg = new Image();
                    
                    // When image is loaded, apply it as background
                    preloadImg.onload = () => {
                        element.style.backgroundImage = `url('${bgUrl}')`;
                        element.classList.add('bg-loaded');
                    };
                    
                    preloadImg.src = bgUrl;
                    
                    // Stop observing
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });
        
        // Observe all elements with data-bg attribute
        bgElements.forEach(element => {
            bgObserver.observe(element);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        bgElements.forEach(element => {
            const bgUrl = element.dataset.bg;
            element.style.backgroundImage = `url('${bgUrl}')`;
        });
    }
}

/**
 * Initialize image optimization
 */
function initImageOptimization() {
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Optimize background images
    optimizeBackgroundImages();
    
    // Add event listener for window load to check for any missed images
    window.addEventListener('load', () => {
        // Check for any images that might have been missed
        const missedImages = document.querySelectorAll('img.lazy-image:not(.loaded)');
        if (missedImages.length > 0) {
            missedImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                
                img.classList.add('loaded');
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initImageOptimization);