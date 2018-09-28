$(function () {
    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-right",
        "showDuration": "0",
        "hideDuration": "1000",
        "timeOut": "2000",
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
                        vue_user.show.total = false;
                        break;
                    case 2:
                        vue_project.show.total = false;
                        vue_ad.show.total = true;
                        vue_user.show.total = false;
                        break;
                    case 3:
                        vue_project.show.total = false;
                        vue_ad.show.total = false;
                        vue_user.show.total = true;
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
                introduction: ""
            }
        },
        created: function () {
            $.ajax({
                type: "GET",
                url: "/project/all",
                success: function (projects) {
                    vue_project.projects = projects;
                }
            });
        },
        methods: {
            showProject: function (index) {
                vue_project.index = index;
                vue_project.project = vue_project.projects[index];
                vue_project.show.list = false;
                vue_project.show.form = true;
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
                    introduction: ""
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
                    introduction: this.project.introduction
                };
                $.ajax({
                    url: "/project/add",
                    data: projectData,
                    method: "POST",
                    success: function (project) {
                        toastr.success("新增成功");
                        vue_project.projects.push(project);
                        vue_project.showList();
                    }
                })
            },
            updateProject: function (id) {
                var updateProject = {
                    name: this.project.name,
                    subtitle: this.project.subtitle,
                    duration: this.project.duration,
                    mission: this.project.duration,
                    introduction: this.project.introduction
                };
                $.ajax({
                    url: "/project/update/" + id,
                    method: "POST",
                    data: updateProject,
                    success: function (msg) {
                        toastr.success(msg);
                        vue_project.projects[vue_project.index] = updateProject;
                        vue_project.projects[vue_project.index].id = id;
                        vue_project.showList();
                    }
                });
            },
            deleteProject: function (id) {
                $.ajax({
                    url: "/project/delete/" + id,
                    method: "DELETE",
                    success: function (msg) {
                        toastr.success(msg);
                        vue_project.projects.splice(vue_project.index, 1);
                        vue_project.showList();
                    }
                })
            }
        }
    });

    // vue advertisement list
    var vue_ad = new Vue({
        el: "#backend_ad",
        data: {
            show: {
                total: false
            },
            ad: [],
        },
        created: function () {
            // $.ajax({
            // 	type: "GET",
            // 	url:"/ad/all",
            // 	success: function(projects){
            // 		vue_project_list.projects = projects;
            // 	}
            // })
        },
        methods: {
            add_ad: function () {
                $('.function_main').hide();
                $('#ad_project').show();
                vue_project.clean_data();
            },
            show_ad: function (id) {
                $.ajax({
                    type: "GET",
                    url: "/project/" + id,
                    success: function (project) {
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
            refresh_ad: function () {
                this.projects = [];
                $.ajax({
                    type: "GET",
                    url: "/ad/all",
                    success: function (projects) {
                        vue_project_list.projects = projects;
                    }
                })
            }
        }
    });

    var vue_user = new Vue({
        el: "#backend_user",
        data: {
            show: {
                "total": false
            }
        },
        methods: {
        }
    });

    // semantic ui's function
    // - table style
    $('.special.cards .image').dimmer({
        on: 'hover'
    });
});