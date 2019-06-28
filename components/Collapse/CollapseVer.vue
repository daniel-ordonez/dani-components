<template>
    <div class="collapse-ver" :collapsed="collapsed" :style="style">
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
        scrollHeight () { return this.el ? this.el.scrollHeight : 0 },
        style () { return this.collapsed ? `max-height: ${this.scrollHeight}px; opacity: 1;` : 'max-height: 0px; opacity: 0;' }
    },
    mounted () {
        this.$el.addEventListener('click', event => this.$emit('click', event))
    }
}
</script>

<style>
.collapse-ver {
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940), opacity .3s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    will-change: max-height, opacity;
}
.collapse-ver[fast] {
    transition: max-height 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940), opacity .2s cubic-bezier(0.250, 0.460, 0.450, 0.940);
}
</style>