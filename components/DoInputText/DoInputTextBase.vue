<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: 'do-input-text-base',
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
            type: { type: String, default: 'text' }
        },
        data: () => ({
            content: '',
            focused: false,
        }),
        computed: {
            prepend () { return this.$slots.prepend },
            append () { return this.$slots.append },
            inputId () { return this.id.length ? this.id : `input__${this._uid}` }
        },
        methods: {
            reset () {
                this.content = ''
                this.$emit('input', null)
            }
        }
    }
</script>

<style scoped>

</style>