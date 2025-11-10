// ===========================
// PRELOADER
// ===========================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    // Add active class to body to prevent scrolling
    body.classList.add('preloader-active');
    
    // Hide preloader after minimum display time (2.5 seconds)
    setTimeout(() => {
        preloader.classList.add('fade-out');
        body.classList.remove('preloader-active');
        
        // Remove preloader from DOM after fade out
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2500);
});

// ===========================
// HERO BANNER CAROUSEL SLIDER
// ===========================

let currentSlide = 1;
let isAnimating = false;
const totalSlides = 3;
const slideInterval = 5000; // 5 seconds
let autoplayTimer;

// Get DOM elements
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

// Function to change slide
function changeSlide(slideNumber, direction = 'next') {
    if (isAnimating || slideNumber === currentSlide) return;
    
    isAnimating = true;
    
    const currentSlideEl = document.querySelector('.hero-slide.active');
    const nextSlideEl = document.querySelector(`[data-slide="${slideNumber}"]`);
    
    // Remove active class from current indicator
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Add active class to new indicator
    indicators[slideNumber - 1].classList.add('active');
    
    // Apply zoom-out animation to current slide
    currentSlideEl.classList.add('zoom-out');
    
    // After zoom-out, switch slides
    setTimeout(() => {
        currentSlideEl.classList.remove('active', 'zoom-out');
        nextSlideEl.classList.add('active', 'zoom-in');
        
        currentSlide = slideNumber;
        
        // Remove zoom-in class after animation
        setTimeout(() => {
            nextSlideEl.classList.remove('zoom-in');
            isAnimating = false;
        }, 1200);
    }, 600);
}

// Next slide function
function nextSlide() {
    const next = currentSlide === totalSlides ? 1 : currentSlide + 1;
    changeSlide(next, 'next');
}

// Previous slide function
function prevSlide() {
    const prev = currentSlide === 1 ? totalSlides : currentSlide - 1;
    changeSlide(prev, 'prev');
}

// Auto-play functionality
function startAutoplay() {
    stopAutoplay(); // Clear any existing timer
    autoplayTimer = setInterval(nextSlide, slideInterval);
}

function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
    }
}

// Event listeners with autoplay restart
if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
});

if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
});

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        changeSlide(index + 1);
        startAutoplay();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        startAutoplay();
    }
    if (e.key === 'ArrowRight') {
        nextSlide();
        startAutoplay();
    }
});

// Auto-play functionality
function startAutoplay() {
    stopAutoplay(); // Clear any existing timer
    autoplayTimer = setInterval(nextSlide, slideInterval);
}

function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
    }
}

// Start autoplay on page load
startAutoplay();

// Pause on hover
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', startAutoplay);
}

// ===========================
// NAVIGATION FUNCTIONALITY
// ===========================

const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

// Scroll effect on header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && mainNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
    }
});

// ===========================
// HERO BANNER PARALLAX SCROLLING EFFECTS
// ===========================

// Parallax layers
const parallaxLayers = document.querySelectorAll('.parallax-layer');
const floatingCoconuts = document.querySelectorAll('.floating-coconut');
const palmLeaves = document.querySelectorAll('.palm-leaf');
const heroContent = document.querySelector('.hero-parallax-content');

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero-banner-parallax')?.offsetHeight || 0;
    
    if (scrolled <= heroHeight) {
        // Background layer moves slower
        palmLeaves.forEach((leaf, index) => {
            const speed = 0.3 + (index * 0.1);
            leaf.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Mid layer coconuts move at medium speed
        floatingCoconuts.forEach((coconut, index) => {
            const speed = 0.5 + (index * 0.15);
            coconut.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Content moves slightly
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.8;
        }
    }
});

// Card tilt effect on mouse move
const previewCards = document.querySelectorAll('.preview-card');

previewCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Animate title lines on load
window.addEventListener('load', () => {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'slideInLeft 0.8s ease-out forwards';
        }, index * 200);
    });
});

// ===========================
// SCROLL ANIMATIONS (AOS)
// ===========================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Trigger animations for elements already in viewport
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.slide.active [data-aos]');
        heroElements.forEach(el => el.classList.add('aos-animate'));
    }, 300);
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (in production, you'd send this to a server)
    alert(`Thank you for your message, ${data.name}! We'll get back to you soon at ${data.email}.`);
    
    // Reset form
    contactForm.reset();
});

// Form validation - add visual feedback
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#E0E0E0';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--leaf-green)';
    });
});

// ===========================
// NEWSLETTER FORM HANDLING
// ===========================

const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Show success message
    alert(`Thank you for subscribing! We'll send updates to ${email}.`);
    
    // Reset form
    newsletterForm.reset();
});

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// SEARCH BUTTON FUNCTIONALITY
// ===========================

