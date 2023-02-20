<template>
    <section class="projects-detail">
        <div class="pt-[60px] ">
            <div class="container">
                <div class="flex justify-between detail-box" :class="{ 'type-center' : type == 3}">
                    <div class="w-[53%] left" :style="'order: 2'">
                        <img class="w-full" :src="'/images/projects/' + item.image" alt="">
                    </div>
                        <div class="w-[45%] right" :style="'order:' + itemType" >
                            <p class="text-[30px] font-extrabold text-primary-hover mb-6">Project Overview</p>
                            <p class="text-18px text-[#666666] font-light mb-12">{{ item.direction }}</p>
                            <div v-if="type!=3">
                                <div class="flex items-center relative">
                                    <p class="text-18px font-semibold absolute left-0 bottom-1/2 translate-y-1/2">Project Status</p>
                                    <div class="h-[22px] w-full pl-[160px]">
                                        <p class="text-18px font-light text-[#555555] ">{{ item.status }}</p>
                                    </div>
                                </div>
                                <div class="w-[50px] h-[1px] bg-primary-hover mt-2 mb-6"></div>
                                    
                                    <div class="flex items-center relative">
                                        <p class="text-18px font-semibold absolute left-0 bottom-1/2 translate-y-1/2">Type</p>
                                        <div class="h-[22px] w-full pl-[160px]">
                                            <p class="text-18px font-light text-[#555555] ">{{ item.type }}</p>
                                            </div>
                                        </div>
                                    <div class="w-[50px] h-[1px] bg-primary-hover mt-2 mb-6"></div>
                                    
                                <div class="flex items-center relative">
                                    <p class="text-18px font-semibold absolute left-0 bottom-1/2 translate-y-1/2">Location</p>
                                    <div class="h-[22px] w-full pl-[160px]">
                                        <p class="text-18px font-light text-[#555555] ">{{ item.location }}</p>
                                        </div>
                                        </div>
                                        <div class="w-[50px] h-[1px] bg-primary-hover mt-2 mb-6"></div>
    
                                    <div class="flex items-center relative">
                                        <p class="text-18px font-semibold absolute left-0 bottom-1/2 translate-y-1/2">Area</p>
                                        <div class="h-[22px] w-full pl-[160px]">
                                            <p class="text-18px font-light text-[#555555] ">{{ item.area }}</p>
                                        </div>
                                    </div>
                                    <div class="w-[50px] h-[1px] bg-primary-hover mt-2 mb-6"></div>
                                    <button class="">
                                        <a href="#">Schedule a visit</a>
                                    </button>
                            </div>

                    
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { ref, onMounted, onUnmounted, computed } from 'vue';

    const props =  defineProps({
        item: {
            type: Object,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        },
    });

    const itemType = computed(() => {
        let result = 3
        if(props.type >= 2){
            result = 1
        }
        // else if(props.type == 3){
        //     result = 4
        // }
        return result
    })



</script>

<style lang="scss">
    .projects-detail{
        button{
            margin-top: 50px;
            a{
                padding: 15.5px 32px;
                border-radius: 2px;
                background-color: var(--primary-hover);
                color: #fff;
                font-weight: 600;
            }
        }
        .type-center{
            flex-direction: column;
            justify-content: center;
            .left, .right{
                width: 100% !important;
                padding: 0 20px;
            }
            .right{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
        &:last-child{
            margin-bottom: 100px;
        }
    }
    @media (max-width: 767px) {
        .detail{
            .detail-box{
                flex-wrap: wrap;
                .left, .right{
                    width: 90%;
                    padding: 0
                }
                .left{
                    margin-bottom: 20px;
                }
                .right{
                    order: 3 !important;
                }
            }
        }
    }
</style>