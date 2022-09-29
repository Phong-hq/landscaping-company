<template>
    <div class="fixed top-0 bottom-0 right-0 right-0 over bg-[#00000066] flex justify-end menu-modal" id="menu-modal">
        <div class="absolute w-full h-full" @click="close()"></div>
        <div class="delay-100 duration-[0.15s] ease-out flex flex-col bg-[#141417] modal relative">
            <div class="absolute top-0 right-0 w-8 h=8 flex-center close" @click="close()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15.7071 1.70712C16.0976 1.3166 16.0976 0.683436 15.7071 0.292905C15.3166 -0.0976258 14.6834 -0.0976365 14.2929 0.292881L8 6.58557L1.70709 0.292881C1.31656 -0.0976364 0.683398 -0.0976257 0.292881 0.292905C-0.0976364 0.683436 -0.0976257 1.3166 0.292905 1.70712L6.58576 7.99976L0.292905 14.2924C-0.0976256 14.6829 -0.0976363 15.3161 0.292881 15.7066C0.683399 16.0971 1.31656 16.0971 1.70709 15.7066L8 9.41395L14.2929 15.7066C14.6834 16.0971 15.3166 16.0971 15.7071 15.7066C16.0976 15.3161 16.0976 14.6829 15.7071 14.2924L9.41424 7.99976L15.7071 1.70712Z" fill="#2F2C35"/>
                </svg>
            </div>
            <div class="h-full overflow-auto">
                <a class="logo" href="/">
                    <img :src=logo alt="">
                </a>
                <div class="w-full nav-list" v-for="(item, i) in navList" :key="i">
                    <div class="w-full relative item" :class="{'drop': dropDownmList[i].drop }" id="nav-2" @click="dropDownm(i)" v-if="item.dropDowm && item.dropDowm.length">
                        <div class="flex items-center justify-between">
                            <p class="text-white font-medium uppercase px-6 py-3">{{ item.name }}</p>
                            <div class="h-full flex-center px-6 dropdownm-btn">
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2929 0.292894C12.6834 -0.0976305 13.3166 -0.0976305 13.7071 0.292894C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292894Z" fill="#2F2C35"/>
                                </svg>
                            </div>
                        </div>
                        <div class="w-full relative drop-box">
                            <div class="absolute top-0 left-0 w-full">
                                <a class="w-full block pl-[35px] drop-box-item" :href="item2.url" v-for="(item2, x) in item.dropDowm" :key="x">
                                    <p class="text-white font-medium w-full px-6 py-3">{{ item2.name }}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <a class="w-full block item" :href="item.url" v-else>
                        <p class="text-white font-medium uppercase px-6 py-3 w-full">{{ item.name }}</p>
                    </a>
                </div>
                <div class="absolute bottom-10 flex icon-list mt-[100px]">
                    <div  v-for="(item, u) in iconList2" :key="u">
                        <a class="w-11 h-11 hover:bg-primary-hover rounded-[50%] flex-center mr-1" :href="item.url" target="_blank">
                            <img :src="'/images/' + item.image + '.svg'"  alt="">
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted, onUnmounted, onBeforeMount, computed, nextTick } from 'vue';
    



    
    const props =  defineProps({
        navList: {
            type: Array,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        }
    });
    
    // const data = ref(null)
    const dropDownmListt = ref([])
    const myData = ref({})
    const phone = ref('')
    const iconList = [
        {image: 'facebook',  url: '123'},
        {image: 'instagram',  url: ''},
        {image: 'youtube',  url: ''},
        {image: 'twitter',  url: ''},
        {image: 'linkedin',  url: ''},
    ]



    const dropDownmList = ref([
        {drop: false},
        {drop: false},
        {drop: false},
        {drop: false},
        {drop: false},
        {drop: false},
        {drop: false},
        {drop: false},
    ]);
    // console.log('asd',dropDownmList);

    const close = () => {
        let modal = document.getElementById("menu-modal")
        document.getElementsByTagName("body")[0].classList.remove("overflow-hidden");
        modal.classList.remove("show")
    }

    const dropDownm = (i) => {
        dropDownmList.value[i].drop = !dropDownmList.value[i].drop
    }

    onMounted( async () => {
        await fetch("https://estate-strapi.srv01.dtsmart.dev/api/home-page?populate=top_slider.image,*,logo,footer_services")
        .then((respone) => respone.json())
        .then(async (data) => {
            myData.value = data.data.attributes
        })
        // console.log(this.data);
        iconList[0].url = myData.value.facebook
        iconList[1].url = myData.value.instagram
        iconList[2].url = myData.value.youtube
        iconList[3].url = myData.value.switter
        iconList[4].url = myData.value.linkedin
        // console.log(iconList);
    })

    const iconList2 = computed(() =>{
        let arr = []
        iconList.forEach(element => {
            let item = {image: element.image , url: element.url}
            arr.push(item)
        });
        arr[0].url = myData.value.facebook
        arr[1].url = myData.value.instagram
        arr[2].url = myData.value.youtube
        arr[3].url = myData.value.switter
        arr[4].url = myData.value.linkedin
        return arr

    })


</script>

<style lang="scss">
    .menu-modal{
        width: 100%;
        height: 100%;
        opacity: 0;
        pointer-events: none;
        transform-style: 0.15s;
        z-index: 6000;
        .modal{
            // border-radius: 20px;
            overflow: auto;
            border-radius: 10px;
            overflow: hidden;
            z-index: 5900;
            width: 100%;
            max-width: 350px;
            height: 100%;
            transform: translateX(100%);
            transition: all 900ms ease !important;
        }
        &.show{
            opacity: 1;
            pointer-events: unset !important;
            .modal{
                transform: translateX(0);
                display: flex;
            }

        }
        .close{
            margin-top: 16px;
            margin-right: 8px;
            cursor: pointer;
            path{
                fill: #fff;
            }
        }
        .logo{
            padding: 32px;
            margin-bottom: 20px;
            img{
                width: 237px;
            }
        }
        .nav-list{
            .item{
                width: 100%;
                // padding: 10px 0;
                border-top: 1px solid rgba(255,255,255,0.10);
                .dropdownm-btn{
                    path{
                        fill: #fff;
                    }
                }
                .drop-box{
                    overflow: hidden;
                    pointer-events: none;
                    .test{
                        height: 0;
                        // transition: .3s;
                    }
                    .drop-box-item{
                        border-top: 1px solid rgba(255,255,255,0.10);
                    }
                }
                &.drop{
                    .drop-box{
                    // overflow: hidden;
                    overflow: unset;
                    pointer-events: unset;

                    // height: unset;
                    height: auto;
                    .absolute {
                        position: relative;

                    }
                    .test{
                        height: unset;
                        }
                    }
                }
            }
        }
    }

</style>