$(document).ready(function(){

    // Menu 開關
    $ ( ".icon_menu" ).click( function(){
        if ( $( ".menu" ).hasClass( "on" ) ) {
            menu( "close" );
        }
        else {
            menu( "open" );
        }
    })

    // Menu 狀態
    $ ( ".menu_cont_title" ).click( function(){
        $( this ).siblings().removeClass( "on" );
        $( this ).addClass( "on" );
        menu( "close" );
    })

    // Banner 操作
    $ (".icon_go_next").click( function(){
        banner( "next" );
    })

    $ (".icon_go_prev").click( function(){
        banner( "prev" );
    })

    // Swiper
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


// ------- 以上為 listener，以下為 function ------- //


// Menu 開關
function menu ( command ) {
    if ( command == "open" ) {
        $( ".menu" ).addClass( "on" );
    }
    else if ( command == "close" ) {
        $( ".menu" ).removeClass( "on" );
    }
}

// Banner 操作
function banner ( command ) {
    var banner_now = $( ".dots.on" ).attr( "class" ).replace( "dots banner_", "" ).replace( " on", "" );
    $( ".dots.on" ).removeClass( "on" );
    $( ".banner_item.on" ).removeClass( "on" );    
    if ( command == "next" ) {
        if ( banner_now < 3 ) {
            $( ".banner_" + ++banner_now ).addClass( "on" );
        }
        else {
            $( ".banner_1" ).addClass( "on" );
        }
    }
    else if ( command == "prev" ) {
        if ( banner_now > 1 ) {
            $( ".banner_" + --banner_now ).addClass( "on" );
        }
        else {
            $( ".banner_3" ).addClass( "on" );
        }
    }
}