/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    TextControl,
    ToggleControl,
    Button,
    RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BootstrapIcons } from '../../components/bootstrap-icon';

/**
 * Register the block
 */
registerBlockType('bootstrap-blocks/card', {
    title: __('Card', 'bootstrap-blocks'),
    description: __('Bootstrap card component for displaying content in a flexible container.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="card-text" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('card', 'bootstrap-blocks'),
        __('box', 'bootstrap-blocks'),
    ],
    supports: {
        align: ['wide', 'full'],
        html: false,
        anchor: true,
    },
    attributes: {
        cardTitle: {
            type: 'string',
            default: '',
        },
        cardSubtitle: {
            type: 'string',
            default: '',
        },
        cardText: {
            type: 'string',
            default: '',
        },
        imageUrl: {
            type: 'string',
            default: '',
        },
        imageId: {
            type: 'number',
        },
        imagePosition: {
            type: 'string',
            default: 'top',
        },
        backgroundColor: {
            type: 'string',
        },
        textColor: {
            type: 'string',
        },
        borderColor: {
            type: 'string',
        },
        hasOutline: {
            type: 'boolean',
            default: false,
        },
        hasShadow: {
            type: 'boolean',
            default: false,
        },
        horizontalLayout: {
            type: 'boolean',
            default: false,
        },
        imageWidth: {
            type: 'number',
            default: 0,
        },
        hasFooter: {
            type: 'boolean',
            default: false,
        },
        footerText: {
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
            cardTitle,
            cardSubtitle,
            cardText,
            imageUrl,
            imageId,
            imagePosition,
            backgroundColor,
            textColor,
            borderColor,
            hasOutline,
            hasShadow,
            horizontalLayout,
            imageWidth,
            hasFooter,
            footerText,
            customClasses,
        } = attributes;

        // Generate card class
        let cardClass = 'card';

        // Background color
        if (backgroundColor) {
            cardClass += ` bg-${backgroundColor}`;
            
            // Text contrast
            if (['primary', 'secondary', 'success', 'danger', 'dark'].includes(backgroundColor)) {
                cardClass += ' text-white';
            }
        }
        
        // Border (Outline)
        if (hasOutline && borderColor) {
            cardClass += ` border-${borderColor}`;
        }
        
        // Shadow
        if (hasShadow) {
            cardClass += ' shadow';
        }
        
        // Horizontal card
        if (horizontalLayout) {
            cardClass += ' flex-row';
        }
        
        // Custom classes
        if (customClasses) {
            cardClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps({
            className: cardClass,
        });

        // Bootstrap color options
        const colorOptions = [
            { value: '', label: __('Default', 'bootstrap-blocks') },
            { value: 'primary', label: __('Primary', 'bootstrap-blocks') },
            { value: 'secondary', label: __('Secondary', 'bootstrap-blocks') },
            { value: 'success', label: __('Success', 'bootstrap-blocks') },
            { value: 'danger', label: __('Danger', 'bootstrap-blocks') },
            { value: 'warning', label: __('Warning', 'bootstrap-blocks') },
            { value: 'info', label: __('Info', 'bootstrap-blocks') },
            { value: 'light', label: __('Light', 'bootstrap-blocks') },
            { value: 'dark', label: __('Dark', 'bootstrap-blocks') },
        ];

        // Image position options
        const imagePositionOptions = [
            { value: 'top', label: __('Top', 'bootstrap-blocks') },
            { value: 'bottom', label: __('Bottom', 'bootstrap-blocks') },
        ];
        
        if (horizontalLayout) {
            imagePositionOptions.push(
                { value: 'left', label: __('Left', 'bootstrap-blocks') },
                { value: 'right', label: __('Right', 'bootstrap-blocks') }
            );
        }

        // Helper functions
        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id,
            });
        };

        const onRemoveImage = () => {
            setAttributes({
                imageUrl: '',
                imageId: undefined,
            });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Card Settings', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <ToggleControl
                            label={__('Has Shadow', 'bootstrap-blocks')}
                            checked={hasShadow}
                            onChange={(value) => setAttributes({ hasShadow: value })}
                        />
                        
                        <ToggleControl
                            label={__('Outline Card', 'bootstrap-blocks')}
                            checked={hasOutline}
                            onChange={(value) => setAttributes({ hasOutline: value })}
                        />
                        
                        <ToggleControl
                            label={__('Horizontal Layout', 'bootstrap-blocks')}
                            checked={horizontalLayout}
                            onChange={(value) => setAttributes({ horizontalLayout: value })}
                        />
                        
                        {horizontalLayout && imageUrl && (
                            <RangeControl
                                label={__('Image Width (%)', 'bootstrap-blocks')}
                                value={imageWidth}
                                onChange={(value) => setAttributes({ imageWidth: value })}
                                min={10}
                                max={90}
                                step={5}
                            />
                        )}
                        
                        <ToggleControl
                            label={__('Has Footer', 'bootstrap-blocks')}
                            checked={hasFooter}
                            onChange={(value) => setAttributes({ hasFooter: value })}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Card Image', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <div>
                                        {!imageUrl && (
                                            <Button
                                                onClick={open}
                                                isPrimary
                                            >
                                                {__('Select Image', 'bootstrap-blocks')}
                                            </Button>
                                        )}
                                        {imageUrl && (
                                            <div>
                                                <img
                                                    src={imageUrl}
                                                    alt={__('Card Image', 'bootstrap-blocks')}
                                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                                />
                                                <div className="button-container" style={{ display: 'flex', gap: '8px' }}>
                                                    <Button
                                                        onClick={open}
                                                        isSecondary
                                                    >
                                                        {__('Replace Image', 'bootstrap-blocks')}
                                                    </Button>
                                                    <Button
                                                        onClick={onRemoveImage}
                                                        isDestructive
                                                    >
                                                        {__('Remove Image', 'bootstrap-blocks')}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>

                        {imageUrl && (
                            <SelectControl
                                label={__('Image Position', 'bootstrap-blocks')}
                                value={imagePosition}
                                options={imagePositionOptions}
                                onChange={(value) => setAttributes({ imagePosition: value })}
                            />
                        )}
                    </PanelBody>

                    <PanelBody
                        title={__('Colors', 'bootstrap-blocks')}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Background Color', 'bootstrap-blocks')}
                            value={backgroundColor}
                            options={colorOptions}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                        
                        <SelectControl
                            label={__('Border Color', 'bootstrap-blocks')}
                            value={borderColor}
                            options={colorOptions}
                            onChange={(value) => setAttributes({ borderColor: value })}
                            help={hasOutline ? __('Applied with outline style', 'bootstrap-blocks') : ''}
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
                            help={__('Add custom classes to the card.', 'bootstrap-blocks')}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    {/* Card Image - Top Position */}
                    {imageUrl && (imagePosition === 'top' || (horizontalLayout && imagePosition === 'left')) && (
                        <img 
                            src={imageUrl} 
                            className={horizontalLayout ? 'card-img-left' : 'card-img-top'} 
                            alt={__('Card Image', 'bootstrap-blocks')}
                            style={horizontalLayout && imageWidth ? { width: `${imageWidth}%` } : {}}
                        />
                    )}

                    <div className="card-body">
                        <RichText
                            tagName="h5"
                            className="card-title"
                            placeholder={__('Card Title', 'bootstrap-blocks')}
                            value={cardTitle}
                            onChange={(value) => setAttributes({ cardTitle: value })}
                            allowedFormats={['core/bold', 'core/italic']}
                        />
                        
                        <RichText
                            tagName="h6"
                            className="card-subtitle mb-2 text-muted"
                            placeholder={__('Card Subtitle', 'bootstrap-blocks')}
                            value={cardSubtitle}
                            onChange={(value) => setAttributes({ cardSubtitle: value })}
                            allowedFormats={['core/bold', 'core/italic']}
                        />
                        
                        <RichText
                            tagName="p"
                            className="card-text"
                            placeholder={__('Card Text', 'bootstrap-blocks')}
                            value={cardText}
                            onChange={(value) => setAttributes({ cardText: value })}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
                        
                        <InnerBlocks />
                    </div>

                    {/* Card Image - Bottom Position */}
                    {imageUrl && (imagePosition === 'bottom' || (horizontalLayout && imagePosition === 'right')) && (
                        <img 
                            src={imageUrl} 
                            className={horizontalLayout ? 'card-img-right' : 'card-img-bottom'} 
                            alt={__('Card Image', 'bootstrap-blocks')}
                            style={horizontalLayout && imageWidth ? { width: `${imageWidth}%` } : {}}
                        />
                    )}

                    {/* Card Footer */}
                    {hasFooter && (
                        <div className="card-footer">
                            <RichText
                                placeholder={__('Card Footer', 'bootstrap-blocks')}
                                value={footerText}
                                onChange={(value) => setAttributes({ footerText: value })}
                                allowedFormats={['core/bold', 'core/italic', 'core/link']}
                            />
                        </div>
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
            cardTitle,
            cardSubtitle,
            cardText,
            imageUrl,
            imagePosition,
            backgroundColor,
            textColor,
            borderColor,
            hasOutline,
            hasShadow,
            horizontalLayout,
            imageWidth,
            hasFooter,
            footerText,
            customClasses,
        } = attributes;

        // Generate card class
        let cardClass = 'card';

        // Background color
        if (backgroundColor) {
            cardClass += ` bg-${backgroundColor}`;
            
            // Text contrast
            if (['primary', 'secondary', 'success', 'danger', 'dark'].includes(backgroundColor)) {
                cardClass += ' text-white';
            }
        }
        
        // Border (Outline)
        if (hasOutline && borderColor) {
            cardClass += ` border-${borderColor}`;
        }
        
        // Shadow
        if (hasShadow) {
            cardClass += ' shadow';
        }
        
        // Horizontal card
        if (horizontalLayout) {
            cardClass += ' flex-row';
        }
        
        // Custom classes
        if (customClasses) {
            cardClass += ` ${customClasses}`;
        }

        const blockProps = useBlockProps.save({
            className: cardClass,
        });

        return (
            <div {...blockProps}>
                {/* Card Image - Top Position */}
                {imageUrl && (imagePosition === 'top' || (horizontalLayout && imagePosition === 'left')) && (
                    <img 
                        src={imageUrl} 
                        className={horizontalLayout ? 'card-img-left' : 'card-img-top'} 
                        alt=""
                        style={horizontalLayout && imageWidth ? { width: `${imageWidth}%` } : {}}
                    />
                )}

                <div className="card-body">
                    {cardTitle && (
                        <RichText.Content
                            tagName="h5"
                            className="card-title"
                            value={cardTitle}
                        />
                    )}
                    
                    {cardSubtitle && (
                        <RichText.Content
                            tagName="h6"
                            className="card-subtitle mb-2 text-muted"
                            value={cardSubtitle}
                        />
                    )}
                    
                    {cardText && (
                        <RichText.Content
                            tagName="p"
                            className="card-text"
                            value={cardText}
                        />
                    )}
                    
                    <InnerBlocks.Content />
                </div>

                {/* Card Image - Bottom Position */}
                {imageUrl && (imagePosition === 'bottom' || (horizontalLayout && imagePosition === 'right')) && (
                    <img 
                        src={imageUrl} 
                        className={horizontalLayout ? 'card-img-right' : 'card-img-bottom'} 
                        alt=""
                        style={horizontalLayout && imageWidth ? { width: `${imageWidth}%` } : {}}
                    />
                )}

                {/* Card Footer */}
                {hasFooter && footerText && (
                    <div className="card-footer">
                        <RichText.Content
                            value={footerText}
                        />
                    </div>
                )}
            </div>
        );
    },
});