<template>
    <div class="fixed top-0 bottom-0 right-0 left-0 over z-[1000] bg-[#00000066] custom-modal" id="custom-modal">
        <div class="absolute w-full h-full" @click="close()"></div>
        <div class="delay-100 duration-[0.15s] ease-out flex flex-col bg-primary-hover p-8 modal relative">
            <div class="absolute top-0 right-0 w-8 h=8 flex-center close" @click="close()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15.7071 1.70712C16.0976 1.3166 16.0976 0.683436 15.7071 0.292905C15.3166 -0.0976258 14.6834 -0.0976365 14.2929 0.292881L8 6.58557L1.70709 0.292881C1.31656 -0.0976364 0.683398 -0.0976257 0.292881 0.292905C-0.0976364 0.683436 -0.0976257 1.3166 0.292905 1.70712L6.58576 7.99976L0.292905 14.2924C-0.0976256 14.6829 -0.0976363 15.3161 0.292881 15.7066C0.683399 16.0971 1.31656 16.0971 1.70709 15.7066L8 9.41395L14.2929 15.7066C14.6834 16.0971 15.3166 16.0971 15.7071 15.7066C16.0976 15.3161 16.0976 14.6829 15.7071 14.2924L9.41424 7.99976L15.7071 1.70712Z" fill="#2F2C35"/>
                </svg>
            </div>
            <p class="text-18px font-bold text-white text-center mb-6">NHẬN BẢNG GIÁ TỪ CHỦ ĐẦU TƯ NGAY</p>
            <input class="w-full h-10 px-2" v-model="phone" placeholder="Số điện thoại" type="text">
            <p class="text-14px text-white py-1">Anh/Chị đang quan tâm tới:</p>
            <div class="w-full bg-white py-1">
                <div class="flex items-center px-2">
                    <input class="mr-2" type="checkbox"  id="check-1">
                    <label for="check-1">Liền kề phố</label>
                </div>
                <div class="flex items-center px-2">
                    <input class="mr-2" type="checkbox"  id="check-2">
                    <label for="check-2">Liền kề phố</label>
                </div>
                <div class="flex items-center px-2">
                    <input class="mr-2" type="checkbox"  id="check-3">
                    <label for="check-3">Liền kề phố</label>
                    <!-- <p class="">Liền kề phố</p> -->
                </div>
            </div>
            <button class="mt-6 submit">
                ĐĂNG KÝ NHẬN NGAY
            </button>
            <p class="text-18px text-white font-semibold mt-6">*Thông tin của quý khách luôn được bảo mật tuyệt đối.</p>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, onUnmounted} from 'vue';

    const phone = ref('')

    const close = () => {
        let modal = document.getElementById("custom-modal")
        modal.classList.remove("show")
        document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
    }


</script>

<style lang="scss">
    .custom-modal{
        width: 100%;
        height: 100%;
        opacity: 0;
        pointer-events: none;
        transform-style: 0.15s;
        z-index: 6000;
        .modal{
            // border-radius: 20px;
            border-radius: 10px;
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
        }
        &.show{
            opacity: 1;
            pointer-events: unset !important;
            .modal{
                animation: show .3s;
                display: flex;
            }

        }
        input{
            &:focus{
                outline: none;
            }
            &::placeholder{
                color: #222222;
            }
        }
        .submit{
            height: 50px;
            border-radius: 7px;
            background-color: var(--yellow);
            color: #fff;
            font-size: 18px;
            font-weight: bold;
        }
        .close{
            margin-top: 16px;
            margin-right: 8px;
            cursor: pointer;
            path{
                fill: #fff;
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