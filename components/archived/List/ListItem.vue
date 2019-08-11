<template>
    <a class="list-item" @click="event => $emit('click', event)" :selected="selected">
        <div class="list-item__icon">
            <slot name="icon"/>
        </div>
        <slot/>
    </a>
</template>

<script>
export default {
    name: 'list-item',
    data: () => ({
        selected: false
    }),
    methods: {
        select (value = true) {
            this.selected = value
        }
    }
}
</script>

<style>
.list-item:hover {
    background: var(--color-bg--shade-2);
    --color-text: var(--color-dark-3);
}
.list-item[selected] {
    background: var(--color-primary--light-3);
    --color-text: var(--color-primary--shade-3);
}
.list-item__icon {
    font-size: 1.309em;
    line-height: 0;
}
.list-item {
    --color-text: var(--color-dark-2);
    --stroke: var(--color-text);
    display: flex;
    padding: var(--padding-m) var(--padding-l);
    color: var(--color-text);
}
</style>