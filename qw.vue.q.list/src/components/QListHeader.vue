<template>
  <div class="q-list-header" :class="cssBlock">
    <div
      v-if="!!externalTitle"
      class="q-list-header__external-title"
    >
      {{ externalTitle.text }}
    </div>
    <div v-if="!!headers" class="q-list-header__row">
      <div
        v-for="(header, idx) in headers"
        :key="idx"
        class="q-list-header__cell"
        :class="cssElement(header)"
        @click="click(header)"
      >
        <input
          v-if="header.checkbox"
          type="checkbox"
          :checked="isChecked"
          @click="checkAll"
        >
        {{ header.label }}
        <span>
          <i
            v-if="showDir(header, 1)"
            class="fa fa-angle-up"
          />
          <i
            v-if="showDir(header, -1)"
            class="fa fa-angle-down"
          />
        </span>
      </div>
    </div>
    <div
      v-if="!!internalTitle"
      class="q-list-header__internal-title"
    >
      {{ internalTitle.text }}
    </div>
  </div>
</template>

<script>
import QListCSSMixin from '../mixins/QListCSSMixin'
import QListTitleMixin from '../mixins/QListTitleMixin'

export default {
  mixins: [QListCSSMixin, QListTitleMixin],
  props: {
    headers: { type: Array, default: () => [] },
    qSort: { type: Object, default: () => ({}) },
    sorter: { type: Function, default: null }
  },
  data() {
    return {
      key: null,
      dir: null,
      isChecked: false,
    }
  },
  computed: {
    filteredTitles() {
      return this.titles.filter((title) => {
        return (title.customComponentName === 'q-list-header' || !title.customComponentName)
      })
    },
  },
  methods: {
    click(header) {
      if (typeof this.sorter === 'function' && header.key) {
        this.key = header.key
        this.dir = this.sorter(header)
      }
      this.$emit('onListHeaderClick', {
        header
      })
    },
    checkAll() {
      this.isChecked = !this.isChecked
      this.$emit('onCheckAll', this.isChecked)
    },
    showDir(header, dir) {
      return (this.key === header.key && this.dir === dir) || (this.qSort[header.key] && this.qSort[header.key] === dir)
    }
  }
}
</script>

<style lang="scss">
</style>
