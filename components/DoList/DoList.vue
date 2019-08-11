<template>
    <div class="do-list">

    </div>
</template>
<script>
export default {
    name: 'do-list'
}
</script>
<style>
.do-list {
    display: flex;
    flex-direction: column;
}
.do-list[align="right"] .do-list-item-section {
    justify-content: flex-end;
}
</style>