<template>
    <div class="calendar-pages-days" :transition-direction="direction">
        <transition name="slide-x">
            <keep-alive>
                <days v-if="pageA" key="pageA" v-model="date" 
                    :locale="locale" 
                    :calendar="calendar"
                    @daysUpdated="d => $emit('calendarUpdated', d)"/>
                <days v-else key="pageB" v-model="date" 
                    :locale="locale" 
                    :calendar="calendar"
                    @daysUpdated="d => $emit('calendarUpdated', d)"/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
const { DateTime } = require('luxon')
import Days from './Days'
export default {
    components: {Days},
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
        pageA: true,
        direction: 'left'
    }),
    computed: {
        date: {
            get () { return this.value },
            set (value) { this.$emit('input', value) }
        }
    },
    methods: {
        slide (direction) {
            console.log(`slide ${direction}`)
            this.pageA = !this.pageA
            this.direction = direction
        }
    }
}
</script>

<style>
.calendar-pages-days {
    width: 100%;
    position: relative;
}
</style>
