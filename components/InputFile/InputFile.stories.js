import { storiesOf } from '@storybook/vue'
import InputFile from './InputFile'
import InputFilePreviewCard from './InputFilePreviewCard'



storiesOf('InputFile', module)
  .add('simple', () => ({
    components: { InputFile },
    template:
    `
      <input-file/>
    `,
    data: () => ({
    })
  }))
  .add('multiple', () => ({
    components: { InputFile },
    template:
    `
      <input-file multiple/>
    `,
    data: () => ({
    })
  }))