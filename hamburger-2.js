document.addEventListener('DOMContentLoaded', () => {
    const navOpenBtn = document.querySelector('.navOpenBtn');
    const navCloseBtn = document.querySelector('.navCloseBtn');
    const navbar = document.querySelector('.navbar-1');
    const navLinks = document.querySelectorAll('.navbar-1 ul li a');
  
    if (navOpenBtn) {
      navOpenBtn.addEventListener('click', () => {
        navbar.classList.add('active');
        document.body.classList.add('no-scroll');
  
        const navbarContent = navbar.querySelector('ul');
        if (navbarContent) {
          navbarContent.scrollTo(0, 0); // Reset scroll to the top
        }
      });
    }
  
    if (navCloseBtn) {
      navCloseBtn.addEventListener('click', () => {
        navbar.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Remove no-scroll when closing
      });
    }
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); 
  
        // Close the navbar and remove no-scroll immediately
        navbar.classList.remove('active');
        document.body.classList.remove('no-scroll'); 
  
        const targetId = link.getAttribute('href');
  
        if (targetId && targetId.startsWith('#') && targetId.length > 1) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            history.pushState(null, '', targetId);
          } else {
            console.error('target element not found : ', targetId);
          }
        }
      });
    });
  });