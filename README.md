# Bootstrap Blocks for WordPress

A WordPress plugin that adds custom Gutenberg blocks with Bootstrap 5 integration for faster and more efficient WordPress development.

## Features

- Custom Gutenberg blocks powered by Bootstrap 5
- Responsive grid system (Container, Row, Column)
- Ready-to-use Bootstrap components as blocks
- Rich customization options for all blocks
- Shortcode support for Bootstrap components
- Clean and minimal code output
- Seamless integration with the WordPress block editor

## Blocks Included

- **Container Block**: A responsive container for your content
- **Row Block**: Grid row for creating responsive layouts
- **Column Block**: Grid column with responsive width controls
- **Card Block**: Flexible content container with header, body, and footer
- **Button Block**: Customizable button with various styles and sizes
- **Alert Block**: Feedback message with different styles
- **Tabs Block**: Tabbed content with customizable styles
- **Accordion Block**: Collapsible content sections

## Requirements

- WordPress 5.9 or higher
- PHP 7.4 or higher
- Gutenberg editor enabled

## Installation

### Manual Installation

1. Download the plugin zip file
2. Upload the plugin to the `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Start using Bootstrap blocks in the Gutenberg editor

### Composer Installation

```
composer require your-company/bootstrap-blocks
```

## Development

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   composer install
   ```

### Build

To build the plugin assets:

```
npm run build
```

### Development Mode

To start development with hot module replacement:

```
npm start
```

## Usage

### Using Blocks

1. Add a block to your post/page by clicking the '+' button in the WordPress editor
2. Search for the desired Bootstrap block or look for them in the 'Bootstrap Blocks' category
3. Configure the block's settings in the sidebar panel

### Using Shortcodes

The plugin also provides shortcodes for Bootstrap components:

```
[bs_container]
  [bs_row]
    [bs_column xs="12" md="6"]
      Content for first column
    [/bs_column]
    [bs_column xs="12" md="6"]
      Content for second column
    [/bs_column]
  [/bs_row]
[/bs_container]
```

## Documentation

### Container Block

The Container block provides a responsive fixed-width container or full-width container:

- **Container Type**: Choose between regular container, fluid container, or responsive containers
- **Custom Classes**: Add custom CSS classes to the container

### Row Block

The Row block creates a grid row for placing columns:

- **Gutters**: Control the spacing between columns
- **Vertical Alignment**: Align items within the row vertically
- **Horizontal Alignment**: Align items within the row horizontally
- **Custom Classes**: Add custom CSS classes to the row

### Column Block

The Column block creates a grid column for placing content:

- **Responsive Width**: Control column width at different breakpoints (XS, SM, MD, LG, XL)
- **Responsive Offset**: Control column offset at different breakpoints
- **Custom Classes**: Add custom CSS classes to the column

### Card Block

The Card block creates a flexible card container:

- **Card Header**: Add a header to the card
- **Card Image**: Add an image to the card
- **Card Body**: Main content area
- **Card Footer**: Add a footer to the card
- **Card Styles**: Apply different background and border colors
- **Text Alignment**: Control text alignment within the card

### Button Block

The Button block adds a Bootstrap button:

- **Button Text**: Set the button text
- **Button URL**: Set the button link
- **Button Style**: Choose from various Bootstrap button styles
- **Button Size**: Set the button size
- **Outline Style**: Use outline button styles
- **Custom Classes**: Add custom CSS classes to the button

### Alert Block

The Alert block creates a feedback message:

- **Alert Type**: Choose from different alert styles
- **Dismissible**: Make the alert dismissible
- **Custom Classes**: Add custom CSS classes to the alert

### Tabs Block

The Tabs block creates tabbed content:

- **Tab Style**: Choose between tabs and pills
- **Tab Position**: Set tabs at the top or left
- **Fade Effect**: Enable/disable fade animation
- **Custom Classes**: Add custom CSS classes to the tabs

### Accordion Block

The Accordion block creates collapsible content sections:

- **Always Open**: Allow multiple items to be open simultaneously
- **Custom Classes**: Add custom CSS classes to the accordion

## Customization

### Plugin Settings

Configure the plugin in the WordPress admin under 'Bootstrap Blocks':

- Enable/disable loading of Bootstrap CSS and JS
- Enable/disable shortcodes
- Editor settings

### Filters

The plugin provides various filters for customization:

- `bootstrap_blocks_load_bootstrap`: Control whether to load Bootstrap assets
- `bootstrap_blocks_enable_shortcodes`: Control whether to enable shortcodes
- `bootstrap_blocks_allowed_blocks`: Control which blocks are available
- `bootstrap_blocks_colors`: Customize Bootstrap colors
- `bootstrap_blocks_container_types`: Customize container types
- `bootstrap_blocks_column_widths`: Customize column width options
- `bootstrap_blocks_breakpoints`: Customize breakpoints

## License

This plugin is licensed under the GPL v2 or later.

## Credits

- [Bootstrap](https://getbootstrap.com/)
- [WordPress](https://wordpress.org/)
- [React](https://reactjs.org/)

## Support

If you need help with the plugin, please [contact us](https://frank-moreno.com/contact).