<template>
    <th :sortable="!!sort" >
        <slot/>
        <span v-if="sortable" class="sort-icon">
            <i class='uil uil-sort'></i>
        </span>
    </th>
</template>

<script>
export default {
    props: {
        sort: { type: Boolean, default: false }
    },
    mounted () {
        this.$el.addEventListener('click', event => {
            this.$emit('click', event)
        })
    }
}
</script>

<style>
table.data-table th[sortable] {
    cursor: pointer;
}
</style>
