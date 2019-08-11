<template>
    <a class="do-list-item" @click="event => $emit('click', event)" :selected="selected">
        <div class="list-item-avatar">
            <slot name="avatar"/>
        </div>
        <div class="list-item-content">
            <slot/>
        </div>
        <div class="list-item-side">
            <slot name="side"/>
        </div>
    </a>
</template>

<script>
export default {
    name: 'do-list-item'
}
</script>

<style>
.do-list-item {
    display: flex;
    padding: var(--padding-s);
}
.do-list-item>.list-item-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
</style>