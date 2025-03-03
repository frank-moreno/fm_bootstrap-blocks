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
      viewBox="0 0 16 16"  // Cambia a 0 0 16 16 para que coincida con el SVG original de Bootstrap
      fill="currentColor"  // Cambia fill="none" a "currentColor" ya que el path del logo Bootstrap incluye relleno
      // Quita los atributos stroke, ya que el logo de Bootstrap no usa contornos
    >
      <path d="M6.375 7.125V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375z M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4zm1.06 12V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396z"></path>
    </svg>
  );
};

// Register custom icon for Bootstrap Blocks category
if (typeof wp !== 'undefined' && wp.blocks && wp.blocks.updateCategory) {
  wp.blocks.updateCategory('bootstrap-blocks', { icon: bootstrapBlocksIcon });
}