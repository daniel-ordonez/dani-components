import { storiesOf } from '@storybook/vue'
import DoCard from '../components/UI/DoCard'
import DoLayout from '../components/UI/DoLayout'
import DoBtn from '../components/UI/DoBtn'
import 'boxicons'

storiesOf('Card', module)
  .add('Card', () => ({
    components: { DoBtn, DoLayout, DoCard },
    template: `
    <do-layout class="flex-column flex-center-xy bg-color-app pa-a-m">
      <do-card style="max-width: 300px;">
        <div class="card-title">
            Manarola, Italy
        </div>
        <div class="card-content">
            Manarola is a small town, a frozione of the comune of Riomaggiore, in the province of La Spezia,
            Liguria, northem Italy, it is he second-smallest of the famous Cinque Terre.
        </div>
        <div class="card-actions" right>
            <do-btn text ripple>
                cancel
            </do-btn>
            <do-btn class="primary" ripple>
                accept
            </do-btn>
        </div>
      </do-card>


      <do-card style="width: 300px;" outline>
        <div class="card-media bg-color-grey">
            <div style="height: 150px; 
                width: 100%; 
                display: flex; 
                justify-content: center; 
                align-items: center;
            ">
                <i class='bx bx-image bx-lg'></i>
            </div>
        </div>
        <div class="card-actions pa-a-0" space-between>
            <do-btn text ripple class="mono">
                <i class='bx bx-chevron-left bx-sm'></i>
            </do-btn>
            <do-btn text ripple class="mono">
                <i class='bx bx-chevron-right bx-sm'></i>
            </do-btn>
        </div>
      </do-card>
    </do-layout>
    `,
    data: () => ({
    }),
    methods: {
    }
  }))