// Animationen für LD Commerce Solutions Website

document.addEventListener('DOMContentLoaded', () => {
    // Scroll-Animationen für Service-Cards
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutImage = document.querySelector('.about-image');
    const contactForm = document.querySelector('.contact-form');
    
    // Intersection Observer für Scroll-Animationen
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else if (entry.target.classList.contains('about-image')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('contact-form')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            }
        });
    }, observerOptions);
    
    // Beobachte Service-Cards
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Beobachte About-Image
    if (aboutImage) {
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'translateX(-30px)';
        aboutImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(aboutImage);
    }
    
    // Beobachte Contact-Form
    if (contactForm) {
        contactForm.style.opacity = '0';
        contactForm.style.transform = 'translateX(30px)';
        contactForm.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactForm);
    }
    
    // Parallax-Effekt für Hero-Bereich (optimiert)
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.5;
                    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Lazy Loading für alle Bilder
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback für ältere Browser
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
    
    // Counter Animation für Statistiken (falls vorhanden)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        observer.observe(counter);
    });
    
    // Hover-Effekt für Buttons erweitern (optimiert)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        // Preload transform property for better performance
        btn.style.willChange = 'transform';
        
        let hoverTimeout;
        btn.addEventListener('mouseenter', (e) => {
            clearTimeout(hoverTimeout);
            btn.style.transform = 'scale(1.05)';
            btn.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        btn.addEventListener('mouseleave', (e) => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 10);
        });
        
        // Touch support for mobile
        btn.addEventListener('touchstart', (e) => {
            btn.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', (e) => {
            btn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Form Input Animation
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Theme transition enhancement
    document.addEventListener('themechange', (e) => {
        const theme = e.detail.theme;
        // Add transition class for smoother theme changes
        document.documentElement.classList.add('theme-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 500);
    });
});

// Smooth scroll to element
function smoothScrollTo(element, duration = 600) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const ease = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Export für globale Nutzung
window.animateScroll = smoothScrollTo;