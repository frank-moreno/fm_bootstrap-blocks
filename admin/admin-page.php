<?php
/**
 * Admin Page for Bootstrap Blocks
 *
 * @package BootstrapBlocks
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

// Get plugin settings
$settings = bootstrap_blocks_get_settings();
?>

<div class="wrap bootstrap-blocks-admin">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    
    <div class="bootstrap-blocks-admin-header">
        <div class="bootstrap-blocks-admin-logo">
            <img src="<?php echo esc_url(BOOTSTRAP_BLOCKS_PLUGIN_URL . 'admin/images/bootstrap-blocks-logo.svg'); ?>" alt="Bootstrap Blocks Logo">
        </div>
        <div class="bootstrap-blocks-admin-version">
            <span><?php esc_html_e('Version', 'bootstrap-blocks'); ?>: <?php echo esc_html(BOOTSTRAP_BLOCKS_VERSION); ?></span>
        </div>
    </div>
    
    <div class="bootstrap-blocks-admin-main">
        <div class="bootstrap-blocks-admin-tabs">
            <div class="nav-tab-wrapper">
                <a href="#settings" class="nav-tab nav-tab-active" data-tab="settings"><?php esc_html_e('Settings', 'bootstrap-blocks'); ?></a>
                <a href="#blocks" class="nav-tab" data-tab="blocks"><?php esc_html_e('Blocks', 'bootstrap-blocks'); ?></a>
                <a href="#documentation" class="nav-tab" data-tab="documentation"><?php esc_html_e('Documentation', 'bootstrap-blocks'); ?></a>
                <a href="#support" class="nav-tab" data-tab="support"><?php esc_html_e('Support', 'bootstrap-blocks'); ?></a>
            </div>
            
            <div class="bootstrap-blocks-admin-tab-content">
                <!-- Settings Tab -->
                <div id="settings" class="bootstrap-blocks-admin-tab-pane active">
                    <form method="post" action="options.php" class="bootstrap-blocks-settings-form">
                        <?php settings_fields('bootstrap_blocks_settings'); ?>
                        
                        <h2><?php esc_html_e('General Settings', 'bootstrap-blocks'); ?></h2>
                        
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="bootstrap_blocks_load_bootstrap">
                                        <?php esc_html_e('Load Bootstrap CSS & JS', 'bootstrap-blocks'); ?>
                                    </label>
                                </th>
                                <td>
                                    <input type="checkbox" id="bootstrap_blocks_load_bootstrap" name="bootstrap_blocks_settings[load_bootstrap]" value="1" <?php checked($settings['load_bootstrap']); ?>>
                                    <p class="description">
                                        <?php esc_html_e('Enable to load Bootstrap CSS and JavaScript files. Disable if your theme already includes Bootstrap.', 'bootstrap-blocks'); ?>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="bootstrap_blocks_enable_shortcodes">
                                        <?php esc_html_e('Enable Shortcodes', 'bootstrap-blocks'); ?>
                                    </label>
                                </th>
                                <td>
                                    <input type="checkbox" id="bootstrap_blocks_enable_shortcodes" name="bootstrap_blocks_settings[enable_shortcodes]" value="1" <?php checked($settings['enable_shortcodes']); ?>>
                                    <p class="description">
                                        <?php esc_html_e('Enable shortcodes for Bootstrap components.', 'bootstrap-blocks'); ?>
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <h2><?php esc_html_e('Editor Settings', 'bootstrap-blocks'); ?></h2>
                        
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="bootstrap_blocks_highlight_blocks">
                                        <?php esc_html_e('Highlight Blocks', 'bootstrap-blocks'); ?>
                                    </label>
                                </th>
                                <td>
                                    <input type="checkbox" id="bootstrap_blocks_highlight_blocks" name="bootstrap_blocks_settings[editor_options][highlight_blocks]" value="1" <?php checked($settings['editor_options']['highlight_blocks']); ?>>
                                    <p class="description">
                                        <?php esc_html_e('Add borders to blocks in the editor to make them more visible.', 'bootstrap-blocks'); ?>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="bootstrap_blocks_show_block_labels">
                                        <?php esc_html_e('Show Block Labels', 'bootstrap-blocks'); ?>
                                    </label>
                                </th>
                                <td>
                                    <input type="checkbox" id="bootstrap_blocks_show_block_labels" name="bootstrap_blocks_settings[editor_options][show_block_labels]" value="1" <?php checked($settings['editor_options']['show_block_labels']); ?>>
                                    <p class="description">
                                        <?php esc_html_e('Show labels for blocks in the editor.', 'bootstrap-blocks'); ?>
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <?php submit_button(__('Save Settings', 'bootstrap-blocks')); ?>
                    </form>
                </div>
                
                <!-- Blocks Tab -->
                <div id="blocks" class="bootstrap-blocks-admin-tab-pane">
                    <h2><?php esc_html_e('Available Blocks', 'bootstrap-blocks'); ?></h2>
                    
                    <form method="post" action="options.php" class="bootstrap-blocks-blocks-form">
                        <?php settings_fields('bootstrap_blocks_settings'); ?>
                        
                        <table class="form-table">
                            <tr>
                                <th scope="row"><?php esc_html_e('Enable/Disable Blocks', 'bootstrap-blocks'); ?></th>
                                <td>
                                    <p class="description">
                                        <?php esc_html_e('Enable or disable specific Bootstrap blocks.', 'bootstrap-blocks'); ?>
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <div class="bootstrap-blocks-blocks-grid">
                            <?php
                            $blocks = array(
                                'container' => __('Container', 'bootstrap-blocks'),
                                'row' => __('Row', 'bootstrap-blocks'),
                                'column' => __('Column', 'bootstrap-blocks'),
                                'card' => __('Card', 'bootstrap-blocks'),
                                'button' => __('Button', 'bootstrap-blocks'),
                                'alert' => __('Alert', 'bootstrap-blocks'),
                                'tabs' => __('Tabs', 'bootstrap-blocks'),
                                'accordion' => __('Accordion', 'bootstrap-blocks'),
                            );
                            
                            foreach ($blocks as $block_id => $block_name) :
                                $is_enabled = isset($settings['allowed_blocks'][$block_id]) ? $settings['allowed_blocks'][$block_id] : true;
                            ?>
                                <div class="bootstrap-blocks-block-item">
                                    <div class="bootstrap-blocks-block-header">
                                        <h3><?php echo esc_html($block_name); ?></h3>
                                        <label class="bootstrap-blocks-toggle">
                                            <input type="checkbox" name="bootstrap_blocks_settings[allowed_blocks][<?php echo esc_attr($block_id); ?>]" value="1" <?php checked($is_enabled); ?>>
                                            <span class="bootstrap-blocks-toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div class="bootstrap-blocks-block-icon">
                                        <img src="<?php echo esc_url(BOOTSTRAP_BLOCKS_PLUGIN_URL . 'admin/images/blocks/' . $block_id . '.svg'); ?>" alt="<?php echo esc_attr($block_name); ?>">
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        
                        <?php submit_button(__('Save Blocks Settings', 'bootstrap-blocks')); ?>
                    </form>
                </div>
                
                <!-- Documentation Tab -->
                <div id="documentation" class="bootstrap-blocks-admin-tab-pane">
                    <h2><?php esc_html_e('Documentation', 'bootstrap-blocks'); ?></h2>
                    
                    <div class="bootstrap-blocks-documentation">
                        <div class="bootstrap-blocks-documentation-section">
                            <h3><?php esc_html_e('Getting Started', 'bootstrap-blocks'); ?></h3>
                            <p><?php esc_html_e('Bootstrap Blocks provides a collection of Gutenberg blocks that integrate Bootstrap components into your WordPress editor.', 'bootstrap-blocks'); ?></p>
                            <p><?php esc_html_e('To get started, simply add a Bootstrap block to your post or page from the block inserter, and customize it using the block settings panel.', 'bootstrap-blocks'); ?></p>
                        </div>
                        
                        <div class="bootstrap-blocks-documentation-section">
                            <h3><?php esc_html_e('Block Structure', 'bootstrap-blocks'); ?></h3>
                            <p><?php esc_html_e('The plugin provides the following Bootstrap components as Gutenberg blocks:', 'bootstrap-blocks'); ?></p>
                            <ul>
                                <li><strong><?php esc_html_e('Container:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('A responsive container for your content.', 'bootstrap-blocks'); ?></li>
                                <li><strong><?php esc_html_e('Row:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('A row for creating grid layouts.', 'bootstrap-blocks'); ?></li>
                                <li><strong><?php esc_html_e('Column:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('A column for placing content within a row.', 'bootstrap-blocks'); ?></li>
                                <li><strong><?php esc_html_e('Card:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('A flexible content container with header, body, and footer.', 'bootstrap-blocks'); ?></li>
                                <li><strong><?php esc_html_e('Button:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('A customizable button with various styles and sizes.', 'bootstrap-blocks'); ?></li>
                                <li><strong><?php esc_html_e('Alert:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('A feedback message for user actions.', 'bootstrap-blocks'); ?></li>
                                <li><strong><?php esc_html_e('Tabs:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('Tabbed content with customizable styles.', 'bootstrap-blocks'); ?></li>
                                <li><strong><?php esc_html_e('Accordion:', 'bootstrap-blocks'); ?></strong> <?php esc_html_e('Collapsible content sections.', 'bootstrap-blocks'); ?></li>
                            </ul>
                        </div>
                        
                        <div class="bootstrap-blocks-documentation-section">
                            <h3><?php esc_html_e('Shortcodes', 'bootstrap-blocks'); ?></h3>
                            <p><?php esc_html_e('In addition to blocks, you can also use shortcodes to add Bootstrap components to your content:', 'bootstrap-blocks'); ?></p>
                            <ul>
                                <li><code>[bs_container]...[/bs_container]</code></li>
                                <li><code>[bs_row]...[/bs_row]</code></li>
                                <li><code>[bs_column xs="12" md="6"]...[/bs_column]</code></li>
                                <li><code>[bs_button text="Click me" style="primary" url="#"]</code></li>
                                <li><code>[bs_alert type="success"]...[/bs_alert]</code></li>
                                <li><code>[bs_card title="Card Title"]...[/bs_card]</code></li>
                                <li><code>[bs_tabs]...[/bs_tabs]</code> (with <code>[bs_tab title="Tab 1"]...[/bs_tab]</code>)</li>
                                <li><code>[bs_accordion]...[/bs_accordion]</code> (with <code>[bs_accordion_item title="Item 1"]...[/bs_accordion_item]</code>)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Support Tab -->
                <div id="support" class="bootstrap-blocks-admin-tab-pane">
                    <h2><?php esc_html_e('Support', 'bootstrap-blocks'); ?></h2>
                    
                    <div class="bootstrap-blocks-support">
                        <div class="bootstrap-blocks-support-section">
                            <h3><?php esc_html_e('Need Help?', 'bootstrap-blocks'); ?></h3>
                            <p><?php esc_html_e('If you need help with Bootstrap Blocks, please check the following resources:', 'bootstrap-blocks'); ?></p>
                            <ul>
                                <li><a href="https://yourcompany.com/bootstrap-blocks/documentation/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Documentation', 'bootstrap-blocks'); ?></a></li>
                                <li><a href="https://yourcompany.com/bootstrap-blocks/faq/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('FAQ', 'bootstrap-blocks'); ?></a></li>
                                <li><a href="https://yourcompany.com/bootstrap-blocks/support/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Contact Support', 'bootstrap-blocks'); ?></a></li>
                            </ul>
                        </div>
                        
                        <div class="bootstrap-blocks-support-section">
                            <h3><?php esc_html_e('Bootstrap Resources', 'bootstrap-blocks'); ?></h3>
                            <p><?php esc_html_e('Learn more about Bootstrap:', 'bootstrap-blocks'); ?></p>
                            <ul>
                                <li><a href="https://getbootstrap.com/docs/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Bootstrap Documentation', 'bootstrap-blocks'); ?></a></li>
                                <li><a href="https://getbootstrap.com/docs/5.3/components/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Bootstrap Components', 'bootstrap-blocks'); ?></a></li>
                                <li><a href="https://getbootstrap.com/docs/5.3/layout/grid/" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Bootstrap Grid System', 'bootstrap-blocks'); ?></a></li>
                            </ul>
                        </div>
                        
                        <div class="bootstrap-blocks-support-section">
                            <h3><?php esc_html_e('Get in Touch', 'bootstrap-blocks'); ?></h3>
                            <p><?php esc_html_e('Have questions or suggestions? Get in touch with us:', 'bootstrap-blocks'); ?></p>
                            <ul>
                                <li><strong><?php esc_html_e('Email:', 'bootstrap-blocks'); ?></strong> <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></li>
                                <li><strong><?php esc_html_e('Website:', 'bootstrap-blocks'); ?></strong> <a href="https://yourcompany.com/" target="_blank" rel="noopener noreferrer">yourcompany.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    jQuery(document).ready(function($) {
        // Tabs navigation
        $('.bootstrap-blocks-admin-tabs .nav-tab').on('click', function(e) {
            e.preventDefault();
            var tab = $(this).data('tab');
            
            // Update active tab
            $('.bootstrap-blocks-admin-tabs .nav-tab').removeClass('nav-tab-active');
            $(this).addClass('nav-tab-active');
            
            // Show active tab content
            $('.bootstrap-blocks-admin-tab-pane').removeClass('active');
            $('#' + tab).addClass('active');
            
            // Update URL hash
            window.location.hash = tab;
        });
        
        // Check URL hash on page load
        if (window.location.hash) {
            var tab = window.location.hash.substring(1);
            $('.bootstrap-blocks-admin-tabs .nav-tab[data-tab="' + tab + '"]').trigger('click');
        }
    });
</script>