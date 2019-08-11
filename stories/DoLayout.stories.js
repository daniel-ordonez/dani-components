import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import DoLayout from '../components/UI/DoLayout'
import DoBtn from '../components/UI/DoBtn'
import DoSidenav from '../components/UI/DoSidenav'
import 'boxicons'


storiesOf('Layout', module)
  .add('Layout', () => ({
    components: { DoLayout, DoSidenav, DoBtn },
    template: `
    <do-layout class="grid-app bg-color-app ">
        <do-sidenav class="flex-center-xy">
          <template slot="top">
            <do-btn class="mono round" text ripple>
                <i class='bx bx-user-circle bx-sm'></i>
            </do-btn>
          </template>
          
          <template>
          <do-btn class="mono round primary" text ripple>
              <i class='bx bxs-t-shirt bx-sm'></i>
          </do-btn>
          <do-btn class="mono round" text ripple>
              <i class='bx bx-package bx-sm'></i>
          </do-btn>
          <do-btn class="mono round" text ripple>
              <i class='bx bx-dollar-circle bx-sm'></i>
          </do-btn>
          <do-btn class="mono round" text ripple>
              <i class='bx bx-spreadsheet bx-sm'></i>
          </do-btn>
          </template>

          <template slot="bottom">
            <do-btn class="mono round" text ripple>
                <i class='bx bx-power-off bx-sm'></i>
            </do-btn>
          </template>
        </do-sidenav>
    </do-layout>
    `,
    mounted () {
      let root = document.getElementById("root")
      root.style.height = '100vh';
    }
  }))