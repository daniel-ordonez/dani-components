<template>
    <label class="do-checkbox">
        <input type="checkbox" v-model="checked"  @input="e => {$emit('input', e)}">
        <span class="checkmark" >
            <i 
                v-if="typeof icon === 'string'"
                :class="`bx bx-${icon} bx-sm`"
            ></i>
        </span>
        <div class="checkbox-label" v-if="label.length">
            {{label}}
        </div>
    </label>
</template>

<script>
export default {
    name: 'do-checkbox',
    props: {
        icon: { type: [String, Boolean], default: false },
        label: { type: String, default: '' },
        value: { type: Boolean, default: false }
    },
    computed: {
        checked: {
            get () { return this.value },
            set (value) {
                this.$emit('checked', value)
            }
        }
    },
    model: {
        value: 'value',
        event: 'checked'
    }
}
</script>

<style>
.do-checkbox {
    cursor: pointer;
    font-size: inherit;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
}
.do-checkbox.round {
    --checkbox--border-radius: 50%;
}
.do-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  padding: 0;
  margin: 0;
}
.checkmark {
    height: var(--text-size-l, 1.36em);
    width: var(--text-size-l, 1.36em);
    background-color: var(--checkbox--bg-color, var(--color--grey, white));
    border-color: var(--checkbox--hover--bg-color, var(--color--grey-d1));
    border-width: 1px;
    border-style: solid;
    border-radius: var(--checkbox--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.checkmark+* {
    margin-left: var(--padding-s);
}
/* On mouse-over, add a grey background color */
.do-checkbox:hover input ~ .checkmark {
  background-color: var(--checkbox--hover--bg-color, var(--color--grey-d1));
}

/* When the checkbox is checked, add a blue background */
.do-checkbox input:checked ~ .checkmark {
  background-color: var(--checkbox--checked--bg-color, var(--color--primary));
  border-color: var(--checkbox--checked--bg-color, var(--color--primary));
}
/* Create the checkmark/indicator (hidden when not checked) */
.do-checkbox input:checked ~ .checkmark>i {
  display: block;
  color: var(--checkbox--icon-color,  white);
}
.do-checkbox input:not(:checked) ~  .checkmark>i {
  display: none;
}
.checkbox-label {
    color: var(--checkbox--label-color, var(--text-color, inherit));
}
.do-checkbox input:checked ~ .checkbox-label {
    color: var(--checkbox--checked--label-color, var(--color--primary, inherit));
}
</style>
