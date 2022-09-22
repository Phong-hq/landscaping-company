
<template>
    <!-- <div class="h-[100px] bg-white header" :class="{'fixed' : fixedTop}">
        <div class="container h-full flex justify-between items-center">
            <a href="">
                <img class="w-[200px]" src="../../assets/logo.png" alt="">
            </a>
            <ul class="flex">
                <li class="font-semibold mr-7" v-for="(item , i) in navList" :key="i">
                    <a class="hover:text-primary" :href="item.url">
                        {{ item.name }}
                    </a>
                </li>    
            </ul>
            <div class="h-full flex items-center">
                <div class="flex-center bg-primary mr-5 phone-image">
                    <i class="fi fi-rr-phone-call text-2xl bg-primary text-white"></i>
                </div>
                <div>
                    <p>free call</p>
                    <a class="text-18px font-semibold hover:text-primary" :href="'tel:' + props.phone">{{ props.phone }}</a>
                </div>
            </div>
        </div>
    </div> -->

    <div id="container">
		<!-- Header
		    ================================================== -->
		<header class="clearfix">
			<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
				
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="index.html"><img class="" src="../../assets/logo.png" alt=""></a>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav navbar-right">
							<!-- <li><a href="index.html">Home</a></li> -->
							<li class="drop" v-for="(item , i) in navList" :key="i">
                                <a :href="item.url">{{ item.name }}</a>
								<ul class="dropdown" v-if="item.dropDowm && item.dropDowm.length">
									<li v-for="(item2 , y) in item.dropDowm">
                                        <a :href="item2.url">{{ item2.name }}</a>
                                    </li>
								</ul>
							</li>
							<li class="search drop"><a href="#" class="open-search"><i class="fa fa-search"></i></a>
								<form class="form-search">
									<input type="search" placeholder="Search:"/>
									<button type="submit">
										<i class="fa fa-search"></i>
									</button>
								</form>
							</li>
						</ul>
					</div><!-- /.navbar-collapse -->
				</div><!-- /.container -->
			</nav>
		</header>
	</div>

</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';

    onMounted(() =>{
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    const props =  defineProps({
        phone: {
            type: String,
            required: true,
        },
    });
    const fixedTop = ref(false)
    const navList = ref([
        {name: 'Home', url: '/', dropDowm:[
           {name: 'Test1', url: '/'},
           {name: 'Test2', url: '/'},
           {name: 'Test3', url: '/'},
        ]},
        {name: 'About', url: '/'},
        {name: 'Service', url: '/', dropDowm:[
           {name: 'Paver', url: '/'},
           {name: 'Concrete', url: '/'},
           {name: 'Artificial turf', url: '/'},
           {name: 'Retaining wall', url: '/'},
           {name: 'Grass', url: '/'},
        ]},
        {name: 'Contact', url: '/'},
    ])

    const handleScroll = () => {
        let y = window.scrollY
        if(y > 50){
            fixedTop.value = true
        }
        else{
            fixedTop.value = false
        }
    }
</script>

<style lang="scss">
    // .header{
    //     top: -80px;
    //     &.fixed{
    //         top: 0;
    //         width: 100vw;
    //         z-index: 5;
    //         animation-name: sticky;
    //         animation-duration: .5s;
    //         animation-timing-function: ease-out;
    //     }
    //     .phone-image{
    //         width: 52px;
    //         height: 52px;
    //         border-radius: 50%;
    //     }
    //     @keyframes sticky {
    //         0% {
    //             opacity: 0;
    //             transform: translateY(-100%);
    //         }
    //         100%{
    //             opacity: 1;
    //             transform: translateY(0);
    //         }
    //     }
    // }
</style>
