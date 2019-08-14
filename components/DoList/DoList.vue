<template>
    <div class="do-list">
        <slot/>
    </div>
</template>
<script>
export default {
    name: 'do-list'
}
</script>
<style>
.do-list {
    display: flex;
    flex-direction: column;
    border-radius: var(--list--border-radius);
}
.do-list[align="right"] .list-item-section {
    justify-content: flex-end;
}
</style>