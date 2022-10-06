<div class="wrap">
	<h1><?php esc_html_e( $this->plugin->display_name, 'wp-q-form-editor' ); ?></h1>

  <div id="<?php echo $this->plugin->settings_name ?>" class="<?php echo $this->plugin->settings_name ?> background__grey">
    <form method="post" action="options.php">

      <?php settings_fields( $this->plugin->settings_name ); // set plugin option group for the form ?>
      <?php $options = (array) get_option( $this->plugin->options_name, array() ); // get plugin options from the database ?>
      <!-- <div><?php echo json_encode($options); ?></div> -->
      <table class="form-table permalink-structure">
        <tbody>
          <tr>
            <th><?php _e("Q Form Endpoint:", $this->plugin->text_domain ); ?> </th>
            <td>
              <input type="text" name="<?php echo $this->plugin->options_name ?>[q_form_endpoint]" value="<?php echo esc_attr( $options['q_form_endpoint'] ?? '' ); ?>" size="100">
              <div><?php _e("https://qeventadmin.azurewebsites.net/api/v1/qForm", $this->plugin->text_domain ); ?></div>
            </td>
          </tr>
          <tr>
            <th><?php _e("Tenant Code:", $this->plugin->text_domain ); ?> </th>
            <td>
              <input type="text" name="<?php echo $this->plugin->options_name ?>[tenant_code]" value="<?php echo esc_attr( $options['tenant_code'] ?? '' ); ?>" size="100">
              <div><?php _e("85223977000", $this->plugin->text_domain ); ?></div>
            </td>
          </tr>
          <tr>
            <th><?php _e("Cache expires in (second):", $this->plugin->text_domain ); ?> </th>
            <td>
              <input type="text" name="<?php echo $this->plugin->options_name ?>[expiration]" value="<?php echo esc_attr( $options['expiration'] ?? '' ); ?>" size="100">
              <div><?php _e("86400 (1 day)", $this->plugin->text_domain ); ?></div>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />
      <?php @submit_button(); ?>
    </form>

  </div>

</div>

