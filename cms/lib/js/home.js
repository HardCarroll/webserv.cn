$(function(){
  var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html,body");

  // 开始页了解更多按钮#btn_index点击处理过程
  $("#btn_index").click(function() {
    var $btn = $(this).button('loading');
    $.ajax({
      url: "/lib/php/handle.php",
      type: "POST",
      data: "token=indexPage",
      processData: false,
      // contentType: false,  //数据为FormData时contentType必须为false
      success: function(res) {
        $body.removeClass("of-hidden").find("[id='full-screen']").addClass("hidden");
        $("#asidebar").removeClass("hidden");
        $btn.button('reset');
        offTop_navbar_hsd = $("#navbar_hsd").offset().top;
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  });

});