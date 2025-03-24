document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });

    // Cursor
    const cursor = document.querySelector('#cursor');
    const cursor2 = document.querySelector('#cursor2');
    const cursor3 = document.querySelector('#cursor3');
    
    // Only enable custom cursor for non-touch devices
    if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
            cursor2.style.left = e.pageX + 'px';
            cursor2.style.top = e.pageY + 'px';
            cursor3.style.left = e.pageX + 'px';
            cursor3.style.top = e.pageY + 'px';
        });
        
        document.querySelectorAll('.hover-target').forEach((item) => {
            item.addEventListener('mouseover', () => {
                cursor.classList.add('hover');
                cursor2.classList.add('hover');
                cursor3.classList.add('hover');
            });
            item.addEventListener('mouseout', () => {
                cursor.classList.remove('hover');
                cursor2.classList.remove('hover');
                cursor3.classList.remove('hover');
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursor.style.display = 'none';
        cursor2.style.display = 'none';
        cursor3.style.display = 'none';
    }

    // Section Toggles
    const aboutText = document.querySelector('.about-text');
    const contactText = document.querySelector('.contact-text');
    const skillsBtn = document.querySelector('.skills-btn');
    const projectsBtn = document.querySelector('.projects-btn');
    
    const aboutSection = document.querySelector('.about-section');
    const contactSection = document.querySelector('.contact-section');
    const skillsSection = document.querySelector('.skills-section');
    const projectsSection = document.querySelector('.projects-section');
    
    const aboutClose = document.querySelector('.about-close');
    const contactClose = document.querySelector('.contact-close');
    const skillsClose = document.querySelector('.skills-close');
    const projectsClose = document.querySelector('.projects-close');
    
    const body = document.querySelector("body");
    
    let aboutTyped = false;
    
    // About Section
    aboutText.addEventListener('click', () => {
        body.classList.add("about-on");
        if (!aboutTyped) {
            new Typed(".about-me", {
                strings: ["I am a python developer with dynamic and enthusiastic person, looking for the job of Web Designers and Development. A person with firm belief in my own abilities, and also a team player who thrives in a challenging environment and a smart worker. I have a 6 months experience as an intern at Stackup Learning-Hub. I'm well-versed in numerous programming languages including C programming, C++, HTML5, CSS, Bootstrap5, JavaScript, MySQL, MongoDB, Python, Django framework and have a full passion for the field."],
                typeSpeed: 10,
                backSpeed: false,
                loop: false,
                showCursor: false
            });
            aboutTyped = true;
        }
    });
    
    // Contact Section
    contactText.addEventListener('click', () => {
        body.classList.add("contact-on");
    });
    
    // Skills Section
    skillsBtn.addEventListener('click', () => {
        body.classList.add("skills-on");
        animateSkillBars();
    });
    
    // Projects Section
    projectsBtn.addEventListener('click', () => {
        body.classList.add("projects-on");
    });
    
    // Close Buttons
    aboutClose.addEventListener('click', () => {
        body.classList.remove("about-on");    
    });
    
    contactClose.addEventListener('click', () => {
        body.classList.remove("contact-on");
    });
    
    skillsClose.addEventListener('click', () => {
        body.classList.remove("skills-on");
    });
    
    projectsClose.addEventListener('click', () => {
        body.classList.remove("projects-on");
    });
    
    // Close sections when clicking outside content
    [aboutSection, contactSection, skillsSection, projectsSection].forEach(section => {
        section.addEventListener('click', (e) => {
            if (e.target === section) {
                body.classList.remove("about-on", "contact-on", "skills-on", "projects-on");
            }
        });
    });

    // Typing Animation for Contact Section
    new Typed(".typing", {
        strings: ["Connect with me :)", "Let's work together!", "Get in touch!"],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });

    // Skill Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skillbar');
        
        skillBars.forEach(skillbar => {
            const skillbarBar = skillbar.querySelector('.skillbar-bar');
            const percent = skillbar.getAttribute('data-percent');
            
            // Reset width to 0 before animating
            skillbarBar.style.width = '0%';
            
            // Use requestAnimationFrame for smoother animation
            let start = null;
            const duration = 1500;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                skillbarBar.style.width = `${progress * parseInt(percent)}%`;
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project Card Animation
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        projectObserver.observe(card);
    });

    // Responsive adjustments
    function handleResponsiveChanges() {
        if (window.innerWidth <= 768) {
            // Mobile layout adjustments
            document.querySelectorAll('.about-text, .contact-text').forEach(el => {
                el.style.position = 'static';
                el.style.writingMode = 'horizontal-tb';
                el.style.transform = 'none';
                el.style.margin = '20px auto';
                el.style.textAlign = 'center';
            });
            
            document.querySelectorAll('.hero-section p span').forEach(el => {
                el.style.display = 'block';
                el.style.margin = '10px auto';
            });
        } else {
            // Desktop layout
            document.querySelectorAll('.about-text, .contact-text').forEach(el => {
                el.style.position = 'fixed';
                el.style.writingMode = 'vertical-rl';
                el.style.margin = '0';
                el.style.textAlign = 'left';
            });
            
            document.querySelectorAll('.hero-section p span').forEach(el => {
                el.style.display = 'inline-block';
                el.style.margin = '0 15px';
            });
        }
    }

    // Initialize responsive adjustments
    handleResponsiveChanges();
    
    // Update on window resize
    window.addEventListener('resize', handleResponsiveChanges);
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') {
            body.classList.remove("about-on", "contact-on", "skills-on", "projects-on");
        }
    });

    // Touch device detection and adjustments
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
        
        // Increase tap targets for mobile
        document.querySelectorAll('.hover-target').forEach(el => {
            el.style.padding = '15px';
            el.style.minWidth = '48px';
            el.style.minHeight = '48px';
        });
    }
});
