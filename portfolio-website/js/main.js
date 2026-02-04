// Smooth scroll reveal animation
document.addEventListener('DOMContentLoaded', function() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('section, .card, .project-card');
    
    const reveal = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    // Initial check
    reveal();
    
    // Check on scroll
    window.addEventListener('scroll', reveal);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);

    // Track project clicks for analytics (optional)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.querySelector('h3').textContent;
            console.log('Project clicked:', projectName);
            // You can add analytics tracking here
        });
    });

    // Add hover sound effect (optional - commented out by default)
    /*
    const cards = document.querySelectorAll('.card, .project-card, .skill-category');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle hover feedback
            this.style.transition = 'all 0.3s ease';
        });
    });
    */

    // Print friendly function
    window.addEventListener('beforeprint', function() {
        document.body.style.background = 'white';
        document.body.style.color = 'black';
    });

    window.addEventListener('afterprint', function() {
        document.body.style.background = '';
        document.body.style.color = '';
    });

    // Performance optimization - Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add active state to navigation if you add a nav menu later
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Copyright year auto-update
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; ${currentYear} Mariam Mohamed Eltras. All rights reserved.`;
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            console.log('ESC pressed');
        }
    });

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }

    // Add page visibility API for performance
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            console.log('Page hidden');
        } else {
            // Resume animations
            console.log('Page visible');
        }
    });
});

// Optional: Add a back to top button
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // You can add a back-to-top button here
    if (scrollTop > 300) {
        // Show button
    } else {
        // Hide button
    }
});

// Service Worker for offline capability (Progressive Web App)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        // }, function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}

// Console greeting for developers
console.log('%c👋 Hello Developer!', 'color: #E8B86D; font-size: 20px; font-weight: bold;');
console.log('%cThis portfolio was built with ❤️', 'color: #B8C5D6; font-size: 14px;');
console.log('%cInterested in hiring? Contact: Mariameltras@gmail.com', 'color: #F4D09B; font-size: 12px;');