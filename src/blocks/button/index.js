/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    InspectorControls,
    useBlockProps,
    RichText,
    URLInputButton,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
    RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BootstrapIcons } from '../../components/bootstrap-icon';

/**
 * Register the block
 */
registerBlockType('bootstrap-blocks/button', {
    title: __('Button', 'bootstrap-blocks'),
    description: __('Bootstrap button with various styles and options.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="button" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('button', 'bootstrap-blocks'),
        __('link', 'bootstrap-blocks'),
    ],
    supports: {
        align: true,
        html: false,
        anchor: true,
    },
    attributes: {
        text: {
            type: 'string',
            default: __('Click me', 'bootstrap-blocks'),
        },
        url: {
            type: 'string',
            default: '',
        },
        buttonColor: {
            type: 'string',
            default: 'primary',
        },
        buttonSize: {
            type: 'string',
            default: '',
        },
        buttonWidth: {
            type: 'string',
            default: '',
        },
        isOutline: {
            type: 'boolean',
            default: false,
        },
        isBlock: {
            type: 'boolean',
            default: false,
        },
        isDisabled: {
            type: 'boolean',
            default: false,
        },
        openInNewTab: {
            type: 'boolean',
            default: false,
        },
        addNofollow: {
            type: 'boolean',
            default: false,
        },
        addSponsored: {
            type: 'boolean',
            default: false,
        },
        addNoreferrer: {
            type: 'boolean',
            default: true,
        },
        customClasses: {
            type: 'string',
            default: '',
        },
        hasIcon: {
            type: 'boolean',
            default: false,
        },
        iconName: {
            type: 'string',
            default: '',
        },
        iconPosition: {
            type: 'string',
            default: 'left',
        },
        iconSpacing: {
            type: 'number',
            default: 8,
        },
    },

    /**
     * Edit function
     */
    edit: ({ attributes, setAttributes }) => {
        const {
            text,
            url,
            buttonColor,
            buttonSize,
            buttonWidth,
            isOutline,
            isBlock,
            isDisabled,
            openInNewTab,
            addNofollow,
            addSponsored,
            addNoreferrer,
            customClasses,
            hasIcon,
            iconName,
            iconPosition,
            iconSpacing,
        } = attributes;

        // Generate button class
        let buttonClass = 'btn';
        
        // Button variant
        if (isOutline) {
            buttonClass += ` btn-outline-${buttonColor}`;
        } else {
            buttonClass += ` btn-${buttonColor}`;
        }
        
        // Button size
        if (buttonSize) {
            buttonClass += ` btn-${buttonSize}`;
        }
        
        // Block level button
        if (isBlock) {
            buttonClass += ' btn-block d-block';
        }
        
        // Button width
        let buttonStyle = {};
        if (buttonWidth && !isBlock) {
            buttonStyle.width = buttonWidth;
        }
        
        // Custom classes
        if (customClasses) {
            buttonClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps({
            className: 'bootstrap-blocks-button-wrapper',
        });

        // Button color options
        const colorOptions = [
            { value: 'primary', label: __('Primary', 'bootstrap-blocks') },
            { value: 'secondary', label: __('Secondary', 'bootstrap-blocks') },
            { value: 'success', label: __('Success', 'bootstrap-blocks') },
            { value: 'danger', label: __('Danger', 'bootstrap-blocks') },
            { value: 'warning', label: __('Warning', 'bootstrap-blocks') },
            { value: 'info', label: __('Info', 'bootstrap-blocks') },
            { value: 'light', label: __('Light', 'bootstrap-blocks') },
            { value: 'dark', label: __('Dark', 'bootstrap-blocks') },
            { value: 'link', label: __('Link', 'bootstrap-blocks') },
        ];

        // Button size options
        const sizeOptions = [
            { value: '', label: __('Default', 'bootstrap-blocks') },
            { value: 'sm', label: __('Small', 'bootstrap-blocks') },
            { value: 'lg', label: __('Large', 'bootstrap-blocks') },
        ];
        
        // Icon options
        const iconOptions = [
            { value: '', label: __('Select an icon', 'bootstrap-blocks') },
            { value: 'arrow-right', label: __('Arrow Right', 'bootstrap-blocks') },
            { value: 'arrow-left', label: __('Arrow Left', 'bootstrap-blocks') },
            { value: 'download', label: __('Download', 'bootstrap-blocks') },
            { value: 'upload', label: __('Upload', 'bootstrap-blocks') },
            { value: 'check', label: __('Check', 'bootstrap-blocks') },
            { value: 'x', label: __('X', 'bootstrap-blocks') },
            { value: 'pencil', label: __('Pencil', 'bootstrap-blocks') },
            { value: 'trash', label: __('Trash', 'bootstrap-blocks') },
            { value: 'plus', label: __('Plus', 'bootstrap-blocks') },
            { value: 'dash', label: __('Dash', 'bootstrap-blocks') },
        ];
        
        // Icon position options
        const iconPositionOptions = [
            { value: 'left', label: __('Left', 'bootstrap-blocks') },
            { value: 'right', label: __('Right', 'bootstrap-blocks') },
        ];

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Button Settings', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__('Button Color', 'bootstrap-blocks')}
                            value={buttonColor}
                            options={colorOptions}
                            onChange={(value) => setAttributes({ buttonColor: value })}
                        />
                        
                        <SelectControl
                            label={__('Button Size', 'bootstrap-blocks')}
                            value={buttonSize}
                            options={sizeOptions}
                            onChange={(value) => setAttributes({ buttonSize: value })}
                        />
                        
                        <ToggleControl
                            label={__('Outline Button', 'bootstrap-blocks')}
                            checked={isOutline}
                            onChange={(value) => setAttributes({ isOutline: value })}
                        />
                        
                        <ToggleControl
                            label={__('Block Level Button', 'bootstrap-blocks')}
                            checked={isBlock}
                            onChange={(value) => setAttributes({ isBlock: value })}
                            help={__('Make the button span the full width of the parent', 'bootstrap-blocks')}
                        />
                        
                        {!isBlock && (
                            <TextControl
                                label={__('Button Width', 'bootstrap-blocks')}
                                value={buttonWidth}
                                onChange={(value) => setAttributes({ buttonWidth: value })}
                                help={__('Set a custom width (e.g., 200px, 50%, etc.)', 'bootstrap-blocks')}
                            />
                        )}
                        
                        <ToggleControl
                            label={__('Disabled', 'bootstrap-blocks')}
                            checked={isDisabled}
                            onChange={(value) => setAttributes({ isDisabled: value })}
                        />
                        
                        <TextControl
                            label={__('Custom Classes', 'bootstrap-blocks')}
                            value={customClasses}
                            onChange={(value) => setAttributes({ customClasses: value })}
                            help={__('Add custom classes to the button.', 'bootstrap-blocks')}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Link Settings', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <TextControl
                            label={__('URL', 'bootstrap-blocks')}
                            value={url}
                            onChange={(value) => setAttributes({ url: value })}
                        />
                        
                        <ToggleControl
                            label={__('Open in New Tab', 'bootstrap-blocks')}
                            checked={openInNewTab}
                            onChange={(value) => setAttributes({ openInNewTab: value })}
                        />
                        
                        <ToggleControl
                            label={__('Add nofollow', 'bootstrap-blocks')}
                            checked={addNofollow}
                            onChange={(value) => setAttributes({ addNofollow: value })}
                        />
                        
                        <ToggleControl
                            label={__('Add sponsored', 'bootstrap-blocks')}
                            checked={addSponsored}
                            onChange={(value) => setAttributes({ addSponsored: value })}
                        />
                        
                        <ToggleControl
                            label={__('Add noreferrer', 'bootstrap-blocks')}
                            checked={addNoreferrer}
                            onChange={(value) => setAttributes({ addNoreferrer: value })}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Icon Settings', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__('Add Icon', 'bootstrap-blocks')}
                            checked={hasIcon}
                            onChange={(value) => setAttributes({ hasIcon: value })}
                        />
                        
                        {hasIcon && (
                            <>
                                <SelectControl
                                    label={__('Icon', 'bootstrap-blocks')}
                                    value={iconName}
                                    options={iconOptions}
                                    onChange={(value) => setAttributes({ iconName: value })}
                                />
                                
                                <SelectControl
                                    label={__('Icon Position', 'bootstrap-blocks')}
                                    value={iconPosition}
                                    options={iconPositionOptions}
                                    onChange={(value) => setAttributes({ iconPosition: value })}
                                />
                                
                                <RangeControl
                                    label={__('Icon Spacing', 'bootstrap-blocks')}
                                    value={iconSpacing}
                                    onChange={(value) => setAttributes({ iconSpacing: value })}
                                    min={0}
                                    max={24}
                                    help={__('Space between text and icon in pixels.', 'bootstrap-blocks')}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="bootstrap-blocks-button">
                        <URLInputButton
                            url={url}
                            onChange={(url) => setAttributes({ url })}
                        />
                        <button
                            className={buttonClass}
                            style={buttonStyle}
                            disabled={isDisabled}
                        >
                            {hasIcon && iconName && iconPosition === 'left' && (
                                <span 
                                    className={`bootstrap-icon bootstrap-icon-${iconName}`}
                                    style={{ marginRight: `${iconSpacing}px` }}
                                />
                            )}
                            <RichText
                                tagName="span"
                                placeholder={__('Add text…', 'bootstrap-blocks')}
                                value={text}
                                onChange={(value) => setAttributes({ text: value })}
                                allowedFormats={['core/bold', 'core/italic']}
                                withoutInteractiveFormatting={true}
                            />
                            {hasIcon && iconName && iconPosition === 'right' && (
                                <span 
                                    className={`bootstrap-icon bootstrap-icon-${iconName}`}
                                    style={{ marginLeft: `${iconSpacing}px` }}
                                />
                            )}
                        </button>
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
            text,
            url,
            buttonColor,
            buttonSize,
            buttonWidth,
            isOutline,
            isBlock,
            isDisabled,
            openInNewTab,
            addNofollow,
            addSponsored,
            addNoreferrer,
            customClasses,
            hasIcon,
            iconName,
            iconPosition,
            iconSpacing,
        } = attributes;

        // Generate button class
        let buttonClass = 'btn';
        
        // Button variant
        if (isOutline) {
            buttonClass += ` btn-outline-${buttonColor}`;
        } else {
            buttonClass += ` btn-${buttonColor}`;
        }
        
        // Button size
        if (buttonSize) {
            buttonClass += ` btn-${buttonSize}`;
        }
        
        // Block level button
        if (isBlock) {
            buttonClass += ' btn-block d-block';
        }
        
        // Custom classes
        if (customClasses) {
            buttonClass += ` ${customClasses}`;
        }
        
        // Button style
        let buttonStyle = {};
        if (buttonWidth && !isBlock) {
            buttonStyle.width = buttonWidth;
        }
        
        // Link rel attribute
        let relAttribute = '';
        if (openInNewTab) {
            relAttribute += 'noopener ';
        }
        if (addNofollow) {
            relAttribute += 'nofollow ';
        }
        if (addSponsored) {
            relAttribute += 'sponsored ';
        }
        if (addNoreferrer) {
            relAttribute += 'noreferrer ';
        }
        relAttribute = relAttribute.trim();

        const blockProps = useBlockProps.save({
            className: 'bootstrap-blocks-button-wrapper',
        });

        return (
            <div {...blockProps}>
                <div className="bootstrap-blocks-button">
                    {!isDisabled && url ? (
                        <a
                            href={url}
                            className={buttonClass}
                            style={buttonWidth && !isBlock ? { width: buttonWidth } : undefined}
                            target={openInNewTab ? '_blank' : undefined}
                            rel={relAttribute || undefined}
                        >
                            {hasIcon && iconName && iconPosition === 'left' && (
                                <span 
                                    className={`bootstrap-icon bootstrap-icon-${iconName}`}
                                    style={{ marginRight: `${iconSpacing}px` }}
                                />
                            )}
                            <RichText.Content
                                tagName="span"
                                value={text}
                            />
                            {hasIcon && iconName && iconPosition === 'right' && (
                                <span 
                                    className={`bootstrap-icon bootstrap-icon-${iconName}`}
                                    style={{ marginLeft: `${iconSpacing}px` }}
                                />
                            )}
                        </a>
                    ) : (
                        <button
                            className={buttonClass}
                            style={buttonWidth && !isBlock ? { width: buttonWidth } : undefined}
                            disabled={isDisabled}
                        >
                            {hasIcon && iconName && iconPosition === 'left' && (
                                <span 
                                    className={`bootstrap-icon bootstrap-icon-${iconName}`}
                                    style={{ marginRight: `${iconSpacing}px` }}
                                />
                            )}
                            <RichText.Content
                                tagName="span"
                                value={text}
                            />
                            {hasIcon && iconName && iconPosition === 'right' && (
                                <span 
                                    className={`bootstrap-icon bootstrap-icon-${iconName}`}
                                    style={{ marginLeft: `${iconSpacing}px` }}
                                />
                            )}
                        </button>
                    )}
                </div>
            </div>
        );
    },
});