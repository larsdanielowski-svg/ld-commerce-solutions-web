// Newsletter Signup mit Animationen

class NewsletterSignup {
    constructor() {
        this.form = null;
        this.modal = null;
        this.init();
    }
    
    init() {
        this.createModal();
        this.setupEventListeners();
        this.showAfterDelay();
    }
    
    createModal() {
        // Modal Container
        this.modal = document.createElement('div');
        this.modal.className = 'newsletter-modal';
        this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        `;
        
        // Modal Content
        const modalContent = document.createElement('div');
        modalContent.className = 'newsletter-content';
        modalContent.style.cssText = `
            background: var(--card-bg);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: translateY(30px);
            transition: transform 0.4s ease;
        `;
        
        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'newsletter-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-color);
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
        `;
        closeBtn.addEventListener('click', () => this.hide());
        
        // Title
        const title = document.createElement('h2');
        title.textContent = 'Exklusive Einblicke erhalten';
        title.style.cssText = `
            color: var(--primary-color);
            margin-bottom: 15px;
            font-size: 1.8rem;
        `;
        
        // Description
        const description = document.createElement('p');
        description.textContent = 'Bleiben Sie auf dem Laufenden mit den neuesten E-Commerce Trends, exklusiven Angeboten und wertvollen Insights.';
        description.style.cssText = `
            color: var(--text-color);
            margin-bottom: 25px;
            line-height: 1.6;
        `;
        
        // Form
        this.form = document.createElement('form');
        this.form.className = 'newsletter-form';
        this.form.innerHTML = `
            <div class="form-group">
                <input type="email" placeholder="Ihre E-Mail-Adresse" required style="
                    width: 100%;
                    padding: 15px;
                    border: 2px solid var(--input-border);
                    border-radius: 8px;
                    font-size: 1rem;
                    background: var(--input-bg);
                    color: var(--text-color);
                    transition: all 0.3s ease;
                ">
                <span class="validation-message" style="
                    display: block;
                    margin-top: 5px;
                    font-size: 0.9rem;
                    color: #ef4444;
                    min-height: 20px;
                "></span>
            </div>
            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" required style="width: auto;">
                    <span style="font-size: 0.9rem; color: var(--text-color);">
                        Ich stimme den Datenschutzbestimmungen zu und möchte den Newsletter erhalten.
                    </span>
                </label>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 15px; margin-top: 15px;">
                <span class="btn-text">Jetzt anmelden</span>
                <div class="loading-spinner" style="display: none;"></div>
            </button>
        `;
        
        // Success Message
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter-success';
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #10b981; margin-bottom: 20px;"></i>
                <h3 style="color: var(--text-color); margin-bottom: 10px;">Erfolgreich angemeldet!</h3>
                <p style="color: var(--text-secondary);">Vielen Dank für Ihre Anmeldung. Sie erhalten in Kürze eine Bestätigungsmail.</p>
            </div>
        `;
        successMessage.style.display = 'none';
        
        // Append everything
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(title);
        modalContent.appendChild(description);
        modalContent.appendChild(this.form);
        modalContent.appendChild(successMessage);
        this.modal.appendChild(modalContent);
        document.body.appendChild(this.modal);
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e, successMessage));
        
        // Input styling on focus
        const emailInput = this.form.querySelector('input[type="email"]');
        emailInput.addEventListener('focus', () => {
            emailInput.style.borderColor = 'var(--secondary-color)';
            emailInput.style.boxShadow = '0 0 0 3px var(--input-focus)';
        });
        emailInput.addEventListener('blur', () => {
            emailInput.style.borderColor = '';
            emailInput.style.boxShadow = '';
        });
    }
    
    setupEventListeners() {
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.visibility === 'visible') {
                this.hide();
            }
        });
    }
    
    showAfterDelay() {
        // Show after 10 seconds if not already shown today
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem('newsletterLastShown');
        
        if (lastShown !== today) {
            setTimeout(() => {
                this.show();
                localStorage.setItem('newsletterLastShown', today);
            }, 10000); // 10 seconds
        }
    }
    
    show() {
        this.modal.style.opacity = '1';
        this.modal.style.visibility = 'visible';
        setTimeout(() => {
            const content = this.modal.querySelector('.newsletter-content');
            content.style.transform = 'translateY(0)';
        }, 10);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    hide() {
        const content = this.modal.querySelector('.newsletter-content');
        content.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            this.modal.style.opacity = '0';
            this.modal.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    async handleSubmit(e, successMessage) {
        e.preventDefault();
        
        const emailInput = this.form.querySelector('input[type="email"]');
        const checkbox = this.form.querySelector('input[type="checkbox"]');
        const validationMessage = this.form.querySelector('.validation-message');
        const submitBtn = this.form.querySelector('button');
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Enhanced Validation
        let isValid = true;
        validationMessage.textContent = '';
        emailInput.style.borderColor = '';
        
        // Email validation with regex
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            validationMessage.textContent = 'Bitte geben Sie eine E-Mail-Adresse ein.';
            emailInput.style.borderColor = '#ef4444';
            this.shakeElement(emailInput);
            isValid = false;
        } else if (!emailRegex.test(email)) {
            validationMessage.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@example.com).';
            emailInput.style.borderColor = '#ef4444';
            this.shakeElement(emailInput);
            isValid = false;
        } else if (email.length > 254) {
            validationMessage.textContent = 'Die E-Mail-Adresse darf maximal 254 Zeichen lang sein.';
            emailInput.style.borderColor = '#ef4444';
            this.shakeElement(emailInput);
            isValid = false;
        }
        
        // Checkbox validation
        if (!checkbox.checked) {
            validationMessage.textContent = 'Bitte akzeptieren Sie die Datenschutzbestimmungen, um fortzufahren.';
            this.shakeElement(checkbox.parentElement);
            isValid = false;
        }
        
        // Domain validation (common disposable emails)
        const disposableDomains = ['tempmail.com', 'throwaway.com', 'guerrillamail.com', 'mailinator.com'];
        const domain = email.split('@')[1];
        if (domain && disposableDomains.some(d => domain.includes(d))) {
            validationMessage.textContent = 'Bitte verwenden Sie eine permanente E-Mail-Adresse.';
            emailInput.style.borderColor = '#f59e0b';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading with animation
        submitBtn.disabled = true;
        const originalText = btnText.textContent;
        btnText.textContent = 'Wird verarbeitet...';
        
        // Add loading animation
        submitBtn.style.position = 'relative';
        const loadingSpinner = document.createElement('div');
        loadingSpinner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 24px;
            height: 24px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
        submitBtn.appendChild(loadingSpinner);
        
        // Add CSS animation if not exists
        if (!document.querySelector('#loading-spinner-style')) {
            const style = document.createElement('style');
            style.id = 'loading-spinner-style';
            style.textContent = `
                @keyframes spin {
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Simulate API call with real-time feedback
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success
        this.form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Hide modal after 3 seconds
        setTimeout(() => {
            this.hide();
        }, 3000);
        
        // Reset form with smooth animation
        setTimeout(() => {
            this.form.style.display = 'block';
            successMessage.style.display = 'none';
            emailInput.value = '';
            checkbox.checked = false;
            submitBtn.disabled = false;
            btnText.textContent = 'Jetzt anmelden';
            
            // Remove loading spinner
            const spinner = submitBtn.querySelector('div[style*="animation: spin"]');
            if (spinner) spinner.remove();
            
            // Success animation for form reset
            this.form.style.animation = 'none';
            setTimeout(() => {
                this.form.style.animation = 'fadeInUp 0.6s ease';
            }, 10);
        }, 3500);
    }
    
    shakeElement(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'shake 0.5s ease';
        }, 10);
        
        // Add shake animation if not exists
        if (!document.querySelector('#shake-animation-style')) {
            const style = document.createElement('style');
            style.id = 'shake-animation-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if user hasn't subscribed
    const hasSubscribed = localStorage.getItem('newsletterSubscribed');
    if (!hasSubscribed) {
        const newsletter = new NewsletterSignup();
        
        // Also show on scroll if not shown yet
        let shownByScroll = false;
        window.addEventListener('scroll', () => {
            if (!shownByScroll && window.scrollY > window.innerHeight * 0.5) {
                const today = new Date().toDateString();
                const lastShown = localStorage.getItem('newsletterLastShown');
                if (lastShown !== today) {
                    newsletter.show();
                    localStorage.setItem('newsletterLastShown', today);
                    shownByScroll = true;
                }
            }
        });
        
        // Export for manual trigger
        window.showNewsletter = () => newsletter.show();
    }
});