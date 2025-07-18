// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroContent = document.getElementById('heroContent');
    const sections = document.querySelectorAll('.section, .hero');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Handle resume link
            if (targetId === '#resume') {
                window.open('https://github.com/Harshitakumari201/portfolio/raw/main/resume.pdf', '_blank');
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlight on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
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

    // Cursor tracking for hero section
    let mouseX = 0;
    let mouseY = 0;
    let xp = 0;
    let yp = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateHeroPosition() {
        if (heroContent) {
            xp += (mouseX - xp) / 12;
            yp += (mouseY - yp) / 12;
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (xp - centerX) * 0.01;
            const moveY = (yp - centerY) * 0.01;
            
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        requestAnimationFrame(updateHeroPosition);
    }

    updateHeroPosition();

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-category')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 500);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card, .contact-method');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Project card click effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });

    // Dynamic bubble generation
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDelay = Math.random() * 6 + 's';
        bubble.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        const size = Math.random() * 100 + 20;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        
        document.querySelector('.hero').appendChild(bubble);
        
        setTimeout(() => {
            bubble.remove();
        }, 6000);
    }

    // Create bubbles periodically
    setInterval(createBubble, 2000);

    // Background transition effects
    const body = document.body;
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Remove existing background classes
            body.classList.remove('bg-transition-blue', 'bg-transition-green', 'bg-transition-purple');
            
            // Add appropriate background class
            switch(section) {
                case 'skills':
                    body.classList.add('bg-transition-blue');
                    break;
                case 'projects':
                    body.classList.add('bg-transition-green');
                    break;
                case 'contact':
                    body.classList.add('bg-transition-purple');
                    break;
            }
        });
    });

    // Add hover effects to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Parallax effect for sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.social-btn, .resume-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});