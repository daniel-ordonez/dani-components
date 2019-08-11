<script>
const INPUT_STATE = {
    'INITIAL': 0,
    'ERROR': 2,
    'SUCCESS': 1,
}
export default {
    props: {
        value: { 
            type: [String, Object], 
            default: null, 
            validator: v =>  typeof v === 'string' || v === null
        },
        label: { type: String, default: '' },
        id: { type: String, default: '' },
        required: { type: Boolean, default: false },
        rules: { type: Array, default: () => [] },
        trim: { type: Boolean, default: false },
        clear: { type: Boolean, default: false },
        validation: { 
            type: String, 
            default: 'never', 
            validator: str => ['never', 'blur', 'always'].includes(str) 
        },
        onValidated: { 
            type: String, 
            default: 'error', 
            validator: str => ['success', 'error'].includes(str) 
        }
    },
    data: () => ({
        focused: false,
        content: '',
        state: INPUT_STATE.INITIAL,
        msgs: [],
        hasError: false,
        success: false
    }),
    computed: {
        prepend () { return this.$slots.prepend },
        append () { return this.$slots.append },
        inputId () { return this.id.length ? this.id : `input__${this._uid}` }
    },
    watch: {
        state (newState, oldState) {
            newState !== oldState  && this.$emit('stateChanged', newState)
        }
    },
    methods: {
        focus (event) {
            this.focused = true
            this.$emit('focus', event)
        },
        blur (event) {
            this.focused = false
            this.$emit('blur', event)
            this.validation === 'blur' && this.validate()
        },
        validate () {
            let v = this.content
            this.state = INPUT_STATE.INITIAL
            let failed = false
            this.msgs = []
            for (let i = 0; i < this.rules.length; i++) {
                let r = {...this.rules[i]}
                if (typeof r.f === 'function' && !r.f(v)) {
                    failed = true
                    r.m && this.msgs.push(r.m)
                }
            }
            switch (this.onValidated) {
                case 'error':
                    if (failed) {
                        this.state = INPUT_STATE.ERROR
                    }
                    this.hasError = this.state === INPUT_STATE.ERROR
                    break
                case 'success':
                    if (!failed) {
                        this.state = INPUT_STATE.SUCCESS
                    }
                    this.success = this.state === INPUT_STATE.SUCCESS
                    break
            }
            this.msgs.length && this.$emit('messages', this.msgs)
            this.$emit('onValidate', !this.hasError)
            return !this.hasError
        },
        reset () {
            this.content = ''
            this.$emit('input', null)
            this.state = INPUT_STATE.INITIAL
        }

    }
}
</script>
