<template>
    <div class="calendar-pages-years" :transition-direction="direction">
        <transition name="slide-x">
            <keep-alive>
                <years v-if="pageA" key="pageA" 
                    :yearsPerPage="yearsPerPage"
                    :yearsPerRow="yearsPerRow"
                    :maxYear="maxYear"
                    :minYear="minYear"
                    :baseYear="baseYear"
                    v-model="selectedYear" />
                <years v-else key="pageB" 
                    :yearsPerPage="yearsPerPage"
                    :yearsPerRow="yearsPerRow"
                    :maxYear="maxYear"
                    :minYear="minYear"
                    :baseYear="baseYear"
                    v-model="selectedYear" />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
const { DateTime } = require('luxon')
import Years from './Years'
export default {
    components: {Years},
    props: {
        value: {
            type: Number,
            default: null
        },
        yearsPerPage: {
            type: Number,
            default: 25,
            validator: n => n >= 0
        },
        yearsPerRow: {
            type: Number,
            default: 5,
            validator: n => n >= 0
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
        content: null,
        pageA: true,
        direction: 'left',
        page: 0,
    }),
    computed: {
        selectedYear: {
            get () { return this.value ? this.value : this.content },
            set (value) {
                this.$emit('input', value); 
                this.content = value
                this.page = 0
            }
        },
        baseYear () {
            return (this.selectedYear || this.maxYear) + (this.page * this.yearsPerPage)
        }
    },
    methods: {
        slide (pages) {
            this.page += pages
            this.pageA = !this.pageA
            this.direction = pages < 0 ? 'left' : 'right'
        }
    }
}
</script>

<style>
.calendar-pages-years {
    width: 100%;
    position: relative;
}
</style>
