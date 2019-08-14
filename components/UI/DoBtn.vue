<template>
    <button class="do-btn" @click="event => $emit('click', event)">
        <slot/>
    </button>
</template>

<script>
export default {
    name: 'do-btn'
}
</script>

<style>
button {
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;
    position: relative;
    border-radius: var(--button--border-radius);
    background-color: var(--button--bg-color, var(--bg-color));
    color: var(--button--text-color, var(--text-color));
    z-index: 1;
    
    border: none;
    outline: none;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}

button.do-btn {
    padding: var(--padding-s) var(--padding-m);
    min-width: 100px;
    box-shadow: 0px 3px 6px -1px var(--button--shadow-color, rgba(0,0,0,.16));
}
button.do-btn * {
    line-height: 1;
}
button.do-btn[text] {
    box-shadow: none;
}
button.do-btn[ripple] {
    background-position: center;
    transition: background 0.5s;
    white-space: nowrap;
}
button.do-btn[ripple]:hover:not(:disabled) {
    background: var(--button--hover--bg-color)
    radial-gradient(circle, transparent 1%, var(--button--hover--bg-color) 1%) center/15000%;
}
button.do-btn[ripple]:active:not(:disabled) {
    background-color: var(--button--active--bg-color);
    background-size: 100%;
    transition: background 0s;
}
button:disabled {
    opacity: var(--transparency-2);
    cursor: not-allowed;
}
button.do-btn[text] {
    --button--text-color: var(--button-text--text-color);
    --button--hover--bg-color: var(--button-text--hover--bg-color);
    --button--active--bg-color: var(--button-text--active--bg-color);
    --button--bg-color: var(--button-text--bg-color);
}
button.do-btn.mono {
    min-width: var(--button--mono--size, 2.5em);
    width: var(--button--mono--size, 2.5em);
    height: var(--button--mono--size, 2.5em);
    padding: 0;
}
button.do-btn.round {
    border-radius: 50%;
}
button.do-btn[flat] {
    box-shadow: none;
}
</style>
