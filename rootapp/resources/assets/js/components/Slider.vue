<template>
   <div>
    <div class="slider-wrapper">
      <div  class="sliders clearfix" v-for="slide in slides" ref='sliders'>
        <img :src="fullImagePath(slide.image_name)"/>
      </div>
      <ul class="slider-nav">
        <li v-for="(bullet,index) in slides"><span class="circle" @click="onSlide(index)" ref="bullets"></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            slides: {required:true},
            path: '/villa/image'
        },
        data() {
            return {
                sliders: [],
                bullets: [],
                currentSlideNo: 0,
                selected: ""
            }
        },
        updated() {

            var that = this;
            var slideCount = this.slides.length;
            
            this.sliders = this.$refs.sliders;
            this.bullets = this.$refs.bullets;
    
            this.currentSlideNo = 0;
            var selectedSlide = this.sliders[this.currentSlideNo];
    
            //hide initial
            this.sliders.forEach(e => {
                $(e).hide();
            });

            //output
            $(selectedSlide).show();
            $(this.bullets[this.currentSlideNo]).addClass('active');
            
        },
        methods: {
             onSlide(i) {
                var that = this;
                var selectedSlide = this.sliders[i];
                var currentSlide =  this.sliders[this.currentSlideNo];
                
                this.bullets.forEach(e => {
                    $(e).removeClass('active');
                });
                
                $(currentSlide).fadeOut(500).promise().done(function() {
                    $(selectedSlide).fadeIn(500);
                    $(that.bullets[that.currentSlideNo]).addClass('active');
                });
                
                this.currentSlideNo = i;
            },
            fullImagePath(img) {
                 if(this.path === undefined) {
                     this.path = 'villa/image';
                 }
                return window.Laravel.baseUrl + "/" + this.path + "/" + img;
            }
        },
        computed: {

        }
      
    }
</script>

<style>
        .slider-wrapper {
            position: relative;
            overflow: hidden;
            height: 242px;
        }
        .slider-wrapper .sliders img {
            width: 484px;
            height: 242px;
        }
        .slider-wrapper ::after {
            content: '';
            display: block;
            clear: both;
        }
        .slider-wrapper .slider {
            width: 99999999px;
            transition: all 0.5s;
            position:absolute;
            top:0;
            left:0;
        }
        .slider-wrapper ul.slider-nav {
                position: absolute;
                right: 1rem;
            bottom: 1rem;
            list-style: none;
    }
    .slider-wrapper ul.slider-nav li {
    float: left;
    margin: 0 3px;
    }
    .slider-wrapper ul.slider-nav li .circle {
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid #ddd;
    border-radius: 50%;
    background: transparent;
    }
    .slider-wrapper ul.slider-nav li .circle.active {
    background: #fb83ac;
    border-color: #fb83ac;
    }

</style>




