import { storiesOf } from '@storybook/vue'
import InputFile from './InputFile'
import InputFilePreviewCard from './InputFilePreviewCard'

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
      <input-file label="File" :preview="preview"/>
    </div>
    `,
    data: () => ({
      preview: { size: true }
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
  .add('custom', () => ({
    components: { InputFile, InputFilePreviewCard },
    template:
    `<div style="${containerStyle}">
      <input-file 
        icon="plus"
        uploadText="Click to add more"
        multiple
        label="Files">
        <div slot="append">
          <input-file-preview-card
            title="Appended image">
            <img slot="preview" src="https://via.placeholder.com/150"/>
          </input-file-preview-card>
        </div>
      </input-file>
    </div>
    `,
    data: () => ({
    })
  }))