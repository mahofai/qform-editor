<?php

namespace Questwork\WP\Q\Form\Editor\Views;

use Questwork\WP\Utilities\Plugins\AbstractProvider;

/**
 * Base screen functionality.
 *
 * @package   Questwork\WP\Q\Form\Editor\Views\PluginMain
 * @copyright Copyright (c) 2021, Questwork Consulting Limited
 * @since     1.0.0
 */

class PluginMain extends AbstractProvider {

	/**
	 * Register hooks.
	 *
	 * @since 1.0.0
	 */
	public function register_hooks() {
    add_action( 'init', array( $this, 'init' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ), 0 );
	}

  public function init() {
    $this->register_text_domain();
  }

  public function register_text_domain() {
		load_plugin_textdomain($this->plugin->text_domain, false, $this->plugin->get_path('languages'));
	}

	public function register_scripts() {
    wp_register_style( 'wp-q-form-editor__css1', $this->plugin->get_url( 'assets/css/wp-q-form-editor.css' ), [], false );
    wp_register_style( 'wp-q-form-editor', $this->plugin->get_url( 'assets/css/style.css' ), ['wp-q-form-editor__css1'], false );

    wp_register_script( 'q-form-editor', $this->plugin->get_url( 'assets/js/q-form-editor.min.js' ), ['q-form-renderer'], false );
	}
}
