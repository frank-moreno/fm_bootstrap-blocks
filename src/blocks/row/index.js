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
    ToggleControl,
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
registerBlockType('bootstrap-blocks/row', {
    title: __('Row', 'bootstrap-blocks'),
    description: __('Bootstrap row for creating grid layouts with columns.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="layout" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('row', 'bootstrap-blocks'),
        __('grid', 'bootstrap-blocks'),
    ],
    supports: {
        align: false,
        html: false,
        anchor: true,
    },
    // parent: ['bootstrap-blocks/container'],
    allowedBlocks: ['bootstrap-blocks/container', 'core/group', 'core/columns'],
    attributes: {
        verticalAlignXs: {
            type: 'string',
            default: '',
        },
        verticalAlignSm: {
            type: 'string',
            default: '',
        },
        verticalAlignMd: {
            type: 'string',
            default: '',
        },
        verticalAlignLg: {
            type: 'string',
            default: '',
        },
        verticalAlignXl: {
            type: 'string',
            default: '',
        },
        horizontalAlignXs: {
            type: 'string',
            default: '',
        },
        horizontalAlignSm: {
            type: 'string',
            default: '',
        },
        horizontalAlignMd: {
            type: 'string',
            default: '',
        },
        horizontalAlignLg: {
            type: 'string',
            default: '',
        },
        horizontalAlignXl: {
            type: 'string',
            default: '',
        },
        noGutters: {
            type: 'boolean',
            default: false,
        },
        gutterSize: {
            type: 'string',
            default: '3',
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
            verticalAlignXs,
            verticalAlignSm,
            verticalAlignMd,
            verticalAlignLg,
            verticalAlignXl,
            horizontalAlignXs,
            horizontalAlignSm,
            horizontalAlignMd,
            horizontalAlignLg,
            horizontalAlignXl,
            noGutters,
            gutterSize,
            customClasses,
        } = attributes;

        // Generate row class
        let rowClass = 'bootstrap-blocks-row row';

        // Vertical alignment for XS
        if (verticalAlignXs) {
            rowClass += ` align-items-${verticalAlignXs}`;
        }

        // Vertical alignment for other breakpoints
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const align = attributes[`verticalAlign${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (align) {
                rowClass += ` align-items-${breakpoint}-${align}`;
            }
        });

        // Horizontal alignment for XS
        if (horizontalAlignXs) {
            rowClass += ` justify-content-${horizontalAlignXs}`;
        }

        // Horizontal alignment for other breakpoints
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const align = attributes[`horizontalAlign${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (align) {
                rowClass += ` justify-content-${breakpoint}-${align}`;
            }
        });

        // Gutters
        if (noGutters) {
            rowClass += ' g-0';
        } else if (gutterSize) {
            rowClass += ` g-${gutterSize}`;
        }

        // Custom classes
        if (customClasses) {
            rowClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps({
            className: rowClass,
        });

        // Vertical alignment options
        const verticalAlignOptions = [
            { value: '', label: __('Default', 'bootstrap-blocks') },
            { value: 'start', label: __('Start', 'bootstrap-blocks') },
            { value: 'center', label: __('Center', 'bootstrap-blocks') },
            { value: 'end', label: __('End', 'bootstrap-blocks') },
        ];

        // Horizontal alignment options
        const horizontalAlignOptions = [
            { value: '', label: __('Default', 'bootstrap-blocks') },
            { value: 'start', label: __('Start', 'bootstrap-blocks') },
            { value: 'center', label: __('Center', 'bootstrap-blocks') },
            { value: 'end', label: __('End', 'bootstrap-blocks') },
            { value: 'between', label: __('Space Between', 'bootstrap-blocks') },
            { value: 'around', label: __('Space Around', 'bootstrap-blocks') },
        ];

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Row Settings', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__('No Gutters', 'bootstrap-blocks')}
                            checked={noGutters}
                            onChange={(value) => setAttributes({ noGutters: value })}
                            help={__('Remove the spacing between columns.', 'bootstrap-blocks')}
                        />

                        {!noGutters && (
                            <RangeControl
                                label={__('Gutter Size', 'bootstrap-blocks')}
                                value={parseInt(gutterSize)}
                                onChange={(value) => setAttributes({ gutterSize: value.toString() })}
                                min={0}
                                max={5}
                                help={__('Gutter size between columns (0-5).', 'bootstrap-blocks')}
                            />
                        )}
                    </PanelBody>

                    <PanelBody
                        title={__('Vertical Alignment', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <BreakpointsTabs>
                            {({ name, title }) => {
                                const breakpointName = name.toUpperCase();
                                const attributeName = `verticalAlign${breakpointName}`;
                                const value = attributes[attributeName];

                                return (
                                    <>
                                        <SelectControl
                                            label={`${title} ${__('Alignment', 'bootstrap-blocks')}`}
                                            value={value}
                                            options={verticalAlignOptions}
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
                        title={__('Horizontal Alignment', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <BreakpointsTabs>
                            {({ name, title }) => {
                                const breakpointName = name.toUpperCase();
                                const attributeName = `horizontalAlign${breakpointName}`;
                                const value = attributes[attributeName];

                                return (
                                    <>
                                        <SelectControl
                                            label={`${title} ${__('Alignment', 'bootstrap-blocks')}`}
                                            value={value}
                                            options={horizontalAlignOptions}
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
                        title={__('Additional', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Custom Classes', 'bootstrap-blocks')}
                            value={customClasses}
                            onChange={(value) => setAttributes({ customClasses: value })}
                            help={__('Add custom classes to the row.', 'bootstrap-blocks')}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <InnerBlocks
                        allowedBlocks={['bootstrap-blocks/column']}
                        template={[
                            ['bootstrap-blocks/column', {}],
                            ['bootstrap-blocks/column', {}],
                        ]}
                        orientation="horizontal"
                        renderAppender={() => (
                            <InnerBlocks.ButtonBlockAppender />
                        )}
                    />
                </div>
            </>
        );
    },

    /**
     * Save function
     */
    save: ({ attributes }) => {
        const {
            verticalAlignXs,
            verticalAlignSm,
            verticalAlignMd,
            verticalAlignLg,
            verticalAlignXl,
            horizontalAlignXs,
            horizontalAlignSm,
            horizontalAlignMd,
            horizontalAlignLg,
            horizontalAlignXl,
            noGutters,
            gutterSize,
            customClasses,
        } = attributes;

        // Generate row class
        let rowClass = 'bootstrap-blocks-row row';

        // Vertical alignment for XS
        if (verticalAlignXs) {
            rowClass += ` align-items-${verticalAlignXs}`;
        }

        // Vertical alignment for other breakpoints
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const align = attributes[`verticalAlign${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (align) {
                rowClass += ` align-items-${breakpoint}-${align}`;
            }
        });

        // Horizontal alignment for XS
        if (horizontalAlignXs) {
            rowClass += ` justify-content-${horizontalAlignXs}`;
        }

        // Horizontal alignment for other breakpoints
        ['sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
            const align = attributes[`horizontalAlign${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`];
            if (align) {
                rowClass += ` justify-content-${breakpoint}-${align}`;
            }
        });

        // Gutters
        if (noGutters) {
            rowClass += ' g-0';
        } else if (gutterSize) {
            rowClass += ` g-${gutterSize}`;
        }

        // Custom classes
        if (customClasses) {
            rowClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps.save({
            className: rowClass,
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});