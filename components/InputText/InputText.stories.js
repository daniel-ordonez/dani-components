import { storiesOf } from '@storybook/vue'
import InputText from './InputText'
import InputTextarea from './InputTextarea'

storiesOf('InputText', module)
  .add('text', () => ({
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
  .add('textarea', () => ({
    components: { InputTextarea },
    template:
    `
      <input-textarea
        label="Name"
        id="input-text-name"
        clear
      />
    `,
    data: () => ({
    })
  }))