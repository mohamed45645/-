// Handle sidebar category clicks
document.querySelectorAll('.services-list li, .experience-list li').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.services-list li, .experience-list li').forEach(el => {
            el.style.color = '';
        });
        // Add active style to clicked item
        this.style.color = '#6a0dad';
        this.style.fontWeight = 'bold';
    });
});

// Handle search
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        console.log('Searching for:', searchTerm);
        // You can add search logic here
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value;
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
        }
    }
});

// Handle profile button clicks
document.querySelectorAll('.profile-link').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Opening profile...');
        // You can add navigation logic here
    });
});

// Handle hire button
const hireBtn = document.querySelector('.hire-btn');
hireBtn.addEventListener('click', function() {
    console.log('Hire button clicked');
    // You can add hire logic here
});

// Handle profile icon click
const profileBtn = document.querySelector('.profile-btn');
profileBtn.addEventListener('click', function() {
    console.log('Profile menu opened');
    // You can add profile menu logic here
});

// Add smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Animation on scroll for freelancer cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.5s ease-in forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.freelancer-card').forEach(card => {
    observer.observe(card);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Handle dropdown menu for Services
const servicesLink = document.querySelector('.nav-link');
servicesLink.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Services dropdown clicked');
});

// Responsive menu toggle
let menuOpen = false;
const toggleMenu = function() {
    menuOpen = !menuOpen;
    const nav = document.querySelector('.nav');
    if (menuOpen) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
};
