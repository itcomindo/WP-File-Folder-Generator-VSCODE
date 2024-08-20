<?php

/**
 *
 * Functioan and Definitions
 *@package jkc
 */

defined('ABSPATH') || die('No script kiddies please!');


// Theme support title tag.
add_theme_support('title-tag');

// Theme support post thumbnails.
add_theme_support('post-thumbnails');

// Theme support menus.
add_theme_support('menus');

// Thene support widgets.
add_theme_support('widgets');

// Disable Gutenberg editor.
add_filter('use_block_editor_for_post', '__return_false');

// Disable Top Admin Bar.
add_filter('show_admin_bar', '__return_false');

/**
 * Get Theme Version Function
 */

function mm_get_theme_version()
{
    //Get Theme Version From Style.css
    $theme = wp_get_theme();
    return $theme->get('Version');
}



/**
 * Check if the current environment is development mode or on production
 * development mode is when the server is localhost
 * output: boolean
 */
function mm_is_devmode()
{
    if (isset($_SERVER['REMOTE_ADDR']) && in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'), true)) {
        return true;
    }
    return false;
}

/**
 * Load assets for the theme.
 */

require_once get_template_directory() . '/assets/assets.php';
