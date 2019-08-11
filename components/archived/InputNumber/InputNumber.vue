<template>
    <div class="input-text input-text--number" :class="{'input-text--focused': focused}">
        <div v-if="label && label.length" class="input-text__label">
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-text__wrapper">
            <div v-if="prepend" class="input-text__prepend">
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
            
            <div v-if="clear" class="input-text__clear">
                <button tabindex="0" v-if="inputValue" class="btn btn--icon" @click="inputValue = null">
                    <i class='uil uil-times'></i>
                </button>
            </div>
            
            <div v-if="append" class="input-text__append">
                <slot name="append"/>
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
        value: {
            type: [String, Number, Object],
            validator: v => typeof v === 'object' ? v === null : true 
        },
        mobile: { type: Boolean, default: false },
        int: { type: Boolean, default: false },
        decimals: {
            type: Number, default: 10
        }
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
                if (!(this.content || '').length && value === '.') value = '0.'
                let n = value 
                ? this.int 
                    ? parseInt(value) 
                    : isNaN(parseFloat(value))
                        ? value
                        : parseFloat(value) 
                : null
                this.$emit('input', n); this.content = n
            }
        }
    },
    methods: {
        checkInput (keyboardEvent) {
            const key = keyboardEvent.key
            if (!key) return
            let str = this.content ? this.content.toString() : ''
            let i = str.indexOf('.')
            let isfloat = i !== -1
            if (key === '.' && !this.int) {
                if (isfloat) return keyboardEvent.preventDefault()
                else return
            }
            if ((isNaN(key) && key.length === 1) || key === " ") return keyboardEvent.preventDefault()
            let l = str.length
            if (isfloat && l - i > this.decimals && key.length === 1) return keyboardEvent.preventDefault()
        }
    }
}
</script>
