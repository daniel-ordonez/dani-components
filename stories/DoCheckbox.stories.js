import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import DoLayout from '../components/UI/DoLayout'
import DoCheckbox from '../components/UI/DoCheckbox'
import 'boxicons'


export const InputMethods = {
    onInput: action('input')
  }

storiesOf('Checkbox', module)
  .add('Checkbox', () => ({
    components: { DoCheckbox, DoLayout },
    template: `
    <do-layout class="flex-column flex-center-xy bg-color-app pa-a-l">
      <do-checkbox label="checkbox"/>
      <do-checkbox class="round" label="checkbox"/>
      <do-checkbox label="checkbox" icon="check" @input="onInput"/>
    </do-layout>
    `,
    methods: InputMethods
  }))