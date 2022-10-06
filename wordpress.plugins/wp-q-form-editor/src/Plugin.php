<?php

namespace Questwork\WP\Q\Form\Editor;

defined( 'ABSPATH' ) || exit;

use Questwork\WP\Utilities\Helpers\RemoteRequest;
use Questwork\WP\Utilities\Helpers\TransientHelper;
use Questwork\WP\Utilities\Plugins\AbstractPlugin;

/**
 * Plugin.
 *
 * @package   Questwork\WP\Q\Form\Editor\Plugin
 * @copyright Copyright (c) 2021, Questwork Consulting Limited
 * @since     1.0.0
 */

class Plugin extends AbstractPlugin {

  public $options_name = 'wp_q_form_editor__options';
  public $settings_name = 'wp_q_form_editor__settings';
  public $tools_name = 'wp_q_form_editor__tools';
  public $text_domain = 'wp-q-form-editor';
  public $display_name = 'Q Form Editor';

/**
 * private variables
 */
  private $data_url;

	/**
	 * Constructor method.
	 *
	 * @since 1.0.0
	 *
	 */
	public function __construct() {
	}

	/**
	 * Load the plugin.
	 *
	 * @since 1.0.0
	 */
	public function plugins_loaded() {
	}

  /**
	 * Whether the service is registered with WordPress.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public function is_registered() {
		$data = $this->get_registered_metadata();
		return !empty($data['q_form_endpoint']);
	}

  public function load_options($formId) {
		if ( $this->is_registered() ) {
      if (!isset($this->repo)) {
        $this->repo = (new RemoteRequest());
      }
      // setup private variable from database
      $q_form_endpoint = $this->get_registered_metadata( 'q_form_endpoint' );

      $this->data_url = $q_form_endpoint . '/' . $formId;
      $expiration = $this->get_registered_metadata( 'expiration' );
      $this->transient_helper = (new TransientHelper())
        ->set_expiration($expiration);
    }
  }

	/**
	 * Retrieve registered metadata.
	 *
	 * @since 1.0.0
	 *
	 * @param  string $key Optional. Key for a specific value.
	 * @return array
	 */
	public function get_registered_metadata( $key = null ) {
		$metadata = (array) get_option( $this->options_name, array() );
		$value = null;
		if ( ! empty( $key ) && isset( $metadata[ $key ] ) ) {
			$value = $metadata[ $key ];
		} elseif ( empty( $key ) ) {
			$value = $metadata;
		}
		return $value;
	}

  public function download_data($formId, $force = false) {

    $this->load_options($formId);
    $transient = \urlencode($this->data_url);
    if (!$force && false !== ( $cache = $this->transient_helper->get($transient)) ) {
      return $cache;
    }

    $response = $this->repo->get($this->data_url);
    
    $layout = new \stdClass();
    $errMsg = '';

    if (is_wp_error($response)) {
      $errMsg = $response->get_error_data()['body'];
      if (is_object($errMsg)) {
        $errMsg = $errMsg->err->message;
      }
    } else {
      $layout = $response->data[0];
    }
    
    $layout = \json_encode($layout);

    $result = [$layout, $errMsg];

    $this->transient_helper->set($transient, $result);

    return $result;
  }


  
	/**
	 * Set a logger.
	 *
	 * @since 1.0.0
	 * @return $this
	 */
	public function set_logger( $logger ) {
		$this->logger = $logger;
		return $this;
	}


	protected function log( $level, $message, $context = array() ) {
		if ( $this->logger ) {
			$this->logger->log( $level, $message, $context );
		}
		return $this;
	}

}
