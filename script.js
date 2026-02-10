// Handle sidebar category clicks
document.querySelectorAll('.services-list li, .experience-list li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.services-list li, .experience-list li').forEach(el => {
            el.style.color = '';
        });
        this.style.color = '#6a0dad';
        this.style.fontWeight = 'bold';
    });
});

// Handle search
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchFreelancers(searchTerm);
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
            searchFreelancers(searchTerm);
        }
    }
});

// Search functionality
function searchFreelancers(term) {
    const cards = document.querySelectorAll('.freelancer-card');
    const lowerTerm = term.toLowerCase();
    let count = 0;
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const title = card.querySelector('.title').textContent.toLowerCase();
        const skills = Array.from(card.querySelectorAll('.skill-badge')).map(s => s.textContent.toLowerCase()).join(' ');
        
        if (name.includes(lowerTerm) || title.includes(lowerTerm) || skills.includes(lowerTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
            count++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0.5';
        }
    });
    
    console.log(`Found ${count} freelancers matching "${term}"`);
}

// Handle profile button clicks
document.querySelectorAll('.profile-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const name = this.closest('.freelancer-card').querySelector('h3').textContent;
        alert(`سيتم فتح الملف الشخصي لـ: ${name}`);
    });
});

// Handle hire button
const hireBtn = document.querySelector('.hire-btn');
if (hireBtn) {
    hireBtn.addEventListener('click', function() {
        alert('انقر هنا لنشر مشروع جديد أو البحث عن عامل حر');
    });
}

// Handle profile icon click
const profileBtn = document.querySelector('.profile-btn');
if (profileBtn) {
    profileBtn.addEventListener('click', function() {
        alert('تسجيل الدخول أو إنشاء حساب');
    });
}

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

// Newsletter subscription
function subscribeNewsletter() {
    const email = prompt('أدخل بريدك الإلكتروني:');
    if (email && email.includes('@')) {
        alert('شكراً لاشتراكك! سيتم إرسال النشرة الإسبوعية إلى بريدك.');
    } else if (email) {
        alert('يرجى إدخال بريد إلكتروني صحيح.');
    }
}

// Sort freelancers
function sortFreelancers(sortBy) {
    const container = document.querySelector('.freelancers-grid');
    const cards = Array.from(document.querySelectorAll('.freelancer-card'));
    
    if (sortBy === 'rating') {
        cards.sort((a, b) => {
            const ratingA = parseFloat(a.querySelector('.star-rating').textContent);
            const ratingB = parseFloat(b.querySelector('.star-rating').textContent);
            return ratingB - ratingA;
        });
    } else if (sortBy === 'price-low') {
        cards.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price').textContent);
            const priceB = parseInt(b.querySelector('.price').textContent);
            return priceA - priceB;
        });
    } else if (sortBy === 'price-high') {
        cards.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price').textContent);
            const priceB = parseInt(b.querySelector('.price').textContent);
            return priceB - priceA;
        });
    }
    
    container.innerHTML = '';
    cards.forEach(card => container.appendChild(card));
}

// Track user interactions
function trackEvent(eventName, details) {
    console.log(`Event: ${eventName}`, details);
}

// Add event tracking
document.querySelectorAll('.profile-link').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('profile_view', { freelancer: this.closest('.freelancer-card').querySelector('h3').textContent });
    });
});

// Scroll to top button
const createScrollToTopBtn = () => {
    const btn = document.createElement('button');
    btn.textContent = '⬆️';
    btn.id = 'scrollTopBtn';
    btn.title = 'اذهب للأعلى';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

createScrollToTopBtn();

// Page load completion
document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة خدمة هاب تم تحميلها بنجاح!');
});

// Language Toggle
function toggleLanguage(e) {
    e.preventDefault();
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // Store preference
    localStorage.setItem('language', newLang);
    
    // Update HTML attributes
    document.documentElement.lang = newLang;
    document.documentElement.dir = newDir;
    document.body.dir = newDir;
    
    // Reload page
    setTimeout(() => {
        window.location.reload();
    }, 500);
}
