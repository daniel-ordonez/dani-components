<template>
    <div class="slider">
        <div class="zoomed-image" ref="zoomedImg">
            <img :src="currentImg">
        </div>
        <div class="slider__controls">
            <div class="slider-control" v-if="showControls">
                <button @click="imageIndex--">
                    <i class='uil uil-angle-left'></i>
                </button>
            </div>
            <slot name="control">
                <div class="slider-control slider-zoom">
                    <button @click="zoom">
                        <i class='uil uil-search-plus'></i>
                    </button>
                </div>
            </slot>
            <div class="slider-control" v-if="showControls">
                <button @click="imageIndex++">
                    <i class='uil uil-angle-right'></i>
                </button>
            </div>
        </div>
        <div class="slider__images" :style="sliderStyle">
            <div v-for="(item, index) in images" 
                :key="index"
                :style="`left: ${index * 100}%`" 
                class="slider-image">
                <template v-if="typeof item === 'string'" >
                    <img :src="item">
                </template>
            </div>
        </div>
        <div class="slider__dots" v-if="showControls">
            <span v-for="(item, index) in images" 
                :key="index" 
                class="dot"
                :selected="index === imageIndex"
                />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        index: 0
    }),
    computed: {
        showControls () { return this.images.length > 1 },
        imageIndex: {
            get () { return this.index },
            set (value) {
                let min = 0
                let max = this.images.length - 1
                this.index = Math.max(min, Math.min(max, value))
            }
        },
        sliderStyle () {
            return `transform: translateX(${this.imageIndex * -100}%)`;
        },
        currentImg () {
            return this.images.length ? this.images[this.index] : ''
        }
    },
    mounted () {
        let el = this.$el
        let bcr = el.getBoundingClientRect()
        let src = this.images[this.index]
        let keys = ['x', 'y', 'width', 'height']
        let img = this.$refs.zoomedImg
        keys.map(i => {
            img.style[i] = `${bcr[i]}px`
        })
        img.addEventListener('click', event => {
            console.log('click')
            this.zoom(event)
        })
    },
    methods: {
        zoom (event) {
            let img = this.$refs.zoomedImg
            if (img.classList.contains('enabled')) {
                this.zoomImage(img, true)
            } else {
                this.zoomImage(img, false)
            }
            img.classList.toggle('enabled')
        },
        zoomImage (target = null, value = true) {
            let img = target ? target : this.$refs.zoomedImg
            if (value) {
                let el = this.$el
                let bcr = el.getBoundingClientRect()
                let keys = ['width', 'height']
                keys.map(i => {
                    img.style[i] = `${bcr[i]}px`
                })
            } else {
                img.style.width = '100%'
                img.style.height = '100%'
            }
        }
    }
}
</script>

<style>
.slider {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;
    background: var(--color-bg--shade-2);
    overflow: hidden;
}
.slider__controls {
    /*
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: minmax(min-content, 20%) 1fr minmax(min-content, 20%);
    grid-template-rows: 1fr;
    z-index: 2;
    */
    position: relative;
    width: 100%;
    height: 100%;
}
/*
.slider-control {
    --color-bg--contrast: var(--color-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
*/
.zoomed-image>img{
    height: 100%;
    width: 100%;
    object-fit: contain;
    z-index: 1000;
}
.zoomed-image {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
}
.zoomed-image {
    transition: width .2s ease-in-out, height .2s ease-in-out;
}
.zoomed-image:not(.enabled) {
    pointer-events: none;
}
.zoomed-image.enabled {
    pointer-events: initial;
    z-index: 1000;
    cursor: pointer;
}
.slider-control {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: white;
    position: absolute;
    top: 0;
    bottom: 0;
}
.slider-control>button {
    width: 100%;
    height: 100%;
    --button--text-color: white;
    background-color: transparent;
}
.slider__controls>.slider-control:first-child {
    left: 0;
}
.slider__controls>.slider-control:last-child {
    right: 0;
}

.slider-zoom {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    color: white;
    background: rgba(0,0,0,0.5);
    cursor: pointer;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity .3s ease-in;
}
.slider-zoom:hover {
    opacity: 1;
}

.slider__dots {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--padding-s);
    --dot-size: var(--padding-m);
}
.slider__dots>.dot {
    display: block;
    width: var(--dot-size);
    height: var(--dot-size);
    background: var(--color-bg);
    z-index: 1;
    opacity: var(--transparency-3);
}
.slider__dots>.dot:not(:last-child) {
    margin-right: var(--padding-s);
}
.slider__dots>.dot[selected] {
    opacity: var(--transparency-0);
}
.slider__images {
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: visible;
    display: flex;
    will-change: transform;
    transition: transform ease-in-out .3s;
}
.slider-image {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}
.slider-image>img {
    width: 100%;
    height: auto;
    margin:auto;
}
</style>
