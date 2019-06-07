<template>
    <th :sortable="sortable" >
        <slot/>
        <span v-if="sortable" class="sort-icon">
            <i class='uil uil-sort'></i>
        </span>
    </th>
</template>

<script>
export default {
    props: {
        sortable: { type: Boolean, default: false }
    },
    mounted () {
        this.$el.addEventListener('click', event => {
            this.$emit('click', event)
        })
    }
}
</script>

<style>

</style>
