<template>
    <div class="input-file" :class="{'input-file--focused': focused}" >
        <div v-if="label && label.length" class="input-text__label" @click.stop>
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-file__wrapper" 
            :empty="empty" 
            tabindex="0" 
            @focus="focus"
            @blur="blur">
            <div class="input-file__area">
                <div v-if="icon" role="icon">
                    <i :class="`uil uil-${icon}`"></i>
                </div>
                <div role="placeholder">
                    {{uploadText}}
                </div>
                <input @change="handleFiles" :id="inputId" :multiple="multiple" type="file" style="display: none;">
            </div>
            <div class="input-file__preview" v-if="preview || append">
                <input-file-preview-card v-for="(file, index) in files"
                    :file="file"
                    :title="file.name"
                    :size="typeof preview === 'object' && !!preview.size"
                    :key="index"
                    @remove="removeFile(index)"/>
                <slot name="append"/>
            </div>
        </div>
    </div>
</template>

<script>
import InputFilePreviewCard from './InputFilePreviewCard'

export default {
    name: 'input-file',
    components: {InputFilePreviewCard},
    props: {
        label: { type: String, default: '' },
        id: { type: String, default: '' },
        uploadText: { type: String, default: 'Upload' },
        accept: { type: String, default: '*' },
        multiple: { type: Boolean, default: false },
        preview: { type: [Boolean, Object], default: true },
        icon: { type: [String, Boolean], default: 'upload' }
    },
    data: () => ({
        fileList: [],
        focused: false,
    }),
    computed: {
        empty () { return !this.fileList.length && !this.append },
        append () { return this.$slots.append && this.$slots.append.length },
        inputId () { return this.id.length ? this.id : `input__${this._uid}` },
        files: {
            get () { return [...this.fileList] },
            set (value) { this.$emit('input', value); this.fileList = value }
        }
    },
    mounted () {
        let area = this.$el.querySelector('.input-file__area')
        area.addEventListener('click', event => {
            this.focused = true
            this.trigger()
        })
        let wrapper = this.$el.querySelector('.input-file__wrapper')
        wrapper.addEventListener('focusin', event => {
            this.focused = true
            return event
        }, true)
        wrapper.addEventListener('focusout', event => {
            this.focused = false
            return event
        }, true)
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
        removeFile(i) {
            let copy = [...this.files]
            copy.splice(i,1)
            this.files = copy
        },
        focus (event) {
            this.focused = true
            this.$emit('focus', event)
        },
        blur (event) {
            this.focused = false
            this.$emit('blur', event)
        },
        reset () {
            this.files = []
        }

    }
}
</script>

<style>
.input-file {
    height: 100%;
}
.input-file__wrapper {
    width: 100%;
    background: var(--color-bg--shade-1);
    padding-bottom: var(--padding-m);
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
}
.input-file__wrapper[empty] {
    grid-template-rows: 100% 0;
}
.input-file__area {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    padding: var(--padding-m);
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: var(--transparency-1);
    height: 100%;
    width: 100%;
    grid-row: 1;
}
.input-file__area>[role="icon"] {
    font-size: 2em;
}
.input-file__preview {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: var(--padding-m);
    padding: 0 var(--padding-m);
    max-height: 360px;  
    overflow-y: auto;
    grid-row: 2;
}
.input-file__preview::-webkit-scrollbar {
    display: none;
    opacity: 0;
    max-width: 0;
}
.input-file.input-file--focused {
    --input--bg-color: var(--input--focus--bg-color);
    --input--text-color: var(--input--focus--text-color);
    --input--border-color: var(--input--focus--border-color);
    --input--border-style: solid;
}
.input-file__wrapper {
    border-radius: var(--input--border-radius);
    border-color: var(--input--border-color, var(--input--bg-color), transparent);
    border-style: var(--input--border-style, solid);
    border-width: var(--input--border-size, 1px);
    border-radius: var(--input--border-radius);
    background: var(--input--bg-color);
    color: var(--input--text-color);
}
</style>
