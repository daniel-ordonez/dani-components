import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import DoLayout from '../components/UI/DoLayout'
import DoTable from '../components/DoTable/DoTable'
import 'boxicons'

export const InputMethods = {
  onInput: action('input')
}

storiesOf('Table', module)
  .add('Table', () => ({
    components: { DoTable, DoLayout },
    template: `
    <do-layout class="flex-column flex-center-xy bg-color-app pa-a-l">
      <do-table 
        :columns="columns" 
        :data="data" 
        v-model="selected" 
        selection="multiple"
        @select="onInput"
      >
      </do-table>
    </do-layout>
    `,
    data: () => ({
        selected: [],
        columns: [
            { name: 'i', label: '#', align: 'center' },
            { name: 'name', size: 'minmax(auto, 250px)' },
            { name: 'calories' },
            { name: 'fat' },
            { name: 'carbs' },
            { name: 'protein' },
            { name: 'sodium' },
            { name: 'calcium' },
            { name: 'iron' }
        ],
        items: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                sodium: 87,
                calcium: '14%',
                iron: '1%'
            },
            {
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
              sodium: 129,
              calcium: '8%',
              iron: '1%'
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              sodium: 337,
              calcium: '6%',
              iron: '7%'
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              sodium: 413,
              calcium: '3%',
              iron: '8%'
            },
            {
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
              sodium: 327,
              calcium: '7%',
              iron: '16%'
            },
        ]
    }),
    computed: {
        data () { return this.items.map((v, i) => ({i: i + 1, ...v}))}
    },
    methods: {
      ...InputMethods,
    }
  }))