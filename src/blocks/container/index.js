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
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BootstrapIcons } from '../../components/bootstrap-icon';
// import { ContainerPreview } from './components/container-preview';

/**
 * Register the block
 */
registerBlockType('bootstrap-blocks/container', {
    title: __('Container', 'bootstrap-blocks'),
    description: __('Bootstrap container for creating responsive layouts.', 'bootstrap-blocks'),
    category: 'bootstrap-blocks',
    icon: <BootstrapIcons icon="layout-three-columns" />,
    keywords: [
        __('bootstrap', 'bootstrap-blocks'),
        __('container', 'bootstrap-blocks'),
        __('layout', 'bootstrap-blocks'),
    ],
    supports: {
        align: false,
        html: false,
        anchor: true,
    },
    attributes: {
        containerType: {
            type: 'string',
            default: 'container',
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
        const { containerType, customClasses } = attributes;
        
        const blockProps = useBlockProps({
            className: `bootstrap-blocks-container ${containerType} ${customClasses}`,
        });
        
        // Container type options
        const containerTypeOptions = [
            { value: 'container', label: __('Container', 'bootstrap-blocks') },
            { value: 'container-fluid', label: __('Container Fluid', 'bootstrap-blocks') },
            { value: 'container-sm', label: __('Container SM', 'bootstrap-blocks') },
            { value: 'container-md', label: __('Container MD', 'bootstrap-blocks') },
            { value: 'container-lg', label: __('Container LG', 'bootstrap-blocks') },
            { value: 'container-xl', label: __('Container XL', 'bootstrap-blocks') },
            { value: 'container-xxl', label: __('Container XXL', 'bootstrap-blocks') },
        ];
        
        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={__('Container Settings', 'bootstrap-blocks')}
                        initialOpen={true}
                    >
                        <SelectControl
                            label={__('Container Type', 'bootstrap-blocks')}
                            value={containerType}
                            options={containerTypeOptions}
                            onChange={(value) => setAttributes({ containerType: value })}
                            help={__('Select the type of container to use.', 'bootstrap-blocks')}
                        />
                        
                        <TextControl
                            label={__('Custom Classes', 'bootstrap-blocks')}
                            value={customClasses}
                            onChange={(value) => setAttributes({ customClasses: value })}
                            help={__('Add custom classes to the container.', 'bootstrap-blocks')}
                        />
                        
                        {/* <ContainerPreview containerType={containerType} /> */}
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
        const { containerType, customClasses } = attributes;
        
        const blockProps = useBlockProps.save({
            className: `bootstrap-blocks-container ${containerType} ${customClasses}`,
        });
        
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});