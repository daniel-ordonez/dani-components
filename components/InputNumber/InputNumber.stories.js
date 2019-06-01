import { storiesOf } from '@storybook/vue'
import InputNumber from './InputNumber'

storiesOf('InputNumber', module)
  .add('default', () => ({
    components: { InputNumber },
    template:
    `
      <input-number
        label="Number"
        id="input-number"
        clear
      />
    `,
    data: () => ({
    })
  }))
  .add('int', () => ({
    components: { InputNumber },
    template:
    `
      <input-number
        label="Number"
        id="input-number"
        int
        clear
      />
    `,
    data: () => ({
    })
  }))