<template>
    <div class="calendar-pages-months">
        <hor-selector  @input="v => moveMonth(v)" :disabled="months">
            <button 
                :transition-direction="months ? 'up' : 'down'"
                @click="months = !months" 
                class="btn calendar-months__toggle">
                <drop-animation 
                    :toggled="months">
                    <div slot="up">
                        <i class='uil uil-arrow-up'></i>
                    </div>
                    <div slot="down">{{displayMonth}}</div>
                </drop-animation>
            </button>
        </hor-selector>
        <div class="calendar-wrapper-days"
            :transition-direction="months ? 'up' : 'down'">
            <drop-animation 
                :toggled="months">
                <months slot="up" 
                    v-model="selectedMonth"
                    :locale="locale" />
                <pages-days slot="down" 
                    ref="days" 
                    v-model="date" 
                    :calendar="calendarDate"
                    :locale="locale"/>
            </drop-animation>
        </div>
    </div>
</template>

<script>
const { DateTime } = require('luxon')
import HorSelector from './HorSelector'
import DropAnimation from './DropAnimation'
import PagesDays from './CalendarPagesDays'
import Months from './Months'
export default {
    components: {HorSelector, DropAnimation, PagesDays, Months},
    props: {
        value: {
            type: Object,
            default: () => null,
            validator: v => v instanceof DateTime
        },
        calendar: {
            type: Object,
            default: () => null,
            validator: v => v instanceof DateTime
        },
        locale: {
            type: String,
            default: 'en-US',
            validator: str => str.match(/[a-z]{2}-[A-Z]{2}$/)
        }
    },
    data: () => ({
        months: false,
        innerValue: null,
        innerCalendar: DateTime.fromJSDate(new Date())
    }),
    computed: {
        date: {
            get () { return this.value ? this.value : this.innerValue },
            set (value) { this.$emit('input', value); this.innerValue = value }
        },
        calendarDate: {
            get () { return this.calendar ? this.calendar : this.innerCalendar.setLocale(this.locale) },
            set (value) { this.innerCalendar = value; this.$emit('updateCalendar', value) }
        },
        selectedMonth: {
            get () { return this.calendarDate.month },
            set (value) { this.setMonth(value) }
        },
        displayMonth () { return this.calendarDate.toFormat('LLLL') }
    },
    methods: {
        setMonth (month) {
            this.months = false
            let date = this.calendarDate
            let year = date.year
            if (month === date.month) return
            this.calendarDate = DateTime.fromObject({ year, month, day: 1 }).setLocale(this.locale)
        },
        moveMonth (value) {
            this.calendarDate = this.calendarDate.plus({months: value})
            this.$refs.days && this.$refs.days.slide(value > 0 ? 'left' : 'right')
        }
    }
}
</script>

<style>
.calendar-pages-months {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--padding-m);
}
.calendar-months__toggle {
    width: 100%;
}
[class^="calendar-wrapper"]{
    width: 100%;
    overflow: hidden;
    position: relative;
}
[class^="calendar-wrapper"]>*{
    position: relative;
    width: 100%;
}
</style>
