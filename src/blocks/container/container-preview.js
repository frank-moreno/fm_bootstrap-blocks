/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { 
    Button,
    CardBody,
    CardDivider,
    CardHeader,
    Card,
    __experimentalText as Text,
} from '@wordpress/components';

/**
 * Container Preview Component
 */
export const ContainerPreview = ({ containerType }) => {
    const [showPreview, setShowPreview] = useState(false);
    
    if (!showPreview) {
        return (
            <Button 
                variant="secondary"
                onClick={() => setShowPreview(true)}
                style={{ marginTop: '10px' }}
            >
                {__('Show Container Information', 'bootstrap-blocks')}
            </Button>
        );
    }
    
    // Container type descriptions
    const containerTypes = {
        'container': {
            title: __('Container', 'bootstrap-blocks'),
            description: __('A responsive fixed-width container with max-widths at each breakpoint.', 'bootstrap-blocks'),
            breakpoints: [
                { name: 'XS', value: '<576px', width: '100%' },
                { name: 'SM', value: '≥576px', width: '540px' },
                { name: 'MD', value: '≥768px', width: '720px' },
                { name: 'LG', value: '≥992px', width: '960px' },
                { name: 'XL', value: '≥1200px', width: '1140px' },
                { name: 'XXL', value: '≥1400px', width: '1320px' },
            ],
        },
        'container-fluid': {
            title: __('Container Fluid', 'bootstrap-blocks'),
            description: __('A full-width container that spans the entire width of the viewport.', 'bootstrap-blocks'),
            breakpoints: [
                { name: 'All Breakpoints', value: 'All sizes', width: '100%' },
            ],
        },
        'container-sm': {
            title: __('Container SM', 'bootstrap-blocks'),
            description: __('100% wide until the SM breakpoint, then fixed width.', 'bootstrap-blocks'),
            breakpoints: [
                { name: 'XS', value: '<576px', width: '100%' },
                { name: 'SM', value: '≥576px', width: '540px' },
                { name: 'MD', value: '≥768px', width: '720px' },
                { name: 'LG', value: '≥992px', width: '960px' },
                { name: 'XL', value: '≥1200px', width: '1140px' },
                { name: 'XXL', value: '≥1400px', width: '1320px' },
            ],
        },
        'container-md': {
            title: __('Container MD', 'bootstrap-blocks'),
            description: __('100% wide until the MD breakpoint, then fixed width.', 'bootstrap-blocks'),
            breakpoints: [
                { name: 'XS', value: '<576px', width: '100%' },
                { name: 'SM', value: '≥576px', width: '100%' },
                { name: 'MD', value: '≥768px', width: '720px' },
                { name: 'LG', value: '≥992px', width: '960px' },
                { name: 'XL', value: '≥1200px', width: '1140px' },
                { name: 'XXL', value: '≥1400px', width: '1320px' },
            ],
        },
        'container-lg': {
            title: __('Container LG', 'bootstrap-blocks'),
            description: __('100% wide until the LG breakpoint, then fixed width.', 'bootstrap-blocks'),
            breakpoints: [
                { name: 'XS', value: '<576px', width: '100%' },
                { name: 'SM', value: '≥576px', width: '100%' },
                { name: 'MD', value: '≥768px', width: '100%' },
                { name: 'LG', value: '≥992px', width: '960px' },
                { name: 'XL', value: '≥1200px', width: '1140px' },
                { name: 'XXL', value: '≥1400px', width: '1320px' },
            ],
        },
        'container-xl': {
            title: __('Container XL', 'bootstrap-blocks'),
            description: __('100% wide until the XL breakpoint, then fixed width.', 'bootstrap-blocks'),
            breakpoints: [
                { name: 'XS', value: '<576px', width: '100%' },
                { name: 'SM', value: '≥576px', width: '100%' },
                { name: 'MD', value: '≥768px', width: '100%' },
                { name: 'LG', value: '≥992px', width: '100%' },
                { name: 'XL', value: '≥1200px', width: '1140px' },
                { name: 'XXL', value: '≥1400px', width: '1320px' },
            ],
        },
        'container-xxl': {
            title: __('Container XXL', 'bootstrap-blocks'),
            description: __('100% wide until the XXL breakpoint, then fixed width.', 'bootstrap-blocks'),
            breakpoints: [
                { name: 'XS', value: '<576px', width: '100%' },
                { name: 'SM', value: '≥576px', width: '100%' },
                { name: 'MD', value: '≥768px', width: '100%' },
                { name: 'LG', value: '≥992px', width: '100%' },
                { name: 'XL', value: '≥1200px', width: '100%' },
                { name: 'XXL', value: '≥1400px', width: '1320px' },
            ],
        },
    };
    
    const containerInfo = containerTypes[containerType] || containerTypes['container'];
    
    return (
        <Card style={{ marginTop: '15px' }}>
            <CardHeader>
                <Text size={16} weight={600}>
                    {containerInfo.title}
                </Text>
                <Button
                    isSmall
                    variant="tertiary"
                    onClick={() => setShowPreview(false)}
                >
                    {__('Hide', 'bootstrap-blocks')}
                </Button>
            </CardHeader>
            
            <CardBody>
                <Text>{containerInfo.description}</Text>
            </CardBody>
            
            <CardDivider />
            
            <CardBody>
                <Text weight={500}>
                    {__('Responsive Behavior:', 'bootstrap-blocks')}
                </Text>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 1fr 1fr',
                    gap: '8px',
                    marginTop: '10px'
                }}>
                    <Text weight={600}>{__('Breakpoint', 'bootstrap-blocks')}</Text>
                    <Text weight={600}>{__('Screen Width', 'bootstrap-blocks')}</Text>
                    <Text weight={600}>{__('Container Width', 'bootstrap-blocks')}</Text>
                    
                    {containerInfo.breakpoints.map((bp, i) => (
                        <>
                            <Text key={`bp-${i}-name`}>{bp.name}</Text>
                            <Text key={`bp-${i}-value`}>{bp.value}</Text>
                            <Text key={`bp-${i}-width`}>{bp.width}</Text>
                        </>
                    ))}
                </div>
                
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    marginTop: '15px',
                    width: '100%',
                    height: '60px',
                    position: 'relative'
                }}>
                    <div style={{ 
                        width: '100%',
                        height: '100%',
                        border: '1px dashed #ccc',
                        position: 'relative'
                    }}>
                        <div style={{ 
                            width: containerType === 'container-fluid' ? '100%' : '75%',
                            height: '100%',
                            backgroundColor: '#f0f0f0',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ddd'
                        }}>
                            <Text>{containerInfo.title}</Text>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};