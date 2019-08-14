<template>
    <label :for="inputId" class="do-input" :focus="focused">
        <div class="input-label">
            {{label}}
        </div>
        <div class="do-input-text">
            <div class="input-prepend">
                <slot name="prepend"/>
            </div>
            <input v-model="text" :type="type" :id="inputId" @focus="focused = true" @blur="focused = false">
            <button 
                @click="reset"
                class="do-btn mono round" 
                v-if="clear && text" text flat ripple>
                <i class='bx bx-x bx-xs'></i>
            </button>
            <div class="input-append">
                <slot name="append"/>
            </div>
        </div>
    </label>
</template>

<script>
import DoInputTextBase from './DoInputTextBase'
    export default {
        extends: DoInputTextBase,
        name: 'do-input-text',
        computed: {
            text: {
                get () { return this.value ? this.value : this.content },
                set (value) { this.$emit('input', value); this.content = value ? value.toString() : '' }
            }
        }
    }
</script>

<style>
.do-input {
    display: flex;
    flex-direction: column;
    --input--height: calc(1em + (var(--padding-s) * 2));
}
.do-input[focus] .input-label{
    color: var(--input--focus--border-color, var(--color--primary));
}
.input-label {
    line-height: 1;
    margin-bottom: calc( var(--padding-s) / 2);
    font-size: var(--text-size-s);
}
.input-append, .input-prepend {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.input-append:empty, .input-prepend:empty {
    padding: 0;
}
.input-prepend:not(:empty), .input-append:not(:empty) {
    min-width: var(--input--height);
}
.do-input-text {
    border-radius: var(--input--border-radius);
    background-color: var(--input--bg-color, var(--color--grey-l2));
    border: 1px solid transparent;
    transition: background-color .2s;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    --button--mono--size: var(--input--height);
    min-height: var(--input--height);
}
.do-input.round>.do-input-text {
    border-radius: calc( 1em + var(--padding-s) );
}
.do-input-text:hover {
    background-color: var(--input--hover--bg-color, var(--color--grey));
}
.do-input[focus] .do-input-text{
    background-color: var(--input--focus--bg-color, var(--color--grey-l3));
    box-shadow: 0px 2px 4px var(--input--focus--border-color, rgba(0, 0, 0, 0.2));
}

input[type="text"], input[type="password"], input[type="number"], input[type="date"], textarea {
    line-height: 1;
    box-sizing: border-box;
    margin: 0;
    outline: none;
    width: 100%;
    text-align: inherit;
    font-size: inherit;
    background: inherit;
    color: inherit;
    border: none;
    padding: 0 var(--input--padding, var(--padding-s));
}
</style>