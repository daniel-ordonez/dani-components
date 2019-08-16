import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import DoLayout from '../components/UI/DoLayout'
import DoPagination from '../components/UI/DoPagination'

export const InputMethods = {
    onInput: action('input')
  }
  
  storiesOf('Pagination', module)
    .add('Pagination', () => ({
      components: { DoPagination, DoLayout },
      template: `
      <do-layout class="flex-column flex-center-xy bg-color-app pa-a-l">
        <do-pagination :pages="pages" v-model="page" @input="onInput">
            {{page}}
        </do-pagination>
      </do-layout>
      `,
      data: () => ({
          pages: 10,
          page: 3
      }),
      methods: {
        ...InputMethods,
      }
    }))