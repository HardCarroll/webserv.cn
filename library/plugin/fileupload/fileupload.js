;(function($){
  var defaults = {cssFile: "/library/plugin/fileupload/fileupload.css", inputId: "#fileUpload", debug: false, callback: ""};
  var methods = {
    init: function(options) {
      // call init();
      var settings = $.extend({}, defaults, options);

      return $(this).each(function() {
        settings.this = $(this);
        // var _this = $(this);
        // load css file
        var bCssFile = $("head").find("link[href='"+ defaults.cssFile +"']").length;
        if(!bCssFile) {
          $("head").append('<link rel="stylesheet" href="'+defaults.cssFile+'">');
        }
        bCssFile = $("head").find("link[href='"+ settings.cssFile +"']").length;
        if(!bCssFile) {
          $("head").append('<link rel="stylesheet" href="'+settings.cssFile+'">');
        }
        // add buttons
        settings.this.append('<div class="button"><div class="btn btn-default btn-select" data-target="'+settings.inputId+'">选择文件</div><div class="btn btn-success btn-upload">开始上传</div></div>');
        if(!$("body").find(settings.inputId).length) {
          $("body").append('<input type="file" id="'+settings.inputId.slice(1)+'" class="hidden" multiple>');
        }

        settings.this.find(".btn-select").off("click").on("click", function() {
          selectFiles(settings);
        });

        settings.this.find(".btn-upload").off("click").on("click", function() {
          uploadFiles(settings);
        });
      });
    },
    debug: function(msg) {
      console.log(msg);
    }
  };

  $.fn.fileUpload = function(method) {
    // 方法调用
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if(typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    else {
      $.error('Method ' + method + ' does not exist on jQuery.fileUpload');
    }
  };

  function createObjectURL(file) {
    if(window.webkitURL) {
      return window.webkitURL.createObjectURL(file);
    }
    else if(window.URL && window.URL.createObjectURL) {
      return window.URL.createObjectURL(file);
    }
    else {
      return null;
    }
  }

  function selectFiles(settings) {
    $(settings.inputId).click().off("change").on("change", function(e) {
      settings.this.find(".list").remove();
      var ele = $('<div class="list"></div>');
      var files = settings.files = Array.prototype.slice.call(e.target.files);
      for(var i=0; i<files.length; i++) {
        var item = $('<div class="list-item"><div class="controls"></span><span class="glyphicon glyphicon-trash"></span></div><div class="progress hidden"><div class="progress-bar progress-bar-success"></div></div><div class="info"><span class="name"></span></div></div>');
        item.appendTo(ele).css({"background-image": "url("+createObjectURL(files[i])+")"}).find("span.name").html(files[i].name);
      }
      ele.appendTo(settings.this);

      ele.find("span.glyphicon-trash").off("click").on("click", function() {
        files.splice($(this).parent().parent().index(), 1);
        if(files.length) {
          // remove div.list-item
          $(this).parent().parent().remove();
        }
        else {
          // remove div.list
          $(this).parent().parent().parent().remove();
        }

        settings.files = files;
      });
    });
  }

  function uploadFiles(settings) {
    // console.log(settings);
    // settings.this.find(".list-item").eq(0).find(".progress").removeClass("hidden");
    settings.this.find(".progress").removeClass("hidden");

    var fmd = new FormData();
    for(var i=0; i<settings.files.length; i++) {
      // fmd.append("files["+i+"]", settings.files[i]);
    // }
    fmd.append("files", settings.files[i]);
    $.ajax({
      url: "/library/plugin/fileupload/fileupload.php",
      type: "POST",
      data: fmd,
      processData: false,
      contentType: false,
      dataType: "json",
      // context: settings.this.find(".list-item").eq(i),
      xhr: function () {
        myxhr = $.ajaxSettings.xhr();
        if (myxhr.upload) {
          myxhr.upload.addEventListener("progress", function (e) {
            var loaded = e.loaded;
            var total = e.total;
            var percent = Math.floor(loaded / total * 100);
            $(".progress-bar").css("width", percent + "%");
            
          }, false);
        }
        return myxhr;
      },
      success: function (ret) {
        // $(this).find(".progress").addClass("hidden").parent().next().find(".progress").removeClass("hidden");
        console.log(ret);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  }

})(jQuery);