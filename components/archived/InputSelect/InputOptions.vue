<template>
    <div class="input-text input-options" :class="{'input-options--focused': focused}">
        <div v-if="label && label.length" class="input-text__label">
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-options__wrapper">
            <button v-for="(item, index) in options" 
                class="btn"
                @click="selected = item"
                :selected="!!(item === selected)"
                :key="index">
                {{item | optionLabel(dataLabel)}}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'input-options',
    props: {
        value: { 
            type: [Object, String], 
            default: null, 
        },
        label: { type: String, default: '' },
        id: { type: String, default: '' },
        options: {
            type: Array,
            default: () => []
        },
        dataLabel: {
            type: String,
            default: 'label'
        }
    },
    filters: {
        optionLabel (item, dataLabel) {
            return typeof item === 'string'
            ? item
            : item && typeof item === 'object'
                ? item[dataLabel]
                : ''
        }
    },
    data: () => ({
        focused: false
    }),
    computed: {
        selected: {
            get () { return this.value },
            set (value) { this.$emit('input', value) }
        },
        inputId () { return this.id.length ? this.id : `input__${this._uid}` },
    }
}
</script>

<style>
.input-options__wrapper {
    display: flex;
}
.input-options__wrapper>button {
    flex-grow: 1;
    border: 1px solid var(--color-bg--shade-2);
}
.input-options__wrapper>button+button {
    border-left: none;
    position: relative;
}
.input-options__wrapper>button:not(:first-child),
.input-options__wrapper>button:not(:last-child) {
    --button--border-radius: 0;
}
.input-options__wrapper>button[selected]{
    color: var(--color-primary);
}
.input-options__wrapper>button[selected]:hover,
.input-options__wrapper>button[selected]:active{
    color: var(--color-primary);
    --button--hover--bg: transparent;
    --button--active--bg: var(--color-primary--light-3);
}
.input-options__wrapper>button[selected]::after {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-color: var(--color-primary);
    z-index: 1;
    border-style: solid;
    border-width: 2px;
}

</style>
