import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import InputFile from './InputFile'
import InputFilePreviewCard from './InputFilePreviewCard'
import InputFileButton from './InputFileButton'

const containerStyle = `
max-width: 400px;
height: 400px;
max-height: 400px;
`
const placeholderImgs = [
  'https://via.placeholder.com/300?text=Image+1',
  'https://via.placeholder.com/300?text=Image+2'
]

const savedRefs = {}

const mockUpload = async () => {
  let inputFile = savedRefs.progress
  console.log(inputFile)
  if (inputFile) {
    let cards = inputFile.$refs.preview
    if (cards && cards.length) {
      let uploads = []
      cards.map(card => {
        let p = new Promise(resolve => {
          card.progressStatus = 0
          let interval = setInterval(() => {
            card.progressStatus += 10
            if (card.progressStatus >= 100) {
              clearInterval(interval)
              resolve()
            }
          }, Math.random() * 500)
        })
        uploads.push(p)
      })
      await Promise.all(uploads)
      action('input')('upload complete')
    }
  }
}

storiesOf('InputFile', module)
  .add('button', () => ({
    components: { InputFileButton },
    template:
    `<div style="${containerStyle}">
      <input-file-button class="btn">
        Upload file
      </input-file-button>
    </div>
    `,
    data: () => ({
      preview: { size: true }
    })
  }))
  .add('single', () => ({
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
  .add('append', () => ({
    components: { InputFile, InputFilePreviewCard },
    template:
    `<div style="${containerStyle}">
      <input-file 
        icon="plus"
        uploadText="add files"
        multiple
        label="Files">
        <template slot="prepend">
          <input-file-preview-card
            v-for="(src, index) in pi" :key="index"
            title="Image">
            <img style="max-height: 150px;" slot="preview" :src="src"/>
          </input-file-preview-card>
        </template>
      </input-file>
    </div>
    `,
    data: () => ({
      pi: placeholderImgs
    })
  }))
  .add('progress', () => ({
    components: { InputFile },
    template:
    `<div style="${containerStyle}">
      <div style="width: 100%; display: flex; justify-content:center; padding: var(--padding-m);">
        <button 
          class="btn" 
          @click.stop="mockUpload" >
          upload
        </button>
      </div>
      <input-file 
        icon="plus"
        uploadText="add files"
        multiple  />
    </div>
    `,
    data: () => ({
      mockUpload
    }),
    mounted () {
      savedRefs.progress = this.$children[0]
    }
  }))