<template>
    <tr>
        <slot/>
    </tr>
</template>

<script>
export default {
    mounted () {
        let el = this.$el
        el.addEventListener('click', event => {
            this.$emit('click', event)
        })
        el.addEventListener('mouseover', event => {
            this.$emit('mouseover', event)
        })
        el.addEventListener('mouseleave', event => {
            this.$emit('mouseleave', event)
        })
    }
}
</script>

