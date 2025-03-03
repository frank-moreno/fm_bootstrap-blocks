/**
 * Breakpoint Tabs Component
 * 
 * A component to manage Bootstrap breakpoints in the WordPress block editor.
 */

import { __ } from '@wordpress/i18n';
import { TabPanel } from '@wordpress/components';

/**
 * Define Bootstrap breakpoints
 * @type {Array}
 */
const breakpoints = [
    {
        name: 'xs',
        title: __('Extra Small', 'bootstrap-blocks'),
        description: __('Devices < 576px (phones)', 'bootstrap-blocks'),
    },
    {
        name: 'sm',
        title: __('Small', 'bootstrap-blocks'),
        description: __('Devices ≥ 576px (portrait tablets)', 'bootstrap-blocks'),
    },
    {
        name: 'md',
        title: __('Medium', 'bootstrap-blocks'),
        description: __('Devices ≥ 768px (tablets)', 'bootstrap-blocks'),
    },
    {
        name: 'lg',
        title: __('Large', 'bootstrap-blocks'),
        description: __('Devices ≥ 992px (desktops)', 'bootstrap-blocks'),
    },
    {
        name: 'xl',
        title: __('Extra Large', 'bootstrap-blocks'),
        description: __('Devices ≥ 1200px (large desktops)', 'bootstrap-blocks'),
    },
];

/**
 * BreakpointsTabs component
 * 
 * @param {Object} props Component properties
 * @param {Function} props.children Function child that receives the selected breakpoint
 */
export const BreakpointsTabs = ({ children }) => {
    const tabs = breakpoints.map((breakpoint) => ({
        name: breakpoint.name,
        title: breakpoint.title,
        className: `bootstrap-blocks-breakpoint-tab bootstrap-blocks-breakpoint-tab-${breakpoint.name}`,
    }));

    return (
        <div className="bootstrap-blocks-breakpoint-tabs">
            <TabPanel
                className="bootstrap-blocks-breakpoint-tabs-panel"
                tabs={tabs}
            >
                {(tab) => {
                    const selectedBreakpoint = breakpoints.find(
                        (breakpoint) => breakpoint.name === tab.name
                    );

                    return (
                        <div className={`bootstrap-blocks-breakpoint-content bootstrap-blocks-breakpoint-${selectedBreakpoint.name}`}>
                            <p className="bootstrap-blocks-breakpoint-description">
                                {selectedBreakpoint.description}
                            </p>
                            {children(selectedBreakpoint)}
                        </div>
                    );
                }}
            </TabPanel>
        </div>
    );
};