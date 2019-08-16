<template>
    <div class="do-pagination">
        <div class="pagination-label">
            <slot/>
        </div>
        <div class="pagination-buttons">
            <template v-for="(page, index) in buttons">
                <do-btn v-if="page" class="mono" :key="index"
                ripple
                    :class="{'accent': activePage === parseInt(page)}" 
                    @click="activePage = page"
                >
                    {{page}}
                </do-btn>
                <span v-else :key="index">{{'...'}}</span>
            </template>
        </div>
    </div>
</template>

<script>
    import DoBtn from './DoBtn'
    export default {
        name: 'do-pagination',
        components: {DoBtn},
        props: {
            value: { type: Number, default: 0 },
            pages: { type: Number, default: 0, validator: n => n >= 0 },
            limit: { type: Number, default: 7, validator: n => n >= 5}
        },
        data: () => ({
            buttons: []
        }),
        beforeMount () {
            this.updateButtons()
        },
        watch: {
            pages (value) { this.updateButtons() },
            activePage (value) { this.updateButtons() }
        },
        computed: {
            label () { return '' },
            activePage: {
                get () { return this.value },
                set (value) { this.$emit('input', value) }
            }
        },
        methods: {
            updateButtons () {
                let {pages, limit, activePage} = this
                console.log({pages, limit, activePage})
                if (pages > limit) { //overflow
                    let firstLimit = Math.floor(limit / 2)
                    let lastLimit = pages - firstLimit + 1
                    if (activePage === firstLimit) {//check if it's in the first half
                        let values = []
                        for(let i = 0; i < limit - 2; i++) {
                            values.push(i + 1)
                        }
                        this.buttons = [...values, null, pages]
                    } else if (activePage > firstLimit && activePage < lastLimit) {//check if it's in the last half
                        let values = []
                        let chunk = Math.floor((Math.floor(limit / 2) - 1) / 2)
                        for(let i = 0; i < limit - 4; i++) {
                            values.push((activePage - chunk) + i)
                        }
                        this.buttons = [1,null,...values,null,pages]
                    } else if (activePage === lastLimit) {
                        let values = []
                        for(let i = 0; i < limit - 2; i++) {//check if it's in the last half
                            values.push(i + (pages - (limit - 3)))
                        }
                        this.buttons = [1, null, ...values]
                    } else {
                        let firstHalf = []
                        for(let i = 1; i <= firstLimit; i++) {
                            firstHalf.push(i)
                        }
                        let lastHalf = []
                        for(let i = 1; i <= firstLimit; i++) {
                            lastHalf.push(i + (pages - firstLimit))
                        }
                        this.buttons = [...firstHalf, null, ...lastHalf]
                    } 
                } else {
                    let values = []
                    for(let i = 1; i <= pages; i++) {
                        values.push(i)
                    }
                    this.buttons = values
                }
            }
        }
    }
</script>

<style>
.do-pagination {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.do-pagination .pagination-label {
    margin-bottom: var(--padding-s);
}
.do-pagination .pagination-label:empty {
    margin-bottom: 0;
}
.do-pagination .pagination-buttons {
    display: flex;
    justify-content: center;
}
.pagination-buttons {
    --button--bg-color: var(--pagination--button--bg-color, white);
}
.pagination-buttons>* {
    margin: 0 calc(var(--padding-s) / 2);
}
</style>