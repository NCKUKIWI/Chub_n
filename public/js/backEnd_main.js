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
                    url: ""
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
                $.ajax({
                    url: "/projects",
                    data: projectData,
                    method: "POST",
                    success: function (project) {
                        if ($("#cover").val() != "") {
                            uploadImg(
                                "/projects/image/cover/" + project.id,
                                "#cover",
                                "#projectCoverForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#cover").val("");
                                    }
                            });
                        }
                        if ($("#coverPreview").val() != "") {
                            uploadImg(
                                "/projects/image/coverpreview/" + project.id,
                                "#coverPreview",
                                "#projectCoverPreviewForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#coverPreview").val("");
                                    }
                            });
                        }
                        if ($("#gallery").val() != "") {
                            uploadImg(
                                "/projects/image/gallery/" + project.id,
                                "#gallery",
                                "#projectGalleryForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#gallery").val("");
                                    }
                            });
                        }
                        if ($("#galleryPreview").val() != "") {
                            uploadImg(
                                "/projects/image/gallerypreview/" + project.id,
                                "#galleryPreview",
                                "#projectGalleryPreviewForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#galleryPreview").val("");
                                    }
                            });
                        }
                        if($("#banner").val() != "") {
                            uploadImg(
                                "/projects/banner/" + project.id,
                                "#banner",
                                "#projectBannerForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#banner").val("");
                                        toastr.success("新增成功");
                                        project.banner = 1;
                                        vue_project.projects.push(project);
                                        vue_project.showList();
                                    }
                            });
                        } else {
                            toastr.success("新增成功");
                            vue_project.projects.push(project);
                            vue_project.showList();
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
                $.ajax({
                    url: "/projects/update/" + id,
                    method: "POST",
                    data: updateProject,
                    success: function () {
                        if ($("#cover").val() != "") {
                            uploadImg(
                                "/projects/image/cover/" + id,
                                "#cover",
                                "#projectCoverForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#cover").val("");
                                        vue_project.refreshProject(id);
                                    }
                            });
                        }
                        if ($("#coverPreview").val() != "") {
                            uploadImg(
                                "/projects/image/coverpreview/" + id,
                                "#coverPreview",
                                "#projectCoverPreviewForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#coverPreview").val("");
                                        vue_project.refreshProject(id);
                                    }
                            });
                        }
                        if ($("#gallery").val() != "") {
                            uploadImg(
                                "/projects/image/gallery/" + id,
                                "#gallery",
                                "#projectGalleryForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#gallery").val("");
                                        vue_project.refreshProject(id);
                                    }
                            });
                        }
                        if ($("#galleryPreview").val() != "") {
                            uploadImg(
                                "/projects/image/gallerypreview/" + id,
                                "#galleryPreview",
                                "#projectGalleryPreviewForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#galleryPreview").val("");
                                        vue_project.refreshProject(id);
                                    }
                            });
                        }
                        if($("#banner").val() != "") {
                            uploadImg(
                                "/projects/banner/" + id,
                                "#banner",
                                "#projectBannerForm",
                                function(response) {
                                    if (response == "ok") {
                                        $("#banner").val("");
                                        toastr.success("更新成功");
                                        vue_project.refreshProject(id);
                                    }
                            });
                        } else {
                            toastr.success("更新成功");
                            vue_project.refreshProject(id);
                        }
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
            deleteImage: function (id) {
                if (confirm("確定要刪除這張圖片嗎?")) {
                    $.ajax({
                        url: "/projects/image/" + id,
                        method: "DELETE",
                        success: function (msg) {
                            toastr.success(msg);
                            $.ajax({
                                type: "GET",
                                url: "/projects/" + vue_project.project.id,
                                success: function (project) {
                                    vue_project.project = project;
                                }
                            });
                        }
                    });
                }
            },
            deleteBanner: function(id) {
                if (confirm("確定要刪除這張圖片嗎?")) {
                    $.ajax({
                        url: "/projects/banner/" + id,
                        method: "DELETE",
                        success: function (msg) {
                            toastr.success(msg);
                            $.ajax({
                                type: "GET",
                                url: "/projects/" + id,
                                success: function (project) {
                                    vue_project.project = project;
                                }
                            });
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
            	console.log(this.project.url);
            	this.project.url = this.project.url.replace('watch?v=', '/embed/');
            }
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
            }
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
        				name: ""
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
    		},
    		createItem: function(){
	            var itemData = {
	                name: vue_ad.ad.name
	            };
	            $.ajax({
	            	type:"POST",
	            	url:"/advertisements",
	            	data: itemData,
	            	success: function(ad){
	                    if($("#ad_image").val() != "") {
	                        uploadImg(
	                            "/advertisements/image/" + ad.id,
	                            "#ad_image",
	                            "#adImageForm",
	                            function(response) {
	                                if (response == "ok") {
	                                    $("#ad_image").val("");
	                                    toastr.success("新增成功");
	                                    ad.image = 1;
	                                    vue_ad.adList.push(ad);
	                                    vue_ad.showList();
	                                }
	                        });
	                    } else {
	                        toastr.success("新增成功");
	                        vue_ad.adList.push(ad);
	                        vue_ad.showList();
	                    }
	            	}
	            })
    		},
    		updateItem: function(id){
	            var itemData = {
	                name: this.ad.name
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
                                        toastr.success("更新成功");
                                        itemData.id = id
                                        itemData.image = 1;
                                        vue_ad.adList[vue_ad.index] = itemData;
                                        vue_ad.showList();
                                    }
                            });
                        } else {
                            toastr.success("更新成功");
                            vue_ad.adList[vue_ad.index] = itemData;
                            vue_ad.adList[vue_ad.index].id = id;
                            vue_ad.showList();
                        }
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
                                    if (response == "ok") {
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
                                    if (response == "ok") {
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