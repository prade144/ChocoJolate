// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav__link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(112, 63, 7, 1, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(112, 63, 7, 1)';
        header.style.boxShadow = 'none';
    }
});

// Contact Form Validation and Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Validation
    const errors = [];
    
    if (!name) {
        errors.push('Name is required');
    }
    
    if (!email) {
        errors.push('Email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!subject) {
        errors.push('Subject is required');
    }
    
    if (!message) {
        errors.push('Message is required');
    } else if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Clear previous error states
    clearFormErrors();
    
    if (errors.length > 0) {
        displayFormErrors(errors);
        return;
    }
    
    // Simulate form submission
    submitForm(name, email, subject, message);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Clear form errors
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => element.remove());
    
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.style.borderColor = '';
        control.classList.remove('error');
    });
}

// Display form errors
function displayFormErrors(errors) {
    errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--space-8)';
        errorDiv.textContent = error;
        
        // Insert error message at the top of the form
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
    });
}

// Simulate form submission
function submitForm(name, email, subject, message) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.background = 'rgba(var(--color-success-rgb), 0.1)';
        successDiv.style.color = 'var(--color-success)';
        successDiv.style.padding = 'var(--space-16)';
        successDiv.style.borderRadius = 'var(--radius-base)';
        successDiv.style.marginBottom = 'var(--space-16)';
        successDiv.style.border = '1px solid rgba(var(--color-success-rgb), 0.3)';
        successDiv.innerHTML = `
            <strong>Thank you, ${name}!</strong><br>
            Your message has been sent successfully. We'll get back to you within 24 hours.
        `;
        
        // Insert success message
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        // Reset form
        contactForm.reset();
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        
    }, 2000);
}

// Product card hover effects and fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide elements for animation
    const animatedElements = [
        ...productCards,
        ...featureCards,
        ...document.querySelectorAll('.about__content > *'),
        ...document.querySelectorAll('.contact__content > *')
    ];
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Hero CTA button interactions
document.addEventListener('DOMContentLoaded', () => {
    const shopNowBtn = document.querySelector('.hero__actions .btn--primary');
    const viewStoryBtn = document.querySelector('.hero__actions .btn--outline');
    
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            const productsSection = document.getElementById('products');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = productsSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
    
    if (viewStoryBtn) {
        viewStoryBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
});

// Product category button interactions with proper notifications
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.product-card .btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const categoryName = button.closest('.product-card').querySelector('.product-card__title').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'category-notification';
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background: var(--color-surface);
                color: var(--color-text);
                padding: var(--space-24);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                max-width: 400px;
                text-align: center;
                border: 2px solid var(--color-chocolate-dark);
                opacity: 0;
                transition: all 0.3s ease;
            `;
            
            notification.innerHTML = `
                <div style="font-size: 48px; margin-bottom: var(--space-16);">🍫</div>
                <h3 style="color: var(--color-chocolate-dark); margin-bottom: var(--space-12); font-family: 'Playfair Display', serif;">${categoryName}</h3>
                <p style="color: var(--color-text-secondary); margin-bottom: var(--space-20); line-height: 1.6;">
                    Thank you for your interest in our ${categoryName.toLowerCase()}! Our online store is coming soon.
                </p>
                <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--space-20);">
                    In the meantime, please contact us for custom orders and availability.
                </p>
                <button class="close-notification btn btn--primary" style="margin-right: var(--space-8);">Close</button>
                <button class="contact-us-btn btn btn--outline">Contact Us</button>
            `;
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'notification-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(overlay);
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                overlay.style.opacity = '1';
                notification.style.opacity = '1';
                notification.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            
            // Close notification function
            const closeNotification = () => {
                overlay.style.opacity = '0';
                notification.style.opacity = '0';
                notification.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => {
                    if (document.body.contains(overlay)) document.body.removeChild(overlay);
                    if (document.body.contains(notification)) document.body.removeChild(notification);
                }, 300);
            };
            
            // Event listeners for close
            notification.querySelector('.close-notification').addEventListener('click', closeNotification);
            overlay.addEventListener('click', closeNotification);
            
            // Contact us button
            notification.querySelector('.contact-us-btn').addEventListener('click', () => {
                closeNotification();
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            });
        });
    });
});

// Shopping cart interaction
document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelector('.nav__cart');
    
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            // Create a simple cart dropdown notification
            const cartNotification = document.createElement('div');
            cartNotification.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-base);
                padding: var(--space-16);
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                min-width: 200px;
                text-align: center;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            `;
            cartNotification.innerHTML = `
                <p style="margin: 0; color: var(--color-text-secondary);">Your cart is empty</p>
                <p style="margin: var(--space-8) 0 0 0; font-size: var(--font-size-sm); color: var(--color-text-secondary);">Start shopping to add items!</p>
            `;
            
            // Position relative to cart button
            cartButton.style.position = 'relative';
            cartButton.appendChild(cartNotification);
            
            // Animate in
            setTimeout(() => {
                cartNotification.style.opacity = '1';
                cartNotification.style.transform = 'translateY(0)';
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                cartNotification.style.opacity = '0';
                cartNotification.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (cartButton.contains(cartNotification)) {
                        cartButton.removeChild(cartNotification);
                    }
                }, 300);
            }, 3000);
        });
    }
});

// Add scroll-to-top functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--color-chocolate-dark);
        color: var(--color-cream-light);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.background = 'var(--color-chocolate-medium)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.background = 'var(--color-chocolate-dark)';
    });
});