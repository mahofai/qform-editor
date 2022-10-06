export default {
  props: {
    index: { type: Number, default: 0 },
    row: { type: Object, default: () => ({}) },
    formData: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      error: null
    }
  },
  computed: {

  },
  methods: {
    showError(error) {
      this.error = error
    },
  }
}
