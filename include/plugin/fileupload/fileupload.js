$(function() {
  $("#fileupload").click(function() {
    $("#upload").click();
  });
  $("#upload").off("change").on("change", function(e) {
    var fmd = new FormData();
    for (var i=0; i<e.target.files.length; i++) {
      var ele = $('<li class="list-item"><span class="file-name"></span><span class="seperator"> / </span><span class="file-size"></span><span class="progress"></span></li>');
      ele.find(".file-name").html(e.target.files[i].name);
      ele.find(".file-size").html(Math.floor(e.target.files[i].size/1024) + "Kb");
      $(".file-list").append(ele);
      fmd.append("files["+i+"]", e.target.files[i]);
    }

    $.ajax({
      url: "/include/plugin/fileupload/fileupload.php",
      type: "POST",
      data: fmd,
      processData: false,
      contentType: false,
      dataType: "json",
      xhr: function() {
        myxhr = $.ajaxSettings.xhr();
        if(myxhr.upload) {
          myxhr.upload.addEventListener("progress", function(e) {
            var loaded = e.loaded;
            var total = e.total;
            var percent = Math.floor(loaded/total*100);
            $(".progress").css("width",percent+"%");
          }, false);
        }
        return myxhr;
      },
      success: function(ret) {
        console.log(ret);
      },
      error: function(err) {
        console.log(err);
      }
    });

  });
});