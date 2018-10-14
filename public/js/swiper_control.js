// Swiper 控制

$(document).ready(function(){

    var swiper = new Swiper('.project_browser', {
        slidesPerView: 3,
        spaceBetween: 10,
        allowSlidePrev: false,
        allowSlideNext: false,
        breakpoints: {
            650: {
                allowSlidePrev: true,
                allowSlideNext: true,
                slidesPerView: 1
            },
            1050: {
                allowSlidePrev: true,
                allowSlideNext: true,
                slidesPerView: 2
            }
        },
        pagination: {
            el: '.project_dots',
            clickable: true,
        },
    });

    var swiper = new Swiper('.chuber_browser', {
        slidesPerView: 3,
        spaceBetween: 18,
        breakpoints: {
            650: {
                slidesPerView: 1
            },
            1050: {
                slidesPerView: 2
            }
        },
        pagination: {
            el: '.chuber_dots',
            clickable: true,
        },
    });


});