$(function() {

    toastr.options = {
		"closeButton": true,
		"positionClass": "toast-top-right",
		"showDuration": "0",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000"
    }

    var heading = new Vue({
        el:"#form-heading",
        data: {
            isLogin: true,
            isSignup: false
        },
        methods: {
            changeTab: function () {
                if (this.isLogin) {
                    $("#register-form").delay(100).fadeIn(100);
                    $("#login-form").fadeOut(100);
                    this.isLogin = false;
                    this.isSignup = true;
                } else {
                    $("#login-form").delay(100).fadeIn(100);
                    $("#register-form").fadeOut(100);
                    this.isLogin = true;
                    this.isSignup = false;
                }
            }
        }
    });

    var login = new Vue({
        el:"#login-form",
        data: {
            username:"",
            password:""
        },
        methods: {
            login: function () {
                console.log(this.password.length < 6);
                if (this.username == "" && this.password == "") {
                    toastr.error("請輸入帳號與密碼");
                    return;
                }
                if (this.username.length < 5) {
                    toastr.error("帳號長度至少 5 碼");
                    return;
                }
                if (this.password.length < 6) {
                    toastr.error("密碼長度需至少 6 碼");
                    return;
                }
                $.ajax({
                    url: '/users/auth',
                    type: 'POST',
                    data: {
                        'username': this.username,
                        'password': this.password
                    },
                    success: function(response) {
                        if (response == "ok") {
                            toastr.success("登入成功");
                            setTimeout(function(){
                                location.href = "/admin";
                            }, 1500);
                        } else {
                            toastr.warning(response);
                        }
                    }
                });
            }
        }
    });

    var register = new Vue({
        el:"#register-form",
        data: {
            email:"",
            username:"",
            password:"",
            confirmpassword:""
        },
        methods: {
            register: function () {
                console.log(this.password.length < 6);
                if (this.username == "" && this.password == "") {
                    toastr.error("請輸入帳號與密碼");
                    return;
                }
                if (this.email == "") {
                    toastr.error("請輸入Email");
                    return;
                }
                if (this.username.length < 5) {
                    toastr.error("帳號長度至少 5 碼");
                    return;
                }
                if (this.password.length < 6) {
                    toastr.error("密碼長度需至少 6 碼");
                    return;
                }
                if (this.password != this.confirmpassword) {
                    toastr.error("兩次輸入的密碼不一致");
                    return;
                }
                $.ajax({
                    url: '/users',
                    type: 'POST',
                    data: {
                        'email': this.email,
                        'username': this.username,
                        'password': this.password,
                        'confirmpassword': this.confirmpassword,
                    },
                    success: function(response) {
                        if (response == "ok") {
                            toastr.success("註冊成功");
                            setTimeout(function(){
                                location.href = "/admin/login";
                            }, 1500);
                        } else {
                            toastr.warning(response);
                        }
                    }
                });
            }
        }
    });
});
