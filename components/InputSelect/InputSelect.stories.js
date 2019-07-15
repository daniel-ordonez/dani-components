import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import InputSelect from './InputSelect'
import InputCombo from './InputCombo'
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
const items2 = [
  {label: 'Monday', value: 1},
  {label: 'Tuesday', value: 2},
  {label: 'Wednesday', value: 3},
  {label: 'Thursday', value: 4},
  {label: 'Friday', value: 5},
  {label: 'Saturday', value: 6},
  {label: 'Sunday', value: 7}
]

storiesOf('InputSelect', module)
  .add('list of text', () => ({
    components: { InputSelect },
    template: `<input-select 
    label="Day of the week" 
    v-model="value" 
    :options="items" 
    @input="onInput" 
    style="${style}" />`,
    data: () => ({
        items,
        value: null
    }),
    methods: InputMethods
  }))
  .add('combo box', () => ({
    components: { InputCombo },
    template: `
    <div style="display: flex; flex-direction: column;">
      <input-combo 
        label="Using string"
        v-model="value" 
        :options="items" 
        @input="onInput" 
        style="${style}" />
      <input-combo 
        label="Using objects"
        v-model="value2" 
        :options="items2" 
        @input="onInput" 
        style="${style}" />
    </div>
    `,
    data: () => ({
        items,
        items2,
        value: null,
        value2: null
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