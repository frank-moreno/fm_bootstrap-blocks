/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { TabPanel } from '@wordpress/components';

/**
 * BreakpointTabs component
 * 
 * Displays a tab panel for different breakpoints (XS, SM, MD, LG, XL)
 * 
 * @param {Object} props Component props
 * @param {Function} props.children Render prop function receiving breakpoint info
 * @returns {JSX.Element} Component
 */
export const BreakpointTabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState('xs');

    // Define breakpoints
    const breakpoints = [
        {
            name: 'xs',
            title: __('XS', 'bootstrap-blocks'),
            description: __('Extra small devices (portrait phones, less than 576px)', 'bootstrap-blocks'),
        },
        {
            name: 'sm',
            title: __('SM', 'bootstrap-blocks'),
            description: __('Small devices (landscape phones, 576px and up)', 'bootstrap-blocks'),
        },
        {
            name: 'md',
            title: __('MD', 'bootstrap-blocks'),
            description: __('Medium devices (tablets, 768px and up)', 'bootstrap-blocks'),
        },
        {
            name: 'lg',
            title: __('LG', 'bootstrap-blocks'),
            description: __('Large devices (desktops, 992px and up)', 'bootstrap-blocks'),
        },
        {
            name: 'xl',
            title: __('XL', 'bootstrap-blocks'),
            description: __('Extra large devices (large desktops, 1200px and up)', 'bootstrap-blocks'),
        },
    ];

    const onSelect = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <TabPanel
            className="bootstrap-blocks-breakpoint-tabs"
            activeClass="is-active"
            onSelect={onSelect}
            tabs={breakpoints.map(breakpoint => ({
                name: breakpoint.name,
                title: breakpoint.title,
                className: `bootstrap-blocks-breakpoint-tab-${breakpoint.name}`,
            }))}
        >
            {(tab) => {
                const breakpoint = breakpoints.find(bp => bp.name === tab.name);
                
                return (
                    <div className={`bootstrap-blocks-breakpoint-tab-panel-${breakpoint.name}`}>
                        <p className="bootstrap-blocks-breakpoint-description">
                            {breakpoint.description}
                        </p>
                        {children(breakpoint)}
                    </div>
                );
            }}
        </TabPanel>
    );
};