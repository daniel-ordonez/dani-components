<template>
    <button @click.stop="trigger">
        <slot/>
        <input 
            @change="handleFiles" 
            :id="inputId" 
            :accept="accept"
            :multiple="multiple" 
            type="file" 
            style="display: none;">
    </button>
</template>

<script>
export default {
    name: 'input-file-button',
    props: {
        id: { type: String, default: '' },
        accept: { type: String, default: '*' },
        multiple: { type: Boolean, default: false }
    },
    data: () => ({
        fileList: [],
        focused: false,
        lastAction: 0
    }),
    computed: {
        empty () { return !this.fileList.length && !this.inserted },
        inputId () { return this.id.length ? this.id : `input__${this._uid}` },
        files: {
            get () { return [...this.fileList] },
            set (value) {
                this.lastAction = value.length > this.fileList.length
                ? 1
                : value.length < this.fileList.length ?
                    -1
                    : 0
                this.$emit('input', value)
                this.fileList = value 
            }
        }
    },
    methods: {
        trigger () {
            this.$el.querySelector('input[type="file"]').click()
        },
        handleFiles (event) {
            const files = event.target.files
            if (this.files.length && !files.length) return
            this.files = this.multiple ? [...this.files, ...files] : files
        },
        reset () {
            this.files = []
        }
    }
}
</script>

<style>

</style>
