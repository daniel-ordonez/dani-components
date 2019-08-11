<template>
    <div class="calendar-days">
        <div class="day-slot--weekday" v-for="(dayName, index) in weekdays" :key="index">
            {{dayName}}
        </div>
        <div class="day-slot" v-for="(day, index) in monthDays" :key="`slot-${index}`">
            <button v-if="day" @click="setDate(day)" class="btn btn--icon day-slot__btn"
                :current="inCurrentMonth && day === today"
                :selected="inDateMonth && day === date.day">
                <span>
                {{day}}
                </span>
            </button>
        </div>
    </div>
</template>

<script>
const { DateTime, Info } = require('luxon')
export default {
    props: {
        value: {
            type: Object,
            default: () => null,
            validator: value => value instanceof DateTime
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
        weekdays: [],
        monthDays: []
    }),
    computed: {
        date: {
            get () { return this.value instanceof DateTime ? this.value : this.content },
            set (value) { this.$emit('input', value); this.content = value }
        },
        calendarDate () { return this.calendar.setLocale(this.locale) },
        inDateMonth () {
            let date = this.date
            let calendar = this.calendarDate
            return date && date.year === calendar.year && date.month === calendar.month
        },
        inCurrentMonth () {
            let date = new Date()
            let currentYear = date.getFullYear() === this.calendarDate.year
            let currentMonth = date.getMonth() + 1 === this.calendarDate.month
            return currentYear && currentMonth
        },
        today () { return new Date().getDate() }
    },
    watch: {
        locale (locale) {
            this.weekdays = Info.weekdays('narrow', { locale })
        },
        calendarDate (value) {
            this.fillCalendar()
        }
    },
    mounted () {
        this.weekdays = Info.weekdays('narrow', { locale: this.locale })
        this.fillCalendar()
    },
    methods: {
        setDate (day) {
            let year = this.calendarDate.year
            let month = this.calendarDate.month
            this.date = DateTime.fromObject({year, month, day}).setLocale(this.locale)
        },
        fillCalendar () {
            let year = this.calendarDate.year
            let month = this.calendarDate.month
            let date = DateTime.fromObject({year, month, day: 1}).setLocale(this.locale)
            let firstDay = date.weekday
            let daysInMonth = date.daysInMonth
            let d = 1
            this.monthDays = []
            for(let i = 1; i <= 42; i++) {
                if (i < firstDay ||  i > daysInMonth + firstDay - 1) this.monthDays.push(null)
                else {
                    this.monthDays.push(d)
                    d++
                }

            }
            this.$emit('daysUpdated', this.calendarDate.toLocaleString(DateTime.DATE_FULL))
        }
    }
}
</script>

<style>
.calendar-days {
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, minmax(var(--unit, 2em), .142fr));
    grid-template-rows: repeat(6, minmax(var(--unit, 2em), .142fr));
    position: relative;
}
.day-slot {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
}
.day-slot--weekday {
    align-self: center;
}
.day-slot__btn[current] {
    --color-bg: var(--color-bg--shade-1);
    background: var(--button--bg);
}
.day-slot__btn[current]:hover {
    --color-bg: var(--color-bg--shade-2);
}
.day-slot__btn[selected] {
    --color-bg: var(--color-primary);
    background: var(--button--bg);
    --button--hover--bg: var(--color-primary--light-2);
    --button--active--bg: var(--color-primary--shade-2);
    --color-bg--contrast: var(--color-primary--contrast);
}
</style>
