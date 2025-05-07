document.addEventListener('DOMContentLoaded', () => {
    // Create loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    loadingAnimation.innerHTML = `
        <div class="loader" style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid var(--accent-color); border-radius: 50%; animation: spin 1s linear infinite;"></div>
    `;
    document.body.appendChild(loadingAnimation);

    // Add loading animation keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Remove loading animation
    setTimeout(() => {
        loadingAnimation.classList.add('hidden');
        setTimeout(() => loadingAnimation.remove(), 500);
    }, 800);

    // Sticky header
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const topHeader = document.querySelector('.top-header-area');
        if (scroll < 100) {
            topHeader.classList.remove('sticky');
        } else {
            topHeader.classList.add('sticky');
        }
    });

    // Mobile menu
    $('.main-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "992"
    });

    // Loader
    $(window).on('load', function () {
        $('.loader').fadeOut('slow');
    });

    const form = document.querySelector('#contactForm');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.contact-form-box, .form-group, .form-title');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
            observer.observe(element);
        });
    }

    // Initialize animations
    document.addEventListener('DOMContentLoaded', () => {
        animateOnScroll();
    });

    // Phone number formatting
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Form validation and submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            let isValid = true;
            let errorMessages = [];

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    errorMessages.push(`${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`);
                    showError(input);
                } else {
                    removeError(input);
                    if (input.type === 'email' && !validateEmail(input.value)) {
                        isValid = false;
                        errorMessages.push('Please enter a valid email address');
                        showError(input, 'Please enter a valid email address');
                    }
                    if (input.name === 'phone' && !validatePhone(input.value)) {
                        isValid = false;
                        errorMessages.push('Please enter a valid phone number');
                        showError(input, 'Please enter a valid phone number');
                    }
                }
            });

            if (isValid) {
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        showSuccess();
                        form.reset();
                    } else {
                        throw new Error('Failed to send message');
                    }
                } catch (error) {
                    showError(submitBtn, 'Failed to send message. Please try again.');
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            } else {
                showFormErrors(errorMessages);
            }
        });
    }

    // Helper functions
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(phone);
    }

    function showError(element, message = '') {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message || `${element.name} is required`;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        removeError(element);
        
        element.parentElement.appendChild(errorDiv);
        element.style.borderColor = '#e74c3c';

        requestAnimationFrame(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        });
    }

    function removeError(element) {
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.style.opacity = '0';
            existingError.style.transform = 'translateY(-10px)';
            setTimeout(() => existingError.remove(), 300);
        }
        element.style.borderColor = '';
    }

    function showFormErrors(messages) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.style.cssText = `
            background-color: #fff3f3;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;

        const errorList = document.createElement('ul');
        errorList.style.cssText = `
            color: #e74c3c;
            margin-left: 1.5rem;
            margin-bottom: 0;
        `;

        messages.forEach(message => {
            const li = document.createElement('li');
            li.textContent = message;
            errorList.appendChild(li);
        });

        errorContainer.appendChild(errorList);
        
        const form = document.querySelector('#contactForm');
        const existingErrors = form.querySelector('.form-errors');
        if (existingErrors) {
            existingErrors.remove();
        }
        form.insertBefore(errorContainer, form.firstChild);

        requestAnimationFrame(() => {
            errorContainer.style.opacity = '1';
            errorContainer.style.transform = 'translateY(0)';
        });
    }

    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Message sent successfully!
        `;
        successDiv.style.cssText = `
            color: #2ecc71;
            padding: 1rem;
            margin-top: 1rem;
            text-align: center;
            background-color: #d4edda;
            border-radius: 10px;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        const form = document.querySelector('#contactForm');
        form.appendChild(successDiv);
        
        requestAnimationFrame(() => {
            successDiv.style.opacity = '1';
            successDiv.style.transform = 'translateY(0)';
        });
        
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
    }
});