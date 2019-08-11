import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import DoLayout from '../components/UI/DoLayout'
import DoBtn from '../components/UI/DoBtn'
import DoSelectBtn from '../components/DoSelect/DoSelectBtn'
import 'boxicons'


export const InputMethods = {
    onInput: action('input')
}

storiesOf('Button', module)
.add('Select Button', () => ({
  components: { DoSelectBtn, DoLayout },
  template: `
    <do-layout class="flex-center-xy pa-a-m">
      <do-select-btn 
        ripple
        placeholder="Day of the week"
        :options="dow"
        :label-function="formatLabel"
      >
      </do-select-btn>
    </do-layout>
    `,
    data: () => ({
      dow: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      formatLabel: v => `Day: ${v}`
    })
}))
  .add('Button', () => ({
    components: { DoBtn, DoLayout },
    template: `
    <do-layout class="flex-column">
      <do-btn @click="toggleDark" ripple>toggle dark</do-btn>
      <do-layout class="grid-auto-fill pa-a-m" style="--max-col-w: 120px;" :class="{dark}">
          <do-btn>default</do-btn>
          <do-btn ripple>ripple</do-btn>
          <do-btn text ripple>text</do-btn>
          <do-btn disabled>disabled</do-btn>
          <do-btn class="primary" ripple>Primary</do-btn>
          <do-btn class="danger" ripple>Danger</do-btn>
          <do-btn class="success" ripple>Success</do-btn>
          <do-btn class="warning" ripple>warning</do-btn>
          <do-btn class="accent" ripple>accent</do-btn>
          <do-btn class="info" ripple>info</do-btn>
          <do-btn class="secondary" ripple>secondary</do-btn>
          <do-btn class="primary" text ripple>Primary</do-btn>
          <do-btn class="danger" text ripple>Danger</do-btn>
          <do-btn class="success" text ripple>Success</do-btn>
          <do-btn class="warning" text ripple>warning</do-btn>
          <do-btn class="accent" text ripple>accent</do-btn>
          <do-btn class="info" text ripple>info</do-btn>
          <do-btn class="secondary" text ripple>secondary</do-btn>
          <div class="grid-column">
            <do-btn ripple class="mono">
              <i class='bx bx-chevron-left bx-sm'></i>
            </do-btn>
            <do-btn ripple class="mono accent">1</do-btn>
            <do-btn ripple class="mono">
              <i class='bx bx-chevron-right bx-sm'></i>
            </do-btn>
            <do-btn ripple text class="mono round primary">
              <i class='bx bxs-like bx-tada bx-sm'></i>
            </do-btn>
            <do-btn ripple  class="mono round secondary">
              <i class='bx bx-cloud-upload bx-fade-up-hover bx-sm'></i>
            </do-btn>
          </div>
      </do-layout>
    </do-layout>
    `,
    data: () => ({
      dark: false
    }),
    methods: {
      ...InputMethods,
      toggleDark () {
        this.dark = !this.dark
      }
    }
  }))