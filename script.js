// Mobile Menu Toggle - Simplified and Optimized
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    // Single click handler for the menu button
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        const isOpen = navMenu.classList.contains('show');
        
        if (isOpen) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            navMenu.classList.add('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        }
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Close menu when clicking outside - optimized
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Prevent clicks inside menu from closing it (except links)
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Services Navigation - Optimized
const serviceNavLinks = document.querySelectorAll('.nav-link');
if (serviceNavLinks.length > 0) {
    serviceNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                serviceNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling - Optimized
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('formMessage');
        
        if (!formMessage) return;
        
        submitButton.disabled = true;
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            formMessage.textContent = 'Error sending message. Please call us at 067 403 1185.';
            formMessage.className = 'form-message error';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Smooth Scrolling for Anchor Links - Optimized
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.querySelectorAll('#currentYear').forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#navMenu a').forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    console.log('Sarah M Projects loaded successfully');
});
