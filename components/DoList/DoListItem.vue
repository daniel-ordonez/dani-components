<template>
    <div class="do-list-item" @click="event => $emit('click', event)" :clickable="clickable">
        <div class="list-item-avatar">
            <slot name="avatar"/>
        </div>
        <div class="list-item-content">
            <slot/>
        </div>
        <div class="list-item-side">
            <slot name="side"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'do-list-item',
    props: {
        clickable: { type: Boolean, default: false }
    }
}
</script>

<style>
.do-list-item {
    display: flex;
    padding: var(--padding-s);
    background-color: var(--litem--bg-color, var(--bg-color));
}
.do-list-item[clickable]:hover {
    background-color: var(--litem--hover--bg-color, var(--bg-color));
    cursor: pointer;
}
.do-list-item>.list-item-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.list-item-section {
    padding: 0 var(--padding-s);
}
</style>