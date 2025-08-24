// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.program-card, .involvement-card, .stat, .contact-item, .work-item');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Contact form handling with Web3Forms
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.lastname || !data.email || !data.message || !data.subject) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Submit to Web3Forms via AJAX
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Thank you for your message! We\'ll get back to you within 24-48 hours.', 'success');
            this.reset(); // Clear the form
        } else {
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterBtn = document.querySelector('.newsletter-btn');

newsletterBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = newsletterInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate newsletter signup
    this.innerHTML = '<i class="fas fa-check"></i>';
    this.style.background = '#4CAF50';
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-arrow-right"></i>';
        this.style.background = 'var(--golden-yellow)';
        newsletterInput.value = '';
    }, 3000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Enhanced hover effects for cards
document.querySelectorAll('.program-card, .involvement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Newsletter input focus effect
if (newsletterInput) {
    newsletterInput.addEventListener('focus', function() {
        this.style.borderBottomColor = 'var(--golden-yellow)';
    });
    
    newsletterInput.addEventListener('blur', function() {
        this.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add skip link for accessibility
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
document.body.insertBefore(skipLink, document.body.firstChild);

// Add loading animation to page
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
    });
});



// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social media link hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Footer link hover effects
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--golden-yellow)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = 'rgba(255, 255, 255, 0.8)';
    });
});

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation state
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--golden-yellow) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Donation System with PayFast Integration
document.addEventListener('DOMContentLoaded', function() {
    // PayFast Configuration (will be loaded from server)
    let PAYFAST_CONFIG = null;

    // Donation amounts and their impact descriptions
    const DONATION_AMOUNTS = {
        50: {
            impact: 'Feeds a family for 2 days',
            description: 'Provides essential dry goods for nutritious meals including rice, beans, and basic staples.',
            percentage: 25
        },
        100: {
            impact: 'Feeds a family for a week',
            description: 'Complete meal pack with variety of nutritious foods including protein sources and breakfast items.',
            percentage: 50
        },
        250: {
            impact: 'Feeds 3 families for a week',
            description: 'Multiple meal packs with protein and breakfast options, supporting multiple households.',
            percentage: 75
        },
        500: {
            impact: 'Feeds 5 families for a week',
            description: 'Comprehensive support including school feeding program and extended family assistance.',
            percentage: 100
        }
    };

    // Load PayFast configuration and initialize donation system
    loadPayFastConfig().then(() => {
    initDonationSystem();
    }).catch(error => {
        console.error('Failed to load PayFast configuration:', error);
        showNotification('Payment system is currently unavailable. Please try again later.', 'error');
    });

    async function loadPayFastConfig() {
        try {
            // Check if we're in development mode (localhost)
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            
            if (isLocalhost) {
                // For local development, use a mock configuration
                console.log('Running in development mode - using mock PayFast configuration');
                PAYFAST_CONFIG = {
                    merchant_id: '10000100', // Test merchant ID
                    merchant_key: '46f0cd694581a', // Test merchant key
                    return_url: window.location.origin + '/donation-success.html',
                    cancel_url: window.location.origin + '/donation-cancelled.html',
                    notify_url: window.location.origin + '/api/payfast-notify'
                };
                console.log('Mock PayFast configuration loaded for development');
                return;
            }
            
            // For production, load from API
            const response = await fetch('/api/payfast-config');
            
            if (!response.ok) {
                throw new Error('Failed to load PayFast configuration');
            }

            PAYFAST_CONFIG = await response.json();
            console.log('PayFast configuration loaded successfully');
        } catch (error) {
            console.error('Error loading PayFast configuration:', error);
            // Fallback to test configuration if API fails
            console.log('Falling back to test configuration');
            PAYFAST_CONFIG = {
                merchant_id: '10000100', // Test merchant ID
                merchant_key: '46f0cd694581a', // Test merchant key
                return_url: window.location.origin + '/donation-success.html',
                cancel_url: window.location.origin + '/donation-cancelled.html',
                notify_url: window.location.origin + '/api/payfast-notify'
            };
        }
    }

    function initDonationSystem() {
        const amountOptions = document.querySelectorAll('.amount-option');
        const customAmountInput = document.getElementById('customAmount');
        const customAmountBtn = document.getElementById('customAmountBtn');
        const selectedAmountDisplay = document.getElementById('selectedAmount');
        const impactDescription = document.getElementById('impactDescription');
        const impactFill = document.getElementById('impactFill');
        const impactText = document.getElementById('impactText');
        const donationForm = document.getElementById('donationForm');
        const submitButton = document.querySelector('.btn-donate-submit');

        let selectedAmount = 0;

        // Amount option selection
        amountOptions.forEach(option => {
            option.addEventListener('click', function() {
                const amount = parseInt(this.dataset.amount);
                selectAmount(amount);
            });
        });

        // Custom amount input
        customAmountInput.addEventListener('input', function() {
            const amount = parseInt(this.value) || 0;
            if (amount >= 10) {
                selectAmount(amount, true);
            } else {
                clearSelection();
            }
        });

        // Custom amount button
        customAmountBtn.addEventListener('click', function() {
            const amount = parseInt(customAmountInput.value) || 0;
            if (amount >= 10) {
                selectAmount(amount, true);
            } else {
                showNotification('Please enter an amount of at least R10.', 'error');
            }
        });

        // Custom amount focus - clear other selections
        customAmountInput.addEventListener('focus', function() {
            amountOptions.forEach(option => option.classList.remove('selected'));
        });

        function selectAmount(amount, isCustom = false) {
            selectedAmount = amount;
            
            // Update visual selection
            amountOptions.forEach(option => {
                option.classList.remove('selected');
                if (!isCustom && parseInt(option.dataset.amount) === amount) {
                    option.classList.add('selected');
                }
            });

            // Update displays
            selectedAmountDisplay.textContent = amount.toLocaleString();
            
            if (DONATION_AMOUNTS[amount]) {
                impactDescription.textContent = DONATION_AMOUNTS[amount].description;
            } else {
                impactDescription.textContent = `Your donation of R${amount} will help provide nutritious meals to families in need.`;
            }
            
            // Set the impact text to emphasize that every donation matters
            impactText.textContent = 'Every donation matters';

            // Enable submit button
            submitButton.disabled = false;
        }

        function clearSelection() {
            selectedAmount = 0;
            selectedAmountDisplay.textContent = '0';
            impactDescription.textContent = 'Select an amount above to see your impact';
            impactText.textContent = 'Every donation matters';
            amountOptions.forEach(option => option.classList.remove('selected'));
            submitButton.disabled = true;
        }

        function calculatePayFastFee(amount) {
            // PayFast fee structure: 3.5% + R2.00
            return (amount * 0.035) + 2.00;
        }

        // Form submission
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (selectedAmount < 10) {
                showNotification('Please select a donation amount of at least R10.', 'error');
                return;
            }

            // Validate form
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (!data.name || !data.email_address) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email_address)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Process donation
            processDonation(data);
        });

        async function processDonation(formData) {
            const submitButton = document.querySelector('.btn-donate-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitButton.disabled = true;

            // Prepare PayFast data - ensure all required fields are present
            const payfastData = {
                merchant_id: PAYFAST_CONFIG.merchant_id,
                merchant_key: PAYFAST_CONFIG.merchant_key,
                return_url: PAYFAST_CONFIG.return_url,
                cancel_url: PAYFAST_CONFIG.cancel_url,
                notify_url: PAYFAST_CONFIG.notify_url,
                name_first: formData.name.split(' ')[0] || formData.name,
                name_last: formData.name.split(' ').slice(1).join(' ') || 'N/A',
                email_address: formData.email_address,
                m_payment_id: generatePaymentId(),
                amount: selectedAmount.toFixed(2),
                item_name: `Donation to Seeds of Hope Queensburgh - R${selectedAmount}`,
                custom_str1: formData.custom_str1 || '',
                custom_str2: 'Donation',
                custom_str3: 'Seeds of Hope Website',
                custom_str4: new Date().toISOString(),
                custom_str5: window.location.href
            };

            // Remove any empty values to prevent signature issues
            Object.keys(payfastData).forEach(key => {
                if (payfastData[key] === '' || payfastData[key] === null || payfastData[key] === undefined) {
                    delete payfastData[key];
                }
            });

            try {
                // Generate signature
                payfastData.signature = await generatePayFastSignature(payfastData);

                // Submit to PayFast
                submitToPayFast(payfastData, submitButton, originalText);
            } catch (error) {
                console.error('Error processing donation:', error);
                showNotification('There was an error processing your donation. Please try again.', 'error');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        }

        function generatePaymentId() {
            return 'SOH_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        async function generatePayFastSignature(data) {
            try {
                const response = await fetch('/api/payfast-signature', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data })
                });

                if (!response.ok) {
                    throw new Error('Failed to generate signature');
                }

                const result = await response.json();
                return result.signature;
            } catch (error) {
                console.error('Error generating signature:', error);
                throw error;
            }
        }



        function submitToPayFast(data, submitButton, originalText) {
            // Create form for PayFast submission
            const form = document.createElement('form');
            form.method = 'POST';
            
            // Use sandbox URL for testing, live URL for production
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const payfastUrl = isLocalhost ? 
                'https://sandbox.payfast.co.za/eng/process' : 
                'https://www.payfast.co.za/eng/process';
            
            form.action = payfastUrl;
            form.style.display = 'none';

            // Add form fields
            Object.keys(data).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
            });

            // Add form to page and submit
            document.body.appendChild(form);
            
            // Debug: Log the form data being submitted
            console.log('Submitting to PayFast:', data);
            
            // Show success message before redirect
            showNotification('Redirecting to secure payment gateway...', 'success');
            
            setTimeout(() => {
                form.submit();
            }, 1500);
        }
    }


});
