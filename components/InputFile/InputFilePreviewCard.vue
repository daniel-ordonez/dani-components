<template>
    <div class="file-preview-card">
        <div class="file-preview-card__header">
            <div class="fpc-info">
                <div class="fpc-info__name">{{title}}</div>
                <div class="fpc-header__size">{{subtitle | formatBytes}}</div>
            </div>
            <button class="btn btn--icon" @click="$emit('remove')">
                <i class='uil uil-times'></i>
            </button>
        </div>
        <div class="file-preview-card__content">
            <img v-if="imgSrc" :src="imgSrc">
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        formatBytes (bytes) {
            if (bytes === 0) return '0 Bytes'
            const k = 1024
            const sizes = ['Bytes', 'KB', 'MB']
            const i =  Math.floor(Math.log(bytes) / Math.log(k))
            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
        },
    },
    props: {
        file: {
            type: File,
            default: () => ({})
        }
    },
    data: () => ({
        imgSrc: null
    }),
    computed: {
        title () { return this.file.name || '' },
        subtitle () { return this.file.size || 0 }
    }, 
    watch: {
        file (file) {
            this.previewFile(file)
        }
    },
    mounted () {
        this.file && this.previewFile(this.file)
    },
    methods: {
        previewFile (file) {
            const image = file.type.startsWith('image/')
            if (image) {
                const reader = new FileReader();
                reader.onload = e => (() => { this.imgSrc = e.target.result })()
                reader.readAsDataURL(file);
            } else {
                this.imgSrc = null
            }
        }
    }
}
</script>

<style>

.file-preview-card__content img {
     object-fit: contain;  width: 100%;  height: 180px;
}
.file-preview-card {
    width: 100%;
    padding: var(--padding-m);
    border-radius: var(--card--border-radius);
    max-height: 300px;
    background: var(--color-bg);
    position: relative;
    z-index: 1;
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
    display: flex;
    justify-content: space-between;
    align-items: self-start;
}
.fpc-info {
    display: flex;
    flex-direction: column;
}
</style>
