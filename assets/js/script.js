document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const infoItems = document.querySelectorAll('.info-item');

    // Add animation to info items on load
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Add floating label effect
    inputs.forEach(input => {
        if (input.value) {
            input.parentElement.classList.add('active');
        }

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('active');
            }
        });
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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        let errorMessages = [];

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                errorMessages.push(`${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`);
                showError(input);
            } else {
                removeError(input);
                // Email validation
                if (input.type === 'email' && !validateEmail(input.value)) {
                    isValid = false;
                    errorMessages.push('Please enter a valid email address');
                    showError(input, 'Please enter a valid email address');
                }
                // Phone validation
                if (input.name === 'phone' && !validatePhone(input.value)) {
                    isValid = false;
                    errorMessages.push('Please enter a valid phone number');
                    showError(input, 'Please enter a valid phone number');
                }
            }
        });

        if (isValid) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with your actual form submission logic)
                await new Promise(resolve => setTimeout(resolve, 1500));
                showSuccess();
                form.reset();
                inputs.forEach(input => input.parentElement.classList.remove('active'));
            } catch (error) {
                showError(submitBtn, 'Failed to send message. Please try again.');
            } finally {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }
        } else {
            showFormErrors(errorMessages);
        }
    });
});

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
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    removeError(element);
    
    element.parentElement.appendChild(errorDiv);
    element.style.borderColor = '#e74c3c';
}

function removeError(element) {
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    element.style.borderColor = '';
}

function showFormErrors(messages) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-errors';
    errorContainer.style.backgroundColor = '#fff3f3';
    errorContainer.style.padding = '1rem';
    errorContainer.style.borderRadius = '10px';
    errorContainer.style.marginBottom = '1rem';

    const errorList = document.createElement('ul');
    errorList.style.color = '#e74c3c';
    errorList.style.marginLeft = '1.5rem';

    messages.forEach(message => {
        const li = document.createElement('li');
        li.textContent = message;
        errorList.appendChild(li);
    });

    errorContainer.appendChild(errorList);
    
    const form = document.querySelector('.contact-form');
    const existingErrors = form.querySelector('.form-errors');
    if (existingErrors) {
        existingErrors.remove();
    }
    form.insertBefore(errorContainer, form.firstChild);
}

function showSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle" style="color: #2ecc71; margin-right: 8px;"></i>
        Message sent successfully!
    `;
    successDiv.style.color = '#2ecc71';
    successDiv.style.padding = '1rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.textAlign = 'center';
    successDiv.style.backgroundColor = '#d4edda';
    successDiv.style.borderRadius = '10px';
    successDiv.style.animation = 'slideIn 0.5s ease';
    
    const form = document.querySelector('.contact-form');
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 3000);
}