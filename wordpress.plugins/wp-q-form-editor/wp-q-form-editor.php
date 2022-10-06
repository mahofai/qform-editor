<?php

/**
 * Plugin Name: Q Form Editor
 * Plugin URI: https://questwork.com
 * Description: This is a plugin to allow visitor to create/edit a form.
 * Version: 1.0.0
 * Author: Questwork Consulting Limited
 * Author URI: https://questwork.com
 * License: GPL2
 * Text Domain: wp-q-form-editor
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

require_once(plugin_dir_path(__FILE__) . 'vendor/autoload.php');

/**
 * Plugin version.
 */
define( 'WP_q_form_editor_VERSION', '1.0.0' );

use Questwork\WP\Q\Form\Editor\Plugin;
use Questwork\WP\Q\Form\Editor\Views\AdminMain;
use Questwork\WP\Q\Form\Editor\Views\PluginMain;
use Questwork\WP\Q\Form\Editor\Views\Shortcode;


/**
 * Retrieve the main plugin instance.
 *
 * @since 1.0.0
 *
 * @return Plugin
 */
function wp_q_form_editor() {

	static $plugin;

	if ( null === $plugin ) {
		$upload_dir = wp_upload_dir();
		$plugin = new Plugin();
	}

	return $plugin;
}

$plugin = plugin_basename( __FILE__ );

$wp_q_form_editor = wp_q_form_editor()
  ->set_basename( plugin_basename( __FILE__ ) )
  ->set_directory( plugin_dir_path(__FILE__) )
  ->set_file( __FILE__ )
  ->set_url( plugins_url( '', __FILE__ ) );

$wp_q_form_editor
  ->register_hooks( new PluginMain() )
  ->register_hooks( new Shortcode() );

if (is_admin() ) {
  $wp_q_form_editor
    ->register_hooks( new AdminMain() );
}

$wp_q_form_editor->run();
