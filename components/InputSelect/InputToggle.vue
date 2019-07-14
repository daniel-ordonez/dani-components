<template>
    <div class="input-text input-toggle" :class="{'input-options--focused': focused}">
        <div v-if="label && label.length" class="input-text__label">
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-toggle__wrapper">
            <label for="" class="toggle" @click="inputValue = !inputValue">
                <input v-model="inputValue" role="switch" type="checkbox" class="toggle__input">
                <span class="toggle__slider"></span>
            </label>
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
  props: {
        value: { 
            type: Boolean, 
            default: false, 
        },
        label: { type: String, default: '' },
        id: { type: String, default: '' },
    },
    data: () => ({
        focused: false,
        storedValue: false
    }),
    computed: {
        inputId () { return this.id.length ? this.id : `input__${this._uid}` },
        inputValue: {
        get () { return this.storedValue !== this.value ? this.value : this.storedValue },
        set (value) { this.$emit('input', value); this.storedValue = value } 
        },
    },
    methods: {
        focus (event) {
            this.focused = true
            this.$emit('focus', event)
        },
        blur (event) {
            this.focused = false
            this.$emit('blur', event)
            this.validation === 'blur' && this.validate()
        },
    }
}
</script>

<style>
.input-toggle__wrapper {
    display: flex;
    align-items: center;
}
.input-toggle__wrapper>*+* {
    margin-left: var(--padding-m);
}
</style>
