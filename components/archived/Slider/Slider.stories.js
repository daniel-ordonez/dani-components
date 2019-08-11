import { storiesOf } from '@storybook/vue'
import Slider from './Slider'

const style = "max-width: 400px; height: 400px; margin-left: auto; margin-right: auto;"
const images = [
  "https://via.placeholder.com/150/0000FF/808080?image1",
  "https://via.placeholder.com/150/FF0000/FFFFFF?image2",
  "https://via.placeholder.com/150/FFFF00/000000?image3",
  "https://via.placeholder.com/150/000000/FFFFFF?image4",
  "https://via.placeholder.com/150/FFFFFF/000000?image5"
]
storiesOf('Slider', module)
.add('single', () => ({
  components: { Slider },
  template: `
  <div style="${style}">
      <slider :images="images">
      </slider>
  </div>`,
  data: () => ({
    images: [images[0]]
  })
}))
.add('gallery', () => ({
    components: { Slider },
    template: `
    <div style="${style}">
        <slider :images="images">
        </slider>
    </div>`,
    data: () => ({
      images
    })
  }))