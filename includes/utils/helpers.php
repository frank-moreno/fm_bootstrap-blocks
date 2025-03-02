<?php
/**
 * Helper Functions
 *
 * Utility functions for Bootstrap Blocks
 *
 * @package BootstrapBlocks
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Get Bootstrap breakpoints
 *
 * @return array Array of Bootstrap breakpoints
 */
function bootstrap_blocks_get_breakpoints() {
    $breakpoints = array(
        'xs' => array(
            'name' => 'XS',
            'description' => __('Extra small devices (portrait phones, less than 576px)', 'bootstrap-blocks'),
            'value' => '0',
            'max' => '575px',
        ),
        'sm' => array(
            'name' => 'SM',
            'description' => __('Small devices (landscape phones, 576px and up)', 'bootstrap-blocks'),
            'value' => '576px',
            'max' => '767px',
        ),
        'md' => array(
            'name' => 'MD',
            'description' => __('Medium devices (tablets, 768px and up)', 'bootstrap-blocks'),
            'value' => '768px',
            'max' => '991px',
        ),
        'lg' => array(
            'name' => 'LG',
            'description' => __('Large devices (desktops, 992px and up)', 'bootstrap-blocks'),
            'value' => '992px',
            'max' => '1199px',
        ),
        'xl' => array(
            'name' => 'XL',
            'description' => __('Extra large devices (large desktops, 1200px and up)', 'bootstrap-blocks'),
            'value' => '1200px',
            'max' => '1399px',
        ),
        'xxl' => array(
            'name' => 'XXL',
            'description' => __('Extra extra large devices (larger desktops, 1400px and up)', 'bootstrap-blocks'),
            'value' => '1400px',
            'max' => '',
        ),
    );

    return apply_filters('bootstrap_blocks_breakpoints', $breakpoints);
}

/**
 * Get Bootstrap column widths
 *
 * @return array Array of Bootstrap column widths
 */
