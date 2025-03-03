/**
 * Frontend JavaScript
 * Handles frontend-specific functionality for Bootstrap Blocks
 */

// Import frontend styles
import '../scss/frontend.scss';

// Bootstrap Blocks Frontend Functionality
const BootstrapBlocksFrontend = {
  /**
   * Initialize frontend functionality
   */
  init() {
    this.setupScrollAnimations();
    this.setupTabsAndAccordions();
    this.setupMobileMenu();
  },

  /**
   * Setup scroll animations
   */
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.bootstrap-blocks-animate-on-scroll');
    
    if (animatedElements.length > 0) {
      // Simple scroll detection for animations
      const checkPosition = () => {
        animatedElements.forEach(element => {
          const positionFromTop = element.getBoundingClientRect().top;
          
          if (positionFromTop - window.innerHeight <= 0) {
            element.classList.add('bootstrap-blocks-animated');
          }
        });
      };
      
      // Check positions on scroll
      window.addEventListener('scroll', checkPosition);
      
      // Check positions on initial load
      checkPosition();
    }
  },

  /**
   * Setup tabs and accordions
   * Note: Most functionality will come from Bootstrap's JavaScript
   */
  setupTabsAndAccordions() {
    // Deep link handling for tabs and accordions
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      
      // Handle tab deep linking
      const tabElement = document.querySelector(`a[href="#${hash}"][data-bs-toggle="tab"]`);
      if (tabElement) {
        const tab = new bootstrap.Tab(tabElement);
        tab.show();
      }
      
      // Handle accordion deep linking
      const accordionElement = document.getElementById(hash);
      if (accordionElement && accordionElement.classList.contains('accordion-collapse')) {
        const collapse = new bootstrap.Collapse(accordionElement, { toggle: true });
      }
    }
  },

  /**
   * Setup mobile menu functionality
   */
  setupMobileMenu() {
    // Handle any custom mobile menu functionality
    const mobileMenuToggle = document.querySelector('.bootstrap-blocks-mobile-toggle');
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        document.body.classList.toggle('bootstrap-blocks-mobile-menu-open');
      });
    }
  }
};

// Initialize frontend functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  BootstrapBlocksFrontend.init();
});