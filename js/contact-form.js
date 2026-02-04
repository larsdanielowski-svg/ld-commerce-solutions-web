// Enhanced Contact Form Validation for LD Commerce Solutions

class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupMessageCounter();
        this.createFeedbackElement();
    }
    
    setupEventListeners() {
        // Real-time validation on input
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => this.validateField(e.target));
            input.addEventListener('blur', (e) => this.validateField(e.target));
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Privacy checkbox validation
        const privacyCheckbox = this.form.querySelector('#privacy');
        if (privacyCheckbox) {
            privacyCheckbox.addEventListener('change', () => this.validateField(privacyCheckbox));
        }
    }
    
    setupMessageCounter() {
        const messageField = this.form.querySelector('#message');
        const counter = this.form.querySelector('#message-counter');
        
        if (messageField && counter) {
            messageField.addEventListener('input', () => {
                const length = messageField.value.length;
                const minLength = parseInt(messageField.getAttribute('minlength') || 20);
                const remaining = Math.max(0, minLength - length);
                
                if (length < minLength) {
                    counter.textContent = `Noch ${remaining} Zeichen benötigt`;
                    counter.style.color = '#ef4444';
                } else {
                    counter.textContent = `${length} Zeichen (Mindestlänge erreicht)`;
                    counter.style.color = '#10b981';
                }
            });
        }
    }
    
    validateField(field) {
        const formGroup = field.closest('.form-group') || field.closest('.form-check');
        const errorElement = document.getElementById(`${field.id}-error`);
        
        if (!formGroup) return true;
        
        // Remove previous validation classes
        formGroup.classList.remove('success', 'error');
        
        // Check if field is valid
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Dieses Feld ist erforderlich';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
            }
        }
        
        // Phone validation (optional but must be valid if provided)
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{6,}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige Telefonnummer ein';
            }
        }
        
        // Message length validation
        if (field.id === 'message' && field.value.trim()) {
            const minLength = parseInt(field.getAttribute('minlength') || 20);
            if (field.value.length < minLength) {
                isValid = false;
                errorMessage = `Bitte geben Sie mindestens ${minLength} Zeichen ein`;
            }
        }
        
        // Select validation
        if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
            if (!field.value) {
                isValid = false;
                errorMessage = 'Bitte wählen Sie eine Option aus';
            }
        }
        
        // Checkbox validation (privacy)
        if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            isValid = false;
            errorMessage = 'Sie müssen den Datenschutzbestimmungen zustimmen';
        }
        
        // Apply validation state
        if (!isValid && field.value.trim() !== '') {
            formGroup.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
            return false;
        } else if (isValid && field.value.trim() !== '') {
            formGroup.classList.add('success');
            if (errorElement) {
                errorElement.textContent = '✓ Gültig';
            }
            return true;
        } else {
            if (errorElement) {
                errorElement.textContent = '';
            }
            return true;
        }
    }
    
    validateForm() {
        let isValid = true;
        
        const fields = this.form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            this.showFeedback('Bitte überprüfen Sie Ihre Eingaben', 'error');
            
            // Scroll to first error
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        submitBtn.classList.add('loading');
        btnText.textContent = 'Wird gesendet...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with real endpoint)
            await this.simulateApiCall(data);
            
            // Success
            this.showFeedback('Nachricht erfolgreich gesendet! Wir melden uns in Kürze bei Ihnen.', 'success');
            this.form.reset();
            
            // Reset message counter
            const counter = this.form.querySelector('#message-counter');
            if (counter) {
                counter.textContent = 'Mindestens 20 Zeichen';
                counter.style.color = '';
            }
            
        } catch (error) {
            // Error
            this.showFeedback('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
            console.error('Form submission error:', error);
            
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate random success/failure (90% success rate)
                if (Math.random() < 0.9) {
                    resolve({ success: true, message: 'Message sent successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }
    
    createFeedbackElement() {
        // Remove existing feedback element
        const existing = document.querySelector('.form-feedback');
        if (existing) existing.remove();
        
        // Create new feedback element
        this.feedbackElement = document.createElement('div');
        this.feedbackElement.className = 'form-feedback';
        this.feedbackElement.innerHTML = `
            <div class="feedback-icon"></div>
            <div class="feedback-content">
                <h4></h4>
                <p></p>
            </div>
        `;
        document.body.appendChild(this.feedbackElement);
    }
    
    showFeedback(message, type = 'success') {
        if (!this.feedbackElement) return;
        
        const icon = this.feedbackElement.querySelector('.feedback-icon');
        const title = this.feedbackElement.querySelector('h4');
        const text = this.feedbackElement.querySelector('p');
        
        // Set content based on type
        if (type === 'success') {
            this.feedbackElement.className = 'form-feedback success';
            icon.innerHTML = '<i class="fas fa-check-circle"></i>';
            title.textContent = 'Erfolg!';
            text.textContent = message;
        } else {
            this.feedbackElement.className = 'form-feedback error';
            icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            title.textContent = 'Fehler';
            text.textContent = message;
        }
        
        // Show with animation
        this.feedbackElement.classList.add('show');
        
        // Auto-hide after delay
        setTimeout(() => {
            this.feedbackElement.classList.remove('show');
        }, 5000);
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new ContactForm('contact-form');
    
    // Export for debugging
    window.ContactForm = ContactForm;
});