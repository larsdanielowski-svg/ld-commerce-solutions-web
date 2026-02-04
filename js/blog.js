// Blog Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Filter by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const categoryValue = this.getAttribute('data-category');
            
            // Filter blog cards
            filterBlogCards(categoryValue, searchInput.value.toLowerCase());
        });
    });
    
    // Search functionality
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', function() {
            const activeCategory = document.querySelector('.category-btn.active');
            const categoryValue = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
            filterBlogCards(categoryValue, searchInput.value.toLowerCase());
        });
        
        // Search on enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const activeCategory = document.querySelector('.category-btn.active');
                const categoryValue = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
                filterBlogCards(categoryValue, this.value.toLowerCase());
            }
        });
        
        // Search on input change with debounce
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const activeCategory = document.querySelector('.category-btn.active');
                const categoryValue = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
                filterBlogCards(categoryValue, this.value.toLowerCase());
            }, 300);
        });
    }
    
    // Filter function
    function filterBlogCards(category, searchTerm = '') {
        blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
            
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch = !searchTerm || title.includes(searchTerm) || excerpt.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Read more links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.blog-card');
            const title = card.querySelector('h3').textContent;
            alert(`Artikel "${title}" würde hier in einem realen System geöffnet werden.`);
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email.trim()) {
                alert('Bitte geben Sie eine E-Mail-Adresse ein.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            alert(`Vielen Dank für Ihre Anmeldung mit der E-Mail: ${email}`);
            this.reset();
        });
    }
    
    // Pagination buttons
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const direction = this.textContent.includes('Vorherige') ? 'previous' : 'next';
            alert(`${direction === 'previous' ? 'Vorherige' : 'Nächste'} Seite wird geladen...`);
        });
    });
    
    // Page numbers
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(number => {
        if (!number.classList.contains('page-dots')) {
            number.addEventListener('click', function() {
                // Remove active class from all numbers
                pageNumbers.forEach(n => n.classList.remove('active'));
                
                // Add active class to clicked number
                this.classList.add('active');
                
                // In a real system, this would load the corresponding page
                const pageNum = this.textContent;
                if (pageNum !== '...') {
                    alert(`Seite ${pageNum} wird geladen...`);
                }
            });
        }
    });
    
    // Contact form handling (same as portfolio)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            
            if (!name.trim()) {
                alert('Bitte geben Sie Ihren Namen ein.');
                return;
            }
            
            alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
            this.reset();
        });
    }
    
    // Mobile menu toggle (if not already in main.js)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && !document.querySelector('script[src="js/main.js"]')) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    }
});