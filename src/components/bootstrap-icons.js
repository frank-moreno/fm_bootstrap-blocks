/**
 * Bootstrap Icon Component
 * 
 * Renders SVG icons for Bootstrap blocks
 */

// Common icon wrapper
const IconWrapper = ({ children }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    );
};

// Block icons
const icons = {
    // Container icon
    'layout-three-columns': (
        <IconWrapper>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
            <line x1="15" y1="21" x2="15" y2="9" />
        </IconWrapper>
    ),

    // Row icon
    'layout': (
        <IconWrapper>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
        </IconWrapper>
    ),

    // Column icon
    'layout-column': (
        <IconWrapper>
            <rect x="6" y="3" width="12" height="18" rx="2" ry="2" />
        </IconWrapper>
    ),

    // Card icon
    'credit-card': (
        <IconWrapper>
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
        </IconWrapper>
    ),

    // Button icon
    'square': (
        <IconWrapper>
            <rect x="5" y="7" width="14" height="10" rx="2" />
        </IconWrapper>
    ),

    // Alert icon
    'alert-triangle': (
        <IconWrapper>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </IconWrapper>
    ),

    // Tabs icon
    'layout-grid': (
        <IconWrapper>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </IconWrapper>
    ),

    // Accordion icon
    'layers': (
        <IconWrapper>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </IconWrapper>
    ),

    // Default icon
    'grid': (
        <IconWrapper>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </IconWrapper>
    ),
};

/**
 * Bootstrap Icon Component
 * 
 * @param {string} icon - Icon name to render
 * @returns SVG icon element
 */
export const BootstrapIcon = ({ icon }) => {
    if (icons[icon]) {
        return icons[icon];
    }
    
    // Return default icon if specified icon doesn't exist
    return icons.grid;
};