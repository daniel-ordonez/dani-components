import { storiesOf } from '@storybook/vue'
import InputNumber from './InputNumber'

storiesOf('InputNumber', module)
  .add('float', () => ({
    components: { InputNumber },
    template:
    `
      <input-number
        v-model="n"
        label="Number"
        id="input-number"
        clear
      />
    `,
    data: () => ({
      n: null
    })
  }))
  .add('int', () => ({
    components: { InputNumber },
    template:
    `
      <input-number
        v-model="n"
        label="Number"
        id="input-number"
        int
        clear
      />
    `,
    data: () => ({
      n: null
    })
  }))
  .add('currency', () => ({
    components: { InputNumber },
    template:
    `
      <input-number
        v-model="n"
        label="Number"
        id="input-number"
        :decimals="2"
        clear
      ><span slot="prepend">$</span>
      </input-number>
    `,
    data: () => ({
      n: null
    })
  }))