<template>
    <div class="input-text" :class="{'input-text--focused': focused}">
        <div v-if="label && label.length" class="input-text__label">
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-text__wrapper">
            <div v-if="prepend" class="input-text__prepend">
                <slot name="prepend"/>
            </div>
            <textarea 
                tabindex="0"
                :rows="rows"
                :id="inputId"
                v-model="inputValue"
                v-bind="$attrs"
                class="input-text__text input-text__textarea"
                type="text"
                @focus="focus"
                @blur="blur"/>
            
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
    name: 'input-textarea',
    extends: InputTextBase,
    props: {
        rows: { type: Number, default: 5 }
    },
    computed: {
        inputValue: {
            get () { return this.value !== null ? this.value : this.content },
            set (value) { this.$emit('input', value); this.content = value }
        }
    }
}
</script>
