$(function() {
  toastr.options = {
	"closeButton": true,
	"positionClass": "toast-top-right",
	"showDuration": "0",
	"hideDuration": "1000",
	"timeOut": "2000",
	"extendedTimeOut": "1000"
  }

  // vue project list
	var vue_project_list = new Vue({
		el: "#backend_project_list",
		data: {
			projects:[],
		},
		created:function(){
			$.ajax({
				type: "GET",
				url:"/project/all",
				success: function(projects){
					vue_project_list.projects = projects;
				}
			})
		},
		methods:{
			add_project: function() {
				$('.function_main').hide();
				$('#backend_project').show();
				vue_project.clean_data();
			},
			show_project: function(id) {
				$.ajax({
					type: "GET",
					url:"/project/" + id,
					success: function(project){
						vue_project.id = project.id;
						vue_project.name = project.name;
						vue_project.subtitle = project.subtitle;
						vue_project.duration = project.duration;
						vue_project.mission = project.mission;
						vue_project.introduction = project.introduction;
					}
				})
				$('.function_main').hide();
				$('#backend_project').show();
			},
			refresh_project: function(){
				this.projects = [];
				$.ajax({
					type: "GET",
					url:"/project/all",
					success: function(projects){
						vue_project_list.projects = projects;
					}
				})
			}
		}
	});

	// vue project conten
	var vue_project = new Vue({
		el: "#backend_project",
		data:{
			id:"",
			name: "",
			subtitle: "",
			duration: "",
			mission: "",
			introduction: "",
		},
		methods:{
			back_to_list: function() {
				$('.function_main').hide();
				$('#backend_project_list').show();
			},
			add_project: function() {
				var new_project = {
					name: this.name,
					subtitle: this.subtitle,
					duration: this.duration,
					mission: this.duration,
					introduction: this.introduction
				};
				$.ajax({
					url: "/project/add",
					data: new_project,
					method: "POST",
					success: function(new_project) {
						vue_project_list.projects.push(new_project);
						toastr.success("???????ɹ?");
					}
				})
				this.back_to_list();
			},
			clean_data: function() {
				this.id = "";
				this.name = "";
				this.subtitle = "";
				this.duration = "";
				this.mission = "";
				this.introduction = "";
			},
			update_project: function(id){
				var update_project = {
					name: this.name,
					subtitle: this.subtitle,
					duration: this.duration,
					mission: this.duration,
					introduction: this.introduction
				};
				$.ajax({
					url: "/project/update/" + id,
					method: "POST",
					data: update_project,
					success: function(msg) {
						toastr.success(msg);
					}
				})
				vue_project_list.refresh_project();
				$('.function_main').hide();
				$('#backend_project_list').show();
			},
			delete_project: function(id){
				$.ajax({
					url: "/project/delete/" + id,
					method: "GET",
					success: function(msg) {
						toastr.success(msg);
					}
				})
				vue_project_list.refresh_project();
				$('.function_main').hide();
				$('#backend_project_list').show();
			}
		}
	});

  // vue advertisement list
	var vue_ad_list = new Vue({
		el: "#backend_ad_list",
		data: {
			ad:[],
		},
		created:function(){
			// $.ajax({
			// 	type: "GET",
			// 	url:"/ad/all",
			// 	success: function(projects){
			// 		vue_project_list.projects = projects;
			// 	}
			// })
		},
		methods:{
			add_ad: function() {
				$('.function_main').hide();
				$('#ad_project').show();
				vue_project.clean_data();
			},
			show_ad: function(id) {
				$.ajax({
					type: "GET",
					url:"/project/" + id,
					success: function(project){
						vue_project.id = project.id;
						vue_project.name = project.name;
						vue_project.subtitle = project.subtitle;
						vue_project.duration = project.duration;
						vue_project.mission = project.mission;
						vue_project.introduction = project.introduction;
					}
				})
				$('.function_main').hide();
				$('#backend_project').show();
			},
			refresh_ad: function(){
				this.projects = [];
				$.ajax({
					type: "GET",
					url:"/ad/all",
					success: function(projects){
						vue_project_list.projects = projects;
					}
				})
			}
		}
	});

	// vue ad conten
	// var vue_ad = new Vue({
	// 	el: "#backend_ad",
	// 	data:{
	// 		id:"",
	// 	},
	// 	methods:{
	// 		back_to_list: function() {
	// 			$('.function_main').hide();
	// 			$('#backend_project_list').show();
	// 		},
	// 		add_project: function() {
	// 			var new_project = {
	// 				name: this.name,
	// 				subtitle: this.subtitle,
	// 				duration: this.duration,
	// 				mission: this.duration,
	// 				introduction: this.introduction
	// 			};
	// 			$.ajax({
	// 				url: "/project/add",
	// 				data: new_project,
	// 				method: "POST",
	// 				success: function(new_project) {
	// 					vue_project_list.projects.push(new_project);
	// 					toastr.success("???????ɹ?");
	// 				}
	// 			})
	// 			this.back_to_list();
	// 		},
	// 		clean_data: function() {
	// 			this.id = "";
	// 			this.name = "";
	// 			this.subtitle = "";
	// 			this.duration = "";
	// 			this.mission = "";
	// 			this.introduction = "";
	// 		},
	// 		update_project: function(id){
	// 			var update_project = {
	// 				name: this.name,
	// 				subtitle: this.subtitle,
	// 				duration: this.duration,
	// 				mission: this.duration,
	// 				introduction: this.introduction
	// 			};
	// 			$.ajax({
	// 				url: "/project/update/" + id,
	// 				method: "POST",
	// 				data: update_project,
	// 				success: function(msg) {
	// 					toastr.success(msg);
	// 				}
	// 			})
	// 			vue_project_list.refresh_project();
	// 			$('.function_main').hide();
	// 			$('#backend_project_list').show();
	// 		},
	// 		delete_project: function(id){
	// 			$.ajax({
	// 				url: "/project/delete/" + id,
	// 				method: "GET",
	// 				success: function(msg) {
	// 					toastr.success(msg);
	// 				}
	// 			})
	// 			vue_project_list.refresh_project();
	// 			$('.function_main').hide();
	// 			$('#backend_project_list').show();
	// 		}
	// 	}
	// });

  // vue people list
	// var vue_people_list = new Vue({
	// 	el: "#backend_people_list",
	// 	data: {
	// 		people:[],
	// 	},
	// 	created:function(){
	// 		// $.ajax({
	// 		// 	type: "GET",
	// 		// 	url:"/ad/all",
	// 		// 	success: function(projects){
	// 		// 		vue_project_list.projects = projects;
	// 		// 	}
	// 		// })
	// 	},
	// 	methods:{
	// 		add_ad: function() {
	// 			$('.function_main').hide();
	// 			$('#people_project').show();
	// 			vue_people.clean_data();
	// 		},
	// 		show_people: function(id) {
	// 			$.ajax({
	// 				type: "GET",
	// 				url:"/project/" + id,
	// 				success: function(project){
	// 					vue_project.id = project.id;
	// 					vue_project.name = project.name;
	// 					vue_project.subtitle = project.subtitle;
	// 					vue_project.duration = project.duration;
	// 					vue_project.mission = project.mission;
	// 					vue_project.introduction = project.introduction;
	// 				}
	// 			})
	// 			$('.function_main').hide();
	// 			$('#backend_project').show();
	// 		},
	// 		refresh_people: function(){
	// 			this.people = [];
	// 			$.ajax({
	// 				type: "GET",
	// 				url:"/people/all",
	// 				success: function(people){
	// 					vue_people_list.people = people;
	// 				}
	// 			})
	// 		}
	// 	}
	// });

	// // vue people conten
	// var vue_people = new Vue({
	// 	el: "#backend_people",
	// 	data:{
	// 		id:"",
	// 	},
	// 	methods:{
	// 		back_to_list: function() {
	// 			$('.function_main').hide();
	// 			$('#backend_people_list').show();
	// 		},
	// 		add_people: function() {
	// 			var new_person = {
	// 				name: this.name,
	// 				subtitle: this.subtitle,
	// 				duration: this.duration,
	// 				mission: this.duration,
	// 				introduction: this.introduction
	// 			};
	// 			$.ajax({
	// 				url: "/people/add",
	// 				data: new_person,
	// 				method: "POST",
	// 				success: function(new_project) {
	// 					vue_project_list.projects.push(new_project);
	// 					toastr.success("???????ɹ?");
	// 				}
	// 			})
	// 			this.back_to_list();
	// 		},
	// 		clean_data: function() {
	// 			this.id = "";
	// 			this.name = "";
	// 			this.subtitle = "";
	// 			this.duration = "";
	// 			this.mission = "";
	// 			this.introduction = "";
	// 		},
	// 		update_person: function(id){
	// 			var update_person = {
	// 				name: this.name,
	// 				subtitle: this.subtitle,
	// 				duration: this.duration,
	// 				mission: this.duration,
	// 				introduction: this.introduction
	// 			};
	// 			$.ajax({
	// 				url: "/people/update/" + id,
	// 				method: "POST",
	// 				data: update_person,
	// 				success: function(msg) {
	// 					toastr.success(msg);
	// 				}
	// 			})
	// 			vue_project_list.refresh_project();
	// 			$('.function_main').hide();
	// 			$('#backend_project_list').show();
	// 		},
	// 		delete_person: function(id){
	// 			$.ajax({
	// 				url: "/people/delete/" + id,
	// 				method: "GET",
	// 				success: function(msg) {
	// 					toastr.success(msg);
	// 				}
	// 			})
	// 			vue_people_list.refresh_people();
	// 			$('.function_main').hide();
	// 			$('#backend_people_list').show();
	// 		}
	// 	}
	// });

	// semantic ui's function

	//// - sibar change
	$('#sidebar .item').on('click', function() {
		var open_function = $(this).attr('name');
		$('.function_main').hide();
		$('.function_main[name=' + open_function + ']').show();
		if( !$(this).hasClass('active')){
			$('.item').removeClass('active');
			$(this).addClass('active');
		}
	})

	//// - tab change
	$('.menu .item').tab();

	//// - table style
	$('.special.cards .image').dimmer({
	  on: 'hover'
	});
});