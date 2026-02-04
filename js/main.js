// Main JavaScript für LD Commerce Solutions Website

document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Dark Mode System
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    const themeText = themeToggle?.querySelector('.theme-text');
    
    // System preferences detection with fallback
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
    
    // Get saved theme with timestamp for auto-reset option
    const savedTheme = localStorage.getItem('theme');
    const savedTimestamp = localStorage.getItem('themeTimestamp');
    const now = new Date().getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    // Check if saved theme is too old (optional auto-reset)
    let useSavedTheme = true;
    if (savedTimestamp && (now - parseInt(savedTimestamp)) > oneWeek) {
        // Auto-reset to system preference after 1 week
        useSavedTheme = false;
    }
    
    // Determine initial theme
    let currentTheme;
    if (useSavedTheme && savedTheme) {
        currentTheme = savedTheme;
    } else {
        // Respect OS preference
        if (prefersDarkScheme.matches) {
            currentTheme = 'dark';
        } else if (prefersLightScheme.matches) {
            currentTheme = 'light';
        } else {
            // No preference detected, default to light
            currentTheme = 'light';
        }
        // Save system preference as initial
        localStorage.setItem('theme', currentTheme);
        localStorage.setItem('themeTimestamp', now.toString());
    }
    
    // Apply theme with smooth transition
    function applyTheme(theme, animate = true) {
        if (animate) {
            document.documentElement.style.transition = 'none';
            document.documentElement.setAttribute('data-theme', theme);
            // Force reflow
            document.documentElement.offsetHeight;
            document.documentElement.style.transition = '';
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        // Update toggle button
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        if (themeText) {
            themeText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        localStorage.setItem('themeTimestamp', new Date().getTime().toString());
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: theme } 
        }));
    }
    
    // Initial theme application
    applyTheme(currentTheme, false);
    
    // Theme toggle functionality with enhanced animations
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Enhanced button animation
            themeToggle.style.transform = 'scale(0.95) rotate(5deg)';
            themeToggle.style.boxShadow = '0 0 20px rgba(0, 180, 216, 0.5)';
            
            setTimeout(() => {
                themeToggle.style.transform = '';
                themeToggle.style.boxShadow = '';
            }, 300);
            
            // Apply new theme
            applyTheme(newTheme);
            
            // Show subtle notification for accessibility
            if (window.innerWidth > 768) {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 90px;
                    right: 20px;
                    background: ${newTheme === 'dark' ? '#1a1a1a' : '#ffffff'};
                    color: ${newTheme === 'dark' ? '#f0f0f0' : '#1a1a1a'};
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    transform: translateY(-10px);
                    opacity: 0;
                    transition: all 0.3s ease;
                `;
                notification.textContent = newTheme === 'dark' ? '🌙 Dark Mode aktiviert' : '☀️ Light Mode aktiviert';
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.transform = 'translateY(0)';
                    notification.style.opacity = '1';
                }, 10);
                
                // Remove after delay
                setTimeout(() => {
                    notification.style.transform = 'translateY(-10px)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 2000);
            }
        });
    }
    
    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            // Only auto-switch if user hasn't manually set a preference
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle mobile menu
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            
            // Add animation class
            if (!isVisible) {
                navLinks.classList.add('mobile-visible');
            } else {
                navLinks.classList.remove('mobile-visible');
            }
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('mobile-visible');
                }
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('mobile-visible');
                }
            });
        });
    }
    
    // Contact form handling (generic for all forms)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Bitte füllen Sie alle Felder aus.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Simulate form submission
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Wird gesendet...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.includes('://')) {
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, href);
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === 'index.html' && linkHref === '#home') ||
                (currentPage === '' && linkHref === '#home')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize active nav
    updateActiveNav();
    
    // Update nav on hash change
    window.addEventListener('hashchange', updateActiveNav);
    
    // Responsive behavior for nav
    function handleResponsiveNav() {
        if (window.innerWidth > 768) {
            if (navLinks) {
                navLinks.style.display = 'flex';
                navLinks.classList.remove('mobile-visible');
            }
        } else {
            if (navLinks && !navLinks.classList.contains('mobile-visible')) {
                navLinks.style.display = 'none';
            }
        }
    }
    
    // Initialize responsive nav
    handleResponsiveNav();
    
    // Update on resize
    window.addEventListener('resize', handleResponsiveNav);
    
    // Add CSS for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background: var(--white);
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                display: none;
                z-index: 999;
            }
            
            .nav-links.mobile-visible {
                display: flex !important;
                animation: slideDown 0.3s ease;
            }
            
            .nav-links li {
                margin: 10px 0;
                width: 100%;
            }
            
            .nav-links a {
                display: block;
                padding: 10px;
                border-bottom: 1px solid #eee;
                width: 100%;
            }
            
            .nav-links a:last-child {
                border-bottom: none;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    `;
    document.head.appendChild(style);
});

// Initialize on page load
window.addEventListener('load', () => {
    // Lazy load hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        // Create a new image to preload the background
        const img = new Image();
        img.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=1920&ixlib=rb-4.0.3';
        img.onload = () => {
            hero.classList.add('loaded');
        };
        img.onerror = () => {
            // Fallback if image fails to load
            console.warn('Hero background failed to load, using fallback');
            hero.classList.add('loaded');
        };
        
        // Set a timeout as fallback
        setTimeout(() => {
            hero.classList.add('loaded');
        }, 3000);
    }
    
    // Initialize performance optimizations
    initializePerformanceOptimizations();
});

// Performance optimizations
function initializePerformanceOptimizations() {
    // Add loading="lazy" to any future images
    document.querySelectorAll('img').forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
    });
    
    // Defer non-critical CSS
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Load non-critical resources here
        });
    }
    
    // Preconnect to external domains
    const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com',
        'https://images.unsplash.com'
    ];
    
    preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // Preload critical resources
    const preloadResources = [
        { href: '/css/style.css', as: 'style' },
        { href: '/js/main.js', as: 'script' }
    ];
    
    preloadResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}