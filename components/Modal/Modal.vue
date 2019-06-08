<template>
    <div class="modal">
        <transition-group name="modal">
            <template v-if="value">
                <div class="modal-screen" @click.stop="outside" key="modal-screen"/>
                <div class="modal-container" key="modal-container" >
                    <slot/>
                </div>
            </template>
        </transition-group>
    </div>
</template>

<script>
export default {
    props: {
        value: { type: Boolean,default: false }
    },
    mounted () {
        this.$el.addEventListener('click', event => event)
    },
    methods: {
        outside (event) {
            this.$emit('input', false)
        },
        beforeEnter (el) {
            el.classList.add('modal-enter')
            el.classList.add('modal-enter-active')
        },
        onEnter (el, done) {
            el.classList.add('modal-enter-to')
            el.classList.remove('modal-enter')
        },
        afterEnter (el) {
            el.classList.remove('modal-enter-active')
        }
    }
}
</script>


<style>
.modal-screen {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 20000;
    background: rgba(0,0,0,0.32);
}
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30000;
}
.modal-container>* {
    pointer-events: initial;
}

.modal-screen.modal-enter-active {
    transition: opacity ease .5s;
}
.modal-screen.modal-enter {
  opacity: 0;
}
.modal-screen.modal-enter-to {
  opacity: 1;
}

.modal-container.modal-enter-active {
    transition: opacity .3s ease, transform .5s cubic-bezier(0.250, 0.460, 0.450, 0.940);
}
.modal-container.modal-enter {
    opacity: 0;
    transform: translate(0, 50%);
}
.modal-container.modal-enter-to {
    transform: translate(0, 0);
    opacity: 1;
}


.modal-screen.modal-leave-active {
    transition: opacity ease .5s .2s;
}
.modal-screen.modal-leave {
  opacity: 1;
}
.modal-screen.modal-leave-to {
  opacity: 0;
}

.modal-container.modal-leave-active {
    transition: opacity .5s .2s ease, transform .5s .2s cubic-bezier(0.250, 0.460, 0.450, 0.940);
}
.modal-container.modal-leave-to {
    opacity: 0;
    transform: translate(0, 50%);
}
.modal-container.modal-leave {
    transform: translate(0, 0);
    opacity: 1;
}
</style>

