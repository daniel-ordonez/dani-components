<template>
    <div class="hor-selector">
        <button class="btn btn--icon" :disabled="disabled || disableL"
            @click="$emit('input', -1)">
            <i class='uil uil-angle-left'></i>
        </button>
        <div class="hor-selector__content">
            <slot/>
        </div>
        <button class="btn btn--icon" :disabled="disabled || disableR"
            @click="$emit('input', 1)">
            <i class='uil uil-angle-right'></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        disableL: {
            type: Boolean,
            default: false
        },
        disableR: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.hor-selector {
    display: flex;
    flex-direction: row;
}
.hor-selector>button {
    flex-shrink: 1;
}
.hor-selector__content {
    flex-shrink: 0;
    flex-grow: 1;
    text-align: center;    
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
