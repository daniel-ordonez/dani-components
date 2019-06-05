<template>
    <div class="calendar-months">
        <div class="month-slot" v-for="(month, index) in months" :key="index">
            <button @click="setMonth(index + 1)" 
                class="btn month-slot__btn"
                :current="inCurrentYear && index === currentMonth"
                :selected="index + 1 === selectedMonth">
                {{month}}
            </button>
        </div>
    </div>
</template>

<script>
const { DateTime, Info } = require('luxon')
export default {
    props: {
        value: {
            type: Number,
            default: null,
            validator: n => n > 0 && n < 13
        },
        calendar: {
            type: DateTime,
            default: () => DateTime.fromJSDate(new Date()),
            validator: value => value instanceof DateTime
        },
        locale: {
            type: String,
            default: 'en-US',
            validator: str => str.match(/[a-z]{2}-[A-Z]{2}$/)
        }
    },
    data: () => ({
        content: null,
        months: []
    }),
    computed: {
        currentYear () {
            return new Date().getFullYear()
        },
        inCurrentYear () {
            return this.calendar.year === this.currentYear
        },
        selectedMonth: {
            get () { return this.value ? this.value : this.content },
            set (value) { this.$emit('input', value); this.content = value }
        },
        currentMonth () { return new Date().getMonth() }
    },
    mounted () {
        this.months = Info.months('short', { locale: this.locale })
    },
    methods: {
        setMonth (month) {
            this.selectedMonth = month
        }
    }
}
</script>

<style>
.calendar-months {
    --unit: var(--cell-height, 2em);
    min-height: calc(6 * var(--unit));
    padding-bottom: calc(var(--unit) * 1);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    background: var(--color-bg);
}
.month-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3em;
}

.month-slot__btn {
    width: 100%;
    text-transform: uppercase;
    height: 100%;
}
.month-slot__btn[current] {
    --color-bg: var(--color-bg--shade-1);
    background: var(--button--bg);
}
.month-slot__btn[current]:hover {
    --color-bg: var(--color-bg--shade-2);
}
.month-slot__btn[selected] {
    --color-bg: var(--color-primary);
    background: var(--button--bg);
    --button--hover--bg: var(--color-primary--light-2);
    --button--active--bg: var(--color-primary--shade-2);
    --color-bg--contrast: var(--color-primary--contrast);
}
</style>
