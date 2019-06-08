<template>
    <tr>
        <slot/>
    </tr>
</template>

<script>
export default {
    mounted () {
        let el = this.$el
        el.addEventListener('click', () => {
            this.$emit('click')
        })
        el.addEventListener('mouseover', () => {
            this.$emit('mouseover')
        })
        el.addEventListener('mouseleave', () => {
            this.$emit('mouseleave')
        })
    }
}
</script>

