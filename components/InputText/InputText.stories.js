import { storiesOf } from '@storybook/vue'
import InputText from './InputText'

storiesOf('InputText', module)
  .add('default', () => ({
    components: { InputText },
    template:
    `
      <input-text
        label="Name"
        id="input-text-name"
        clear
      />
    `,
    data: () => ({
    })
  }))