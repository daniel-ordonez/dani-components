<template>
    <div class="input-text input-text--number" :class="{'input-text--focused': focused}">
        <div v-if="label && label.length" class="input-text__label">
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-text__wrapper">
            <div v-if="prepend" class="inpute-text__prepend">
                <slot name="prepend"/>
            </div>

            <input 
                tabindex="0"
                :id="inputId"
                v-model="inputValue"
                v-bind="$attrs"
                class="input-text__text"
                :type="mobile ? 'number' : 'text'"
                @keydown="checkInput"
                @focus="focus"
                @blur="blur">
            
            <div v-if="append" class="inpute-text__append">
                <slot name="append"/>
            </div>
            
            <div v-if="clear" class="input-text__clear">
                <button tabindex="0" v-if="inputValue" class="btn btn--icon" @click="inputValue = null">
                    <i class='uil uil-times'></i>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import InputTextBase from '@daniel-ordonez/do-input-text-base/InputTextBase'
export default {
    name: 'input-text',
    extends: InputTextBase,
    props: {
        mobile: { type: Boolean, default: false },
        int: { type: Boolean, default: false }
    },
    watch: {
        value (value) {
            if (value && isNaN(value)) this.inputValue = 0
        }
    },
    computed: {
        inputValue: {
            get () { return this.value && !isNaN(this.value) ? this.value : this.content },
            set (value) {
                let n = value ? this.int ? parseInt(value) : parseFloat(value) : value
                this.$emit('input', n); this.content = n
            }
        }
    },
    methods: {
        checkInput (keyboardEvent) {
            const key = keyboardEvent.key
            if (!key) return
            if (key === '.' && !this.int) {
                if (this.content.toString().includes('.')) return keyboardEvent.preventDefault()
                else return
            }
            if ((isNaN(key) && key.length === 1) || key === " ") return keyboardEvent.preventDefault()
        }
    }
}
</script>
