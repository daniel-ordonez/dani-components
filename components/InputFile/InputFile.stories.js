import { storiesOf } from '@storybook/vue'
import InputFile from './InputFile'


const containerStyle = `
max-width: 400px;
height: 400px;
max-height: 400px;
`

storiesOf('InputFile', module)
  .add('simple', () => ({
    components: { InputFile },
    template:
    `<div style="${containerStyle}">
      <input-file label="File"/>
    </div>
    `,
    data: () => ({
    })
  }))
  .add('multiple', () => ({
    components: { InputFile },
    template:
    `<div style="${containerStyle}">
      <input-file 
        multiple
        label="Files"/>
    </div>
    `,
    data: () => ({
    })
  }))