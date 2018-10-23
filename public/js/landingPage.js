$(function () {
	var vue_chuber = new Vue({
		el: "#chuber",
		data:{
			chuberList:[]
		},
		created: function(){
            $.ajax({
        		type: "GET",
        		url:"/chubers/",
        		success: function(chubers){
        			var group = [];
        			for(var i = 0; i < chubers.length; i++){
        				group.push(chubers[i]);
        				if(group.length == 2 || i == chubers.length - 1){
        					vue_chuber.chuberList.push(group);
        					group = [];
        				}
        			}
        		}
            })
		},
		async mounted() {
			AOS.init();
		}
	})

	var vue_banner = new Vue({
		el: "#banner",
		data: {
			bannerList: [],
			nowShow: 0
		},
		created: function(){
            $.ajax({
        		type: "GET",
        		url:"/advertisements/",
        		success: function(banners){
        			vue_banner.bannerList = banners;
        		}
            })
		},
		methods:{
			bannerSwitch: function(next_index) {
				if (next_index < 0 || next_index >= vue_banner.bannerList.length){
					return;
				}
				if(next_index == vue_banner.nowShow){
					return;
				}
				var switchBanner = 'banner_' + next_index;
    			$( ".dots.on" ).removeClass( "on" );	
    			$( ".banner_item.on" ).removeClass( "on" );
    			// $(switchBanner).addClass('on');
    			vue_banner.nowShow = next_index;
			}
		},
		async mounted() {
			AOS.init();
		}
	})

	var vue_project_main = new Vue({
		el: "#project_main",
		data: {
			projectList: [

			],
			nowProject: {},
			nowGallery: [],
			nowGalleryPreview: [],
			showType: 'list',
			pageShow: false,

		},
		methods: {
			showAllProject: function() {
				vue_project_main.pageShow = true;
				vue_project_main.showType = 'list';
			},
			showProject: function(id){
                $.ajax({
                    type: "GET",
                    url: "/projects/" + id,
                    success: function (project) {
                        vue_project_main.nowProject = project;
                        vue_project_main.nowGallery = [];
                        vue_project_main.nowGalleryPreview = [];
                        for(var index in project.images){
                        	var img = project.images[index];
                        	console.log(img);
                        	if (img.type == 'gallery'){
                        		vue_project_main.nowGallery.push(img)
                        	}
                        	else if (img.type == 'gallerypreview'){
                        		vue_project_main.nowGalleryPreview.push(img);
                        	}
                        }
                        // initPhotoSwipeFromDOM('.my-gallery');
                    }
                });
				vue_project_main.pageShow = true;
				vue_project_main.showType = 'item';
			},
			closeAllProject: function() {
				vue_project_main.pageShow = false;
			}
		},
        created: function () {
            $.ajax({
                type: "GET",
                url: "/projects",
                success: function (projects) {
                    vue_project_main.projectList = projects;
                }
            });
        },
        mounted: function () {
			initPhotoSwipeFromDOM('.my-gallery');
        }
	})

	var vue_project_preview = new Vue({
		el: "#project",
		data: {
			previewList: []
		},
        created: function () {
            $.ajax({
                type: "GET",
                url: "/projects",
                success: function (projects) {
                    vue_project_preview.previewList = projects.slice(0, 3);
                }
            });
        },
		methods: {
			showAllProject: vue_project_main.showAllProject,
			showProject: vue_project_main.showProject
		},
		async mounted() {
			AOS.init();
		}
	})

	var vue_menu = new Vue({
		el: '#menu',
		methods:{
			showAllProject: vue_project_main.showAllProject,
			closeAllProject: vue_project_main.closeAllProject
		},
		mounted: function() {
		    $ ( ".menu_cont_title" ).click( function(){
		        $( this ).addClass( "on" );
		        $( this ).siblings().removeClass( "on" );
		        $( ".menu" ).removeClass( "on" );
		    })
		}
	})
});

var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            // size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: 0,
                h: 0
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.listen('gettingData', function(index, item) {
		        if (item.w < 1 || item.h < 1) { // unknown size
		        var img = new Image(); 
		        img.onload = function() { // will get size after load
		        item.w = this.width; // set image width
		        item.h = this.height; // set image height
		           gallery.invalidateCurrItems(); // reinit Items
		           gallery.updateSize(true); // reinit Items
		        }
		    img.src = item.src; // let's download image
		    }
		});
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};