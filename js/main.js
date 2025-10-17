        // All the JavaScript code from the previous implementation
        // Loading Page Functionality
        window.addEventListener('load', function() {
            const loadingPage = document.getElementById('loading-page');
            setTimeout(() => {
                loadingPage.style.opacity = '0';
                setTimeout(() => {
                    loadingPage.style.display = 'none';
                }, 500);
            }, 1500);
        });

        // Enhanced Mobile Menu Toggle with Color Animation
        function initMobileMenu() {
            const mobileMenuBtn = document.querySelector('.mobile-menu');
            const nav = document.querySelector('nav ul');
            
            if (!mobileMenuBtn || !nav) return;
            
            mobileMenuBtn.addEventListener('click', function() {
                const isShowing = nav.classList.contains('show');
                
                nav.classList.toggle('show');
                this.classList.toggle('active');
                
                // Animate menu items with color transitions
                const menuItems = nav.querySelectorAll('li a');
                if (!isShowing) {
                    menuItems.forEach((item, index) => {
                        item.style.animation = `fadeInColor 0.4s ease forwards ${index * 0.1}s`;
                        item.style.opacity = '1';
                    });
                } else {
                    menuItems.forEach((item, index) => {
                        item.style.animation = `fadeOutColor 0.3s ease forwards ${index * 0.1}s`;
                    });
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('show')) {
                    nav.classList.remove('show');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        }

        // Optimized Smooth Scrolling with Color Highlight
        function initSmoothScroll() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#' || !targetId) return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (!targetElement) return;
                    
                    e.preventDefault();
                    
                    // Add color highlight animation to target section
                    targetElement.style.animation = 'colorHighlight 1.2s ease';
                    
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Remove animation after completion
                    setTimeout(() => {
                        targetElement.style.animation = '';
                    }, 1200);
                    
                    // Close mobile menu if open
                    const nav = document.querySelector('nav ul');
                    const mobileMenuBtn = document.querySelector('.mobile-menu');
                    if (nav && nav.classList.contains('show')) {
                        nav.classList.remove('show');
                        mobileMenuBtn?.classList.remove('active');
                    }
                });
            });
        }

        // Enhanced Form Handling with Color Feedback
        function initFormHandling() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                // Real-time validation with color feedback
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('blur', validateField);
                    input.addEventListener('input', clearFieldError);
                    
                    // Add focus color effect
                    input.addEventListener('focus', function() {
                        this.style.borderColor = 'var(--accent)';
                        this.style.boxShadow = '0 0 0 2px rgba(231, 111, 81, 0.1)';
                    });
                    
                    input.addEventListener('blur', function() {
                        this.style.boxShadow = 'none';
                    });
                });
                
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    if (!validateForm(this)) return;
                    
                    const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    const originalBg = submitBtn.style.background;
                    
                    // Show loading state with color change
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
                    submitBtn.style.background = 'var(--secondary)';
                    submitBtn.style.transform = 'scale(0.95)';
                    
                    try {
                        await simulateAPICall();
                        
                        // Success color feedback
                        submitBtn.style.background = '#27ae60';
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> সফল!';
                        
                        showColorMessage('success', 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে!');
                        this.reset();
                        
                    } catch (error) {
                        // Error color feedback
                        submitBtn.style.background = '#e74c3c';
                        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> আবার চেষ্টা করুন';
                        showColorMessage('error', 'দুঃখিত, কিছু সমস্যা হয়েছে।');
                    } finally {
                        // Restore button state
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.style.background = originalBg;
                            submitBtn.style.transform = '';
                        }, 2000);
                    }
                });
            });
        }

        // Color-based Form Validation
        function validateField(e) {
            const field = e.target;
            const value = field.value.trim();
            
            clearFieldError(field);
            
            let isValid = true;
            let errorMessage = '';
            
            // Remove any existing color classes
            field.classList.remove('valid', 'invalid');
            
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'এই ঘরটি পূরণ করা আবশ্যক';
            } else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'সঠিক ইমেইল ঠিকানা লিখুন';
                }
            } else if (field.name === 'phone' && value) {
                const phoneRegex = /^(?:\+88|01)?\d{11}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    errorMessage = 'সঠিক মোবাইল নম্বর লিখুন';
                }
            }
            
            if (isValid && value) {
                field.classList.add('valid');
                field.style.borderColor = '#27ae60';
            } else if (!isValid) {
                field.classList.add('invalid');
                field.style.borderColor = '#e74c3c';
                showFieldError(field, errorMessage);
            } else {
                field.style.borderColor = '';
            }
            
            return isValid;
        }

        function clearFieldError(e) {
            const field = e.target || e;
            field.style.borderColor = '';
            field.classList.remove('invalid');
            
            const errorElement = field.parentNode.querySelector('.field-error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }

        function validateForm(form) {
            let isValid = true;
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                const event = new Event('blur');
                input.dispatchEvent(event);
                if (input.classList.contains('invalid')) {
                    isValid = false;
                }
            });
            
            return isValid;
        }

        // Color-only Message System
        function showColorMessage(type, message) {
            const messageEl = document.createElement('div');
            messageEl.className = `color-message ${type}-message`;
            messageEl.innerHTML = `
                <div class="message-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(messageEl);
            
            // Animate in with color
            setTimeout(() => {
                messageEl.classList.add('show');
            }, 100);
            
            // Auto remove
            setTimeout(() => {
                messageEl.classList.remove('show');
                setTimeout(() => {
                    messageEl.remove();
                }, 300);
            }, 3000);
        }

        // Active Navigation with Color Highlight
        function initActiveNav() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('nav a[href]');
            
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                
                if (linkPage === currentPage || 
                    (currentPage === '' && linkPage === 'index.html') ||
                    (currentPage === 'index.html' && linkPage === '')) {
                    
                    link.classList.add('active');
                    link.style.color = 'var(--accent)';
                    link.style.fontWeight = '700';
                }
                
                // Add hover color effects
                link.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('active')) {
                        this.style.color = 'var(--secondary)';
                        this.style.backgroundColor = 'transparent';
                    }
                });
                
                link.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active')) {
                        this.style.color = '';
                    }
                });
            });
        }

        // Enhanced Gallery with Color Overlay
        function initGalleryLightbox() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                // Add color overlay on hover
                item.addEventListener('mouseenter', function() {
                    const overlay = this.querySelector('.gallery-overlay') || createGalleryOverlay(this);
                    overlay.style.backgroundColor = 'rgba(44, 85, 48, 0.8)';
                });
                
                item.addEventListener('mouseleave', function() {
                    const overlay = this.querySelector('.gallery-overlay');
                    if (overlay) {
                        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    }
                });
                
                item.addEventListener('click', function() {
                    const imgSrc = this.querySelector('img').src;
                    const imgAlt = this.querySelector('img').alt || 'Gallery Image';
                    createColorLightbox(imgSrc, imgAlt);
                });
            });
        }

        function createColorLightbox(imgSrc, imgAlt) {
            if (document.querySelector('.lightbox')) return;
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <button class="lightbox-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Color animation for lightbox
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightbox.querySelector('img').style.transform = 'scale(1)';
            }, 10);
            
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                lightbox.querySelector('img').style.transform = 'scale(0.8)';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            };
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
            
            document.addEventListener('keydown', function escClose(e) {
                if (e.key === 'Escape') closeLightbox();
            });
        }

        // Color-based Scroll Animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.background = 'linear-gradient(45deg, transparent, rgba(44, 85, 48, 0.03), transparent)';
                        
                        // Add subtle color pulse
                        entry.target.style.animation = 'colorPulse 2s ease';
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.activity-card, .team-member, .event-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
        }

        // Back to Top Button
        function initBackToTop() {
            const backToTopBtn = document.querySelector('.back-to-top');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Utility Functions
        function simulateAPICall() {
            return new Promise((resolve) => {
                setTimeout(resolve, 1500);
            });
        }

        function showFieldError(field, message) {
            let errorElement = field.parentNode.querySelector('.field-error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                field.parentNode.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function createGalleryOverlay(item) {
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = '<i class="fas fa-search-plus"></i>';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2rem;
                transition: all 0.3s ease;
                opacity: 0;
            `;
            
            item.style.position = 'relative';
            item.appendChild(overlay);
            
            // Show overlay on hover
            item.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
            
            return overlay;
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            initMobileMenu();
            initSmoothScroll();
            initFormHandling();
            initGalleryLightbox();
            initScrollAnimations();
            initActiveNav();
            initBackToTop();
        });

        // ===== Responsive Nav Toggle =====
        document.addEventListener('DOMContentLoaded', () => {
          const toggle = document.querySelector('.mobile-menu');
          const links = document.querySelector('.nav-links');

          if (toggle && links) {
            toggle.addEventListener('click', (e) => {
              e.stopPropagation();
              links.classList.toggle('show');
              toggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
              if (!e.target.closest('.site-nav')) {
                links.classList.remove('show');
                toggle.classList.remove('active');
              }
            });
          }
        });
// In your initializeGallery function, modify the image creation part:
function initializeGallery() {
    // Update image count
    document.getElementById('imageCount').textContent = galleryData.images.length;
    
    // Populate image gallery
    const imageGallery = document.getElementById('imageGallery');
    galleryData.images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.alt}" loading="lazy" 
                 onerror="this.src='../images/placeholder.jpg'; this.alt='ছবিটি লোড করতে সমস্যা হচ্ছে'">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        imageGallery.appendChild(galleryItem);
    });

    // ... rest of your code
}