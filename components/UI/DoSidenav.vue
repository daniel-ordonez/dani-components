<template>
    <div class="do-sidenav">
        <div class="sidenav-top">
            <slot name="top"/>
        </div>
        <div class="sidenav-content">
            <slot/>
        </div>
        <div class="sidenav-bottom">
            <slot name="bottom"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'do-sidenav'
}
</script>

<style>
.do-sidenav {
    grid-area: side;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-auto-columns: 1fr;
    grid-auto-flow: row;
    background-color: var(--sidenav--bg-color, var(--bg-color));
    height: 100%;
    --sidenav--falback--width: calc(2.5em + (2 * var(--padding-s, 1em)));
    width: var(--sidenav--mini--width, var(--sidenav--falback--width));
}
.do-sidenav .sidenav-top {
    padding-top: var(--sidenav--padding-top, var(--padding-m));
}
.do-sidenav .sidenav-bottom {
    padding-bottom: var(--sidenav--padding-bottom, var(--padding-m));
}
.do-sidenav .sidenav-content, .do-sidenav .sidenav-bottom, .do-sidenav .sidenav-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
