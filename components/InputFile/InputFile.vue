<template>
    <div class="input-file">
        <div v-if="label && label.length" class="input-text__label">
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-file__wrapper">
            <div class="input-file__area">
                <div role="icon">
                    <i class='uil uil-upload'></i>
                </div>
                <div role="placeholder">
                {{uploadText}}
                </div>
            </div>
            <input @change="handleFiles" :id="inputId" :multiple="multiple" type="file" style="display: none;">
            <div class="input-file__preview">
                <input-file-preview-card v-for="(file, index) in files"
                    :file="file"
                    :key="index"
                    @remove="removeFile(index)"/>
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
        multiple: { type: Boolean, default: false }
    },
    data: () => ({
        fileList: []
    }),
    mounted () {
        this.$el.querySelector('.input-file__area').addEventListener('click', event => {
            this.trigger()
        })
    },
    computed: {
        inputId () { return this.id.length ? this.id : `input__${this._uid}` },
        files: {
            get () { return [...this.fileList] },
            set (value) { this.$emit('input', value); this.fileList = value }
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
        removeFile(i) {
            let copy = [...this.files]
            copy.splice(i,1)
            this.files = copy
        }
    }
}
</script>

<style>
.input-file__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--color-bg--shade-1);
    padding-bottom: var(--padding-m);
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
}
.input-file__preview::-webkit-scrollbar {
    display: none;
    opacity: 0;
    max-width: 0;
}
/*
.input-file__preview>*:last-child {
    margin-bottom: var(--padding-m);
}
*/
</style>
