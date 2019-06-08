import { storiesOf } from '@storybook/vue'
import DataTable from './DataTable'
import DtTh from './DtTh'

const style = `
grid-template-columns: repeat(2, auto);
`

const daysOfWeek = [
  {name: 'Monday', value: 1},
  {name: 'Tuesday', value: 2},
  {name: 'Wensday', value: 3},
  {name: 'Thursday', value: 4},
  {name: 'Friday', value: 5},
  {name: 'Saturday', value: 6},
  {name: 'Sunday', value: 7}
]

const sortFunction = order  => {
  console.log(order)
  daysOfWeek.sort((a, b) => order * (a.value - b.value))
}

storiesOf('DataTable', module)
  .add('Weekdays', () => ({
    components: { DataTable, DtTh },
    template: `
    <data-table style="${style}">
      <thead>
        <th>#</th>
        <dt-th sort @click="sortFunction(order); order *= -1">Days</dt-th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items">
          <td>{{item.value}}</td>
          <td>{{item.name}}</td>
        </tr>
      </tbody>
    </data-table>`,
    data: () => ({
      items: daysOfWeek,
      sortFunction,
      order: 1
    })
  }))