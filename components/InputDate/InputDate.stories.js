import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import Days from './calendar/Days'
import Months from './calendar/Months'
import Years from './calendar/Years'
import Calendar from './calendar/Calendar'
import InputDate from './InputDate'

const style = 'max-width:400px'

export const InputMethods = {
    onInput: action('input')
}

storiesOf('InputDate', module)
  .add('days', () => ({
    components: { Days },
    template: `<days @input="onInput" style="${style}" />`,
    data: () => ({}),
    methods: InputMethods
  }))
  .add('months', () => ({
    components: { Months },
    template: `<months @input="onInput" style="${style}" />`,
    data: () => ({}),
    methods: InputMethods
  }))
  .add('years', () => ({
    components: { Years },
    template: `<years @input="onInput" style="${style}" />`,
    data: () => ({}),
    methods: InputMethods
  }))
  .add('calendar', () => ({
    components: { Calendar },
    template: `<calendar @input="onInput" style="${style}" />`,
    data: () => ({}),
    methods: InputMethods
  }))
  .add('Input Date', () => ({
    components: { InputDate },
    template: `<input-date @input="onInput" style="${style}" />`,
    data: () => ({}),
    methods: InputMethods
  }))