import { storiesOf } from '@storybook/vue'
import CollapseHor from './CollapseHor'
import CollapseVer from './CollapseVer'

const style = "max-width: 400px; height: 400px; margin-left: auto; margin-right: auto;"

storiesOf('Collapse', module)
.add('Horizontal', () => ({
  components: { CollapseHor },
  template: `
  <div style="${style}">
      <div style="display: flex; justify-content: center; padding: 1em;">
        <button @click="toggled = !toggled">Toggle</button>
        <collapse-hor v-model="toggled">Horizontal collapse</collapse-hor>
      </div>
  </div>`,
  data: () => ({
    toggled: false
  })
}))
.add('Vertical', () => ({
    components: { CollapseVer },
    template: `
    <div style="${style}">
        <div style="display: flex; flex-direction: column; padding: 1em; align-items: center;">
          <button @click="toggled = !toggled">Toggle</button>
          <collapse-ver v-model="toggled">Vertical collapse</collapse-ver>
        </div>
    </div>`,
    data: () => ({
      toggled: false
    })
  }))