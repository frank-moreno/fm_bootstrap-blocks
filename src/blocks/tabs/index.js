/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl
} from '@wordpress/components';
import { BootstrapIcons, BreakpointsTabs } from '../../components';

/**
 * Register the block
 */
registerBlockType('bootstrap-blocks/tabs', {
    title: __('Tabs', 'bootstrap-blocks'),
    description: __('Bootstrap tabs component for displaying content in multiple tabs.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="layout" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('tabs', 'bootstrap-blocks'),
        __('nav', 'bootstrap-blocks'),
    ],
    supports: {
        align: ['wide', 'full'],
        html: false,
        anchor: true,
    },
    attributes: {
        tabsType: {
            type: 'string',
            default: 'tabs',
        },
        tabAlignment: {
            type: 'string',
            default: '',
        },
        fillWidth: {
            type: 'boolean',
            default: false,
        },
        justifyContent: {
            type: 'boolean',
            default: false,
        },
        verticalTabs: {
            type: 'boolean',
            default: false,
        },
        fadeEffect: {
            type: 'boolean',
            default: true,
        },
        pillStyle: {
            type: 'boolean',
            default: false,
        },
        tabs: {
            type: 'array',
            default: [
                {
                    id: 'tab-1',
                    title: __('Tab 1', 'bootstrap-blocks'),
                    active: true,
                },
                {
                    id: 'tab-2',
                    title: __('Tab 2', 'bootstrap-blocks'),
                    active: false,
                },
            ],
        },
        tabsData: {
            type: 'object',
            default: {},
        },
        activeTabId: {
            type: 'string',
            default: 'tab-1',
        },
        customClasses: {
            type: 'string',
            default: '',
        },
    },

    /**
     * Edit function
     */
    edit: ({ attributes, setAttributes, clientId }) => {
        const {
            tabsType,
            tabAlignment,
            fillWidth,
            justifyContent,
            verticalTabs,
            fadeEffect,
            pillStyle,
            tabs,
            activeTabId,
            customClasses,
        } = attributes;

        // Generate tabs class
        let navClass = 'nav';
        navClass += pillStyle ? ' nav-pills' : ' nav-tabs';
        
        if (fillWidth) {
            navClass += ' nav-fill';
        }
        
        if (justifyContent) {
            navClass += ' nav-justified';
        }
        
        if (tabAlignment) {
            navClass += ` justify-content-${tabAlignment}`;
        }
        
        if (verticalTabs) {
            navClass += ' flex-column';
        }

        const blockClass = `bootstrap-blocks-tabs ${verticalTabs ? 'd-flex' : ''}`;
        
        // Tabs container class
        let tabsContainerClass = 'tab-content';
        if (fadeEffect) {
            tabsContainerClass += ' fade';
        }

        const blockProps = useBlockProps({
            className: blockClass,
        });

        // Helper functions
        const onAddTab = () => {
            const newTabId = `tab-${Date.now()}`;
            const newTabs = [...tabs, {
                id: newTabId,
                title: __('New Tab', 'bootstrap-blocks'),
                active: false,
            }];
            
            setAttributes({
                tabs: newTabs,
            });
        };

        const onRemoveTab = (tabId) => {
            if (tabs.length <= 1) {
                return; // Don't remove the last tab
            }
            
            const newTabs = tabs.filter(tab => tab.id !== tabId);
            let newActiveTabId = activeTabId;
            
            // If we removed the active tab, set a new active tab
            if (activeTabId === tabId) {
                newActiveTabId = newTabs[0].id;
            }
            
            setAttributes({
                tabs: newTabs,
                activeTabId: newActiveTabId,
            });
        };

        const onChangeTabTitle = (title, index) => {
            const newTabs = [...tabs];
            newTabs[index].title = title;
            setAttributes({ tabs: newTabs });
        };

        const onSelectTab = (tabId) => {
            setAttributes({ activeTabId: tabId });
        };

        const getTabTemplate = (tabId) => {
            return [
                ['core/paragraph', { placeholder: __('Tab content...', 'bootstrap-blocks') }],
            ];
        };

        // Tab type options
        const tabsTypeOptions = [
            { value: 'tabs', label: __('Tabs', 'bootstrap-blocks') },
            { value: 'pills', label: __('Pills', 'bootstrap-blocks') },
        ];

        // Alignment options
        const alignmentOptions = [
            { value: '', label: __('Default', 'bootstrap-blocks') },
            { value: 'start', label: __('Start', 'bootstrap-blocks') },
            { value: 'center', label: __('Center', 'bootstrap-blocks') },
            { value: 'end', label: __('End', 'bootstrap-blocks') },
        ];

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Tabs Settings', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__('Tabs Style', 'bootstrap-blocks')}
                            value={pillStyle ? 'pills' : 'tabs'}
                            options={[
                                { value: 'tabs', label: __('Tabs', 'bootstrap-blocks') },
                                { value: 'pills', label: __('Pills', 'bootstrap-blocks') },
                            ]}
                            onChange={(value) => setAttributes({ pillStyle: value === 'pills' })}
                        />
                        
                        <SelectControl
                            label={__('Tabs Alignment', 'bootstrap-blocks')}
                            value={tabAlignment}
                            options={alignmentOptions}
                            onChange={(value) => setAttributes({ tabAlignment: value })}
                        />
                        
                        <ToggleControl
                            label={__('Fill Available Width', 'bootstrap-blocks')}
                            checked={fillWidth}
                            onChange={(value) => setAttributes({ fillWidth: value })}
                            help={__('Make tabs fill all available width', 'bootstrap-blocks')}
                        />
                        
                        <ToggleControl
                            label={__('Equal Width Tabs', 'bootstrap-blocks')}
                            checked={justifyContent}
                            onChange={(value) => setAttributes({ justifyContent: value })}
                            help={__('Make all tabs equal width', 'bootstrap-blocks')}
                        />
                        
                        <ToggleControl
                            label={__('Vertical Tabs', 'bootstrap-blocks')}
                            checked={verticalTabs}
                            onChange={(value) => setAttributes({ verticalTabs: value })}
                            help={__('Display tabs vertically', 'bootstrap-blocks')}
                        />
                        
                        <ToggleControl
                            label={__('Fade Effect', 'bootstrap-blocks')}
                            checked={fadeEffect}
                            onChange={(value) => setAttributes({ fadeEffect: value })}
                            help={__('Apply a fade effect when switching tabs', 'bootstrap-blocks')}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Additional', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__('Custom Classes', 'bootstrap-blocks')}
                            value={customClasses}
                            onChange={(value) => setAttributes({ customClasses: value })}
                            help={__('Add custom classes to the tabs container.', 'bootstrap-blocks')}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className={verticalTabs ? 'me-3' : ''}>
                        <ul className={navClass} role="tablist">
                            {tabs.map((tab, index) => (
                                <li className="nav-item" key={tab.id} role="presentation">
                                    <button
                                        className={`nav-link ${activeTabId === tab.id ? 'active' : ''}`}
                                        onClick={() => onSelectTab(tab.id)}
                                        role="tab"
                                        type="button"
                                        aria-selected={activeTabId === tab.id}
                                    >
                                        <RichText
                                            tagName="span"
                                            value={tab.title}
                                            onChange={(value) => onChangeTabTitle(value, index)}
                                            placeholder={__('Tab title...', 'bootstrap-blocks')}
                                            withoutInteractiveFormatting
                                        />
                                        {tabs.length > 1 && (
                                            <button
                                                className="remove-tab-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRemoveTab(tab.id);
                                                }}
                                                style={{
                                                    marginLeft: '8px',
                                                    padding: '0',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#cc1818',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </button>
                                </li>
                            ))}
                            <li className="nav-item">
                                <button
                                    className="nav-link add-tab-button"
                                    onClick={onAddTab}
                                    role="tab"
                                    type="button"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    + {__('Add Tab', 'bootstrap-blocks')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className={`tab-content ${customClasses}`} style={{ flex: 1 }}>
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`tab-pane ${activeTabId === tab.id ? 'active show' : ''}`}
                                role="tabpanel"
                                style={{ display: activeTabId === tab.id ? 'block' : 'none' }}
                            >
                                {activeTabId === tab.id && (
                                    <InnerBlocks
                                        templateLock={false}
                                        template={getTabTemplate(tab.id)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    },

    /**
     * Save function
     */
    save: ({ attributes }) => {
        const {
            tabsType,
            tabAlignment,
            fillWidth,
            justifyContent,
            verticalTabs,
            fadeEffect,
            pillStyle,
            tabs,
            customClasses,
        } = attributes;

        // Generate tabs class
        let navClass = 'nav';
        navClass += pillStyle ? ' nav-pills' : ' nav-tabs';
        
        if (fillWidth) {
            navClass += ' nav-fill';
        }
        
        if (justifyContent) {
            navClass += ' nav-justified';
        }
        
        if (tabAlignment) {
            navClass += ` justify-content-${tabAlignment}`;
        }
        
        if (verticalTabs) {
            navClass += ' flex-column';
        }

        const blockClass = `bootstrap-blocks-tabs ${verticalTabs ? 'd-flex' : ''}`;
        
        // Tabs container class
        let tabsContainerClass = 'tab-content';
        if (fadeEffect) {
            tabsContainerClass += ' fade';
        }
        
        if (customClasses) {
            tabsContainerClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps.save({
            className: blockClass,
        });

        return (
            <div {...blockProps}>
                <div className={verticalTabs ? 'me-3' : ''}>
                    <ul className={navClass} role="tablist">
                        {tabs.map((tab, index) => (
                            <li className="nav-item" key={tab.id} role="presentation">
                                <button
                                    className={`nav-link ${index === 0 ? 'active' : ''}`}
                                    id={`${tab.id}-tab`}
                                    data-bs-toggle="tab"
                                    data-bs-target={`#${tab.id}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={tab.id}
                                    aria-selected={index === 0 ? 'true' : 'false'}
                                >
                                    <RichText.Content value={tab.title} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={tabsContainerClass} style={{ flex: 1 }}>
                    {tabs.map((tab, index) => (
                        <div
                            className={`tab-pane ${fadeEffect ? 'fade' : ''} ${index === 0 ? 'show active' : ''}`}
                            id={tab.id}
                            role="tabpanel"
                            aria-labelledby={`${tab.id}-tab`}
                            key={tab.id}
                        >
                            <InnerBlocks.Content />
                        </div>
                    ))}
                </div>
            </div>
        );
    },
});