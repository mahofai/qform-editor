<?php

namespace Questwork\WP\Q\Form\Editor\Views;

use Questwork\WP\Utilities\Plugins\AbstractProvider;

/**
 * Base screen functionality.
 *
 * @package   Questwork\WP\Q\Form\Editor\Views\AdminMain
 * @copyright Copyright (c) 2021, Questwork Consulting Limited
 * @since     1.0.0
 */

class AdminMain extends AbstractProvider {

	/**
	 * Register hooks.
	 *
	 * @since 1.0.0
	 */
	public function register_hooks() {
		if ( is_multisite() ) {
			add_action( 'network_admin_menu', array( $this, 'settings_menu' ) );
		} else {
      // hooks admin_menu before admin_init
			add_action( 'admin_menu', array( $this, 'settings_menu' ), 150 );
      // add_action( 'admin_menu', array( $this, 'tools_menu' ), 150 );
      add_action( 'admin_init', array( $this, 'admin_init' ) );
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'settings_page_assets' ), 0 );
	}


	/**
	 * Run after admin_menu hook
	 *
	 * @since 1.0.0
	 */
  public function admin_init() {
    // register settings to store options in database
    register_setting( $this->plugin->settings_name, $this->plugin->options_name, array($this, 'sanitize_options' ) );
    $plugin = $this->plugin->get_basename();
    add_filter( "plugin_action_links_$plugin", array($this, 'add_settings_link' ) );
  }

	/**
	 * Register menu in Admin > Settings to display settings page
	 *
	 * @since 1.0.0
	 */
  public function settings_menu()
	{
		$title = _x($this->plugin->display_name, 'settings menu title', $this->plugin->text_domain);
		add_submenu_page(
      'options-general.php', $title, $title, 'manage_options',
			$this->plugin->settings_name, array( $this, 'display_settings_page' )
		);
	}

	/**
	 * Display settings page
	 *
	 * @since 1.0.0
	 */
	public function display_settings_page()
	{
    include( $this->plugin->get_path( 'templates/settings.php' ) );
	}

	/**
	 * Register a settings link in the Admin > Plugins > installed plugins
	 *
	 * @since 1.0.0
	 */
  function add_settings_link( $links ) {
    $settings_link = '<a href="options-general.php?page='.$this->plugin->settings_name.'">' . __('Settings', $this->plugin->text_domain ) . '</a>';
    array_push( $links, $settings_link );
    return $links;
  }
  
	/**
	 * sanitize user submitted options
	 *
	 * @since 1.0.0
	 */
  public function sanitize_options( $input ) {
    $input['q_form_endpoint'] = sanitize_text_field( $input['q_form_endpoint'] ?? '' );
    $input['tenant_code'] = sanitize_text_field( $input['tenant_code'] ?? '' );
    $input['expiration'] = sanitize_text_field( empty($input['expiration']) ? '86400' : $input['expiration'] );
    return $input;
  }


	/**
	 * Register assets for the screen.
	 *
	 * @since 1.0.0
	 */
	public function settings_page_assets() {
    wp_enqueue_style( 'wp-q-form-editor__admin', $this->plugin->get_url( 'assets/css/admin.css' ), ['sweetalert2'], false );
	}
}
