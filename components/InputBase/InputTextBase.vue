<script>
const INPUT_STATE = {
    'INITIAL': 0,
    'ERROR': 2,
    'SUCCESS': 1,
}
export default {
    props: {
        value: { type: String, default: '' },
        label: { type: String, default: '' },
        id: { type: String, default: '' },
        required: { type: Boolean, default: false },
        rules: { type: Array, default: () => [str => str.length] },
        trim: { type: Boolean, default: false },
        clear: { type: Boolean, default: false }
    },
    data: () => ({
        focused: false,
        content: '',
        validator: null,
        state: INPUT_STATE.INITIAL
    }),
    computed: {
        prepend () { return this.$slots.prepend },
        append () { return this.$slots.append },
        inputId () { return this.id.length ? this.id : `input__${this._uid}` }
    },
    methods: {
        focus (event) {
            this.focused = true
            this.$emit('focus', event)
        },
        blur (event) {
            this.focused = false
            this.$emit('blur', event)
        },
        reset () {
            this.content = ''
            this.$emit('input', null)
            this.state = INPUT_STATE.INITIAL
        }

    }
}
</script>
