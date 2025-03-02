<?php
/**
 * Blocks Manager Class
 *
 * Responsible for registering and loading Gutenberg blocks
 *
 * @package BootstrapBlocks
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Bootstrap Blocks Manager
 */
class Bootstrap_Blocks_Manager {
    /**
     * Available blocks
     *
     * @var array
     */
    private $blocks = array();

    /**
     * Constructor
     */
    public function __construct() {
        // Define blocks
        $this->blocks = array(
            'container' => array(
                'name' => 'bootstrap-blocks/container',
                'render_callback' => array($this, 'render_container_block'),
                'editor_script' => 'bootstrap-blocks-container-editor',
                'editor_style' => 'bootstrap-blocks-container-editor',
                'style' => 'bootstrap-blocks-container',
            ),
            'row' => array(
                'name' => 'bootstrap-blocks/row',
                'render_callback' => array($this, 'render_row_block'),
                'editor_script' => 'bootstrap-blocks-row-editor',
                'editor_style' => 'bootstrap-blocks-row-editor',
                'style' => 'bootstrap-blocks-row',
            ),
            'column' => array(
                'name' => 'bootstrap-blocks/column',
                'render_callback' => array($this, 'render_column_block'),
                'editor_script' => 'bootstrap-blocks-column-editor',
                'editor_style' => 'bootstrap-blocks-column-editor',
                'style' => 'bootstrap-blocks-column',
            ),
            'card' => array(
                'name' => 'bootstrap-blocks/card',
                'render_callback' => array($this, 'render_card_block'),
                'editor_script' => 'bootstrap-blocks-card-editor',
                'editor_style' => 'bootstrap-blocks-card-editor',
                'style' => 'bootstrap-blocks-card',
            ),
            'button' => array(
                'name' => 'bootstrap-blocks/button',
                'render_callback' => array($this, 'render_button_block'),
                'editor_script' => 'bootstrap-blocks-button-editor',
                'editor_style' => 'bootstrap-blocks-button-editor',
                'style' => 'bootstrap-blocks-button',
            ),
            'alert' => array(
                'name' => 'bootstrap-blocks/alert',
                'render_callback' => array($this, 'render_alert_block'),
                'editor_script' => 'bootstrap-blocks-alert-editor',
                'editor_style' => 'bootstrap-blocks-alert-editor',
                'style' => 'bootstrap-blocks-alert',
            ),
            'tabs' => array(
                'name' => 'bootstrap-blocks/tabs',
                'render_callback' => array($this, 'render_tabs_block'),
                'editor_script' => 'bootstrap-blocks-tabs-editor',
                'editor_style' => 'bootstrap-blocks-tabs-editor',
                'style' => 'bootstrap-blocks-tabs',
            ),
            'accordion' => array(
                'name' => 'bootstrap-blocks/accordion',
                'render_callback' => array($this, 'render_accordion_block'),
                'editor_script' => 'bootstrap-blocks-accordion-editor',
                'editor_style' => 'bootstrap-blocks-accordion-editor',
                'style' => 'bootstrap-blocks-accordion',
            ),
        );
    }

    /**
     * Initialize blocks
     */
    public function init() {
        // Register block assets
        add_action('init', array($this, 'register_block_assets'));
        
        // Register blocks
        add_action('init', array($this, 'register_blocks'));
    }

