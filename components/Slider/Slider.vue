<template>
    <div class="slider">
        <div class="slider__controls">
            <div class="slider-control">
                <button class="btn btn--icon" @click="imageIndex--">
                    <i class='uil uil-angle-left'></i>
                </button>
            </div>
            <slot name="control">
                <div></div>
            </slot>
            <div class="slider-control">
                <button class="btn btn--icon" @click="imageIndex++">
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
        <div class="slider__dots">
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
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: minmax(min-content, 20%) 1fr minmax(min-content, 20%);
    grid-template-rows: 1fr;
    z-index: 2;
}
.slider-control {
    --color-bg--contrast: var(--color-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
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
