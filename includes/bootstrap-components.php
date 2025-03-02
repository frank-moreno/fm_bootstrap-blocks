<?php
/**
 * Bootstrap Components Class
 *
 * Provides utility methods for Bootstrap components
 *
 * @package BootstrapBlocks
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Bootstrap Components Utility Class
 */
class Bootstrap_Blocks_Components {
    /**
     * Instance of this class
     *
     * @var Bootstrap_Blocks_Components
     */
    private static $instance;

    /**
     * Constructor
     */
    public function __construct() {
        // Initialize
        add_action('init', array($this, 'init'));
    }

    /**
     * Initialize
     */
    public function init() {
        // Register shortcodes if enabled
        $enable_shortcodes = apply_filters('bootstrap_blocks_enable_shortcodes', true);
        
        if ($enable_shortcodes) {
            $this->register_shortcodes();
        }
        
        // Add REST API endpoints
        add_action('rest_api_init', array($this, 'register_rest_routes'));
    }
    
    /**
     * Register shortcodes
     */
    private function register_shortcodes() {
        add_shortcode('bs_container', array($this, 'container_shortcode'));
        add_shortcode('bs_row', array($this, 'row_shortcode'));
        add_shortcode('bs_column', array($this, 'column_shortcode'));
        add_shortcode('bs_button', array($this, 'button_shortcode'));
        add_shortcode('bs_alert', array($this, 'alert_shortcode'));
        add_shortcode('bs_card', array($this, 'card_shortcode'));
        add_shortcode('bs_tabs', array($this, 'tabs_shortcode'));
        add_shortcode('bs_tab', array($this, 'tab_shortcode'));
        add_shortcode('bs_accordion', array($this, 'accordion_shortcode'));
        add_shortcode('bs_accordion_item', array($this, 'accordion_item_shortcode'));
    }
    
    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('bootstrap-blocks/v1', '/bootstrap-icons', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_bootstrap_icons'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('bootstrap-blocks/v1', '/bootstrap-colors', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_bootstrap_colors'),
            'permission_callback' => '__return_true',
        ));
    }
    
    /**
     * Get Bootstrap icons
     */
    public function get_bootstrap_icons() {
        $icons = array(
            'alarm',
            'alert-circle',
            'alert-triangle',
            'archive',
            'arrow-down',
            'arrow-left',
            'arrow-right',
            'arrow-up',
            'bell',
            'bookmark',
            'calendar',
            'camera',
            'check',
            'check-circle',
            'chevron-down',
            'chevron-left',
            'chevron-right',
            'chevron-up',
            'clipboard',
            'clock',
            'cloud',
            'code',
            'cog',
            'credit-card',
            'download',
            'edit',
            'envelope',
            'eye',
            'facebook',
            'file',
            'file-text',
            'folder',
            'gift',
            'globe',
            'heart',
            'home',
            'image',
            'instagram',
            'layers',
            'link',
            'linkedin',
            'list',
            'lock',
            'log-in',
            'log-out',
            'map',
            'menu',
            'message-circle',
            'message-square',
            'mic',
            'moon',
            'music',
            'paperclip',
            'pause',
            'phone',
            'play',
            'plus',
            'plus-circle',
            'printer',
            'search',
            'send',
            'settings',
            'share',
            'shield',
            'shopping-bag',
            'shopping-cart',
            'star',
            'sun',
            'tag',
            'trash',
            'twitter',
            'unlock',
            'upload',
            'user',
            'video',
            'x',
            'x-circle',
            'youtube',
            'zoom-in',
            'zoom-out',
        );
        
        return rest_ensure_response($icons);
    }
    
    /**
     * Get Bootstrap colors
     */
    public function get_bootstrap_colors() {
        $colors = array(
            array(
                'name' => __('Primary', 'bootstrap-blocks'),
                'slug' => 'primary',
                'color' => '#0d6efd',
            ),
            array(
                'name' => __('Secondary', 'bootstrap-blocks'),
                'slug' => 'secondary',
                'color' => '#6c757d',
            ),
            array(
                'name' => __('Success', 'bootstrap-blocks'),
                'slug' => 'success',
                'color' => '#198754',
            ),
            array(
                'name' => __('Danger', 'bootstrap-blocks'),
                'slug' => 'danger',
                'color' => '#dc3545',
            ),
            array(
                'name' => __('Warning', 'bootstrap-blocks'),
                'slug' => 'warning',
                'color' => '#ffc107',
            ),
            array(
                'name' => __('Info', 'bootstrap-blocks'),
                'slug' => 'info',
                'color' => '#0dcaf0',
            ),
            array(
                'name' => __('Light', 'bootstrap-blocks'),
                'slug' => 'light',
                'color' => '#f8f9fa',
            ),
            array(
                'name' => __('Dark', 'bootstrap-blocks'),
                'slug' => 'dark',
                'color' => '#212529',
            ),
        );
        
        return rest_ensure_response(apply_filters('bootstrap_blocks_colors', $colors));
    }
    
    /**
     * Container shortcode
     */
    public function container_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'type' => 'container', // container, container-fluid, container-{breakpoint}
                'class' => '',
            ),
            $atts,
            'bs_container'
        );
        
        $container_class = $atts['type'];
        if (!empty($atts['class'])) {
            $container_class .= ' ' . $atts['class'];
        }
        
        return '<div class="' . esc_attr($container_class) . '">' . do_shortcode($content) . '</div>';
    }
    
    /**
     * Row shortcode
     */
    public function row_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'class' => '',
                'vertical_align' => '', // align-items-{start|center|end}
                'horizontal_align' => '', // justify-content-{start|center|end|between|around}
                'no_gutters' => 'false',
                'gutter_size' => '3',
            ),
            $atts,
            'bs_row'
        );
        
        $row_class = 'row';
        
        // Vertical alignment
        if (!empty($atts['vertical_align'])) {
            $row_class .= ' align-items-' . $atts['vertical_align'];
        }
        
        // Horizontal alignment
        if (!empty($atts['horizontal_align'])) {
            $row_class .= ' justify-content-' . $atts['horizontal_align'];
        }
        
        // Gutters
        if ('true' === $atts['no_gutters']) {
            $row_class .= ' g-0';
        } elseif (!empty($atts['gutter_size'])) {
            $row_class .= ' g-' . $atts['gutter_size'];
        }
        
        // Additional classes
        if (!empty($atts['class'])) {
            $row_class .= ' ' . $atts['class'];
        }
        
        return '<div class="' . esc_attr($row_class) . '">' . do_shortcode($content) . '</div>';
    }
    
    /**
     * Column shortcode
     */
    public function column_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'class' => '',
                'xs' => '12', // Default full width on mobile
                'sm' => '',
                'md' => '',
                'lg' => '',
                'xl' => '',
                'offset_xs' => '',
                'offset_sm' => '',
                'offset_md' => '',
                'offset_lg' => '',
                'offset_xl' => '',
            ),
            $atts,
            'bs_column'
        );
        
        $col_class = '';
        
        // Widths for different breakpoints
        $breakpoints = array(
            'xs' => array('col', ''),
            'sm' => array('col-sm', 'sm'),
            'md' => array('col-md', 'md'),
            'lg' => array('col-lg', 'lg'),
            'xl' => array('col-xl', 'xl'),
        );
        
        foreach ($breakpoints as $bp => $prefix) {
            if (!empty($atts[$bp])) {
                $col_value = $atts[$bp];
                
                if ('auto' === $col_value) {
                    $col_class .= ' ' . ($bp === 'xs' ? 'col-auto' : $prefix[0] . '-auto');
                } elseif ('equal' === $col_value) {
                    $col_class .= ' ' . ($bp === 'xs' ? 'col' : $prefix[0]);
                } else {
                    $col_class .= ' ' . ($bp === 'xs' ? 'col-' . $col_value : $prefix[0] . '-' . $col_value);
                }
            }
            
            // Add offset
            $offset_key = 'offset_' . $bp;
            if (!empty($atts[$offset_key])) {
                $col_class .= ' ' . ($bp === 'xs' ? 'offset-' . $atts[$offset_key] : 'offset-' . $prefix[1] . '-' . $atts[$offset_key]);
            }
        }
        
        // If no column classes have been set, use default
        if (empty(trim($col_class))) {
            $col_class = 'col-12';
        }
        
        // Additional classes
        if (!empty($atts['class'])) {
            $col_class .= ' ' . $atts['class'];
        }
        
        return '<div class="' . esc_attr(trim($col_class)) . '">' . do_shortcode($content) . '</div>';
    }
    
    /**
     * Button shortcode
     */
    public function button_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'text' => 'Button',
                'url' => '#',
                'target' => '_self',
                'style' => 'primary',
                'size' => '',
                'outline' => 'false',
                'class' => '',
            ),
            $atts,
            'bs_button'
        );
        
        $btn_class = 'btn';
        
        // Button style
        if ('true' === $atts['outline']) {
            $btn_class .= ' btn-outline-' . $atts['style'];
        } else {
            $btn_class .= ' btn-' . $atts['style'];
        }
        
        // Button size
        if (!empty($atts['size'])) {
            $btn_class .= ' btn-' . $atts['size'];
        }
        
        // Additional classes
        if (!empty($atts['class'])) {
            $btn_class .= ' ' . $atts['class'];
        }
        
        return '<a href="' . esc_url($atts['url']) . '" target="' . esc_attr($atts['target']) . '" class="' . esc_attr($btn_class) . '">' . esc_html($atts['text']) . '</a>';
    }
    
    /**
     * Alert shortcode
     */
    public function alert_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'type' => 'primary',
                'dismissible' => 'false',
                'class' => '',
            ),
            $atts,
            'bs_alert'
        );
        
        $alert_class = 'alert alert-' . $atts['type'];
        
        if ('true' === $atts['dismissible']) {
            $alert_class .= ' alert-dismissible fade show';
            $dismiss_button = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        } else {
            $dismiss_button = '';
        }
        
        // Additional classes
        if (!empty($atts['class'])) {
            $alert_class .= ' ' . $atts['class'];
        }
        
        return '<div class="' . esc_attr($alert_class) . '" role="alert">' . do_shortcode($content) . $dismiss_button . '</div>';
    }
    
    /**
     * Card shortcode
     */
    public function card_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'title' => '',
                'image' => '',
                'image_alt' => '',
                'text_align' => '',
                'bg_color' => '',
                'border_color' => '',
                'class' => '',
            ),
            $atts,
            'bs_card'
        );
        
        $card_class = 'card';
        
        // Text alignment
        if (!empty($atts['text_align'])) {
            $card_class .= ' text-' . $atts['text_align'];
        }
        
        // Background color
        if (!empty($atts['bg_color'])) {
            $card_class .= ' bg-' . $atts['bg_color'];
        }
        
        // Border color
        if (!empty($atts['border_color'])) {
            $card_class .= ' border-' . $atts['border_color'];
        }
        
        // Additional classes
        if (!empty($atts['class'])) {
            $card_class .= ' ' . $atts['class'];
        }
        
        $output = '<div class="' . esc_attr($card_class) . '">';
        
        // Card image
        if (!empty($atts['image'])) {
            $output .= '<img src="' . esc_url($atts['image']) . '" class="card-img-top" alt="' . esc_attr($atts['image_alt']) . '">';
        }
        
        $output .= '<div class="card-body">';
        
        // Card title
        if (!empty($atts['title'])) {
            $output .= '<h5 class="card-title">' . esc_html($atts['title']) . '</h5>';
        }
        
        // Card content
        $output .= '<div class="card-text">' . do_shortcode($content) . '</div>';
        
        $output .= '</div></div>';
        
        return $output;
    }
    
    /**
     * Tabs shortcode
     * 
     * Usage:
     * [bs_tabs style="tabs" position="top" fade="true"]
     *   [bs_tab title="Tab 1"]Content 1[/bs_tab]
     *   [bs_tab title="Tab 2"]Content 2[/bs_tab]
     * [/bs_tabs]
     */
    public function tabs_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'style' => 'tabs',
                'position' => 'top',
                'fade' => 'true',
                'class' => '',
            ),
            $atts,
            'bs_tabs'
        );
        
        static $tab_id_counter = 0;
        $tab_id_counter++;
        $unique_id = 'bs-tabs-' . $tab_id_counter;
        
        $tabs_class = '';
        
        // Additional classes
        if (!empty($atts['class'])) {
            $tabs_class .= ' ' . $atts['class'];
        }
        
        // Extract tabs from content
        global $bs_tab_titles, $bs_tab_contents;
        $bs_tab_titles = array();
        $bs_tab_contents = array();
        
        // Process nested shortcodes
        do_shortcode($content);
        
        $tabs_html = '<div class="' . esc_attr(trim($tabs_class)) . '">';
        
        // Create tabs navigation
        $tabs_html .= '<ul class="nav nav-' . esc_attr($atts['style']) . ' ' . ($atts['position'] === 'left' ? 'flex-column me-3' : '') . '" role="tablist">';
        
        foreach ($bs_tab_titles as $index => $title) {
            $tab_id = $unique_id . '-tab-' . $index;
            $tab_content_id = $unique_id . '-content-' . $index;
            $active_class = ($index === 0) ? 'active' : '';
            
            $tabs_html .= '<li class="nav-item" role="presentation">';
            $tabs_html .= '<button class="nav-link ' . esc_attr($active_class) . '" id="' . esc_attr($tab_id) . '" data-bs-toggle="tab" data-bs-target="#' . esc_attr($tab_content_id) . '" type="button" role="tab" aria-controls="' . esc_attr($tab_content_id) . '" aria-selected="' . ($index === 0 ? 'true' : 'false') . '">' . esc_html($title) . '</button>';
            $tabs_html .= '</li>';
        }
        
        $tabs_html .= '</ul>';
        
        // Create tabs content
        $tabs_html .= '<div class="tab-content">';
        
        foreach ($bs_tab_contents as $index => $content) {
            $tab_id = $unique_id . '-tab-' . $index;
            $tab_content_id = $unique_id . '-content-' . $index;
            $active_class = ($index === 0) ? 'active' : '';
            $fade_class = ('true' === $atts['fade']) ? 'fade' : '';
            $show_class = ($index === 0 && 'true' === $atts['fade']) ? 'show' : '';
            
            $tabs_html .= '<div class="tab-pane ' . esc_attr($fade_class) . ' ' . esc_attr($active_class) . ' ' . esc_attr($show_class) . '" id="' . esc_attr($tab_content_id) . '" role="tabpanel" aria-labelledby="' . esc_attr($tab_id) . '">';
            $tabs_html .= $content;
            $tabs_html .= '</div>';
        }
        
        $tabs_html .= '</div>';
        
        // For left positioned tabs, wrap in flex container
        if ('left' === $atts['position']) {
            $tabs_html = '<div class="d-flex">' . $tabs_html . '</div>';
        }
        
        $tabs_html .= '</div>';
        
        return $tabs_html;
    }
    
    /**
     * Tab shortcode (to be used inside bs_tabs)
     */
    public function tab_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'title' => 'Tab',
            ),
            $atts,
            'bs_tab'
        );
        
        global $bs_tab_titles, $bs_tab_contents;
        
        $bs_tab_titles[] = $atts['title'];
        $bs_tab_contents[] = do_shortcode($content);
        
        // Return empty string because output is handled by the parent shortcode
        return '';
    }
    
    /**
     * Accordion shortcode
     * 
     * Usage:
     * [bs_accordion always_open="false"]
     *   [bs_accordion_item title="Item 1"]Content 1[/bs_accordion_item]
     *   [bs_accordion_item title="Item 2"]Content 2[/bs_accordion_item]
     * [/bs_accordion]
     */
    public function accordion_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'always_open' => 'false',
                'class' => '',
            ),
            $atts,
            'bs_accordion'
        );
        
        static $accordion_counter = 0;
        $accordion_counter++;
        $unique_id = 'bs-accordion-' . $accordion_counter;
        
        $accordion_class = 'accordion';
        
        // Additional classes
        if (!empty($atts['class'])) {
            $accordion_class .= ' ' . $atts['class'];
        }
        
        global $bs_accordion_id, $bs_accordion_always_open;
        $bs_accordion_id = $unique_id;
        $bs_accordion_always_open = ('true' === $atts['always_open']);
        
        $output = '<div class="' . esc_attr($accordion_class) . '" id="' . esc_attr($unique_id) . '">';
        $output .= do_shortcode($content);
        $output .= '</div>';
        
        return $output;
    }
    
    /**
     * Accordion Item shortcode (to be used inside bs_accordion)
     */
    public function accordion_item_shortcode($atts, $content = null) {
        $atts = shortcode_atts(
            array(
                'title' => 'Accordion Item',
                'open' => 'false',
            ),
            $atts,
            'bs_accordion_item'
        );
        
        static $item_counter = 0;
        $item_counter++;
        
        global $bs_accordion_id, $bs_accordion_always_open;
        
        $item_id = $bs_accordion_id . '-collapse-' . $item_counter;
        $heading_id = $bs_accordion_id . '-heading-' . $item_counter;
        
        $show_class = ('true' === $atts['open']) ? 'show' : '';
        $collapsed_class = ('true' === $atts['open']) ? '' : 'collapsed';
        $expanded = ('true' === $atts['open']) ? 'true' : 'false';
        
        $output = '<div class="accordion-item">';
        
        // Accordion header
        $output .= '<h2 class="accordion-header" id="' . esc_attr($heading_id) . '">';
        $output .= '<button class="accordion-button ' . esc_attr($collapsed_class) . '" type="button" data-bs-toggle="collapse" data-bs-target="#' . esc_attr($item_id) . '" aria-expanded="' . esc_attr($expanded) . '" aria-controls="' . esc_attr($item_id) . '">';
        $output .= esc_html($atts['title']);
        $output .= '</button>';
        $output .= '</h2>';
        
        // Accordion content
        $output .= '<div id="' . esc_attr($item_id) . '" class="accordion-collapse collapse ' . esc_attr($show_class) . '" aria-labelledby="' . esc_attr($heading_id) . '"';
        
        if (!$bs_accordion_always_open) {
            $output .= ' data-bs-parent="#' . esc_attr($bs_accordion_id) . '"';
        }
        
        $output .= '>';
        $output .= '<div class="accordion-body">';
        $output .= do_shortcode($content);
        $output .= '</div>';
        $output .= '</div>';
        
        $output .= '</div>';
        
        return $output;
    }
    
    /**
     * Get instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

// Initialize the Bootstrap Components
Bootstrap_Blocks_Components::get_instance();