    /**
     * Register block assets
     */
    public function register_block_assets() {
        // Register Bootstrap core assets
        wp_register_style(
            'bootstrap-blocks-core',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/css/bootstrap.min.css',
            array(),
            BOOTSTRAP_BLOCKS_VERSION
        );

        wp_register_script(
            'bootstrap-blocks-core',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/js/bootstrap.bundle.min.js',
            array('jquery'),
            BOOTSTRAP_BLOCKS_VERSION,
            true
        );

        // Common editor assets
        wp_register_script(
            'bootstrap-blocks-editor-components',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/blocks/common/components.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
            BOOTSTRAP_BLOCKS_VERSION,
            true
        );

        wp_register_style(
            'bootstrap-blocks-editor',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/blocks/common/editor.css',
            array('wp-edit-blocks', 'bootstrap-blocks-core'),
            BOOTSTRAP_BLOCKS_VERSION
        );

        // Register individual block assets
        foreach ($this->blocks as $block_key => $block) {
            // Editor script
            wp_register_script(
                $block['editor_script'],
                BOOTSTRAP_BLOCKS_PLUGIN_URL . "dist/blocks/{$block_key}/index.js",
                array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'bootstrap-blocks-editor-components'),
                BOOTSTRAP_BLOCKS_VERSION,
                true
            );

            // Editor style
            wp_register_style(
                $block['editor_style'],
                BOOTSTRAP_BLOCKS_PLUGIN_URL . "dist/blocks/{$block_key}/editor.css",
                array('bootstrap-blocks-editor'),
                BOOTSTRAP_BLOCKS_VERSION
            );

            // Frontend style
            wp_register_style(
                $block['style'],
                BOOTSTRAP_BLOCKS_PLUGIN_URL . "dist/blocks/{$block_key}/style.css",
                array('bootstrap-blocks-core'),
                BOOTSTRAP_BLOCKS_VERSION
            );
        }
    }

    /**
     * Register blocks
     */
    public function register_blocks() {
        // Loop through blocks and register each
        foreach ($this->blocks as $block_key => $block) {
            register_block_type(
                $block['name'],
                array(
                    'editor_script' => $block['editor_script'],
                    'editor_style' => $block['editor_style'],
                    'style' => $block['style'],
                    'render_callback' => $block['render_callback'],
                )
            );
        }
    }

    /**
     * Render Container block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_container_block($attributes, $content) {
        $container_type = isset($attributes['containerType']) ? $attributes['containerType'] : 'container';
        $classes = 'bootstrap-blocks-container ' . $container_type;
        
        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        // Additional custom classes
        if (isset($attributes['customClasses'])) {
            $classes .= ' ' . $attributes['customClasses'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array('class' => $classes));

        return sprintf(
            '<div %1$s>%2$s</div>',
            $wrapper_attributes,
            $content
        );
    }

    /**
     * Render Row block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_row_block($attributes, $content) {
        $classes = 'bootstrap-blocks-row row';
        
        // Responsive alignment
        $vertical_alignments = array(
            'xs' => isset($attributes['verticalAlignXs']) ? $attributes['verticalAlignXs'] : '',
            'sm' => isset($attributes['verticalAlignSm']) ? $attributes['verticalAlignSm'] : '',
            'md' => isset($attributes['verticalAlignMd']) ? $attributes['verticalAlignMd'] : '',
            'lg' => isset($attributes['verticalAlignLg']) ? $attributes['verticalAlignLg'] : '',
            'xl' => isset($attributes['verticalAlignXl']) ? $attributes['verticalAlignXl'] : '',
        );

        foreach ($vertical_alignments as $breakpoint => $alignment) {
            if (!empty($alignment)) {
                $align_class = ($breakpoint === 'xs') ? "align-items-{$alignment}" : "align-items-{$breakpoint}-{$alignment}";
                $classes .= ' ' . $align_class;
            }
        }

        // Horizontal alignment
        $horizontal_alignments = array(
            'xs' => isset($attributes['horizontalAlignXs']) ? $attributes['horizontalAlignXs'] : '',
            'sm' => isset($attributes['horizontalAlignSm']) ? $attributes['horizontalAlignSm'] : '',
            'md' => isset($attributes['horizontalAlignMd']) ? $attributes['horizontalAlignMd'] : '',
            'lg' => isset($attributes['horizontalAlignLg']) ? $attributes['horizontalAlignLg'] : '',
            'xl' => isset($attributes['horizontalAlignXl']) ? $attributes['horizontalAlignXl'] : '',
        );

        foreach ($horizontal_alignments as $breakpoint => $alignment) {
            if (!empty($alignment)) {
                $align_class = ($breakpoint === 'xs') ? "justify-content-{$alignment}" : "justify-content-{$breakpoint}-{$alignment}";
                $classes .= ' ' . $align_class;
            }
        }

        // Gutters
        if (isset($attributes['noGutters']) && $attributes['noGutters']) {
            $classes .= ' g-0';
        } elseif (isset($attributes['gutterSize'])) {
            $classes .= ' g-' . $attributes['gutterSize'];
        }

        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array('class' => $classes));

        return sprintf(
            '<div %1$s>%2$s</div>',
            $wrapper_attributes,
            $content
        );
    }

    /**
     * Render Column block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_column_block($attributes, $content) {
        $classes = 'bootstrap-blocks-column';
        
        // Responsive column sizes
        $breakpoints = array('xs', 'sm', 'md', 'lg', 'xl');
        
        foreach ($breakpoints as $breakpoint) {
            // Width
            $width_key = $breakpoint . 'Width';
            $width = isset($attributes[$width_key]) ? $attributes[$width_key] : '';
            
            if (!empty($width)) {
                if ($width === 'auto') {
                    $classes .= ($breakpoint === 'xs') ? ' col-auto' : " col-{$breakpoint}-auto";
                } elseif ($width === 'equal') {
                    $classes .= ($breakpoint === 'xs') ? ' col' : " col-{$breakpoint}";
                } else {
                    $classes .= ($breakpoint === 'xs') ? " col-{$width}" : " col-{$breakpoint}-{$width}";
                }
            }
            
            // Offset
            $offset_key = $breakpoint . 'Offset';
            $offset = isset($attributes[$offset_key]) ? $attributes[$offset_key] : '';
            
            if (!empty($offset)) {
                $classes .= ($breakpoint === 'xs') ? " offset-{$offset}" : " offset-{$breakpoint}-{$offset}";
            }
        }

        // If no column classes have been set, use default
        if (strpos($classes, 'col') === false) {
            $classes .= ' col-12';
        }
        
        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array('class' => $classes));

        return sprintf(
            '<div %1$s>%2$s</div>',
            $wrapper_attributes,
            $content
        );
    }

    /**
     * Render Card block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_card_block($attributes, $content) {
        $classes = 'bootstrap-blocks-card card';
        
        // Card text alignment
        if (isset($attributes['textAlign']) && !empty($attributes['textAlign'])) {
            $classes .= ' text-' . $attributes['textAlign'];
        }
        
        // Card background
        if (isset($attributes['bgColor']) && !empty($attributes['bgColor'])) {
            $classes .= ' bg-' . $attributes['bgColor'];
        }
        
        // Card border
        if (isset($attributes['borderColor']) && !empty($attributes['borderColor'])) {
            $classes .= ' border-' . $attributes['borderColor'];
        }
        
        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array('class' => $classes));

        return sprintf(
            '<div %1$s>%2$s</div>',
            $wrapper_attributes,
            $content
        );
    }

    /**
     * Render Button block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_button_block($attributes, $content) {
        $button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : '';
        $button_url = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '#';
        $button_target = isset($attributes['buttonTarget']) ? $attributes['buttonTarget'] : '_self';
        $button_style = isset($attributes['buttonStyle']) ? $attributes['buttonStyle'] : 'primary';
        $button_size = isset($attributes['buttonSize']) ? $attributes['buttonSize'] : '';
        $button_outline = isset($attributes['buttonOutline']) && $attributes['buttonOutline'] ? true : false;
        
        $classes = 'bootstrap-blocks-button btn';
        
        // Button style
        if ($button_outline) {
            $classes .= ' btn-outline-' . $button_style;
        } else {
            $classes .= ' btn-' . $button_style;
        }
        
        // Button size
        if (!empty($button_size)) {
            $classes .= ' btn-' . $button_size;
        }
        
        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array('class' => 'bootstrap-blocks-button-wrapper'));

        return sprintf(
            '<div %1$s><a href="%2$s" target="%3$s" class="%4$s">%5$s</a></div>',
            $wrapper_attributes,
            esc_url($button_url),
            esc_attr($button_target),
            esc_attr($classes),
            esc_html($button_text)
        );
    }

    /**
     * Render Alert block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_alert_block($attributes, $content) {
        $alert_type = isset($attributes['alertType']) ? $attributes['alertType'] : 'primary';
        $dismissible = isset($attributes['dismissible']) && $attributes['dismissible'] ? true : false;
        
        $classes = 'bootstrap-blocks-alert alert alert-' . $alert_type;
        
        if ($dismissible) {
            $classes .= ' alert-dismissible fade show';
            $dismiss_button = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        } else {
            $dismiss_button = '';
        }
        
        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array(
            'class' => $classes,
            'role' => 'alert',
        ));

        return sprintf(
            '<div %1$s>%2$s%3$s</div>',
            $wrapper_attributes,
            $content,
            $dismiss_button
        );
    }

    /**
     * Render Tabs block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_tabs_block($attributes, $content) {
        $unique_id = uniqid('bootstrap-blocks-tabs-');
        $tab_style = isset($attributes['tabStyle']) ? $attributes['tabStyle'] : 'tabs';
        $tab_position = isset($attributes['tabPosition']) ? $attributes['tabPosition'] : 'top';
        $fade_effect = isset($attributes['fadeEffect']) && $attributes['fadeEffect'] ? true : false;
        
        $tabs = isset($attributes['tabs']) ? $attributes['tabs'] : array();
        
        $classes = 'bootstrap-blocks-tabs';
        
        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array('class' => $classes));

        // Build tabs HTML
        $tabs_html = '<ul class="nav nav-' . esc_attr($tab_style) . ' ' . ($tab_position === 'left' ? 'flex-column me-3' : '') . '" role="tablist">';
        $tabs_content_html = '<div class="tab-content">';
        
        foreach ($tabs as $index => $tab) {
            $tab_id = $unique_id . '-tab-' . $index;
            $tab_content_id = $unique_id . '-content-' . $index;
            $active_class = ($index === 0) ? 'active' : '';
            
            // Tab header
            $tabs_html .= sprintf(
                '<li class="nav-item" role="presentation">
                    <button class="nav-link %1$s" id="%2$s" data-bs-toggle="tab" data-bs-target="#%3$s" type="button" role="tab" aria-controls="%3$s" aria-selected="%4$s">%5$s</button>
                </li>',
                esc_attr($active_class),
                esc_attr($tab_id),
                esc_attr($tab_content_id),
                ($index === 0) ? 'true' : 'false',
                esc_html($tab['title'])
            );
            
            // Tab content
            $tabs_content_html .= sprintf(
                '<div class="tab-pane fade %1$s %2$s" id="%3$s" role="tabpanel" aria-labelledby="%4$s">%5$s</div>',
                esc_attr($active_class),
                $fade_effect ? 'show' : '',
                esc_attr($tab_content_id),
                esc_attr($tab_id),
                wp_kses_post($tab['content'])
            );
        }
        
        $tabs_html .= '</ul>';
        $tabs_content_html .= '</div>';
        
        // Combine based on tab position
        if ($tab_position === 'left') {
            $content_html = '<div class="d-flex">' . $tabs_html . $tabs_content_html . '</div>';
        } else {
            $content_html = $tabs_html . $tabs_content_html;
        }

        return sprintf(
            '<div %1$s>%2$s</div>',
            $wrapper_attributes,
            $content_html
        );
    }

    /**
     * Render Accordion block
     *
     * @param array  $attributes Block attributes.
     * @param string $content    Block content.
     * @return string Rendered block HTML.
     */
    public function render_accordion_block($attributes, $content) {
        $unique_id = uniqid('bootstrap-blocks-accordion-');
        $accordion_items = isset($attributes['accordionItems']) ? $attributes['accordionItems'] : array();
        $always_open = isset($attributes['alwaysOpen']) && $attributes['alwaysOpen'] ? true : false;
        
        $classes = 'bootstrap-blocks-accordion accordion';
        
        if (isset($attributes['className'])) {
            $classes .= ' ' . $attributes['className'];
        }

        $wrapper_attributes = get_block_wrapper_attributes(array('class' => $classes, 'id' => $unique_id));

        $accordion_html = '';
        
        foreach ($accordion_items as $index => $item) {
            $item_id = $unique_id . '-item-' . $index;
            $item_heading_id = $item_id . '-heading';
            $item_collapse_id = $item_id . '-collapse';
            $show_class = ($index === 0) ? 'show' : '';
            $collapsed_class = ($index === 0) ? '' : 'collapsed';
            $aria_expanded = ($index === 0) ? 'true' : 'false';
            
            $accordion_html .= sprintf(
                '<div class="accordion-item">
                    <h2 class="accordion-header" id="%1$s">
                        <button class="accordion-button %2$s" type="button" data-bs-toggle="collapse" data-bs-target="#%3$s" aria-expanded="%4$s" aria-controls="%3$s">
                            %5$s
                        </button>
                    </h2>
                    <div id="%3$s" class="accordion-collapse collapse %6$s" aria-labelledby="%1$s" %7$s>
                        <div class="accordion-body">
                            %8$s
                        </div>
                    </div>
                </div>',
                esc_attr($item_heading_id),
                esc_attr($collapsed_class),
                esc_attr($item_collapse_id),
                esc_attr($aria_expanded),
                esc_html($item['title']),
                esc_attr($show_class),
                $always_open ? '' : 'data-bs-parent="#' . esc_attr($unique_id) . '"',
                wp_kses_post($item['content'])
            );
        }

        return sprintf(
            '<div %1$s>%2$s</div>',
            $wrapper_attributes,
            $accordion_html
        );
    }
}