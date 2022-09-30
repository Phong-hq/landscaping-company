<template>
    <div class="fixed top-0 bottom-0 right-0 left-0 over z-[1000] bg-[#00000066] custom-modal" id="custom-modal">
        <div class="absolute w-full h-full" @click="close()"></div>
        <div class="delay-100 duration-[0.15s] ease-out flex flex-col bg-primary-hover p-8 modal relative">
            <div class="absolute top-0 right-0 w-8 h=8 flex-center close" @click="close()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15.7071 1.70712C16.0976 1.3166 16.0976 0.683436 15.7071 0.292905C15.3166 -0.0976258 14.6834 -0.0976365 14.2929 0.292881L8 6.58557L1.70709 0.292881C1.31656 -0.0976364 0.683398 -0.0976257 0.292881 0.292905C-0.0976364 0.683436 -0.0976257 1.3166 0.292905 1.70712L6.58576 7.99976L0.292905 14.2924C-0.0976256 14.6829 -0.0976363 15.3161 0.292881 15.7066C0.683399 16.0971 1.31656 16.0971 1.70709 15.7066L8 9.41395L14.2929 15.7066C14.6834 16.0971 15.3166 16.0971 15.7071 15.7066C16.0976 15.3161 16.0976 14.6829 15.7071 14.2924L9.41424 7.99976L15.7071 1.70712Z" fill="#2F2C35"/>
                </svg>
            </div>
            <div class="" v-if="!success">
                <p class="text-18px font-bold text-white text-center mb-6">NHẬN BẢNG GIÁ TỪ CHỦ ĐẦU TƯ NGAY</p>
                <input class="w-full h-10 px-2" v-model="phone" placeholder="Số điện thoại" @input="phoneFormat" maxlength="10" type="text">
                <p class="text-14px text-white py-1">Anh/Chị đang quan tâm tới:</p>
                <div class="w-full bg-white py-1 mb-2">
                    <div class="flex items-center px-2" v-for="(item, i) in contactList" :key="i">
                        <input class="mr-2" type="checkbox" :value="item.value"  :id="`check-${i}`" v-model="checkValue">
                        <label :for="`check-${i}`">{{ item.value }}</label>
                    </div>
                </div>
                <div class="relative">
                    <p class="absolute top-0 text-14px italic text-yellow" v-if="messageError != ''">*{{ messageError }}</p>
                </div>
                <button class="w-full flex-center mt-10 submit" @click="submit">
                    <div class="lds-ring flex-center" v-if="loading"><div></div><div></div><div></div><div></div></div>
                    <p v-else>ĐĂNG KÝ NHẬN NGAY</p>
                </button>
                <p class="text-18px text-white font-semibold mt-12">*Thông tin của quý khách luôn được bảo mật tuyệt đối.</p>
            </div>
            <div v-else>
                <p class="text-[27px] font-bold text-white text-center">CẢM ƠN QUÝ KHÁCH ĐÃ <br /> ĐỂ LẠI THÔNG TIN</p>
                <img class="my-6" src="../../../public/images/banner-2.jpg" alt="">
                <p class="text-14px text-white text-center">
                    QUÝ KHÁCH VUI LÒNG CHÚ Ý ĐIỆN THOẠI.
                    CHUYÊN VIÊN TƯ VẤN SẼ LIÊN HỆ CHO QUÝ KHÁCH TRONG THỜI GIAN SỚM NHẤT!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, onUnmounted} from 'vue';

    const props = defineProps({
        contactList:{
            type: Array,
            required: true
        }
    })

    const phone = ref('');
    const checkValue = ref([]);
    const validate = ref(false);
    const messageError = ref('');
    const loading =ref(false);
    const success = ref(false)

    const close = () => {
        let modal = document.getElementById("custom-modal")
        modal.classList.remove("show")
        document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
        success.value = false
    };

    const phoneFormat = () => {
        phone.value = phone.value.replace(/[^\d]/g, "");
        setValidate()
    };

    const setValidate = () => {
        if(phone.value == ''){
            messageError.value = "Vui lòng nhập số điện thoại"
            validate.value = false
            return
        }
        if(phone.value.length != 10){
            messageError.value = "Vui lòng nhập đúng số điện thoại"
            validate.value = false
            return
        }
        messageError.value == ""
        validate.value = true

    }

    const submit = async () => {
        let myData = {
            phone: phone.value,
            services: [],
        }
        checkValue.value.forEach((element , i) => {
            let item = {
                value: element,
            }
            myData.services.push(item)
        });
        if(validate.value && !loading.value){
            loading.value = true;
            await fetch('https://estate-strapi.srv01.dtsmart.dev/api/messages/', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({data: myData}),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    console.log('data.error.details.message:', data.error);
                    if(data.error && data.error != undefined ){
                        messageError.value = data.error.message
                    }
                    else{
                        loading.value = false
                        success.value = true
                    }
                    loading.value = false
                })
                .catch((error) => {
                    messageError.value = error
                });
        }
        else{
            console.log('???');
            setValidate()
        }
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
            max-width: 450px;
            max-height: 80%;
            width: 70%;
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
            .lds-ring {
                display: flex;
                position: relative;
                width: 50px;
                height: 50px;
                }
                .lds-ring div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 40px;
                height: 40px;
                margin: 8px;
                border: 4px solid #fff;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: #fff transparent transparent transparent;
                }
                .lds-ring div:nth-child(1) {
                animation-delay: -0.45s;
                }
                .lds-ring div:nth-child(2) {
                animation-delay: -0.3s;
                }
                .lds-ring div:nth-child(3) {
                animation-delay: -0.15s;
                }
                @keyframes lds-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
                }
    }

</style>