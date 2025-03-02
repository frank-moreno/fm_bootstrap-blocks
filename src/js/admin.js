/**
 * Admin JavaScript for Bootstrap Blocks
 */

// Import styles
import '../scss/admin.scss';

// Admin functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    initTabs();
    
    // Block toggles
    initBlockToggles();
    
    // Settings form
    initSettingsForm();
});

/**
 * Initialize tabs navigation
 */
function initTabs() {
    const tabs = document.querySelectorAll('.bootstrap-blocks-admin-tabs .nav-tab');
    const tabPanes = document.querySelectorAll('.bootstrap-blocks-admin-tab-pane');
    
    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = tab.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');
            
            // Show active tab content
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            // Update URL hash
            window.location.hash = tabId;
        });
    });
    
    // Check URL hash on page load
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        const activeTab = document.querySelector(`.bootstrap-blocks-admin-tabs .nav-tab[data-tab="${tabId}"]`);
        
        if (activeTab) {
            activeTab.click();
        }
    }
}

/**
 * Initialize block toggles
 */
function initBlockToggles() {
    const blockToggles = document.querySelectorAll('.bootstrap-blocks-block-item input[type="checkbox"]');
    
    blockToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const blockItem = toggle.closest('.bootstrap-blocks-block-item');
            
            if (toggle.checked) {
                blockItem.classList.remove('disabled');
            } else {
                blockItem.classList.add('disabled');
            }
        });
    });
}

/**
 * Initialize settings form
 */
function initSettingsForm() {
    const loadBootstrapToggle = document.getElementById('bootstrap_blocks_load_bootstrap');
    const enableShortcodesToggle = document.getElementById('bootstrap_blocks_enable_shortcodes');
    
    if (loadBootstrapToggle) {
        loadBootstrapToggle.addEventListener('change', () => {
            // You can add conditional logic here if needed
        });
    }
    
    if (enableShortcodesToggle) {
        enableShortcodesToggle.addEventListener('change', () => {
            // You can add conditional logic here if needed
        });
    }
}

/**
 * Show success notice
 * 
 * @param {string} message Success message
 */
function showSuccessNotice(message) {
    const notice = document.createElement('div');
    notice.className = 'notice notice-success is-dismissible';
    notice.innerHTML = `<p>${message}</p>`;
    
    // Add dismiss button
    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.className = 'notice-dismiss';
    dismissButton.innerHTML = '<span class="screen-reader-text">Dismiss this notice.</span>';
    dismissButton.addEventListener('click', () => {
        notice.remove();
    });
    
    notice.appendChild(dismissButton);
    
    // Add notice before heading
    const heading = document.querySelector('.bootstrap-blocks-admin h1');
    heading.parentNode.insertBefore(notice, heading.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notice.remove();
    }, 5000);
}

/**
 * Show error notice
 * 
 * @param {string} message Error message
 */
function showErrorNotice(message) {
    const notice = document.createElement('div');
    notice.className = 'notice notice-error is-dismissible';
    notice.innerHTML = `<p>${message}</p>`;
    
    // Add dismiss button
    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.className = 'notice-dismiss';
    dismissButton.innerHTML = '<span class="screen-reader-text">Dismiss this notice.</span>';
    dismissButton.addEventListener('click', () => {
        notice.remove();
    });
    
    notice.appendChild(dismissButton);
    
    // Add notice before heading
    const heading = document.querySelector('.bootstrap-blocks-admin h1');
    heading.parentNode.insertBefore(notice, heading.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notice.remove();
    }, 5000);
}

// Export functions for external use
window.bootstrapBlocksAdmin = {
    showSuccessNotice,
    showErrorNotice,
};