<template>
    <div class="collapse-hor" :collapsed="collapsed" :style="style">
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        collapsed () { return this.value },
        el () { return this.$el },
        scrollWidth () { return this.el ? this.el.scrollWidth : 0 },
        style () { return this.collapsed ? `max-width: ${this.scrollWidth}px; opacity: 1;` : 'max-width: 0px; opacity: 0;' }
    },
    mounted () {
        this.$el.addEventListener('click', event => this.$emit('click', event))
    }
}
</script>

<style>
.collapse-hor {
    overflow: hidden;
    transition: max-width 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940), opacity .3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    will-change: max-width, opacity;
}
.collapse-hor[fast] {
    transition: max-height 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940), opacity .2s cubic-bezier(0.250, 0.460, 0.450, 0.940);
}
</style>