import { storiesOf } from '@storybook/vue'
import Slider from './Slider'

const style = "max-width: 400px; height: 400px;"
const images = [
    "https://firebasestorage.googleapis.com/v0/b/luvinv-app.appspot.com/o/db-v020-stock-images%2FMLZtUOG7NORvHuxKu9Kt%2F8iNjwEu.jpg?alt=media&token=ede31e13-e2b5-4fd4-bcc2-a04044554a6a",
    "https://firebasestorage.googleapis.com/v0/b/luvinv-app.appspot.com/o/db-v020-stock-images%2FMLZtUOG7NORvHuxKu9Kt%2FLQE30R2.jpg?alt=media&token=e0e64b9e-87b4-4dce-a93e-15d8377deaf3",
    "https://firebasestorage.googleapis.com/v0/b/luvinv-app.appspot.com/o/db-v020-stock-images%2FMLZtUOG7NORvHuxKu9Kt%2FDKI1cdv.jpg?alt=media&token=75f71a01-9be8-4581-a818-086cae6019d7",
    "https://firebasestorage.googleapis.com/v0/b/luvinv-app.appspot.com/o/db-v020-stock-images%2FMLZtUOG7NORvHuxKu9Kt%2F5hscUwU.jpg?alt=media&token=4a94da01-be05-4de4-9231-4a74629d7679"
]
storiesOf('Slider', module)
.add('slider', () => ({
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