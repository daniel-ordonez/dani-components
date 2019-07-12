import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import InputSelect from './InputSelect'
import InputOptions from './InputOptions'

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
    :items="items" 
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