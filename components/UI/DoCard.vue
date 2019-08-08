<template>
    <div class="do-card">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'do-card'
}
</script>

<style>
.do-card {
    background-color: var(--card--bg-color, var(--bg-color));
    border-radius: var(--card--border-radius);
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word; 
    overflow: hidden;
    box-shadow: 0px 6px 8px 4px rgba(0, 0, 0, .02);
}
.card-title {
    padding: var(--padding-rm) var(--padding-rl);
    white-space: nowrap;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: var(--text-size-l, 1em);
}
.card-content {
    padding: 0 var(--padding-rl);
}
.do-card>div:last-child.card-content {
    padding-bottom: var(--padding-rl);
}
.card-actions {
    padding: var(--padding-rl);
    display: flex;
}
.card-actions[right] {
    justify-content: flex-end;
}
.card-actions[right]>*+* {
    margin-left: var(--padding-m);
}
.card-actions[space-between] {
    justify-content: space-between;
}
.do-card[outline] {
    box-shadow: none;
    border: 1px solid var(--card--border-color, var(--color--grey));
}
</style>
