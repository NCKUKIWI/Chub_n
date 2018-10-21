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
        			console.log(vue_banner.bannerList);
        		}
            })
		},
		methods:{
			bannerSwitch: function(next_index) {
				console.log(next_index);
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
			nowProject: {
                id: "",
                name: "",
                subtitle: "",
                duration: "",
                mission: "",
                introduction: "",
                url: "",
			}
		},
		methods: {
			showProject: function() {

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
			showAllProject: function() {
				vue_project_main.showAllProject();
				$( ".project_main" ).addClass( "on" );
			},
			showProject: function(index){
				$( ".project_list_full" ).removeClass( "now" );
        		$( ".project_item_full" ).addClass( "now" );
			}
		},
		async mounted() {
			AOS.init();
		}
	})
});