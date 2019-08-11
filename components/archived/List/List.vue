<template>
    <div class="list">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'list'
}
</script>


<style>
.list {
    display: flex;
    flex-direction: column;
}
</style>
