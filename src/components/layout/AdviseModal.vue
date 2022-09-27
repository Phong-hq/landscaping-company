<template>
    <div class="fixed top-0 bottom-0 right-0 left-0 over z-[1000] bg-[#00000066] custom-modal" :class=" visible ? 'opacity-[1]' : 'pointer-events-none opacity-0 delay-[0.15s]' ">
        <div class="absolute w-full h-full" @click="close"></div>
        <div class="delay-100 duration-[0.15s] ease-out flex flex-col modal"
            :class=" {'visible' : visible}">
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, onUnmounted} from 'vue';
</script>

<style lang="scss">
    .custom-modal{
        width: 100%;
        height: 100%;
        .modal{
            // border-radius: 20px;
            border-radius: 8px;
            overflow: hidden;
            z-index: 1000;
            min-width: 520px;
            max-height: 80%;
            max-width: 70%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: hide .15s forwards;
            &.visible{
                animation: show .3s;
                display: flex;
            }
        }
        @keyframes show {
                0%{
                    opacity: 0
                };
                 100%{
                    opacity: 1
                };
            }
             @keyframes hide {
                0%{
                    transform:  translate(-50%, -50%) scale(1);
                    opacity: 1;
                };
                 100%{
                    transform:  translate(-50%, -50%) scale(0.5);
                    opacity: 0;
                };
            }
    }

</style>