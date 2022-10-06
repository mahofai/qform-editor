<template>
  <div class="q-list-footer" :class="cssBlock">
    <div
      v-if="!!internalTitle"
      class="q-list-footer__internal-title"
    >
      {{ internalTitle.text }}
    </div>
    <div
      v-if="!!footers"
      class="q-list-footer__row"
    >
      <div
        v-for="(footer, idx) in footers"
        :key="idx"
        class="q-list-footer__cell"
        :class="cssElement(footer)"
      >
        {{ footer.label }}
      </div>
    </div>
    <div
      v-if="!!externalTitle"
      class="q-list-footer__external-title"
    >
      {{ externalTitle.text }}
    </div>
  </div>
</template>

<script>
import QListCSSMixin from '../mixins/QListCSSMixin'
import QListTitleMixin from '../mixins/QListTitleMixin'

export default {
  mixins: [QListCSSMixin, QListTitleMixin],
  props: {
    footers: { type: Array, default: () => [] }
  },
  data() {
    return {
      titleType: 'q-list-footer'
    }
  },
  computed: {
    filteredTitles() {
      return this.titles.filter((title) => {
        return (title.type === 'q-list-footer' || !title.type)
      })
    }
  }
}
</script>

<style lang="scss">
</style>
