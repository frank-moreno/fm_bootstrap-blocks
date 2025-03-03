/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    InspectorControls,
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BootstrapIcons } from '../../components/bootstrap-icon';

/**
 * Register the block
 */
registerBlockType('bootstrap-blocks/alert', {
    title: __('Alert', 'bootstrap-blocks'),
    description: __('Bootstrap alert component for displaying messages.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="alert" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('alert', 'bootstrap-blocks'),
        __('message', 'bootstrap-blocks'),
    ],
    supports: {
        align: true,
        html: false,
        anchor: true,
    },
    attributes: {
        content: {
            type: 'string',
            default: __('This is an alert message. It can be used to provide important information to the user.', 'bootstrap-blocks'),
        },
        heading: {
            type: 'string',
            default: '',
        },
        alertType: {
            type: 'string',
            default: 'primary',
        },
        isDismissible: {
            type: 'boolean',
            default: false,
        },
        showIcon: {
            type: 'boolean',
            default: false,
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
            content,
            heading,
            alertType,
            isDismissible,
            showIcon,
            customClasses,
        } = attributes;

        // Generate alert class
        let alertClass = `alert alert-${alertType}`;
        
        if (isDismissible) {
            alertClass += ' alert-dismissible fade show';
        }
        
        if (customClasses) {
            alertClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps({
            className: alertClass,
            role: 'alert',
        });

        // Alert type options
        const alertTypeOptions = [
            { value: 'primary', label: __('Primary', 'bootstrap-blocks') },
            { value: 'secondary', label: __('Secondary', 'bootstrap-blocks') },
            { value: 'success', label: __('Success', 'bootstrap-blocks') },
            { value: 'danger', label: __('Danger', 'bootstrap-blocks') },
            { value: 'warning', label: __('Warning', 'bootstrap-blocks') },
            { value: 'info', label: __('Info', 'bootstrap-blocks') },
            { value: 'light', label: __('Light', 'bootstrap-blocks') },
            { value: 'dark', label: __('Dark', 'bootstrap-blocks') },
        ];

        // Get appropriate icon based on alert type
        const getAlertIcon = (type) => {
            switch (type) {
                case 'success':
                    return 'check-circle-fill';
                case 'danger':
                    return 'exclamation-circle-fill';
                case 'warning':
                    return 'exclamation-triangle-fill';
                case 'info':
                    return 'info-circle-fill';
                default:
                    return 'info-circle-fill';
            }
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Alert Settings', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__('Alert Type', 'bootstrap-blocks')}
                            value={alertType}
                            options={alertTypeOptions}
                            onChange={(value) => setAttributes({ alertType: value })}
                        />
                        
                        <ToggleControl
                            label={__('Dismissible', 'bootstrap-blocks')}
                            checked={isDismissible}
                            onChange={(value) => setAttributes({ isDismissible: value })}
                            help={__('Add a close button to the alert.', 'bootstrap-blocks')}
                        />
                        
                        <ToggleControl
                            label={__('Show Icon', 'bootstrap-blocks')}
                            checked={showIcon}
                            onChange={(value) => setAttributes({ showIcon: value })}
                            help={__('Display an icon based on the alert type.', 'bootstrap-blocks')}
                        />
                        
                        <TextControl
                            label={__('Custom Classes', 'bootstrap-blocks')}
                            value={customClasses}
                            onChange={(value) => setAttributes({ customClasses: value })}
                            help={__('Add custom classes to the alert.', 'bootstrap-blocks')}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    {isDismissible && (
                        <button
                            type="button"
                            className="btn-close"
                            aria-label={__('Close', 'bootstrap-blocks')}
                            style={{ position: 'absolute', right: '10px', top: '10px' }}
                        />
                    )}
                    
                    {heading && (
                        <div className="d-flex align-items-center mb-2">
                            {showIcon && (
                                <span 
                                    className={`alert-icon bootstrap-icon bootstrap-icon-${getAlertIcon(alertType)}`}
                                    style={{ marginRight: '8px', fontSize: '1.25em' }}
                                />
                            )}
                            <RichText
                                tagName="h4"
                                className="alert-heading"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Alert heading...', 'bootstrap-blocks')}
                                withoutInteractiveFormatting
                            />
                        </div>
                    )}
                    
                    {!heading && showIcon && (
                        <div className="d-flex">
                            <span 
                                className={`alert-icon bootstrap-icon bootstrap-icon-${getAlertIcon(alertType)}`}
                                style={{ marginRight: '8px', fontSize: '1.25em' }}
                            />
                            <div style={{ flex: 1 }}>
                                <RichText
                                    tagName="div"
                                    className="alert-content"
                                    value={content}
                                    onChange={(value) => setAttributes({ content: value })}
                                    placeholder={__('Alert content...', 'bootstrap-blocks')}
                                    multiline="p"
                                />
                            </div>
                        </div>
                    )}
                    
                    {!heading && !showIcon && (
                        <RichText
                            tagName="div"
                            className="alert-content"
                            value={content}
                            onChange={(value) => setAttributes({ content: value })}
                            placeholder={__('Alert content...', 'bootstrap-blocks')}
                            multiline="p"
                        />
                    )}
                    
                    {heading && (
                        <RichText
                            tagName="div"
                            className="alert-content"
                            value={content}
                            onChange={(value) => setAttributes({ content: value })}
                            placeholder={__('Alert content...', 'bootstrap-blocks')}
                            multiline="p"
                        />
                    )}
                </div>
            </>
        );
    },

    /**
     * Save function
     */
    save: ({ attributes }) => {
        const {
            content,
            heading,
            alertType,
            isDismissible,
            showIcon,
            customClasses,
        } = attributes;

        // Generate alert class
        let alertClass = `alert alert-${alertType}`;
        
        if (isDismissible) {
            alertClass += ' alert-dismissible fade show';
        }
        
        if (customClasses) {
            alertClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps.save({
            className: alertClass,
            role: 'alert',
        });

        // Get appropriate icon based on alert type
        const getAlertIcon = (type) => {
            switch (type) {
                case 'success':
                    return 'check-circle-fill';
                case 'danger':
                    return 'exclamation-circle-fill';
                case 'warning':
                    return 'exclamation-triangle-fill';
                case 'info':
                    return 'info-circle-fill';
                default:
                    return 'info-circle-fill';
            }
        };

        return (
            <div {...blockProps}>
                {isDismissible && (
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label={__('Close', 'bootstrap-blocks')}
                    />
                )}
                
                {heading && (
                    <div className="d-flex align-items-center mb-2">
                        {showIcon && (
                            <span 
                                className={`alert-icon bootstrap-icon bootstrap-icon-${getAlertIcon(alertType)}`}
                                style={{ marginRight: '8px', fontSize: '1.25em' }}
                            />
                        )}
                        <RichText.Content
                            tagName="h4"
                            className="alert-heading"
                            value={heading}
                        />
                    </div>
                )}
                
                {!heading && showIcon && (
                    <div className="d-flex">
                        <span 
                            className={`alert-icon bootstrap-icon bootstrap-icon-${getAlertIcon(alertType)}`}
                            style={{ marginRight: '8px', fontSize: '1.25em' }}
                        />
                        <div>
                            <RichText.Content
                                tagName="div"
                                className="alert-content"
                                value={content}
                            />
                        </div>
                    </div>
                )}
                
                {!heading && !showIcon && (
                    <RichText.Content
                        tagName="div"
                        className="alert-content"
                        value={content}
                    />
                )}
                
                {heading && !showIcon && (
                    <RichText.Content
                        tagName="div"
                        className="alert-content"
                        value={content}
                    />
                )}
            </div>
        );
    },
});