<template>
    <div class="calendar-years">
        <div class="year-slot" v-for="(year, index) in years" :key="index">
            <div v-if="year > maxYear || year < minYear"
                class="year-slot__btn--disabled">
                <span>{{year}}</span>
            </div>
            <button v-else @click="setYear(year)" 
                class="btn year-slot__btn"
                :current="year === currentYear"
                :selected="year === selectedYear">
                {{year}}
            </button>
        </div>
    </div>
</template>

<script>
export default {
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
        baseYear: {
            type: Number,
            default: () => new Date().getFullYear()
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
        years: []
    }),
    watch: {
        baseYear (baseYear) {
            console.log(baseYear)
            this.fillPage()
        }
    },
    computed: {
        selectedYear: {
            get () { return this.value ? this.value : this.content },
            set (value) { this.$emit('input', value); this.content = value }
        },
        currentYear () { return new Date().getFullYear() }
    },
    mounted () {
        this.fillPage()
    },
    methods: {
        fillPage () {
            let year = this.baseYear
            let yearsPerRow = this.yearsPerRow
            let pad = yearsPerRow - (year % yearsPerRow)
            let initialYear = year + pad - 1
            let yearsDisplayed = this.yearsPerPage
            this.years = []
            for (let i = 0; i < yearsDisplayed; i++) {
                this.years.push(initialYear - i)
            }
            this.$emit('yearsUpdated', this.years)
            console.log(this.years)
        },
        setYear (year) {
            this.selectedYear = year
        }
        
    }
}
</script>

<style>
.calendar-years {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
.year-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3em;
}
.year-slot__btn--disabled {
    opacity: 0.5;
    padding: var(--button--padding);
}
.year-slot__btn {
    width: 100%;
    text-align: center;
}
.year-slot__btn[current] {
    --color-bg: var(--color-bg--shade-1);
    background: var(--button--bg);
}
.year-slot__btn[current]:hover {
    --color-bg: var(--color-bg--shade-2);
}
.year-slot__btn[selected] {
    --color-bg: var(--color-primary);
    background: var(--button--bg);
    --button--hover--bg: var(--color-primary--light-2);
    --button--active--bg: var(--color-primary--shade-2);
    --color-bg--contrast: var(--color-primary--contrast);
}
</style>
