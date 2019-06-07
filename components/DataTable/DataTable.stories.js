import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import DataTable from './DataTable'

storiesOf('DataTable', module)
  .add('default', () => ({
    components: { DataTable },
    template: `<data-table />`,
    data: () => ({})
  }))