function bootstrap_blocks_get_column_widths() {
    $column_widths = array(
        array(
            'value' => 'auto',
            'label' => __('Auto', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'equal',
            'label' => __('Equal', 'bootstrap-blocks'),
        ),
    );

    // Add numerical column widths (1-12)
    for ($i = 1; $i <= 12; $i++) {
        $column_widths[] = array(
            'value' => (string) $i,
            'label' => $i . '/12',
        );
    }

    return apply_filters('bootstrap_blocks_column_widths', $column_widths);
}

/**
 * Get Bootstrap colors
 *
 * @param bool $include_text Whether to include text colors
 * @param bool $include_bg Whether to include background colors
 * 
 * @return array Array of Bootstrap colors
 */
function bootstrap_blocks_get_colors($include_text = true, $include_bg = true) {
    $colors = array(
        'primary' => array(
            'name' => __('Primary', 'bootstrap-blocks'),
            'color' => '#0d6efd',
        ),
        'secondary' => array(
            'name' => __('Secondary', 'bootstrap-blocks'),
            'color' => '#6c757d',
        ),
        'success' => array(
            'name' => __('Success', 'bootstrap-blocks'),
            'color' => '#198754',
        ),
        'danger' => array(
            'name' => __('Danger', 'bootstrap-blocks'),
            'color' => '#dc3545',
        ),
        'warning' => array(
            'name' => __('Warning', 'bootstrap-blocks'),
            'color' => '#ffc107',
        ),
        'info' => array(
            'name' => __('Info', 'bootstrap-blocks'),
            'color' => '#0dcaf0',
        ),
        'light' => array(
            'name' => __('Light', 'bootstrap-blocks'),
            'color' => '#f8f9fa',
        ),
        'dark' => array(
            'name' => __('Dark', 'bootstrap-blocks'),
            'color' => '#212529',
        ),
    );

    $result = array();

    if ($include_bg) {
        foreach ($colors as $key => $color) {
            $result['bg'][$key] = array(
                'name' => $color['name'],
                'slug' => 'bg-' . $key,
                'color' => $color['color'],
            );
        }
    }

    if ($include_text) {
        foreach ($colors as $key => $color) {
            $result['text'][$key] = array(
                'name' => $color['name'],
                'slug' => 'text-' . $key,
                'color' => $color['color'],
            );
        }
    }

    return apply_filters('bootstrap_blocks_colors', $result);
}

/**
 * Get Bootstrap button sizes
 *
 * @return array Array of Bootstrap button sizes
 */
function bootstrap_blocks_get_button_sizes() {
    $button_sizes = array(
        array(
            'value' => '',
            'label' => __('Default', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'sm',
            'label' => __('Small', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'lg',
            'label' => __('Large', 'bootstrap-blocks'),
        ),
    );

    return apply_filters('bootstrap_blocks_button_sizes', $button_sizes);
}

/**
 * Check if block style is allowed
 *
 * @param string $style_name The style name to check
 * @return bool Whether the style is allowed
 */
function bootstrap_blocks_is_style_allowed($style_name) {
    $allowed_styles = apply_filters('bootstrap_blocks_allowed_styles', array(
        'default',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
    ));

    return in_array($style_name, $allowed_styles, true);
}

/**
 * Get Bootstrap container types
 *
 * @return array Array of Bootstrap container types
 */
function bootstrap_blocks_get_container_types() {
    $container_types = array(
        array(
            'value' => 'container',
            'label' => __('Container', 'bootstrap-blocks'),
            'description' => __('A responsive fixed-width container with max-widths at each breakpoint.', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'container-fluid',
            'label' => __('Container Fluid', 'bootstrap-blocks'),
            'description' => __('A full-width container that spans the entire width of the viewport.', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'container-sm',
            'label' => __('Container SM', 'bootstrap-blocks'),
            'description' => __('100% wide until the SM breakpoint, then fixed width.', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'container-md',
            'label' => __('Container MD', 'bootstrap-blocks'),
            'description' => __('100% wide until the MD breakpoint, then fixed width.', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'container-lg',
            'label' => __('Container LG', 'bootstrap-blocks'),
            'description' => __('100% wide until the LG breakpoint, then fixed width.', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'container-xl',
            'label' => __('Container XL', 'bootstrap-blocks'),
            'description' => __('100% wide until the XL breakpoint, then fixed width.', 'bootstrap-blocks'),
        ),
        array(
            'value' => 'container-xxl',
            'label' => __('Container XXL', 'bootstrap-blocks'),
            'description' => __('100% wide until the XXL breakpoint, then fixed width.', 'bootstrap-blocks'),
        ),
    );

    return apply_filters('bootstrap_blocks_container_types', $container_types);
}

/**
 * Get all plugin settings with defaults
 *
 * @return array Plugin settings
 */
function bootstrap_blocks_get_settings() {
    $defaults = array(
        'load_bootstrap' => true,
        'enable_shortcodes' => true,
        'editor_options' => array(
            'highlight_blocks' => true,
            'show_block_labels' => true,
        ),
        'allowed_blocks' => array(
            'container' => true,
            'row' => true,
            'column' => true,
            'card' => true,
            'button' => true,
            'alert' => true,
            'tabs' => true,
            'accordion' => true,
        ),
    );

    $settings = get_option('bootstrap_blocks_settings', array());

    return wp_parse_args($settings, $defaults);
}

/**
 * Get a specific plugin setting
 *
 * @param string $key Setting key
 * @param mixed $default Default value if setting doesn't exist
 * 
 * @return mixed Setting value
 */
function bootstrap_blocks_get_setting($key, $default = null) {
    $settings = bootstrap_blocks_get_settings();

    if (isset($settings[$key])) {
        return $settings[$key];
    }

    return $default;
}

/**
 * Check if a block is enabled
 *
 * @param string $block_name Block name
 * @return bool Whether the block is enabled
 */
function bootstrap_blocks_is_block_enabled($block_name) {
    $allowed_blocks = bootstrap_blocks_get_setting('allowed_blocks', array());

    if (!isset($allowed_blocks[$block_name])) {
        return true; // Enable by default if not specified
    }

    return (bool) $allowed_blocks[$block_name];
}