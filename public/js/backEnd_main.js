$(function () {
    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-right",
        "showDuration": "0",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000"
    }

    //side menu
    var vue_side = new Vue({
        el: "#sidebar",
        data: {
            tab: 1
        },
        methods: {
            changeTab: function (tab) {
                this.tab = tab;
                switch (tab) {
                    case 1:
                        vue_project.show.total = true;
                        vue_ad.show.total = false;
                        vue_chuber.show.total = false;
                        break;
                    case 2:
                        vue_project.show.total = false;
                        vue_ad.show.total = true;
                        vue_chuber.show.total = false;
                        break;
                    case 3:
                        vue_project.show.total = false;
                        vue_ad.show.total = false;
                        vue_chuber.show.total = true;
                        break;
                }
            }
        }
    });

    // vue project
    var vue_project = new Vue({
        el: "#backend_project",
        data: {
            index: -1,
            projects: [],
            show: {
                total: true,
                list: true,
                form: false
            },
            project: {
                id: "",
                name: "",
                subtitle: "",
                duration: "",
                mission: "",
                introduction: "",
                url: "",
                gallery: [],
                galleryPreview: [],
                cover:[],
                coverPreview:[]
            }
        },
        created: function () {
            $.ajax({
                type: "GET",
                url: "/projects",
                success: function (projects) {
                    vue_project.projects = projects;
                }
            });
        },
        methods: {
            showProject: function (id, index) {
                $.ajax({
                    type: "GET",
                    url: "/projects/" + id,
                    success: function (project) {
                        vue_project.index = index;
                        vue_project.project = project;
                        vue_project.show.list = false;
                        vue_project.show.form = true;
                    }
                });
            },
            showForm: function () {
                vue_project.show.list = false;
                vue_project.show.form = true;
            },
            showList: function () {
                vue_project.index = -1;
                vue_project.project = {
                    id: "",
                    name: "",
                    subtitle: "",
                    duration: "",
                    mission: "",
                    introduction: "",
                    url: "",
                    gallery: [],
                    galleryPreview: [],
                    cover:[],
                    coverPreview:[]
                };
                vue_project.show.form = false;
                vue_project.show.list = true;
            },
            createProject: function () {
                var projectData = {
                    name: this.project.name,
                    subtitle: this.project.subtitle,
                    duration: this.project.duration,
                    mission: this.project.duration,
                    introduction: this.project.introduction,
                    url: this.project.url
                };
                if ($("#cover").val() == ""){
                	toastr.error("請上傳cover照片");
                	return;
                }
                if ($("#coverPreview").val() == ""){
                	toastr.error("請上傳coverPreview照片");
                	return;
                }
                if ($("#gallery").val() != "" || $("#galleryPreview").val() != "") {
                    if ($("#gallery").val() == "" || $("#galleryPreview").val() == "") {
                        toastr.error("上傳 Gallery 時請上傳相對應的 Gallery Preview");
                        return;
                    }
                }
                $.ajax({
                    url: "/projects",
                    data: projectData,
                    method: "POST",
                    success: function (project) {
                        if ($("#gallery").val() != "" || $("#galleryPreview").val() != "") {
                            uploadImg(
                                "/projects/image/gallery/" + project.id,
                                "#gallery",
                                "#projectGalleryForm",
                                function(response) {
                                    $("#gallery").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Gallery 超過5MB限制");
                                    }
                                });
                            uploadImg(
                                "/projects/image/gallerypreview/" + project.id,
                                "#galleryPreview",
                                "#projectGalleryPreviewForm",
                                function(response) {
                                    $("#galleryPreview").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Gallery Preview 超過5MB限制");
                                    }
                                });
                        }
                        if ($("#coverPreview").val() != "") {
                            uploadImg(
                                "/projects/image/coverpreview/" + project.id,
                                "#coverPreview",
                                "#projectCoverPreviewForm",
                                function(response) {
                                    $("#coverPreview").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Cover Preview 超過5MB限制");
                                    }
                                });
                        }
                        if ($("#cover").val() != "") {
                            uploadImg(
                                "/projects/image/cover/" + project.id,
                                "#cover",
                                "#projectCoverForm",
                                function(response) {
                                    $("#cover").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Cover 超過5MB限制");
                                    } else {
                                        toastr.success("新增成功");
                                        vue_project.projects.push(project);
                                        vue_project.showList();
                                    }
                                });
                        }
                    }
                })
            },
            updateProject: function (id) {
                var updateProject = {
                    name: this.project.name,
                    subtitle: this.project.subtitle,
                    duration: this.project.duration,
                    mission: this.project.duration,
                    introduction: this.project.introduction,
                    url: this.project.url
                };
                if ($("#gallery").val() != "" || $("#galleryPreview").val() != "") {
                    if ($("#gallery").val() == "" || $("#galleryPreview").val() == "") {
                        toastr.error("上傳 Gallery 時請上傳相對應的 Gallery Preview");
                        return;
                    }
                }
                $.ajax({
                    url: "/projects/update/" + id,
                    method: "POST",
                    data: updateProject,
                    success: function () {
                        if ($("#gallery").val() != "" && $("#galleryPreview").val() != "") {
                            uploadImg(
                                "/projects/image/gallery/" + id,
                                "#gallery",
                                "#projectGalleryForm",
                                function(response) {
                                    $("#gallery").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Gallery 超過5MB限制");
                                    } else {
                                        vue_project.refreshProject(vue_project.project.id);
                                    }
                                });
                            uploadImg(
                                "/projects/image/gallerypreview/" + id,
                                "#galleryPreview",
                                "#projectGalleryPreviewForm",
                                function(response) {
                                    $("#galleryPreview").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Gallery Preview 超過5MB限制");
                                    } else {
                                        vue_project.refreshProject(vue_project.project.id);
                                    }
                                });
                        }
                        if ($("#cover").val() != "") {
                            uploadImg(
                                "/projects/image/cover/" + id,
                                "#cover",
                                "#projectCoverForm",
                                function(response) {
                                    $("#cover").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Cover 超過5MB限制");
                                    } else {
                                        vue_project.refreshProject(vue_project.project.id);
                                    }
                            });
                        }
                        if ($("#coverPreview").val() != "") {
                            uploadImg(
                                "/projects/image/coverpreview/" + id,
                                "#coverPreview",
                                "#projectCoverPreviewForm",
                                function(response) {
                                    $("#coverPreview").val("");
                                    if (response.result != "ok") {
                                        toastr.error("Cover Preview 超過5MB限制");
                                    } else {
                                        vue_project.refreshProject(vue_project.project.id);
                                    }
                            });
                        }
						toastr.success("更新成功");
                        vue_project.refreshProject(vue_project.project.id);
                        // vue_project.showList();
                    }
                });
            },
            deleteProject: function (id) {
                $.ajax({
                    url: "/projects/" + id,
                    method: "DELETE",
                    success: function (msg) {
                        toastr.success(msg);
                        vue_project.projects.splice(vue_project.index, 1);
                        vue_project.showList();
                    }
                });
            },
            deleteImage: function (imageID_main, imageID_preview) {
                if (confirm("確定要刪除這張圖片嗎?")) {
                    $.ajax({
                        url: "/projects/image/" + imageID_main,
                        method: "DELETE",
                        success: function (msg) {
                            toastr.success(msg);
                            vue_project.refreshProject(vue_project.project.id);
                        }
                    });
                    $.ajax({
                        url: "/projects/image/" + imageID_preview,
                        method: "DELETE",
                        success: function (msg) {
                            vue_project.refreshProject(vue_project.project.id);
                        }
                    });
                }
            },
            refreshProject: function(id) {
                $.ajax({
                    type: "GET",
                    url: "/projects/" + id,
                    success: function (project) {
                        vue_project.project = project;
                    }
                });
            },
            parseURL: function(){
            	var youtube_id = this.project.url.split(/\?v=|\&/g)[1];
            	this.project.url = 'https://www.youtube.com/embed/' + youtube_id;
            },
		    onFileChange(e) {
		      const file = e.target.files[0];
		      vue_project.project.url = URL.createObjectURL(file);
		    }
        },
        mounted: function(){
			// $('.special.card .image').dimmer({
			// 	on: 'hover'
			// });
			$('.card .dimmer').dimmer({
			  on: 'hover'
			});
			initPhotoSwipeFromDOM('.backend_gallery');
        }
    });

    // vue advertisement list
    var vue_ad = new Vue({
        el: "#backend_ad",
        data: {
            index: -1,
            show: {
                total: false,
                form: false,
                list: true
            },
            adList: [],
            ad: {
                id: "",
                name: "",
                image: "",
                url: "",
            },
            imgUrl: "",
            mobileUrl: "",
        },
        created: function () {
            $.ajax({
                type: "GET",
                url:"/advertisements/",
                success: function(ads){
                        vue_ad.adList = ads;
                }
            })
        },
        methods: {
    		showForm: function(){
    			vue_ad.ad = {
                    id: "",
                    name: "",
	                image: "",
	                url: "",
        		};
            	vue_ad.show.list = false;
            	vue_ad.show.form = true;
    		},
    		showList: function(){
            	vue_ad.show.list = true;
            	vue_ad.show.form = false;
    		},
    		changeStatus: function(ad_id){
				var now_ad = this.adList.find(ad => {
				  	return ad.id == ad_id;
				})
				var status = 1;
				if(now_ad.show == 1){
						now_ad.show = 0;
						status = 0;
				}
				now_ad.show = status;
	            // $.ajax({
	            // 		type: "POST",
	            // 		url:"/advertisements/",
	            // 		data: {'stauts': status},
	            // 		success: function(msg){
	            // 				if(status) toastr.success(now_ad.name + "已上架");
	            // 				else toastr.success(now_ad.name + "已下架");
	            // 		}
	            // })
    		},
    		showItem:function(index) {
				vue_ad.index = index;
            	vue_ad.ad = vue_ad.adList[index];
            	vue_ad.show.list = false;
            	vue_ad.show.form = true;
            	vue_ad.imgUrl = "";
            	vue_ad.mobileUrl = "";
    		},
    		createItem: function(){
            	vue_ad.imgUrl = "";
            	vue_ad.mobileUrl = "";
	            var itemData = {
	                name: vue_ad.ad.name,
	                url: vue_ad.ad.url
	            };
	            if($("#ad_image").val() == ""){
	            	toastr.error('請上傳網頁版照片');
	            	return;
	            }
	            if($("#ad_image_mobile").val() == ""){
	            	toastr.error('請上傳手機版照片');
	            	return;
	            }
	            $.ajax({
	            	type:"POST",
	            	url:"/advertisements",
	            	data: itemData,
	            	success: function(ad){
	            		uploadImg(
                            "/advertisements/image/" + ad.id,
                            "#ad_image",
                            "#adImageForm",
                            function(response) {
                                if (response == "ok") {
                                    $("#ad_image").val("");
                                    // toastr.success("新增桌機版照片成功");
                                }
	                    });
	            		uploadImg(
                            "/advertisements/imageMobile/" + ad.id,
                            "#ad_image_mobile",
                            "#adImageMobileForm",
                            function(response) {
                                if (response == "ok") {
                                    $("#ad_image_mobile").val("");
                                    // toastr.success("新增手機版照片成功");
                                }
	                    });
	                    toastr.success("新增成功");
                        vue_ad.adList.push(ad);
                        vue_ad.showList();
	            	}
	            })
    		},
    		updateItem: function(id){
	            var itemData = {
	                name: this.ad.name,
	                url: this.ad.url
	            };
	            $.ajax({
	            	type:"POST",
	            	url:"/advertisements/update/" + id,
	            	data: itemData,
	            	success: function(msg){
                        if($("#ad_image").val() != "") {
                            uploadImg(
                                "/advertisements/image/" + id,
                                "#ad_image",
                                "#adImageForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#ad_image").val("");
                                    }
                            });
                        }
                        if($("#ad_image_mobile").val() != ""){
		            		uploadImg(
	                            "/advertisements/imageMobile/" + id,
	                            "#ad_image_mobile",
	                            "#adImageMobileForm",
	                            function(response) {
	                                if (response == "ok") {
	                                    $("#ad_image_mobile").val("");
	                                    // toastr.success("新增手機版照片成功");
	                                }
		                    });
		                }
                        toastr.success("更新成功");
                        vue_ad.adList[vue_ad.index] = itemData;
                        vue_ad.adList[vue_ad.index].id = id;
                        vue_ad.showList();
	            	}
	            })
	    	},
	    	deleteItem: function(id){
	            $.ajax({
	            	type:"DELETE",
	            	url:"/advertisements/delete/" + id,
	            	success: function(msg){
	            			toastr.success(msg);
	            			vue_ad.adList.splice(vue_ad.index, 1);
	            			vue_ad.showList();
	            	}
	            })
    		},
		    onFileChange(e) {
		      const file = e.target.files[0];
		      vue_ad.url = URL.createObjectURL(file);
		    },
		    onMobileFileChange(e) {
		      const file = e.target.files[0];
		      vue_ad.mobileUrl = URL.createObjectURL(file);
		    }
        }
    });

    var vue_chuber = new Vue({
        el: "#backend_chuber",
        data: {
    		index: -1,
            show: {
                total: false,
                form: false,
                list: true
            },
            chuberList:[],
            chuber:{
        		id: "",
        		name: "",
        		position: "",
        		email: "",
        		image: ""
            }
        },
        created: function () {
            $.ajax({
            		type: "GET",
            		url:"/chubers/",
            		success: function(chubers){
            			vue_chuber.chuberList = chubers;
            		}
            })
        },
        methods: {
    		showForm: function(){
    			vue_chuber.chuber = {
        			id: "",
        			name: "",
       				position: "",
       				email: ""
        		};
            	vue_chuber.show.list = false;
            	vue_chuber.show.form = true;
    		},
    		showList: function(){
            	vue_chuber.show.list = true;
            	vue_chuber.show.form = false;
    		},
    		showItem:function(index) {
				vue_chuber.index = index;
    	        vue_chuber.chuber = vue_chuber.chuberList[index];
        	    vue_chuber.show.list = false;
            	vue_chuber.show.form = true;
    		},
    		createItem: function(){
	            var itemData = {
	                name: vue_chuber.chuber.name,
	                position: vue_chuber.chuber.position,
	                email: vue_chuber.chuber.email
	            };
	            $.ajax({
	            	type:"POST",
	            	url:"/chubers",
	            	data: itemData,
	            	success: function(chuber){
                        if($("#chuber_image").val() != "") {
                            uploadImg(
                                "/chubers/image/" + chuber.id,
                                "#chuber_image",
                                "#chuberImageForm",
                                function(response) {
                                    if (response.result == "ok") {
                                        $("#chuber_image").val("");
                                        toastr.success("新增成功");
                                        chuber.image = 1;
                                        vue_chuber.chuberList.push(chuber);
                                        vue_chuber.showList();
                                    }
                            });
                        } else {
                            toastr.success("新增成功");
                            vue_chuber.chuberList.push(chuber);
                            vue_chuber.showList();
                        }
	            	}
	            })
    		},
    		updateItem: function(id){
	            var itemData = {
	                name: this.chuber.name,
	                position: this.chuber.position,
	                email: this.chuber.email
	            };
	            $.ajax({
	            	type:"POST",
	            	url:"/chubers/update/" + id,
	            	data: itemData,
	            	success: function(msg){
                        if($("#chuber_image").val() != "") {
                            uploadImg(
                                "/chubers/image/" + id,
                                "#chuber_image",
                                "#chuberImageForm",
                                function(response) {
                                    if (response.result == "ok") {
                                        $("#chuber_image").val("");
                                        toastr.success("更新成功");
                                        itemData.id = id
                                        itemData.image = 1;
                                        vue_chuber.chuberList[vue_chuber.index] = itemData;
                                        vue_chuber.showList();
                                    }
                            });
                        } else {
                            toastr.success("更新成功");
                            vue_chuber.chuberList[vue_chuber.index] = itemData;
                            vue_chuber.chuberList[vue_chuber.index].id = id;
                            vue_chuber.chuberList.showList();
                        }
	            	}
	            })
    		},
    		deleteItem: function(id){
	            $.ajax({
	            	type:"DELETE",
	            	url:"/chubers/delete/" + id,
	            	success: function(msg){
	        			toastr.success(msg);
	        			vue_chuber.chuberList.splice(vue_chuber.index, 1);
	        			vue_chuber.showList();
	            	}
	            })
    		}
        }
    });

    // semantic ui's function
    $(".menu .item").tab();

    // - table style
    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    //上傳圖片功能
    function uploadImg(api, inputSelector, formSelector, cb) {
        var img = $(inputSelector)[0].files[0];
        if (img.size > (55*1024*1024*1024)) {
            cb({"result":"fail"});
            return;
        }
        if(img.type == "image/png" || img.type == "image/jpeg"){
            var formData = new FormData($(formSelector)[0]);
            $.ajax({
                url: api,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    cb(response);
                }
            });
        } else {
            toastr.error("請上傳jpg或png檔案");
        }
    }

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

        if(e.srcElement.tagName.toUpperCase() === 'BUTTON') return; // 防止delete按鈕被觸發

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
