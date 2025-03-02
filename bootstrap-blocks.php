<?php
/**
 * Plugin Name: Bootstrap Blocks
 * Plugin URI: https://yourcompany.com/bootstrap-blocks
 * Description: Custom Gutenberg blocks with Bootstrap integration for faster and more efficient WordPress development.
 * Version: 1.0.0
 * Author: Your Company
 * Author URI: https://yourcompany.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: bootstrap-blocks
 * Domain Path: /languages
 *
 * @package BootstrapBlocks
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

// Define constants.
define('BOOTSTRAP_BLOCKS_VERSION', '1.0.0');
define('BOOTSTRAP_BLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('BOOTSTRAP_BLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('BOOTSTRAP_BLOCKS_PLUGIN_FILE', __FILE__);
define('BOOTSTRAP_BLOCKS_PLUGIN_BASE', plugin_basename(__FILE__));

/**
 * Bootstrap Blocks Main Class
 */
class Bootstrap_Blocks {
    /**
     * Instance of this class
     *
     * @var Bootstrap_Blocks
     */
    private static $instance;

    /**
     * Plugin initialization
     */
    public function __construct() {
        // Load plugin dependencies
        $this->load_dependencies();

        // Register hooks
        $this->register_hooks();

        // Initialize blocks
        $this->init_blocks();
    }

    /**
     * Load plugin dependencies
     */
    private function load_dependencies() {
        // Load core plugin class files
        require_once BOOTSTRAP_BLOCKS_PLUGIN_DIR . 'includes/blocks-manager.php';
        require_once BOOTSTRAP_BLOCKS_PLUGIN_DIR . 'includes/assets-manager.php';
        require_once BOOTSTRAP_BLOCKS_PLUGIN_DIR . 'includes/bootstrap-components.php';
        
        // Load utility files
        require_once BOOTSTRAP_BLOCKS_PLUGIN_DIR . 'includes/utils/helpers.php';
    }

    /**
     * Register plugin hooks
     */
    private function register_hooks() {
        // Initialize plugin
        add_action('plugins_loaded', array($this, 'load_plugin_textdomain'));
        
        // Register blocks category
        add_filter('block_categories_all', array($this, 'register_block_category'), 10, 2);
        
        // Admin hooks
        if (is_admin()) {
            add_action('admin_menu', array($this, 'register_admin_menu'));
            add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        }
    }

    /**
     * Load plugin textdomain
     */
    public function load_plugin_textdomain() {
        load_plugin_textdomain(
            'bootstrap-blocks',
            false,
            dirname(BOOTSTRAP_BLOCKS_PLUGIN_BASE) . '/languages'
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
                    'icon'  => 'bootstrap-blocks-icon',
                ),
            )
        );
    }

    /**
     * Admin menu registration
     */
    public function register_admin_menu() {
        add_menu_page(
            __('Bootstrap Blocks', 'bootstrap-blocks'),
            __('Bootstrap Blocks', 'bootstrap-blocks'),
            'manage_options',
            'bootstrap-blocks',
            array($this, 'render_admin_page'),
            'dashicons-layout',
            30
        );
    }

    /**
     * Render admin page
     */
    public function render_admin_page() {
        include BOOTSTRAP_BLOCKS_PLUGIN_DIR . 'admin/admin-page.php';
    }

    /**
     * Enqueue admin scripts
     */
    public function admin_enqueue_scripts($hook) {
        if ('toplevel_page_bootstrap-blocks' !== $hook) {
            return;
        }

        wp_enqueue_style(
            'bootstrap-blocks-admin',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'admin/css/admin.css',
            array(),
            BOOTSTRAP_BLOCKS_VERSION
        );

        wp_enqueue_script(
            'bootstrap-blocks-admin',
            BOOTSTRAP_BLOCKS_PLUGIN_URL . 'admin/js/admin.js',
            array('jquery'),
            BOOTSTRAP_BLOCKS_VERSION,
            true
        );
    }

    /**
     * Initialize blocks
     */
    private function init_blocks() {
        $blocks_manager = new Bootstrap_Blocks_Manager();
        $blocks_manager->init();
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

// Initialize plugin
function bootstrap_blocks_init() {
    return Bootstrap_Blocks::get_instance();
}

// Start the plugin
bootstrap_blocks_init();