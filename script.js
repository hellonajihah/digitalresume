// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Fade-in Animation on Scroll
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });


sections.forEach(section => observer.observe(section));

document.querySelector('.download-btn').addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
});

// Scroll-Activated Navigation Bar
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Link Indicator
document.addEventListener('DOMContentLoaded', function() {
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(function(link) {
        var linkPath = link.getAttribute('href');
        
        // Remove leading/trailing slashes for comparison
        var cleanCurrent = currentPath.replace(/^\/|\/$/g, '');
        var cleanLink = linkPath.replace(/^\/|\/$/g, '');
        
        if (cleanCurrent === cleanLink) {
            link.classList.add('active-link');
        }
    });
});

// Toggle mobile navigation menu
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

