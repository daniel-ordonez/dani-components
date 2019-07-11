<template>
    <div class="input-text" :class="{'input-text--focused': focused}" 
        :success="success"
        :error="hasError">
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
                :type="type"
                @focus="focus"
                @blur="blur">
            
            <div v-if="clear" class="input-text__clear">
                <button tabindex="0" v-if="inputValue" class="btn btn--icon" 
                @click="reset">
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
import debounce from 'lodash/debounce'
import InputTextBase from '@daniel-ordonez/do-input-text-base/InputTextBase'
export default {
    name: 'input-text',
    extends: InputTextBase,
    props: {
        type: {
            type: String,
            default: 'text',
            validator: str => ['text', 'password'].includes(str)
        }
    },
    watch: {
        content (value) {
            this.validation === 'always' && this.debounceFunction(this.validate)
        }
    },
    computed: {
        inputValue: {
            get () { return this.value !== undefined && this.value !== null ? this.value : this.content },
            set (value) {
                value = typeof value === 'string' && this.trim ? value.trim() : value
                this.content = value
                this.$emit('input', value);
            }
        }
    },
    methods: {
        debounceFunction: debounce(f => {
            typeof f === 'function' && f()
        }, 200)
    }
}
</script>
