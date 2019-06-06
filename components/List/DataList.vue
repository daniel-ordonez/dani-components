<template>
    <list>
        <slot/>
    </list>
</template>

<script>
import List from './List'
export default {
    components: {List},
    data: ()  => ({
        items: [],
        index: 0,
        selected: null
    }),
    computed: {
        listItems () { return this.items }
    },
    mounted () {
        this.items = [...this.$slots.default]
    },
    updated () {
        this.items = [...this.$slots.default]
    },
    methods: {
        selectItem (index = this.index) {
            let items = this.items
            if (!items.length) return
            this.index = index < 0 ? items.length - 1 : index >= items.length ? index % items.length : index
            this.items.map(vnode => {
                vnode.componentInstance.select(false)
            })
            this.selected = this.items[this.index]
            this.selected.componentInstance.select()
        },
        selectNext () {
            let items = this.items
            if (!items.length) return
            let index = this.selected ? items.indexOf(this.selected) : -1
            this.selectItem(index + 1)
        },
        selectPrev () {
            let items = this.items
            if (!items.length) return
            let index = this.selected ? items.indexOf(this.selected) : -1
            this.selectItem(index - 1)
        }
    }
}
</script>
