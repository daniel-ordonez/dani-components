<template>
    <div class="do-layout">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'do-layout'
}
</script>

<style>
.do-layout {
    height: 100%;
    width: 100%;
    background-color: var(--bg-color);
    color: var(--text-color);
}
</style>
