<template>
    <div class="input-text inpute--select" :class="{'input-text--focused': focused}">
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
                type="text"
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

            <div class="input-text__datalist" v-if="datalist && suggestions.length">
                <data-list ref="dataList">
                    <list-item v-for="(option, index) in suggestions" 
                        :key="`item-${index}-${option}`" 
                        @click="selectValue(option)">
                        {{option}}
                    </list-item>
                </data-list>
            </div>

        </div>
    </div>
</template>

<script>
import throttle from 'lodash.throttle'
import InputTextBase from '@daniel-ordonez/do-input-text-base/InputTextBase'
import DataList from '@daniel-ordonez/list/DataList'
import ListItem from '@daniel-ordonez/list/ListItem'

export default {
    name: 'input-text',
    extends: InputTextBase,
    components: {DataList, ListItem},
    data: () => ({
        dataList: false,
        fSuggestions: null,
        filteredSuggestions: []
    }),
    props: {
        items: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        inputValue: {
            get () { return this.value ? this.value : this.content },
            set (value) { this.$emit('input', value); this.content = value }
        },
        suggestions () { return this.filteredSuggestions }
    },
    watch: {
        value (value) {
            if (!value || value === '' || !value.length) this.content = ''
            this.updateSuggestions()
        },
        items () {
            this.updateSuggestions()
        }
    },
    mounted () {
        document.body.addEventListener('click', event => {
            let closest = event.target.closest(`#${this.id}`)
            if (!closest) this.dataList = false
        })
        this.fSuggestions = throttle((filter, items, cb) => {
            cb && cb(items.filter(str => str && str.match(new RegExp(`.*${filter}.*`))))
        }, 300)
        this.updateSuggestions()
    },
    methods: {
        updateSuggestions () {
            this.items.length && this.fSuggestions && this.fSuggestions(this.content, [...this.items], (suggestions) => {this.filteredSuggestions = suggestions})
        },
        focus () {
            this.focused = true
            this.$emit('focus')
            this.dataList = true
        },
        selectValue (value) {
            this.text = value
            this.dataList = false
        },
        keymonitor (keyEvent) {
            if (!keyEvent || !keyEvent.key) return
            const key = keyEvent.key
            if (key === 'Tab') {
                this.dataList = false
            } else if (this.dataList) {
                let dataList = this.$refs.dataList
                if (!dataList) return
                if (key === 'ArrowDown') {
                    dataList.selectNext()
                    dataList.selected && dataList.selected.elm.scrollIntoView()
                }
                else if (key === 'ArrowUp') {
                    dataList.selectPrev()
                    dataList.selected && dataList.selected.elm.scrollIntoView()
                }
                else if (key === 'Enter' && dataList.selected) {
                    let value = this.suggestions[dataList.index]
                    this.selectValue(value)
                    keyEvent.preventDefault()
                }
            } 
        }
    }
}
</script>
