/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    TextControl,
    RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BootstrapIcons } from '../../components/bootstrap-icon';
import { BreakpointsTabs } from '../../components/breakpoint-tabs';

/**
 * Register the block
 */
registerBlockType('bootstrap-blocks/column', {
    title: __('Column', 'bootstrap-blocks'),
    description: __('Bootstrap column for creating grid layouts within rows.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="columns" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('column', 'bootstrap-blocks'),
        __('col', 'bootstrap-blocks'),
    ],
    supports: {
        align: false,
        html: false,
        anchor: true,
    },
    // parent: ['bootstrap-blocks/row'],
    attributes: {
        sizeXs: {
            type: 'string',
            default: '',
        },
        sizeSm: {
            type: 'string',
            default: '',
        },
        sizeMd: {
            type: 'string',
            default: '',
        },
        sizeLg: {
            type: 'string',
            default: '',
        },
        sizeXl: {
            type: 'string',
            default: '',
        },
        offsetXs: {
            type: 'string',
            default: '',
        },
        offsetSm: {
            type: 'string',
            default: '',
        },
        offsetMd: {
            type: 'string',
            default: '',
        },
        offsetLg: {
            type: 'string',
            default: '',
        },
        offsetXl: {
            type: 'string',
            default: '',
        },
        orderXs: {
            type: 'string',
            default: '',
        },
        orderSm: {
            type: 'string',
            default: '',
        },
        orderMd: {
            type: 'string',
            default: '',
        },
        orderLg: {
            type: 'string',
            default: '',
        },
        orderXl: {
            type: 'string',
            default: '',
        },
        alignSelf: {
            type: 'string',
            default: '',
        },
        customClasses: {
            type: 'string',
            default: '',
        },
    },

    /**
     * Edit function
     */
    edit: ({ attributes, setAttributes }) => {
        const {
            sizeXs,
            sizeSm,
            sizeMd,
            sizeLg,
            sizeXl,
            offsetXs,
            offsetSm,
            offsetMd,
            offsetLg,
            offsetXl,
            orderXs,
            orderSm,
            orderMd,
            orderLg,
            orderXl,
            alignSelf,
            customClasses,
        } = attributes;

        // Generate column class
        let columnClass = 'bootstrap-blocks-column';

        // Size classes
        if (sizeXs === 'auto') {
            columnClass += ' col-auto';
        } else if (sizeXs) {
            columnClass += ` col-${sizeXs}`;
        } else {
            columnClass += ' col';
        }

        // Responsive sizes
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const size = attributes[`size${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (size === 'auto') {
                columnClass += ` col-${breakpoint}-auto`;
            } else if (size) {
                columnClass += ` col-${breakpoint}-${size}`;
            }
        });

        // Offsets
        if (offsetXs) {
            columnClass += ` offset-${offsetXs}`;
        }

        // Responsive offsets
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const offset = attributes[`offset${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (offset) {
                columnClass += ` offset-${breakpoint}-${offset}`;
            }
        });

        // Orders
        if (orderXs) {
            columnClass += ` order-${orderXs}`;
        }

        // Responsive orders
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const order = attributes[`order${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (order) {
                columnClass += ` order-${breakpoint}-${order}`;
            }
        });

        // Align self
        if (alignSelf) {
            columnClass += ` align-self-${alignSelf}`;
        }

        // Custom classes
        if (customClasses) {
            columnClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps({
            className: columnClass,
        });

        // Size options
        const sizeOptions = [
            { value: '', label: __('Default (Equal Width)', 'bootstrap-blocks') },
            { value: 'auto', label: __('Auto (Content Width)', 'bootstrap-blocks') },
            ...Array.from({ length: 12 }, (_, i) => ({ 
                value: (i + 1).toString(), 
                label: (i + 1).toString() 
            })),
        ];

        // Order options
        const orderOptions = [
            { value: '', label: __('Default', 'bootstrap-blocks') },
            { value: 'first', label: __('First', 'bootstrap-blocks') },
            { value: 'last', label: __('Last', 'bootstrap-blocks') },
            ...Array.from({ length: 12 }, (_, i) => ({ 
                value: (i + 1).toString(), 
                label: (i + 1).toString() 
            })),
        ];

        // Offset options
        const offsetOptions = [
            { value: '', label: __('None', 'bootstrap-blocks') },
            ...Array.from({ length: 11 }, (_, i) => ({ 
                value: (i + 1).toString(), 
                label: (i + 1).toString() 
            })),
        ];

        // Align self options
        const alignSelfOptions = [
            { value: '', label: __('Default', 'bootstrap-blocks') },
            { value: 'start', label: __('Start', 'bootstrap-blocks') },
            { value: 'center', label: __('Center', 'bootstrap-blocks') },
            { value: 'end', label: __('End', 'bootstrap-blocks') },
            { value: 'baseline', label: __('Baseline', 'bootstrap-blocks') },
            { value: 'stretch', label: __('Stretch', 'bootstrap-blocks') },
        ];

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Column Size', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <BreakpointsTabs>
                            {({ name, title }) => {
                                const breakpointName = name.toUpperCase();
                                const attributeName = `size${breakpointName}`;
                                const value = attributes[attributeName];

                                return (
                                    <>
                                        <SelectControl
                                            label={`${title} ${__('Size', 'bootstrap-blocks')}`}
                                            value={value}
                                            options={sizeOptions}
                                            onChange={(newValue) => {
                                                setAttributes({ [attributeName]: newValue });
                                            }}
                                        />
                                    </>
                                );
                            }}
                        </BreakpointsTabs>
                    </PanelBody>

                    <PanelBody
                        title={__('Column Offset', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <BreakpointsTabs>
                            {({ name, title }) => {
                                const breakpointName = name.toUpperCase();
                                const attributeName = `offset${breakpointName}`;
                                const value = attributes[attributeName];

                                return (
                                    <>
                                        <SelectControl
                                            label={`${title} ${__('Offset', 'bootstrap-blocks')}`}
                                            value={value}
                                            options={offsetOptions}
                                            onChange={(newValue) => {
                                                setAttributes({ [attributeName]: newValue });
                                            }}
                                        />
                                    </>
                                );
                            }}
                        </BreakpointsTabs>
                    </PanelBody>

                    <PanelBody
                        title={__('Column Order', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <BreakpointsTabs>
                            {({ name, title }) => {
                                const breakpointName = name.toUpperCase();
                                const attributeName = `order${breakpointName}`;
                                const value = attributes[attributeName];

                                return (
                                    <>
                                        <SelectControl
                                            label={`${title} ${__('Order', 'bootstrap-blocks')}`}
                                            value={value}
                                            options={orderOptions}
                                            onChange={(newValue) => {
                                                setAttributes({ [attributeName]: newValue });
                                            }}
                                        />
                                    </>
                                );
                            }}
                        </BreakpointsTabs>
                    </PanelBody>

                    <PanelBody
                        title={__('Vertical Alignment', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Align Self', 'bootstrap-blocks')}
                            value={alignSelf}
                            options={alignSelfOptions}
                            onChange={(newValue) => {
                                setAttributes({ alignSelf: newValue });
                            }}
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
                            help={__('Add custom classes to the column.', 'bootstrap-blocks')}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <InnerBlocks />
                </div>
            </>
        );
    },

    /**
     * Save function
     */
    save: ({ attributes }) => {
        const {
            sizeXs,
            sizeSm,
            sizeMd,
            sizeLg,
            sizeXl,
            offsetXs,
            offsetSm,
            offsetMd,
            offsetLg,
            offsetXl,
            orderXs,
            orderSm,
            orderMd,
            orderLg,
            orderXl,
            alignSelf,
            customClasses,
        } = attributes;

        // Generate column class
        let columnClass = 'bootstrap-blocks-column';

        // Size classes
        if (sizeXs === 'auto') {
            columnClass += ' col-auto';
        } else if (sizeXs) {
            columnClass += ` col-${sizeXs}`;
        } else {
            columnClass += ' col';
        }

        // Responsive sizes
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const size = attributes[`size${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (size === 'auto') {
                columnClass += ` col-${breakpoint}-auto`;
            } else if (size) {
                columnClass += ` col-${breakpoint}-${size}`;
            }
        });

        // Offsets
        if (offsetXs) {
            columnClass += ` offset-${offsetXs}`;
        }

        // Responsive offsets
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const offset = attributes[`offset${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (offset) {
                columnClass += ` offset-${breakpoint}-${offset}`;
            }
        });

        // Orders
        if (orderXs) {
            columnClass += ` order-${orderXs}`;
        }

        // Responsive orders
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const order = attributes[`order${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (order) {
                columnClass += ` order-${breakpoint}-${order}`;
            }
        });

        // Align self
        if (alignSelf) {
            columnClass += ` align-self-${alignSelf}`;
        }

        // Custom classes
        if (customClasses) {
            columnClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps.save({
            className: columnClass,
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});