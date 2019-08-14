import { storiesOf } from '@storybook/vue'
import DoLayout from '../components/UI/DoLayout'
import DoInputText from '../components/DoInputText/DoInputText'
import DoBtn from '../components/UI/DoBtn'
import 'boxicons'

storiesOf('input text', module)
    .add('input text', () => ({
        components: {DoLayout, DoInputText, DoBtn},
        template: `
        <do-layout class="flex-column flex-center-xy pa-a-m">
            <do-input-text label="input text" class="round">
                <i slot="append" class='bx bx-search bx-xs'></i>
            </do-input-text>
            <do-input-text label="input text" class="round" clear>
                <do-btn slot="prepend" class="mono round" flat ripple>
                    <i  class='bx bxs-microphone-alt bx-xs'></i>
                </do-btn>
            </do-input-text>
        </do-layout>
        `
    }))