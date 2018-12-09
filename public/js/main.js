$(document).ready(function(){

    // Animate on scroll（AOS）
    AOS.init({
        offset: 300,
        delay: 0,
        duration: 2500,
        once: true,
        mirror: false
    });


    // Parallax Scrolling（Enllax.js）
    $(window).enllax();


    // Menu 開關
    $ ( ".switch_menu" ).click( function(){
        if ( $( ".menu" ).hasClass( "on" ))                  { menu( "close" ); }
        else                                                 { menu( "open" );  }
    })

    // Menu 頁面控制
    $ ( ".menu_cont_title" ).click( function(){
        $( this ).addClass( "on" );
        $( this ).siblings().removeClass( "on" );
        // $ ( ".switch_to_list" ).click();
        // $ ( ".close_project_main" ).click();
        menu( "close" );
        // 未完成！ 
    })

    
    // Project Page 開關
    // $ ( ".switch_project_main" ).click( function(){
    //     if ( $( ".project_main" ).hasClass( "on" ))          { project_main( "close" ); }
    //     else                                                 { project_main( "open" );  }
    // })
    // $ ( ".open_project_main" ).click( function()             { project_main( "open" );  })
    // $ ( ".close_project_main" ).click( function()            { project_main( "close" ); })

    // Project Page 內容切換
    // $ ( ".switch_to_list" ).click( function() {
    //     if ( ! $( ".project_list_full" ).hasClass( "now" ))  { project_main_cont( "list" ); }
    // })
    // $ ( ".switch_to_item" ).click( function() {
    //     if ( ! $( ".project_item_full" ).hasClass( "now" ))  { project_main_cont( "item" ); }
    // })
    
    // Banner 操作
    // $ ( ".icon_go_next" ).click( function()          { banner( "next" ); })
    // $ ( ".icon_go_prev" ).click( function()          { banner( "prev" ); })

    
    
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

// Project Page 開關
function project_main ( command ) {
    if ( command == "open" ) {
        $( ".project_main" ).addClass( "on" );
    }
    else if ( command == "close" ) {
        $( ".project_main" ).removeClass( "on" );
    }
}

// Project 內容切換
function project_main_cont ( command ) {
    if ( command == "list" ) {
        $( ".project_item_full" ).removeClass( "now" );
        $( ".project_list_full" ).addClass( "now" );
    }
    else if ( command == "item" ) {
        $( ".project_list_full" ).removeClass( "now" );
        $( ".project_item_full" ).addClass( "now" );
    }
}


// Banner 操作
// function banner ( command ) {
//     var banner_now = $( ".dots.on" ).attr( "class" ).replace( "dots banner_", "" ).replace( " on", "" );
//     $( ".dots.on" ).removeClass( "on" );
//     $( ".banner_item.on" ).removeClass( "on" );
//     if ( command == "next" ) {
//         if ( banner_now < $('.banner_item').length ) {
//             $( ".banner_" + ++banner_now ).addClass( "on" );
//         }
//         else {
//             $( ".banner_1" ).addClass( "on" );
//         }
//     }
//     else if ( command == "prev" ) {
//         if ( banner_now > 1 ) {
//             $( ".banner_" + --banner_now ).addClass( "on" );
//         }
//         else {
//             $( ".banner_3" ).addClass( "on" );
//         }
//     }
// }