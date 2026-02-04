// Main JavaScript für LD Commerce Solutions Website

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    const themeText = themeToggle?.querySelector('.theme-text');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || 'light';
    const currentTheme = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches) ? 'dark' : 'light';
    
    // Apply theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Light';
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle button
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
            if (themeText) {
                themeText.textContent = newTheme === 'dark' ? 'Light' : 'Dark';
            }
            
            // Add subtle animation
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        });
    }
    
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
    // Any additional initialization code
});