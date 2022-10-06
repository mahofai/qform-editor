<?php

namespace Questwork\WP\Q\Form\Editor\Views;

use Questwork\WP\Utilities\Plugins\AbstractProvider;
use Questwork\WP\Utilities\Helpers\LocaleHelper;

/**
 * Base screen functionality.
 *
 * @package   Questwork\WP\Q\Form\Editor\Views\Shortcode
 * @copyright Copyright (c) 2021, Questwork Consulting Limited
 * @since     1.0.0
 */

class Shortcode extends AbstractProvider {


	/**
	 * Register hooks.
	 *
	 * @since 1.0.0
	 */
	public function register_hooks() {
    add_shortcode('wp_q_form_editor', array( $this, 'wp_q_form_editor' ) );
	}

  public function wp_q_form_editor($atts) {

    wp_enqueue_script('axios');
    wp_enqueue_script('q-form-editor');
    wp_enqueue_style('wp-q-form-editor');

    $wp_user = wp_get_current_user();
    $options = (array) get_option( $this->plugin->options_name, array() );

    $localeHelper = new LocaleHelper();
    $locale = $localeHelper->convert($atts);
    $html = '';

    if (isset($atts['endpoint'])) {
      $placeholder = isset($atts['placeholder']) ? $atts['placeholder'] : 'q-form-editor';
      $klass = isset($atts['class']) ? $atts['class'] : '';
      
      $layout = '{}';
      $errMsg = '';

      if (isset($atts['form_id'])) {  
        $result = $this->plugin->download_data($atts['form_id'], true);
        $layout = $result[0];
        $errMsg = $result[1];
      }

      include( $this->plugin->get_path( 'templates/shortcodes/form.php' ) );
    }
    if (empty($atts['endpoint'])) {
      $html .= '<div class="wp-q-form-editor__error"> Missing submission endpoint</div>';
    }
    return $html;
  }
}
