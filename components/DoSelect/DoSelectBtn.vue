<template>
    <button flat class="do-btn do-select-btn" 
        :active="active"
        @click="toggle">
        <div class="select-btn-label">
            {{label}}
        </div>
        <i class='bx bx-sm' :class="active ? 'bx-x' : 'bx-chevron-down'"></i>
        <div class="select-options">
            <do-list align="right">
                <template v-if="items.length" >
                    <do-list-item 
                        :key="`options-${0}`"
                        @click="select(items[0])"
                        :selected="items[0] === value"
                    >
                        <div class="tip-arrow"></div>
                        <div class="list-item-section">
                            {{items[0].label}}
                        </div>
                    </do-list-item>
                    <do-list-item v-for="(item, index) in items.filter((el, idx) => idx > 0)" 
                        :key="`options-${index + 1}`"
                        @click="select(item)"
                        :selected="item === value"
                    >
                        <div class="list-item-section">
                            {{item.label}}
                        </div>
                    </do-list-item>
                </template>
            </do-list>
        </div>
    </button>
</template>
<script>
import DoList from '@daniel-ordonez/do-list/DoList'
import DoListItem from '@daniel-ordonez/do-list/DoListItem'
export default {
    name: 'do-select-btn',
    components: {DoList, DoListItem},
    props: {
        value: {type: Object, default: null},
        formatLabel: {
            type: [Function, Boolean],
            default: false
        },
        options: {
            type: Array,
            default: () => []
        },
        placeholder: { type: String, default: '' }
    },
    data: () => ({
        active: false
    }),
    computed: {
        items () {
            return this.options.map(i => {
                return typeof i === 'string'
                ? {label: i, value: i}
                : i
            })
        },
        label () {
            let {value, formatLabel, placeholder} = this
            if (value) {
                return typeof formatLabel === 'function'
                    ? formatLabel(value.label)
                    : value.label
            } else return placeholder
        }
    },
    methods: {
        toggle (event) {
            this.$emit('click', event)
            this.active = !this.active
        },
        select (item) {
            this.$emit('input', item)
            this.$emit('value-selected', item.value)
        }
    }
}
</script>
<style>
.do-select-btn {
    position: relative;
    --arrow-size: var(--padding-s, 8px);
}
.do-select-btn[active] {
    z-index: 10000;
}
button.do-btn>*+i {
    margin-left: var(--padding-s);
}
.do-select-btn .select-options {
    position: absolute;
    top: 100%;
    min-width: 100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--button--bg-color, var(--bg-color, white));
    border-radius: var(--button--border-radius);
    --list--border-radius: var(--button--border-radius);
    box-shadow: 0px 3px 6px -1px var(--button--shadow-color, rgba(0,0,0,.16));
    will-change: top, opacity;
    transition: all .2s ease-in-out;
    pointer-events: none;
}
.do-select-btn[active] .select-options {
    opacity: 1;
    top: calc(100% + var(--padding-s));
    pointer-events: initial;
    z-index: 1;
}
.do-select-btn>i {
    transform: rotate3d(0,0,0);
    transition: transform .3s;
}
.do-select-btn[active]>i {
    transform: rotate3d(0, 0, 1, -180deg);
}
.do-select-btn .select-options .do-list {
    overflow-y: auto;
}
::-webkit-scrollbar {
    display: none;
    opacity: 0;
    width: 0;
}
.do-list-item .tip-arrow {
    z-index: 10000;
    content: " ";
    position: absolute;
    bottom: calc(100% - 2px);
    right: var(--padding-m);
    margin-left: calc(var(--arrow-size) * -1);
    border-width: var(--arrow-size);
    border-style: solid;
    border-color: transparent 
    transparent 
    var(--litem--bg-color, var(--button--bg-color, var(--bg-color))) 
    transparent;
}
.do-list-item:hover .tip-arrow {
    z-index: 10000;
    content: " ";
    position: absolute;
    bottom: calc(100% - 2px);
    right: var(--padding-m);
    margin-left: calc(var(--arrow-size) * -1);
    border-width: var(--arrow-size);
    border-style: solid;
    border-color: transparent 
    transparent 
    var(--litem--hover--bg-color, var(--button--bg-color, var(--bg-color))) 
    transparent;
}
</style>