/**
 * Main editor JavaScript
 * This file loads editor-specific functionality
 */

// Import editor styles
import '../scss/editor.scss';

// Import WordPress dependencies
import { __ } from '@wordpress/i18n';

// Import blocks - cada bloque se registrará a sí mismo
import '../blocks/container';
import '../blocks/row';
import '../blocks/column';
import '../blocks/card';
import '../blocks/button';
import '../blocks/alert';
import '../blocks/tabs';
import '../blocks/accordion';

// Editor initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('Bootstrap Blocks Editor Initialized');
});

// Add Bootstrap icon to block category
const bootstrapBlocksIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
};

// Register custom icon for Bootstrap Blocks category
if (typeof wp !== 'undefined' && wp.blocks && wp.blocks.updateCategory) {
  wp.blocks.updateCategory('bootstrap-blocks', { icon: bootstrapBlocksIcon });
}