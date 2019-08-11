<template>
    <div class="file-preview-card" :class="{'no-content': contentEmpty}">
        <div class="file-preview-card__header" >
            <div class="fpc__progress">
                <div class="fpc__progress__bar" 
                    :class="{'fpc__progress__bar--complete': progress === 100}"
                    :style="progressBar"/>
            </div>
            <div class="fpc-info">
                <slot name="header">
                    <div class="fpc-info__name">{{showTitle}}</div>
                    <div v-if="size" class="fpc-header__size">{{fileSize}}</div>
                </slot>
            </div>
            <div class="fpc-action">
                <slot name="action">
                    <button v-if="progress === 0" class="btn btn--icon" @click="$emit('remove')">
                        <i class='uil uil-times'></i>
                    </button>
                    <div v-else-if="progress === 100" class="btn--icon">
                        <i class='uil uil-cloud-check'></i>
                    </div>
                    <div v-else class="btn--icon">
                        <i class='uil uil-cloud-upload'></i>
                    </div>
                </slot>
            </div>
        </div>
        <div class="file-preview-card__content">
            <slot name="preview">
                <img v-if="imgSrc" @load="imageLoad" :src="imgSrc">
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        file: { type: [File, Object], default: () => ({}) },
        title: { type: String, default: '' },
        size: { type: Boolean, default: false }
    },
    data: () => ({
        imgSrc: null,
        progress: 0
    }),
    computed: {
        progressStatus: {
            get () { return this.progress },
            set (value) {
                let min = 0
                let max = 100
                this.progress = Math.max(min, Math.min(max, value))
            }
        },
        progressBar () {
            return `transform: scaleX(${this.progressStatus / 100});`
        },
        contentEmpty () {
            return !this.imgSrc && !(this.$slots.preview && this.$slots.preview.length)
        },
        showTitle () {
            return this.title.length 
                ? this.title
                : typeof this.file === 'file'
                    ? this.file.name
                    : ''
            },
        fileSize () {
            return typeof this.file === 'file'
                ? this.formatBytes(this.file.size)
                : ''
        }
    }, 
    watch: {
        file (file) {
            if (file && file.type && file.size)
            this.previewFile(file)
        }
    },
    mounted () {
        let file = this.file
        if (file && file.type && file.size)
        this.previewFile(file)
        this.$emit('mounted', this)
    },
    methods: {
        imageLoad (e) {
            this.$emit('imageLoad', {e, component: this})
        },
        previewFile (file) {
            const image = file.type.startsWith('image/')
            if (image) {
                const reader = new FileReader();
                reader.onload = e => (() => { this.imgSrc = e.target.result })()
                reader.readAsDataURL(file);
            } else {
                this.imgSrc = null
            }
        },
        formatBytes (bytes) {
            if (bytes === 0) return '0 Bytes'
            const k = 1024
            const sizes = ['Bytes', 'KB', 'MB']
            const i =  Math.floor(Math.log(bytes) / Math.log(k))
            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
        }
    }
}
</script>

<style>

.file-preview-card {
    width: 100%;
    border-radius: var(--card--border-radius);
    background: var(--color-bg);
    position: relative;
    z-index: 1;
    margin-bottom: auto;
}

.file-preview-card::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    mix-blend-mode: soft-light;
    border-radius: var(--card--border-radius);
}
.file-preview-card__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--padding-m);
    border-top-left-radius: var(--card--border-radius);
    border-top-right-radius: var(--card--border-radius);
    overflow: hidden;
}
.no-content .file-preview-card__header {
    border-bottom-left-radius: var(--card--border-radius);
    border-bottom-right-radius: var(--card--border-radius);
}
.fpc-info {
    display: flex;
    flex-direction: column;
}
.fpc-action {
    margin-bottom: auto;
}
.file-preview-card__content {
    position: relative;
    overflow: hidden;
    border-bottom-left-radius: var(--card--border-radius);
    border-bottom-right-radius: var(--card--border-radius);
}
.fpc__progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--padding-s);
    overflow: hidden;
    z-index: -1;
}
.fpc__progress__bar {
    width: 100%;
    height: 100%;
    transform-origin: left;
    background: var(--color-upload, #E0EC89);
}
.fpc__progress__bar--complete {
    background: var(--color-upload--completed, #AED75D);
}
.no-content .file-preview-card__content {
    height: 0;
}
.file-preview-card__content img {
    object-fit: cover;  
    width: 100%;
    margin-top: -4px;
    transform: translateY(4px);
}
</style>
