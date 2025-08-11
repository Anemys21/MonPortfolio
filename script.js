// Portfolio JavaScript - All animations and interactions
// Author: AMOUBE NDE LOUANGE-MYSTERE

// Navigation active link highlighting
(function(){
    var links = document.querySelectorAll('.menu a');
    var here = location.pathname.split('/').pop() || 'index.html';
    links.forEach(function(a){
        var href = a.getAttribute('href');
        if(href === here){ a.classList.add('active'); a.setAttribute('aria-current','page'); }
        if(here === '' && (href === 'index.html' || href === './')){ a.classList.add('active'); a.setAttribute('aria-current','page'); }
    });
})();

// Scroll Animation System
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate timeline items with staggered delays
            const timelineItems = entry.target.querySelectorAll('.animate-timeline-item');
            timelineItems.forEach((item, index) => {
                const delay = parseFloat(item.dataset.delay) || 0;
                setTimeout(() => {
                    item.style.animationDelay = delay + 's';
                    item.style.opacity = '1';
                }, delay * 1000);
            });
            
            // Animate tools section
            if (entry.target.classList.contains('tools')) {
                // Animate tools title
                const toolsTitle = entry.target.querySelector('.animate-tools-title');
                if (toolsTitle) {
                    setTimeout(() => {
                        toolsTitle.classList.add('animate-in');
                    }, 200);
                }
                
                // Animate tool cards with staggered delays
                const toolCards = entry.target.querySelectorAll('.animate-tool-card');
                toolCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                        
                        // Store original width for meter animation
                        const meter = card.querySelector('.tool-meter .level');
                        if (meter) {
                            const width = meter.style.width;
                            meter.style.setProperty('--target-width', width);
                        }
                    }, 400 + (index * 100));
                });
            }
            
            // Animate skills cards with staggered delays
            if (entry.target.classList.contains('skills-frame') || entry.target.classList.contains('skills-grid')) {
                const skillCards = entry.target.querySelectorAll('.animate-skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }
            
            // Animate project cards
            if (entry.target.classList.contains('projects-grid')) {
                const projectCards = entry.target.querySelectorAll('.animate-project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, 200 + (index * 200));
                });
            }
            
            // Animate contact sections
            if (entry.target.classList.contains('animate-contact-section')) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay * 1000);
                
                // Animate contact items
                const contactItems = entry.target.querySelectorAll('.animate-contact-item');
                contactItems.forEach((item, index) => {
                    const itemDelay = parseFloat(item.dataset.delay) || 0;
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, itemDelay * 1000);
                });
                
                // Animate form fields
                const formFields = entry.target.querySelectorAll('.animate-form-field');
                formFields.forEach((field, index) => {
                    const fieldDelay = parseFloat(field.dataset.delay) || 0;
                    setTimeout(() => {
                        field.classList.add('animate-in');
                    }, fieldDelay * 1000);
                });
                
                // Animate form button
                const formButton = entry.target.querySelector('.animate-form-button');
                if (formButton) {
                    const buttonDelay = parseFloat(formButton.dataset.delay) || 0;
                    setTimeout(() => {
                        formButton.classList.add('animate-in');
                    }, buttonDelay * 1000);
                }
            }
        }
    });
}, observerOptions);

// Page-specific animations
function initializePageAnimations() {
    // Skills page animations
    if (document.querySelector('.skills-container')) {
        const skillsTitle = document.querySelector('.skills-title');
        if (skillsTitle) {
            skillsTitle.classList.add('animate-page-title');
        }
        
        const skillsFrame = document.querySelector('.skills-frame');
        if (skillsFrame) {
            observer.observe(skillsFrame);
        }
    }
    
    // Projects page animations
    if (document.querySelector('.projects-container')) {
        const projectsTitle = document.querySelector('.projects-title');
        if (projectsTitle) {
            projectsTitle.classList.add('animate-page-title');
        }
        
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            observer.observe(projectsGrid);
        }
    }
    
    // Contact page animations
    if (document.querySelector('.contact-container')) {
        const contactSections = document.querySelectorAll('.animate-contact-section');
        contactSections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Homepage animations
    if (document.querySelector('.back')) {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => observer.observe(el));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePageAnimations();
    
    // Special handling for competences page
    if (document.querySelector('.skills-container')) {
        // Animate page title immediately
        setTimeout(() => {
            const pageTitle = document.querySelector('.animate-page-title');
            if (pageTitle) {
                pageTitle.classList.add('animate-in');
            }
        }, 300);
        
        // Observe scroll elements for skills page
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => observer.observe(el));
    }

    // Mobile burger menu
    const burger = document.querySelector('.burger');
    const menu = document.getElementById('main-menu');
    if (burger && menu) {
        const body = document.body;
        const links = menu.querySelectorAll('a');
        // set initial aria state
        menu.setAttribute('aria-hidden','true');

        function closeMenu() {
            menu.classList.remove('open');
            burger.classList.remove('active');
            body.classList.remove('no-scroll');
            burger.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden','true');
        }

        burger.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            burger.classList.toggle('active', isOpen);
            body.classList.toggle('no-scroll', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
            menu.setAttribute('aria-hidden', String(!isOpen));
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = menu.contains(e.target);
            const isClickOnBurger = burger.contains(e.target);
            if (!isClickInsideMenu && !isClickOnBurger && menu.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('open')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 901) {
                closeMenu();
            }
        });
    }
});

// Page load animations for titles
window.addEventListener('load', () => {
    const pageTitles = document.querySelectorAll('.animate-page-title');
    pageTitles.forEach((title, index) => {
        setTimeout(() => {
            title.classList.add('animate-in');
        }, 300 + (index * 200));
    });
});
