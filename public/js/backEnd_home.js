"use strict";

var Dashboard = function () {
	var global = {
		tooltipOptions: {
			placement: "right"
		},
		menuClass: ".c-menu"
	};

	var menuChangeActive = function menuChangeActive(el) {
		var hasSubmenu = $(el).hasClass("has-submenu");
		$(global.menuClass + " .is-active").removeClass("is-active");
		$(el).addClass("is-active");

		// if (hasSubmenu) {
		// 	$(el).find("ul").slideDown();
		// }
	};

	var sidebarChangeWidth = function sidebarChangeWidth() {
		var $menuItemsTitle = $("li .menu-item__title");

		$("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
		$(".hamburger-toggle").toggleClass("is-opened");

		if ($("body").hasClass("sidebar-is-expanded")) {
			$('[data-toggle="tooltip"]').tooltip("destroy");
		} else {
			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
		}
	};

	return {
		init: function init() {
			$(".js-hamburger").on("click", sidebarChangeWidth);

			$(".js-menu li").on("click", function (e) {
				menuChangeActive(e.currentTarget);
			});

			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
		}
	};
}();

// Dashboard.init();
//# sourceURL=backEnd-home.js

// customize
$(document).ready(function() {
	Dashboard.init();
})

var crop_max_width = 400;
var crop_max_height = 400;
var jcrop_api;
var canvas;
var context;
var image;
var prefsize;

var fix = {"w": 0, "h": 0}; // 固定比例後的大小
var oringin; // 用來回到以前的照片

// crop code
$(document).ready(function() {

	$('#reCrop').click(function() {
		loadImage(origin);
	})

  $("#cover").change(function() {
      loadImage(this);
      origin = this;
  });

  function loadImage(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          canvas = null;
          reader.onload = function(e) {
              image = new Image();
              image.onload = validateImage;
              image.src = e.target.result;
          }
          reader.readAsDataURL(input.files[0]);
      }
  }

  function dataURLtoBlob(dataURL) {
      var BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
          var parts = dataURL.split(',');
          var contentType = parts[0].split(':')[1];
          var raw = decodeURIComponent(parts[1]);

          return new Blob([raw], {
              type: contentType
          });
      }
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {
          type: contentType
      });
  }

  function validateImage() {
      if (canvas != null) {
          image = new Image();
          image.onload = restartJcrop;
          image.src = canvas.toDataURL('image/png');
      } else restartJcrop();
  }

  function restartJcrop() {
      if (jcrop_api != null) {
          jcrop_api.destroy();
      }
      $("#views").empty();
      $("#views").append("<canvas id=\"canvas\">");
      canvas = $("#canvas")[0];
      context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      calRatio(image, {"w": 4, "h": 3}, fix);

      $("#canvas").Jcrop({
          onSelect: selectcanvas,
          onRelease: clearcanvas,
          boxWidth: crop_max_width,
          boxHeight: crop_max_height,
          allowResize: false
      }, function() {
          jcrop_api = this;
          this.animateTo([0, 0, fix.w, fix.h]);
      });
      clearcanvas();
  }

  function clearcanvas() {
      prefsize = {
          x: 0,
          y: 0,
          w: fix.w,
          h: fix.h
      };
  }

  function selectcanvas(coords) {
      prefsize = {
          x: Math.round(coords.x),
          y: Math.round(coords.y),
          w: fix.w,
         	h: fix.h
      };
  }

  function applyCrop() {
      canvas.width = prefsize.w - 1; // avoid the overlap width
      canvas.height = prefsize.h - 1; // avoid the overlap height
      context.drawImage(image, prefsize.x, prefsize.y, prefsize.w, prefsize.h, 0, 0, canvas.width, canvas.height);
      validateImage();
  }

  $("#cropbutton").click(function(e) {
      applyCrop();
  });

  $("#upload").on('click', function() {
      var formData = new FormData($("#form")[0]);
      var blob = dataURLtoBlob(canvas.toDataURL('image/png'));
      formData.set("cover", blob); //
      $.ajax({
        url: "/admin/upload",
        type: "POST",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
        	console.log(data);
        },
      });
  });
});

function calRatio(old, ratio, fix){
	if (old.height * (ratio.w / ratio.h) < old.width){
		fix.w = old.height * (ratio.w / ratio.h);
		fix.h = old.height;
	}
	else{
		fix.w = old.width;
		fix.h = old.width * (ratio.h / ratio.w);
	}
}