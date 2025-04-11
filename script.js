 // Ensure DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkAnchors = document.querySelectorAll('.nav-links a');
    const downloadBtn = document.querySelector('.download-btn');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    // Hamburger Menu Toggle with Keyboard Support
    if (hamburger && navLinks) {
        const toggleMenu = () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isExpanded);
        };

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close Menu When Clicking Outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth Scrolling with Offset
    if (navLinkAnchors) {
        navLinkAnchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 60; // Adjust based on navbar height
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu on link click
                if (navLinks && hamburger) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Debounced Scroll Event for Performance
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    }

    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        navbar.classList.toggle('scrolled', scrollPosition > 50);

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinkAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100));

    // Fade-in Animation on Scroll
    const fadeSections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    fadeSections.forEach(section => observer.observe(section));

    // Download Button Hover Effect
    if (downloadBtn) {
        downloadBtn.addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty('--x', `${x}px`);
            e.currentTarget.style.setProperty('--y', `${y}px`);
        });
    }
});