const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    // In production, this would open a search modal or redirect to search page
    alert('Search functionality coming soon!');
});

// ===========================
// PRODUCT & BLOG CARD ANIMATIONS
// ===========================

// Add hover sound effect or visual feedback (optional)
const cards = document.querySelectorAll('.product-card, .blog-card, .feature-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===========================
// LAZY LOADING FOR IMAGES
// ===========================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// ===========================
// CTA BUTTON INTERACTIONS
// ===========================

const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Scroll to products section
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = productsSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// BROCHURE DOWNLOAD
// ===========================

const brochureBtn = document.querySelector('.btn-brochure');

if (brochureBtn) {
    brochureBtn.addEventListener('click', () => {
        // In production, this would trigger a PDF download
        alert('Brochure download will start shortly. (In production, this would download a PDF file)');
    });
}

// ===========================
// PRODUCT LINK INTERACTIONS
// ===========================

const productLinks = document.querySelectorAll('.product-link');

productLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = link.closest('.product-card').querySelector('h3').textContent;
        alert(`Viewing details for: ${productName}\n(In production, this would navigate to the product detail page)`);
    });
});

// ===========================
// BLOG READ MORE INTERACTIONS
// ===========================

const blogReadMoreLinks = document.querySelectorAll('.blog-read-more');

blogReadMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blogTitle = link.closest('.blog-card').querySelector('h3').textContent;
        alert(`Opening blog post: ${blogTitle}\n(In production, this would navigate to the full blog post)`);
    });
});

// ===========================
// PARALLAX EFFECT FOR BACKGROUNDS
// ===========================

function parallaxEffect() {
    const scrolled = window.pageYOffset;
    
    // Apply parallax to hero slider backgrounds
    const activeSlide = document.querySelector('.slide.active .slide-bg');
    if (activeSlide) {
        activeSlide.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

window.addEventListener('scroll', parallaxEffect);

// ===========================
// COUNTER ANIMATION FOR EXPERIENCE SECTION
// ===========================

function animateCounter() {
    const experienceNumber = document.querySelector('.experience-number');
    const targetNumber = 31;
    let currentNumber = 0;
    const increment = targetNumber / 60; // 60 frames
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        currentNumber = targetNumber;
                        clearInterval(counter);
                    }
                    experienceNumber.textContent = Math.floor(currentNumber) + '+';
                }, 16); // ~60fps
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (experienceNumber) {
        observer.observe(experienceNumber);
    }
}

// Initialize counter animation
animateCounter();

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Add keyboard navigation for dropdown menus
const dropdowns = document.querySelectorAll('.nav-dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Trap focus in mobile menu when open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap when mobile menu is active
const mobileMenuObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
            trapFocus(mainNav);
        }
    });
});

if (mainNav) {
    mobileMenuObserver.observe(mainNav, { attributes: true, attributeFilter: ['class'] });
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedParallax = debounce(parallaxEffect, 10);
window.addEventListener('scroll', debouncedParallax);

// ===========================
// CONSOLE BRANDING
// ===========================

console.log(
    '%c🥥 CocoLux - Premium Coconut Products 🥥',
    'font-size: 24px; font-weight: bold; color: #8B5E3C; background: #FFF9F3; padding: 15px 30px; border-radius: 10px;'
);
console.log(
    '%c31+ Years of Excellence',
    'font-size: 16px; color: #3C7A3C; font-weight: bold; padding: 5px;'
);
console.log(
    '%cInterested in our code? Visit our website or contact us!',
    'font-size: 12px; font-style: italic; color: #666;'
);

// ===========================
// INITIALIZE ON LOAD
// ===========================

window.addEventListener('load', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.slide.active [data-aos]');
        heroElements.forEach(el => {
            el.classList.add('aos-animate');
        });
    }, 100);
    
    console.log('CocoLux website fully loaded and initialized! 🌴');
});

// ===========================
// BROWSER COMPATIBILITY CHECK
// ===========================

// ===========================
// FEATURE CARDS - FLIP INTERACTIONS
// ===========================

function initFeatureCardFlip() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        // Toggle on click (for touch devices)
        card.addEventListener('click', (e) => {
            // Prevent clicks on links inside card from toggling
            if (e.target.closest('a, button')) return;
            card.classList.toggle('is-flipped');
        });

        // Keyboard accessibility: Enter/Space toggles
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('is-flipped');
            }
        });
    });
}

// Initialize feature flips after DOMReady
document.addEventListener('DOMContentLoaded', initFeatureCardFlip);

function checkBrowserCompatibility() {
    const isIE = /MSIE|Trident/.test(window.navigator.userAgent);
    
    if (isIE) {
        alert('For the best experience, please use a modern browser like Chrome, Firefox, Safari, or Edge.');
    }
}

checkBrowserCompatibility();
