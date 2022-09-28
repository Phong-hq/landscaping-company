<template>
   <section class="project-section">
        <div class="container">
            <div class="pt-[120px] flex flex-col items-center section-title">
                <p class="text-[30px] font-extrabold text-primary-hover text-center ">{{ item.title }}</p>
            </div>
            <div class="w-full flex-center">
                <div class="class text-center text-primary-hover mb-6 w-[80%]" v-html="item.text"></div>
            </div>
            <div class="flex justify-between project-detail" v-if="item.type == 'left' || item.type == 'right'">
                <div class="pr-6 mb-4 project-detail-item my-order" :style="'--order: ' + order + ';'" v-html=item.description></div>
                <img class="project-detail-item order-2" :src="baseUrl + item.thumnail.data.attributes.url" alt="" />
            </div>
            <div v-else-if="item.description_center && item.description_center != ''" v-html=item.description_center></div>
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
    });

    onMounted(() => {
    })


    const baseUrl = ref('https://estate-strapi.srv01.dtsmart.dev')
    // const order = ref(1)

    const order = computed(() => {
        let result = 1
        if(props.item.type == 'right'){
            result = 3
        }
        return result
    })



</script>

<style lang="scss">
    .project-section{
        .section-title{
            position: relative;
            margin-bottom: 50px;
            p::after{
                content: "";
                width: 60px;
                height: 3px;
                background-color: var(--primary-hover);
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                margin-bottom: -8px;
            }
        }
        .project-detail-item{
            // background-color: #878784;
            width: 48%;
            &.my-order{
                order: var(--order);
            }
        }
        @media (max-width: 767px) {
            .project-detail{
                flex-direction: column;
                .project-detail-item{
                    width: 100%;
                    &.my-order{
                        order: 1;
                    }
                }
            }

        }
        &:last-child{
            padding-bottom: 100px;
        }

    }
</style>