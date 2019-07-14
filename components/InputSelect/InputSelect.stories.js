import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import InputSelect from './InputSelect'
import InputOptions from './InputOptions'
import InputToggle from './InputToggle'

const style = 'max-width:400px'

export const InputMethods = {
    onInput: action('input')
}
const items = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

storiesOf('InputSelect', module)
  .add('list of text', () => ({
    components: { InputSelect },
    template: `<input-select 
    label="Day of the week" 
    :options="items" 
    @input="onInput" 
    style="${style}" />`,
    data: () => ({
        items
    }),
    methods: InputMethods
  }))
  .add('few options', () => ({
    components: { InputOptions },
    template: `<input-options 
    label="Weekend days" 
    :options="items" 
    @input="onInput" 
    style="${style}" />`,
    data: () => ({
        items: ['Friday', 'Saturday', 'Sunday']
    }),
    methods: InputMethods
  }))
  .add('two options', () => ({
    components: { InputToggle },
    template: `
    <input-toggle 
      label="Weekday" 
      @input="onInput" 
      v-model="value"
      style="${style}">
      <span>
      {{value ? 'Yes' : 'No'}}
      </span>
    </input-toggle>
      `,
    data: () => ({
        value: false
    }),
    methods: InputMethods
  }))