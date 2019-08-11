import { storiesOf } from '@storybook/vue'
import InputText from './InputText'
import InputTextarea from './InputTextarea'

storiesOf('InputText', module)
  .add('text', () => ({
    components: { InputText },
    template:
    `
    <div style="display: flex; flex-direction: column;">
      <input-text
        ref="text"
        label="Text"
        v-model="text"
        id="input-text-text"
        clear
      />
      <input-text
        label="Text w/trim"
        v-model="textwtrim"
        id="input-text-text"
        trim
        clear
      />
      <button class="btn" @click="clearText">Clear text</button>
    </div>
    `,
    data: () => ({
      text: null,
      textwtrim: null
    }),
    methods: {
      clearText () {
        this.$refs.text.reset()
      }
    }
  }))
  .add('password', () => ({
    components: { InputText },
    template:
    `
    <div style="display: flex; flex-direction: column;">
      <input-text
        :type="type"
        label="Password"
        v-model="text"
        id="input-text-password"
        clear
      >
        <button class="btn btn--icon" slot="append" @click="toggle">
          <i v-if="type === 'password'" class='uil uil-eye'></i>
          <i v-else class='uil uil-eye-slash'></i>
        </button>
      </input-text>
      <input-text
        :type="type"
        validation="blur"
        label="Validate on blur"
        v-model="text"
        :rules="rules"
        placeholder="Use only numbers"
        id="input-text-password-vob"
        clear
      >
        <button class="btn btn--icon" slot="append" @click="toggle">
          <i v-if="type === 'password'" class='uil uil-eye'></i>
          <i v-else class='uil uil-eye-slash'></i>
        </button>
      </input-text>
      <input-text
        :type="type"
        validation="always"
        label="Validate on input"
        v-model="text"
        :rules="rules"
        placeholder="Use only numbers"
        id="input-text-password-voi"
        clear
      >
        <button class="btn btn--icon" slot="append" @click="toggle">
          <i v-if="type === 'password'" class='uil uil-eye'></i>
          <i v-else class='uil uil-eye-slash'></i>
        </button>
      </input-text>

      <input-text
        :type="type"
        validation="always"
        onValidated="success"
        label="Success state"
        v-model="text"
        :rules="rulesS"
        placeholder="Use at least 3 characters"
        id="input-text-password-s"
        clear
      >
        <button class="btn btn--icon" slot="append" @click="toggle">
          <i v-if="type === 'password'" class='uil uil-eye'></i>
          <i v-else class='uil uil-eye-slash'></i>
        </button>
      </input-text>
    </div>
    `,
    data: () => ({
      type: 'password',
      text: null,
      rules: [{
        f: str => !isNaN(str),
        m: 'Value must be a number (0-9)'
      }],
      rulesS: [{
        f: str => typeof str === 'string' && str.length >= 3,
        m: 'Value has at least 3 characters'
      }]
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
        label="Textarea"
        v-model="text"
        id="input-text-textarea"
        clear
      />
    `,
    data: () => ({
      text: null
    })
  }))