<template>
    <table class="do-table">
        <slot name="head">
            <thead :sticky="sticky">
                <th v-if="selection !== 'none'"/>
                <th v-for="(item, index) in columns" 
                    :key="`th-${index}`"
                    :align="item.align || 'left'"
                >
                    {{item.label || item.name}}
                </th>
            </thead>
        </slot>
        <slot name="body">
            <tbody>
                <tr v-for="(item, index) in data" 
                    :key="`row-${index}`" 
                    class="table-row"
                    :row="index"
                    :class="{'selected': selectedItems.includes(item)}"
                >
                    <td v-if="selection !== 'none'">
                        <do-checkbox
                            icon="check"
                            class="round"
                            :value="selectedItems.includes(item)"
                            @input="e => select(index, item)"
                        />
                    </td>
                    <td v-for="(k, i) in columns" 
                        :align="k.align || 'left'"
                        :key="`col-${i}`" 
                        class="table-cel">
                        {{ typeof k.format === 'function' ? k.format(item) : item[k.name] }}
                    </td>
                </tr>
            </tbody>
        </slot>
    </table>
</template>

<script>
import DoCheckbox from '@daniel-ordonez/do-checkbox/DoCheckbox'
export default {
    name: 'do-table',
    components: {DoCheckbox},
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        selected: {
            type: [Array, Object],
            default: null,
            validator: v => Array.isArray(v) || v === null
        },
        selection: {
            type: String,
            default: 'single',
            validator: v => ['none','single', 'multiple'].includes(v)
        },
        maxWidth: {type: String,default: ''},
        sticky: { type: Boolean, default: true}
    },
    model: {
        prop: 'selected',
        event: 'select'
    },
    watch: {
        columns () {
            this.updateColumns()
        }
    },
    computed: {
        selectedItems () {
            let {selected} = this
            return Array.isArray(selected) ? [...selected].map(i => i.item) : []
        }
    },
    mounted () {
        this.updateColumns()
    },
    methods: {
        select (idx, item) {
            let {selection, selected} = this
            let uncheck = Array.isArray(selected) ? selected.find(el => el.item === item) : false
            let el = this.$el.querySelector(`.table-row[row="${idx}"]`)
            if (uncheck) {
                // remove from selected
                let array = [...selected]
                array = array.filter(i => i.item !== item)
                this.$emit('select', array)
            } else {
                // append to selected
                let obj = {el, item}
                let value = selection === 'multiple' ? [...selected || [], obj] : [obj]
                this.$emit('select', value)
            }
        },
        updateColumns () {
            let {columns, selection} = this
            let templateColumns = columns.reduce((str, col) => {
                let size = col.size || 'auto'
                if (['auto', '1fr'].includes(size) || size.match(/^\d+(px)$/) || size.match(/^(minmax\().+,.+\)$/)) {
                    return `${str} ${size}`
                }
            }, '')
            let style = `grid-template-columns: ${selection !== 'none' ? 'auto' : ''} ${templateColumns}; 
                ${this.maxWidth && 'max-width: ' + this.maxWidth}`
            this.$el.style = style
        }
    }
}
</script>

<style>

.do-table {
    display: grid;
    border-collapse: collapse;
    grid-row-gap: var(--padding-s);
    --table--row--border-width: 2px;
}
.do-table thead,
.do-table tbody,
.do-table tr {
    display: contents;
    --checkbox--hover--bg-color: var(--color--grey);
    --checkbox--checked--bg-color: white;
    --checkbox--icon-color: var(--table--selected--bg-color, var(--color--primary));
}
.do-table thead[sticky] th {
    position: sticky;
    top: 0;
    background: var(--table--header--bg-color, var(--bg-color));
}
.do-table th {
    padding: var(--padding-s);
    font-weight: normal;
    text-transform: capitalize;
}
.do-table td {
    background-color: var(--table--bg-color, var(--bg-color));
    color: var(--table--text-color, var(--text-color));
    padding: var(--padding-s);
    white-space: nowrap;
    text-overflow: ellipsis; 
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: var(--table--row--border-width) solid var(--table--row--border-color, transparent);
    border-top: var(--table--row--border-width) solid var(--table--row--border-color, transparent);
    /*
    transition: transform .3s;
    */
}
.do-table tr>td:first-child {
    border-top-left-radius: var(--table--row--border-radius);
    border-bottom-left-radius: var(--table--row--border-radius);
    border-left: var(--table--row--border-width) solid var(--table--row--border-color, transparent);
}
.do-table tr>td:last-child {
    border-top-right-radius: var(--table--row--border-radius);
    border-bottom-right-radius: var(--table--row--border-radius);
    border-right: var(--table--row--border-width) solid var(--table--row--border-color, transparent);
}
.do-table tr.selected>td {
    --table--bg-color: var(--table--selected--bg-color, var(--color--primary));
    --table--text-color: white;
}
/*
.do-table tr.selected>td{
    transform: translateX(var(--padding-s));
}
*/
</style>
