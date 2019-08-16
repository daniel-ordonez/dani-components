<template>
    <div class="do-tooltip" :hidden="!visible">
        <div class="tooltip-wrapper">
            <slot></slot>
            <div class="tooltip-arrow" :position="position">
            </div>
        </div>
    </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'
const debounce = require('lodash.debounce')
export default {
    name: 'do-tooltip',
    props: {
        target: { type: [Object, Node], default: null },
        position: { 
            type: String, 
            default: 'B', 
            validator: s => ['top', 'bottom', 'left', 'right'].includes(s) 
        },
        resizeContainer: { type: String, default: '' },
        scrollContainer: { type: String, default: '' }
    },
    data: () => ({
        visible: false,
        f: null,
        sc: null,
        rc: null,
        ro: null
    }),
    watch: {
        target (target) {
            if (!(target instanceof Node)) return this.hide()
        }
    },
    mounted () {
        const f = debounce(() => {this.updatePosition()}, 100)
        this.f = f
        let {resizeContainer, scrollContainer} = this
        if (resizeContainer.length) {
            let rc = document.querySelector(resizeContainer)
            if (rc) {
                const ro = new ResizeObserver(f)
                ro.observe(rc)
                this.rc = rc
                this.ro = ro
            }
        }
        if (scrollContainer.length) {
            let sc = document.querySelector(scrollContainer)
            sc && sc.addEventListener("scroll", f)
            this.sc = sc
        }
        window.addEventListener("resize", f)
        window.addEventListener("scroll", f)
    },
    beforeDestroy () {
        const {f, sc, rc, ro} = this.$data
        ro && ro.unobserve(rc)
        sc && sc.removeEventListener("scroll", f)
        window.removeEventListener("resize", f)
        window.removeEventListener("scroll", f)
    },
    methods: {
        show () {
            if (!(this.target instanceof Node)) return
            this.visible = true
            this.updatePosition()
        },
        hide () {
            this.visible = false
        },
        updatePosition () {
            let {visible} = this.$data
            if (!visible) return
            let {position, target} = this
            let el = this.$el
            let targetRect = target.getBoundingClientRect()
            switch (position) {
                case 'left': this.placeLeft(targetRect, el)
                break;
            }
        },
        placeLeft (targetRect, el) {
            let {top, bottom, left, width, height} = targetRect
            let y = top + (height / 2)
            let x = left
            let padding = '1em'
            el.style.bottom = null
            el.style.right = null
            el.style.left = `${x}px`
            el.style.top = `${y}px`
            el.style.transform = `translate(calc(-100% - ${padding} ), -50%)`
        }
    }
}
</script>

<style>
.do-tooltip {
    position: fixed;
    z-index: 1000;
    opacity: 1;
    will-change: opacity;
    transition: all .3s ease; 
}
.do-tooltip[hidden] {
    opacity: 0;
    left: 100vw;
    bottom: 100vh;
    user-select: none;
    pointer-events: none;
}
.tooltip-wrapper {
    position: relative;
}
.tooltip-arrow {
    content: " ";
    position: absolute;
    --arrow-size: 8px;
}
.tooltip-arrow[position="top"] {
    top: calc(100% - 2px);
    left: 50%;
    margin-left: calc(var(--arrow-size) * -1);
    border-width: var(--arrow-size);
    border-style: solid;
    border-color: var(--bg-color) transparent transparent transparent;
}
.tooltip-arrow[position="bottom"] {
    bottom: calc(100% - 2px);
    left: 50%;
    margin-left: calc(var(--arrow-size) * -1);
    border-width: var(--arrow-size);
    border-style: solid;
    border-color: transparent transparent var(--bg-color) transparent;
}
.tooltip-arrow[position="right"] {
    top: 50%;
    right: calc(100% + 2px);
    margin-top: calc(var(--arrow-size) * -1);
    border-width: var(--arrow-size);
    border-style: solid;
    border-color: transparent var(--bg-color) transparent transparent;
}
.tooltip-arrow[position="left"] {
    top: 50%;
    left: calc(100% - 2px);
    margin-top: calc(var(--arrow-size) * -1);
    border-width: var(--arrow-size);
    border-style: solid;
    border-color: transparent transparent transparent var(--bg-color);
}
</style>