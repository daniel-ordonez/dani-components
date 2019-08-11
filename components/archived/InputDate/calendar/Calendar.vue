<template>
    <div class="calendar">
        <hor-selector  @input="v => move(v)" :disabled="moveDisabled">
            <button 
                :transition-direction="!inDays ? 'up' : 'down'"
                @click="nextState" 
                class="btn calendar__state-toggle">
                
                <drop-animation :toggled="inYears">
                    <div slot="up">
                        <i class='uil uil-arrow-up'></i>
                    </div>
                    <drop-animation slot="down" :toggled="!inDays">
                        <div slot="up">{{displayYear}}</div>
                        <div slot="down">{{displayMonth}}</div>
                    </drop-animation>
                </drop-animation>
            </button>
        </hor-selector>
        <div class="calendar-wrapper" :transition-direction="!inDays ? 'up' : 'down'">
            <drop-animation :toggled="inYears">
                <years slot="up" v-model="selectedYear" ref="years" />
                <drop-animation slot="down" :toggled="!inDays">
                    <months slot="up" 
                        v-model="selectedMonth"
                        :calendar="calendarDate"
                        :locale="locale" />
                    <days slot="down" 
                        ref="days" 
                        v-model="date" 
                        :calendar="calendarDate"
                        :locale="locale"/>
                </drop-animation>
            </drop-animation>
        </div>
    </div>
</template>

<script>
const CALENDAR_STATES = {
    'DAYS': 0,
    'MONTHS': 1,
    'YEARS': 2
}
const { DateTime } = require('luxon')

import DropAnimation from './DropAnimation'
import CalendarMonths from './CalendarMonths'
import Years from './CalendarPagesYears'
import HorSelector from './HorSelector'
import Days from './CalendarPagesDays'
import Months from './Months'
export default {
    components: {DropAnimation, CalendarMonths, Years, HorSelector, Days, Months},
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
        },
        maxYear: {
            type: Number,
            default: () => new Date().getFullYear()
        },
        minYear: {
            type: Number,
            default: () => new Date().getFullYear() - 100
        }
    },
    data: () => ({
        state: CALENDAR_STATES.DAYS,
        moveDisabled: false,
        innerValue: null,
        innerCalendar: DateTime.fromJSDate(new Date())
    }),
    computed: {
        inDays () { return this.state === CALENDAR_STATES.DAYS },
        inMonths () { return this.state === CALENDAR_STATES.MONTHS },
        inYears () { return this.state === CALENDAR_STATES.YEARS },
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
        selectedYear: {
            get () { return this.calendarDate.year },
            set (value) { this.setYear(value) }
        },
        displayMonth () { return this.calendarDate.toFormat('LLLL yyyy') },
        displayYear () { return this.calendarDate.toFormat('yyyy') }
    },
    methods: {
        nextState () {
            this.state = this.inDays
            ? CALENDAR_STATES.MONTHS 
            : this.inMonths
            ? CALENDAR_STATES.YEARS 
            : CALENDAR_STATES.DAYS
        },
        move (direction) {
            if (this.inDays) {
                this.moveMonth(direction)
            } else if (this.inMonths) {
                this.moveYear(direction)
            } else if (this.inYears) {
                this.moveYearsPage(direction)
            }
        },
        setMonth (month) {
            this.months = false
            let date = this.calendarDate
            let year = date.year
            if (month === date.month) return
            this.calendarDate = DateTime.fromObject({ year, month, day: 1 }).setLocale(this.locale)
            this.state = CALENDAR_STATES.DAYS
        },
        setYear (year) {
            this.years = false
            let date = this.calendarDate
            if (year === date.year) return
            let month = date.month
            this.calendarDate = DateTime.fromObject({ year, month, day: 1 }).setLocale(this.locale)
            this.state = CALENDAR_STATES.MONTHS
        },
        moveMonth (months) {
            this.calendarDate = this.calendarDate.plus({months})
            this.$refs.days && this.$refs.days.slide(months > 0 ? 'left' : 'right')
        },
        moveYear(years) {
            this.calendarDate = this.calendarDate.minus({years})
        },
        moveYearsPage (pages) {
            let years = this.$refs.years
            if (!years) return
            if (pages < 0 && years.baseYear >= this.maxYear) return
            else if (pages > 0 && years.baseYear <= this.minYear) return
            this.$refs.years.slide(-pages)
        }
    }
}
</script>

<style>
.calendars {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--padding-m);
}
.calendar__state-toggle {
    width: 100%;
}
</style>

