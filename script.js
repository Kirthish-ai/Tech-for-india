// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const fellowshipForm = document.getElementById('fellowshipForm');
    if (fellowshipForm) {
        fellowshipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(fellowshipForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            // Validate form data
            if (validateForm(formDataObj)) {
                // Show loading state
                const submitButton = fellowshipForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;

                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showNotification('Application submitted successfully! We will contact you soon.', 'success');
                    
                    // Reset form
                    fellowshipForm.reset();
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    }

    // Make Apply Now button in navigation functional
    const applyNowButtons = document.querySelectorAll('.cta-button');
    applyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const applicationForm = document.getElementById('application-form');
            if (applicationForm) {
                applicationForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Form validation function
function validateForm(formData) {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        showNotification('Please enter a valid Indian phone number', 'error');
        return false;
    }

    // Validate date of birth (must be at least 18 years old)
    const dob = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18 || age > 35) {
        showNotification('You must be between 18 and 35 years old to apply', 'error');
        return false;
    }

    // Validate graduation year
    const graduationYear = parseInt(formData.graduationYear);
    const currentYear = new Date().getFullYear();
    if (graduationYear < 2020 || graduationYear > currentYear) {
        showNotification('Please enter a valid graduation year', 'error');
        return false;
    }

    // Validate percentage/CGPA
    const percentage = parseFloat(formData.percentage);
    if (percentage < 0 || percentage > 100) {
        showNotification('Please enter a valid percentage/CGPA', 'error');
        return false;
    }

    // Validate statement of purpose length
    if (formData.statement.length < 100) {
        showNotification('Statement of purpose must be at least 100 characters long', 'error');
        return false;
    }

    return true;
}

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '4px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease-out';

    // Set background color based on type
    notification.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';

    // Add to document
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 