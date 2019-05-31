<template>
    <div class="input-text">
        <div v-if="label.length" class="input-text__label">
            <label :for="inputId">{{label}}</label>
        </div>
        <div class="input-text__wrapper">
            <div v-if="prepend" class="inpute-text__prepend">
                <slot name="prepend"/>
            </div>

            <input 
                :id="inputId"
                v-model="inputValue"
                v-bind="$attrs"
                class="input-text__text"
                type="text"
                @focus="focus"
                @blur="blur">
            
            <div v-if="append" class="inpute-text__append">
                <slot name="append"/>
            </div>
            
            <div v-if="clear" class="input-text__clear">
                <button v-if="inputValue" class="btn--icon" @click="inputValue = null">
                    x
                </button>
            </div>

        </div>
    </div>
</template>
