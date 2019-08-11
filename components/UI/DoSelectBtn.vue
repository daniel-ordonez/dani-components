<template>
    <button flat class="do-btn do-select-btn" 
        :active="active"
        @click="toggle">
        <div class="select-btn-label">
            {{label}}
        </div>
        <i class='bx bx-chevron-down bx-sm'></i>
        <div class="select-options">
            <div v-for="(item, index) in options" :key="`options-${index}`">
                {{item}}
            </div>
        </div>
    </button>
</template>
<script>
export default {
    name: 'do-select-btn',
    props: {
        value: {type: [Object, String], default: null},
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
        label () {
            let {value, formatLabel, placeholder} = this
            if (value) {
                return typeof value === 'string'
                    ? typeof formatLabel === 'function'
                        ? formatLabel(value)
                        : value
                    : typeof formatLabel === 'function'
                        ? formatLabel(value.label || '')
                        : value.label || ''
            } else return placeholder
        }
    },
    methods: {
        toggle (event) {
            this.$emit('click', event)
            this.active = !this.active
        }
    }
}
</script>
<style>
.do-select-btn {
    position: relative;
}
button.do-btn>*+i {
    margin-left: var(--padding-s);
}
.do-select-btn .select-options {
    position: absolute;
    top: calc(100% );
    min-width: 100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--button--bg-color, var(--bg-color, white));
    border-radius: var(--button--border-radius);
    box-shadow: 0px 3px 6px -1px var(--button--shadow-color, rgba(0,0,0,.16));
    will-change: top, opacity;
    transition: all .2s ease-in-out;
    pointer-events: none;
}
.do-select-btn[active] .select-options {
    opacity: 1;
    top: calc(100% + var(--padding-s));
    pointer-events: initial;
}
.do-select-btn[active] {
    pointer-events: none;
}
</style>