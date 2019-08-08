<template>
    <table class="data-table">
      <slot/>
    </table>
</template>

<script>
export default {
  name: 'DataTable'
}
</script>

<style>
table.data-table {
    display: grid;
    border-collapse: collapse;
    min-width: 100%;
    grid-template-columns: repeat(var(--table-cols, 1), minmax(var(--min-col-width, 50px), 1fr));
}
.data-table thead,
.data-table tbody,
.data-table tr {
  display: contents;
}

.data-table th,
.data-table td {
  padding: var(--padding-m);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0;
  width: 3px;
  cursor: col-resize;
}

th {
  position: sticky;
  top: 0;
  font-weight: normal;
}
</style>
