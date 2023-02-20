<template>
   <section class="project-section">
        <div class="container">
            <div class="pt-[60px] flex flex-col items-center section-title">
                <p class="text-[30px] font-extrabold text-primary-hover text-center " v-if="item.title">{{ item.title }}</p>
            </div>
            <div class="w-full flex-center">
                <div class="class text-center text-primary-hover mb-6 w-[80%]" v-html="item.text" v-if="item.text"></div>
            </div>
            <div class="flex justify-between project-detail" v-if="item.type == 'left' || item.type == 'right'">
                <div class="pr-6 mb-4 project-detail-item my-order" :style="'--order: ' + order + ';'">
                    <div v-html=item.description v-if="item.description"></div>
                </div>
                <img class="project-detail-item order-2" :src="baseUrl + item.thumnail.data.attributes.url" alt="" />
            </div>
            <div v-else-if="item.description_center && item.description_center != ''" v-html="textCenter"></div>
        </div>
    </section>
</template>

<script setup>

    import { ref, onMounted, onBeforeMount , computed } from 'vue';

    const props =  defineProps({
        item: {
            type: Object,
            required: true,
        },
    });

    onBeforeMount (() => {

    })


    const baseUrl = ref('https://estate-strapi.srv01.dtsmart.dev')
    // const textCenter = ref('')

    const order = computed(() => {
        let result = 1
        if(props.item.type == 'right'){
            result = 3
        }
        return result
    })
    // console.log('props.item.description_center',props.item.description_center);

    const textCenter = computed(() => {
        let index = -1
        let result = ""
        if(props.item.description_center && props.item.description_center != ""){
            index = props.item.description_center.indexOf('src="/')
        }
        if(index > -1){
            result = props.item.description_center.replaceAll('/uploads', 'https://estate-strapi.srv01.dtsmart.dev/uploads')
        }
        else{
            result = props.item.description_center
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
        p{
            img{
                margin: 0 auto;
            }
        }
        img{
            margin: 0 auto;
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