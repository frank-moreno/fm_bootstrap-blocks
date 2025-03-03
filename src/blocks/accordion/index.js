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
    TextControl,
    ToggleControl,
    Button,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BootstrapIcons } from '../../components/bootstrap-icon';

/**
 * Register the block
 */
registerBlockType('bootstrap-blocks/accordion', {
    title: __('Accordion', 'bootstrap-blocks'),
    description: __('Bootstrap accordion component for displaying collapsible content.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="accordion" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('accordion', 'bootstrap-blocks'),
        __('collapse', 'bootstrap-blocks'),
    ],
    supports: {
        align: ['wide', 'full'],
        html: false,
        anchor: true,
    },
    attributes: {
        accordionId: {
            type: 'string',
            default: '',
        },
        items: {
            type: 'array',
            default: [
                {
                    id: 'item-1',
                    title: __('Accordion Item #1', 'bootstrap-blocks'),
                    open: true,
                },
                {
                    id: 'item-2',
                    title: __('Accordion Item #2', 'bootstrap-blocks'),
                    open: false,
                },
            ],
        },
        alwaysOpen: {
            type: 'boolean',
            default: false,
        },
        flush: {
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
    edit: ({ attributes, setAttributes, clientId }) => {
        const {
            accordionId,
            items,
            alwaysOpen,
            flush,
            customClasses,
        } = attributes;

        // Generate accordion ID if not set
        if (!accordionId) {
            setAttributes({ accordionId: `accordion-${clientId.slice(0, 8)}` });
        }

        // Accordion class
        const accordionClass = `accordion ${flush ? 'accordion-flush' : ''} ${customClasses}`;

        const blockProps = useBlockProps({
            className: accordionClass,
        });

        // Helper functions
        const onAddItem = () => {
            const newItemId = `item-${Date.now()}`;
            const newItems = [...items, {
                id: newItemId,
                title: __('New Accordion Item', 'bootstrap-blocks'),
                open: false,
            }];
            setAttributes({ items: newItems });
        };

        const onRemoveItem = (itemId) => {
            if (items.length <= 1) {
                return; // Don't remove the last item
            }
            
            const newItems = items.filter(item => item.id !== itemId);
            setAttributes({ items: newItems });
        };

        const onChangeItemTitle = (title, index) => {
            const newItems = [...items];
            newItems[index].title = title;
            setAttributes({ items: newItems });
        };

        const onToggleItem = (itemId) => {
            // If always open is enabled, we just toggle the current item
            if (alwaysOpen) {
                const newItems = items.map(item => ({
                    ...item,
                    open: item.id === itemId ? !item.open : item.open,
                }));
                setAttributes({ items: newItems });
            } else {
                // Otherwise, we close all other items
                const newItems = items.map(item => ({
                    ...item,
                    open: item.id === itemId ? !item.open : false,
                }));
                setAttributes({ items: newItems });
            }
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Accordion Settings', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <TextControl
                            label={__('Accordion ID', 'bootstrap-blocks')}
                            value={accordionId}
                            onChange={(value) => setAttributes({ accordionId: value })}
                            help={__('Unique identifier for the accordion.', 'bootstrap-blocks')}
                        />
                        
                        <ToggleControl
                            label={__('Always Open', 'bootstrap-blocks')}
                            checked={alwaysOpen}
                            onChange={(value) => setAttributes({ alwaysOpen: value })}
                            help={__('Allow multiple items to be open at the same time.', 'bootstrap-blocks')}
                        />
                        
                        <ToggleControl
                            label={__('Flush Style', 'bootstrap-blocks')}
                            checked={flush}
                            onChange={(value) => setAttributes({ flush: value })}
                            help={__('Remove the default background color, borders, and rounded corners.', 'bootstrap-blocks')}
                        />
                        
                        <TextControl
                            label={__('Custom Classes', 'bootstrap-blocks')}
                            value={customClasses}
                            onChange={(value) => setAttributes({ customClasses: value })}
                            help={__('Add custom classes to the accordion.', 'bootstrap-blocks')}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    {items.map((item, index) => (
                        <div className="accordion-item" key={item.id}>
                            <h2 className="accordion-header" id={`heading-${item.id}`}>
                                <button
                                    className={`accordion-button ${item.open ? '' : 'collapsed'}`}
                                    type="button"
                                    onClick={() => onToggleItem(item.id)}
                                    aria-expanded={item.open ? 'true' : 'false'}
                                    aria-controls={`collapse-${item.id}`}
                                >
                                    <RichText
                                        tagName="span"
                                        value={item.title}
                                        onChange={(value) => onChangeItemTitle(value, index)}
                                        placeholder={__('Accordion item title...', 'bootstrap-blocks')}
                                        withoutInteractiveFormatting
                                    />
                                    
                                    {items.length > 1 && (
                                        <button
                                            className="remove-item-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveItem(item.id);
                                            }}
                                            style={{
                                                marginLeft: 'auto',
                                                marginRight: '10px',
                                                padding: '0',
                                                background: 'none',
                                                border: 'none',
                                                color: '#cc1818',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                            }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </button>
                            </h2>
                            <div
                                id={`collapse-${item.id}`}
                                className={`accordion-collapse collapse ${item.open ? 'show' : ''}`}
                                aria-labelledby={`heading-${item.id}`}
                            >
                                <div className="accordion-body">
                                    <InnerBlocks
                                        template={[['core/paragraph', { placeholder: __('Accordion content...', 'bootstrap-blocks') }]]}
                                        templateLock={false}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="add-accordion-item">
                        <Button
                            isSecondary
                            onClick={onAddItem}
                            className="add-accordion-item-button"
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '10px',
                            }}
                        >
                            {__('+ Add Accordion Item', 'bootstrap-blocks')}
                        </Button>
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
            accordionId,
            items,
            alwaysOpen,
            flush,
            customClasses,
        } = attributes;

        // Accordion class
        const accordionClass = `accordion ${flush ? 'accordion-flush' : ''} ${customClasses}`;

        const blockProps = useBlockProps.save({
            className: accordionClass,
            id: accordionId,
        });

        return (
            <div {...blockProps}>
                {items.map((item, index) => (
                    <div className="accordion-item" key={item.id}>
                        <h2 className="accordion-header" id={`heading-${item.id}`}>
                            <button
                                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${item.id}`}
                                aria-expanded={index === 0 ? 'true' : 'false'}
                                aria-controls={`collapse-${item.id}`}
                            >
                                <RichText.Content value={item.title} />
                            </button>
                        </h2>
                        <div
                            id={`collapse-${item.id}`}
                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                            aria-labelledby={`heading-${item.id}`}
                            data-bs-parent={alwaysOpen ? undefined : `#${accordionId}`}
                        >
                            <div className="accordion-body">
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    },
});