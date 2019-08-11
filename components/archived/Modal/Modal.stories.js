import { storiesOf } from '@storybook/vue'
import Modal from './Modal'

storiesOf('Modal', module)
.add('Button trigger', () => ({
    components: { Modal },
    template: `
    <div>
        <button @click.stop="modal = true" class="btn">Trigger</button>
        <modal v-model="modal">
            <div class="card">
                <div class="card__body">
                    Hi from Modal :)
                </div>
            </div>
        </modal>
    </div>`,
    data: () => ({
      modal: false
    })
  }))