// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For now, we'll just show a success message
                emailInput.value = '';
                showNotification('আপনার সাবস্ক্রিপশন সফল হয়েছে!', 'success');
            } else {
                showNotification('দয়া করে একটি বৈধ ইমেইল এড্রেস দিন।', 'error');
            }
        });
    }

    // Search Form Functionality
    const searchForms = document.querySelectorAll('.search-box');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Redirect to search results page with the search term
                window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
            } else {
                showNotification('দয়া করে অনুসন্ধানের জন্য কিছু লিখুন।', 'error');
            }
        });
    });

    // Category Filter Functionality
    const categoryFilter = document.querySelector('.category-filter select');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            if (selectedCategory) {
                // In a real application, you would filter posts based on the selected category
                // For now, we'll just redirect to a category page
                window.location.href = `category-${selectedCategory}.html`;
            }
        });
    }

    // Sort Filter Functionality
    const sortFilter = document.querySelector('.sort-filter select');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            const selectedSort = this.value;
            // In a real application, you would sort posts based on the selected option
            console.log(`Sorting by: ${selectedSort}`);
            // For demonstration, we'll just reload the page
            // window.location.reload();
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }

    // Add animation to elements when they come into view
    if ('IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animateObserver.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('animate');
        });
    }
});

// Notification Function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(notification);
    });
    
    notification.appendChild(closeBtn);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
    }
    
    .notification.success {
        background-color: #10b981;
    }
    
    .notification.error {
        background-color: #ef4444;
    }
    
    .notification.info {
        background-color: #3b82f6;
    }
    
    .notification-close {
        margin-left: 15px;
        cursor: pointer;
        font-size: 20px;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .animate-on-scroll.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .notification {
            left: 20px;
            right: 20px;
            min-width: auto;
            max-width: none;
        }
    }
`;

document.head.appendChild(notificationStyles); 