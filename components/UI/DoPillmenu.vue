<template>
    <div class="do-pillmenu">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'do-pillmenu'
}
</script>

<style>
.do-pillmenu {
    --padding: calc( var(--padding-s) / 2 );
    --size: calc(40px + var(--padding));
    display: flex;
    flex-direction: column;
    width: var(--size); 
    align-items: center;
    border-radius: calc(var(--size) / 2 );
    min-height: var(--size); 
    padding:  var(--padding);
    background-color: var(--pillmenu--bg-color, var(--bg-color));
}

</style>