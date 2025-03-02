<?php
/**
 * Assets Manager Class
 *
 * Handles loading and management of plugin assets
 *
 * @package BootstrapBlocks
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Bootstrap Blocks Assets Manager
 */
class Bootstrap_Blocks_Assets_Manager {
    /**
     * Instance of this class
     *
     * @var Bootstrap_Blocks_Assets_Manager
     */
    private static $instance;

    /**
     * Constructor
     */
    public function __construct() {
        // Register hooks
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        
        // Filter to add custom Gutenberg block categories
        add_filter('block_categories_all', array($this, 'register_block_category'), 10, 2);
    }

    /**
     * Enqueue frontend assets
     */
    public function enqueue_frontend_assets() {
        // Check if Bootstrap should be loaded
        $load_bootstrap = apply_filters('bootstrap_blocks_load_bootstrap', true);
        
        if ($load_bootstrap) {
            // Enqueue Bootstrap CSS
            wp_enqueue_style(
                'bootstrap-blocks-bootstrap',
                BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/css/bootstrap.min.css',
                array(),
                BOOTSTRAP_BLOCKS_VERSION
            );
            
            // Enqueue Bootstrap JS
            wp_enqueue_script(
                'bootstrap-blocks-bootstrap',
                BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/js/bootstrap.bundle.min.js',
                array('jquery'),
                BOOTSTRAP_BLOCKS_VERSION,
                true
            );
        }
        
        // Enqueue frontend styles
        wp_enqueue_style(
            'bootstrap-blocks-frontend',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/css/frontend.css',
            array(),
            BOOTSTRAP_BLOCKS_VERSION
        );
        
        // Enqueue frontend scripts
        wp_enqueue_script(
            'bootstrap-blocks-frontend',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/js/frontend.js',
            array('jquery'),
            BOOTSTRAP_BLOCKS_VERSION,
            true
        );
        
        // Pass settings to frontend script
        wp_localize_script(
            'bootstrap-blocks-frontend',
            'bootstrapBlocksSettings',
            array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'pluginUrl' => BOOTSTRAP_BLOCKS_PLUGIN_URL,
            )
        );
    }

    /**
     * Enqueue editor assets
     */
    public function enqueue_editor_assets() {
        // Editor only CSS (shared across all blocks)
        wp_enqueue_style(
            'bootstrap-blocks-editor-styles',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/css/editor.css',
            array('wp-edit-blocks'),
            BOOTSTRAP_BLOCKS_VERSION
        );
        
        // Editor JavaScript
        wp_enqueue_script(
            'bootstrap-blocks-editor-script',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/js/editor.js',
            array(
                'wp-blocks',
                'wp-i18n',
                'wp-element',
                'wp-editor',
                'wp-components',
                'wp-data',
                'wp-compose',
                'wp-server-side-render',
            ),
            BOOTSTRAP_BLOCKS_VERSION,
            true
        );
        
        // Pass settings to editor script
        wp_localize_script(
            'bootstrap-blocks-editor-script',
            'bootstrapBlocksEditor',
            array(
                'pluginUrl' => BOOTSTRAP_BLOCKS_PLUGIN_URL,
                'bootstrapVersion' => '5.3.0', // Current Bootstrap version
                'blockDefaults' => $this->get_block_defaults(),
            )
        );
    }

    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        // Only load on settings page
        if ('settings_page_bootstrap-blocks' !== $hook) {
            return;
        }
        
        wp_enqueue_style(
            'bootstrap-blocks-admin-styles',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/css/admin.css',
            array(),
            BOOTSTRAP_BLOCKS_VERSION
        );
        
        wp_enqueue_script(
            'bootstrap-blocks-admin-scripts',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'dist/js/admin.js',
            array('jquery'),
            BOOTSTRAP_BLOCKS_VERSION,
            true
        );
    }

    /**
     * Register custom block category
     *
     * @param array  $categories Block categories.
     * @param object $post Post object.
     */
    public function register_block_category($categories, $post) {
        return array_merge(
            $categories,
            array(
                array(
                    'slug'  => 'bootstrap-blocks',
                    'title' => __('Bootstrap Blocks', 'bootstrap-blocks'),
                    'icon'  => 'bootstrap',
                ),
            )
        );
    }

    /**
     * Get block defaults
     */
    private function get_block_defaults() {
        return array(
            'container' => array(
                'containerType' => 'container',
            ),
            'row' => array(
                'verticalAlignXs' => '',
                'horizontalAlignXs' => '',
                'noGutters' => false,
                'gutterSize' => '3',
            ),
            'column' => array(
                'xsWidth' => '12',
                'smWidth' => '',
                'mdWidth' => '',
                'lgWidth' => '',
                'xlWidth' => '',
                'xsOffset' => '',
                'smOffset' => '',
                'mdOffset' => '',
                'lgOffset' => '',
                'xlOffset' => '',
            ),
            'card' => array(
                'textAlign' => '',
                'bgColor' => '',
                'borderColor' => '',
            ),
            'button' => array(
                'buttonText' => 'Button',
                'buttonUrl' => '#',
                'buttonTarget' => '_self',
                'buttonStyle' => 'primary',
                'buttonSize' => '',
                'buttonOutline' => false,
            ),
            'alert' => array(
                'alertType' => 'primary',
                'dismissible' => false,
            ),
            'tabs' => array(
                'tabStyle' => 'tabs',
                'tabPosition' => 'top',
                'fadeEffect' => true,
                'tabs' => array(
                    array(
                        'title' => 'Tab 1',
                        'content' => 'Tab 1 content goes here.',
                    ),
                    array(
                        'title' => 'Tab 2',
                        'content' => 'Tab 2 content goes here.',
                    ),
                ),
            ),
            'accordion' => array(
                'alwaysOpen' => false,
                'accordionItems' => array(
                    array(
                        'title' => 'Accordion Item 1',
                        'content' => 'Content for accordion item 1.',
                    ),
                    array(
                        'title' => 'Accordion Item 2',
                        'content' => 'Content for accordion item 2.',
                    ),
                ),
            ),
        );
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

// Initialize the Assets Manager
Bootstrap_Blocks_Assets_Manager::get_instance();