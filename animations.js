class ScrollAnimationManager {
    constructor() {
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            root: null,
            rootMargin: '100px',
            threshold: 0.1 // Trigger animation when element is 10% visible
        });
        this.animatedElements = new Set();
        this.isScrolling = false;
        this.lastScrollTime = 0;
    }

    init() {
        this.setupAnimations();
        this.observer.observe(document.documentElement); // Observe the whole page
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    }

    setupAnimations() {
        this.addAnimation('.box-1', 'fade-up');
        this.addAnimation('.line-1', 'fade-up');
        this.addAnimation('.line-2', 'fade-up');
        this.addAnimation('.line-3', 'fade-up');
        this.addAnimation('.line-4', 'fade-up');

        this.addAnimation('.about', 'fade-in');
        this.addAnimation('.section-1', 'fade-left', 0);
        this.addAnimation('.section-2', 'fade-right', 0);

        document.querySelectorAll('.skill-tag-1').forEach((tag, index) => {
            this.addAnimation(tag, 'fade-up', index * 50);
        });

        document.querySelectorAll('.project-item').forEach((item, index) => {
            this.addAnimation(item, 'fade-up', index * 50);
        });

        this.addAnimation('.form-section', 'fade-up');
    }

    addAnimation(selector, animationClass, delay = 0) {
        const elements = typeof selector === 'string' ?
            document.querySelectorAll(selector) : [selector];

        elements.forEach(element => {
            if (element.classList.contains('box-1')) {
                // Only apply fade-up to box-1
                animationClass = 'fade-up';
            }
    
            if (!this.animatedElements.has(element)) {
                element.classList.add(animationClass);
                element.style.transitionDelay = `${delay}ms`;
                this.observer.observe(element);
                this.animatedElements.add(element);
            }
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }

    handleScroll() {
        if (!this.isScrolling) {
            this.isScrolling = true;
            requestAnimationFrame(this.updateAnimations.bind(this));
        }
        this.lastScrollTime = performance.now();
    }

    updateAnimations() {
        this.animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInView) {
                element.classList.add('in-view');
            } else {
                element.classList.remove('in-view');
            }
        });

        if (performance.now() - this.lastScrollTime < 100) {
            requestAnimationFrame(this.updateAnimations.bind(this));
        } else {
            this.isScrolling = false;
        }
    }
   
}
let timeout;
window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => animationManager.updateAnimations(), 100);

});



document.addEventListener('DOMContentLoaded', () => {
    const animationManager = new ScrollAnimationManager();
    animationManager.init();
});
const navOpenBtn = document.querySelector('.navOpenBtn');
const navCloseBtn = document.querySelector('.navCloseBtn');
const navbar = document.querySelector('.navbar-1');
const navLinks = document.querySelectorAll('.navbar-1 ul li a'); // Select all nav links

// Function to open the navbar
function openNavbar() {
    navbar.classList.add('active'); // Ensure the navbar is active
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top smoothly
}

// Open the navbar when the hamburger icon is clicked
navOpenBtn.addEventListener('click', openNavbar);

// Close the navbar when the close button is clicked
navCloseBtn.addEventListener('click', () => {
    navbar.classList.remove('active'); // Close the navbar
});
// Close the navbar and scroll to the section when a navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor click behavior
        const targetId = link.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Select the target section
        console.log(link.getAttribute('href'));
        // Scroll to the target section smoothly
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close the navbar after a short delay to allow scrolling
        setTimeout(() => {
            navbar.classList.remove('active'); // Close the navbar after clicking the link
        }, 300); // Adjust the delay as needed
    });
});

// Horizontal scrolling for project cards

const cards = document.querySelectorAll('.project-item');
const container = document.querySelector('.projects');
let isHorizontalScrolling = false;

// Function to detect horizontal scroll
container.addEventListener('scroll', () => {
  isHorizontalScrolling = true;

  // Reset after 100ms to detect only continuous horizontal scroll
  setTimeout(() => {
    isHorizontalScrolling = false;
  }, 100);
});

// Function to initialize Intersection Observer only for small screens
function initSmallScreenFeature() {
  if (window.innerWidth <= 768) { // Only apply for screens <= 768px
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isHorizontalScrolling) {
            entry.target.classList.add('active');
            entry.target.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      {
        root: container,
        threshold: 0.1, // Trigger when 50% of card is visible
      }
    );

    // Observe each card
    cards.forEach((card) => observer.observe(card));
  }
}

// Run the feature on load and on resize
initSmallScreenFeature();
window.addEventListener('resize', initSmallScreenFeature);
