// Mobile Menu Toggle with Animation
document.querySelector('.mobile-menu')?.addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
    
    // Add animation to menu items
    if (nav.classList.contains('show')) {
        const menuItems = nav.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
        });
    } else {
        const menuItems = nav.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.animation = `slideOutRight 0.3s ease forwards ${index * 0.1}s`;
        });
    }
});

// Smooth Scrolling with Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Add pulse animation to target section
            targetElement.style.animation = 'pulse 0.5s ease';
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Remove animation after completion
            setTimeout(() => {
                targetElement.style.animation = '';
            }, 500);
            
            // Close mobile menu after clicking
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// Form submission handling with Animation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add submit animation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> সফলভাবে পাঠানো হয়েছে!';
            submitBtn.style.background = 'var(--secondary)';
            
            // Show success message with animation
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>ধন্যবাদ!</h3>
                    <p>আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                </div>
            `;
            document.body.appendChild(successMsg);
            
            // Animate success message
            setTimeout(() => {
                successMsg.classList.add('show');
            }, 100);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMsg.classList.remove('show');
                setTimeout(() => {
                    successMsg.remove();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 300);
            }, 3000);
            
        }, 1500);
    });
});

// Enhanced Gallery Lightbox with Animations
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            font-size: 1.5rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
            this.style.transform = 'rotate(90deg)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.1)';
            this.style.transform = 'rotate(0deg)';
        });
        
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Animate lightbox in
        setTimeout(() => {
            lightbox.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 10);
        
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        };
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        closeBtn.addEventListener('click', closeLightbox);
        
        // Add keyboard support
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escClose);
            }
        });
    });
});

// Scroll Animations for Elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.activity-card, .team-member, .gallery-item, .event-item, .section-title').forEach(el => {
        el.style.animation = 'fadeInUp 0.6s ease forwards';
        el.style.animationPlayState = 'paused';
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Parallax Effect for Hero Sections
function initParallax() {
    const heroSections = document.querySelectorAll('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroSections.forEach(hero => {
            hero.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Hover Animations for Cards
function initHoverAnimations() {
    const cards = document.querySelectorAll('.activity-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
    });
}

// Typing Animation for Hero Text
function initTypingAnimation() {
    const heroText = document.querySelector('.hero h2');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        heroText.style.borderRight = '2px solid var(--accent)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroText.style.borderRight = 'none';
            }
        };
        
        // Start typing after 1 second
        setTimeout(typeWriter, 1000);
    }
}

// Counter Animation for Statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Loading Animation
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="scout-logo">
                <i class="fas fa-compass fa-spin"></i>
            </div>
            <p>লোড হচ্ছে...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallax();
    initHoverAnimations();
    initTypingAnimation();
    initCounterAnimation();
    initLoadingAnimation();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(20px);
            }
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 159, 41, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(255, 159, 41, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 159, 41, 0);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0,0,0);
            }
            40%, 43% {
                transform: translate3d(0,-10px,0);
            }
            70% {
                transform: translate3d(0,-5px,0);
            }
            90% {
                transform: translate3d(0,-2px,0);
            }
        }
        
        .success-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10001;
            text-align: center;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .success-message.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .success-content i {
            font-size: 4rem;
            color: var(--secondary);
            margin-bottom: 20px;
        }
        
        .success-content h3 {
            color: var(--primary);
            margin-bottom: 10px;
        }
        
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .scout-logo i {
            font-size: 4rem;
            margin-bottom: 20px;
            color: var(--accent);
        }
        
        .loader-content p {
            font-size: 1.2rem;
            margin-top: 10px;
        }
        
        /* Enhanced hover effects */
        .btn {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        /* Floating animation for elements */
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        /* Shake animation for interactive elements */
        .shake:hover {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-5px);
            }
            75% {
                transform: translateX(5px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add floating animation to some elements
    document.querySelectorAll('.activity-card, .team-member').forEach((el, index) => {
        el.classList.add('floating');
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 99;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(20px)';
        }
    });
}

// Initialize scroll to top button
initScrollToTop();

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.style.color = "red";
      link.style.fontWeight = "700";
    }
  });
});
 // ফর্ম সাবমিশন হ্যান্ডলার
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            // ফর্ম ভ্যালিডেশন
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !phone || !subject || !message) {
                e.preventDefault();
                alert('দয়া করে সমস্ত প্রয়োজনীয় তথ্য প্রদান করুন।');
                return;
            }
            
            // ইমেইল ভ্যালিডেশন
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('দয়া করে একটি বৈধ ইমেইল ঠিকানা প্রদান করুন।');
                return;
            }
            
            // সফল বার্তা
            alert('আপনার বার্তা ইমেইল ক্লায়েন্টে পাঠানো হচ্ছে। দয়া করে ইমেইল সেন্ড বাটনে ক্লিক করুন।');
        });
        
        // মোবাইল মেনু টগল
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
            }
        });