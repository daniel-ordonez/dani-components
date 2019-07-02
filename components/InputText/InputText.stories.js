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
        id="input-text-text"
        clear
      />
    `,
    data: () => ({
    })
  }))
  .add('password', () => ({
    components: { InputText },
    template:
    `
      <input-text
        :type="type"
        label="Name"
        id="input-text-password"
        clear
      >
        <button class="btn btn--icon" slot="append" @click="toggle">
          <i v-if="type === 'password'" class='uil uil-eye'></i>
          <i v-else class='uil uil-eye-slash'></i>
        </button>
      </input-text>
    `,
    data: () => ({
      type: 'password'
    }),
    methods: {
      toggle () {
        this.type = this.type === 'text' ? 'password' : 'text'
      }
    }
  }))
  .add('textarea', () => ({
    components: { InputTextarea },
    template:
    `
      <input-textarea
        label="Name"
        id="input-text-textarea"
        clear
      />
    `,
    data: () => ({
    })
  }))