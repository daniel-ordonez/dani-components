<template>
    <div class="drop-animation">
        <transition name="drop">
            <div v-if="toggled" key="up">
                <slot name="up">Up</slot>
            </div>
            <div v-else key="down">
                <slot name="down">Down</slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        toggled: { type: Boolean, default: false }
    }
}
</script>

<style>
.drop-animation {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}
.drop-animation>div {
    width: 100%;
    height: 100%;
}
</style>
