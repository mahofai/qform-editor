<?php

$html .= <<<HEREDOC
<div class="wp-q-form-editor {$klass}">
  <div id="{$placeholder}"></div>
</div>

<script>
  jQuery(document).ready( function() {
    const Vue = window.Vue
    const { QFormEditor } = window.QFormEditor

    const layout = {$layout}
    const errMsg = '{$errMsg}'
    const submissionEndpoint = '{$atts['endpoint']}'

    new Vue({
      el: '#{$placeholder}',
      components: {
        QFormEditor,
      },
      template: `
        <div class="wp-q-form-editor__container">
          <div class="wp-q-form-editor__error">{{ errMsg }}</div>
          <div v-if="!errMsg">
            <q-form-editor
              :layout="layout"
            ></q-form-editor>
            <div class="wp-q-form-editor__message">{{ submitMessage }}</div>
            <button @click="submit">Submit form to server</button>
          </div>
        </div>
      `,
      data() {
        return {
          errMsg,
          layout,
          submitMessage: '',
        }
      },
      computed: {
      },
      methods: {
        submit() {
          const submissionData = {
            formId,
            formRenderer: this.layout
          }
          axios({
            method: 'post',
            url: submissionEndpoint,
            data: submissionData,
          })
          .then((response) => {
            const responseData = (response.data) ? response.data.data : null
            if (response.status === 200 && responseData[0].formId === submissionData.formId) {
              this.submitMessage = 'Submit successful'
            } else {
              this.submitMessage = 'Submit failed'
            }
          })
          .catch((reason) => {
            this.submitMessage = 'Submission rejected. Reason: ' + reason.message + ' or incorrect endpoint url link.' 
          })
        },
      },
    })
  })
</script>

HEREDOC;
