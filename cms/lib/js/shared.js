$(function(){
  var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html,body");
  var offTop_navbar_hsd = $("#navbar_hsd").offset().top;
  var height_navbar_hsd = $("#navbar_hsd").outerHeight();

  // $('[data-toggle="popover"]').popover();
  // $('[data-toggle="popover"]').each(function () {
  //   $(this).popover({
  //     trigger: 'manual',
  //     placement: 'top', //top, bottom, left or right
  //     html: true,
  //     title: 'tips',
  //     delay: {'show': 0, 'hide': 2000}
  //   });
  //   $(this).click(function() {
  //     // console.log("click");
  //     $(this).popover("show");
  //   });
  // });

  // 解决移动端下点其他地方不失焦的问题
  $("body").on("touchend", function(e){
    if(e.target !== "input") {
      $("input").blur();
    }
  });

  if ($(window).width() < 768) {
    $("#pageFooter").css({paddingBottom: "50px"});
    $("#asidebar_tools").css({bottom: "115px"});
  }
  else {
    $("#pageFooter").css({paddingBottom: "0"});
    $("#asidebar_tools").css({bottom: "65px"});
  }

  if ($(document).scrollTop() >= $(".navbar-hsd>.container-fluid").outerHeight()) {
    $("#tools_bottom").removeClass("hidden");
  }
  else {
    $("#tools_bottom").addClass("hidden");
  }

  $("#btn_consult").on("click", function() {
    var $btn = $(this).button('loading');
    var type = $("#consult select[name='type']").val();
    var area = $("#consult input[name='area']").val();
    var phone = $("#consult input[name='phone']").val();
    var jsonData = '"type":"'+type+'","area":"'+area+'","phone":"'+phone+'"';
    
    var fmdConsult = new FormData();
    fmdConsult.append("token", "consult");
    fmdConsult.append("consultData", jsonData);
    $.ajax({
      url: "/lib/php/handle.php",
      type: "POST",
      data: fmdConsult,
      dataType: "json",
      processData: false,
      contentType: false,  //数据为FormData时contentType必须为false
      success: function(res) {
        var result = JSON.parse(res);
        $("#btn_consult").popover({
          trigger: 'manual',
          placement: 'top',
          html: true,
          title: 'Tips',
          content: result.err_code}).popover("show").on('shown.bs.popover', function(){
          setTimeout(function(){$("#btn_consult").popover('destroy')}, 3000);
        });
        $btn.button('reset');
        console.log(result);
      },
      error: function(msg) {
        console.log(msg);
      }
    });
    // console.log("type: "+type+"; area: "+area+"; phone: "+phone);
  });

  // 窗口resize事件处理过程
  $(window).resize(function() {
    offTop_navbar_hsd = $("#navbar_hsd").offset().top;
    height_navbar_hsd = $("#navbar_hsd").outerHeight();
    if ($(window).width() < 768) {
      $("#pageFooter").css({paddingBottom: "50px"});
      $("#asidebar_tools").css({bottom: "115px"});
    }
    else {
      $("#pageFooter").css({paddingBottom: "0"});
      $("#asidebar_tools").css({bottom: "65px"});
    }
  });

  // 窗口scroll事件处理过程
  $(window).scroll(function() {
    // 导航栏#navbar_hsd随滚动切换position: fixed和relative状态
    if ($(window).width() >= 768) {
      if ($(document).scrollTop() >= offTop_navbar_hsd) {
        if (!$("#navbar_hsd").hasClass("fixed fixed-top")) {
          $("#navbar_hsd").addClass("fixed fixed-top").css({opacity: 0.9});
          $("#pageContent").css({paddingTop: height_navbar_hsd});
        }
      }
      else {
        if ($("#navbar_hsd").hasClass("fixed fixed-top")) {
          $("#navbar_hsd").removeClass("fixed fixed-top").css({opacity: 1.0});
          $("#pageContent").css({paddingTop: 0});
        }
      }
    }
    // 侧边栏按钮#btn_backtop回到顶部的显示和隐藏
    if ($(document).scrollTop() >= $(window).height()) {
      $("li#btn_backtop").removeClass("hidden");
      $("#tools_bottom").removeClass("hidden");
    }
    else {
      $("li#btn_backtop").addClass("hidden");
      $("#tools_bottom").addClass("hidden");
    }
    // 移动端下底部导航工具条#tools_bottom的显示与隐藏
    if ($(document).scrollTop() >= $(".navbar-hsd>.container-fluid").outerHeight()) {
      $("#tools_bottom").removeClass("hidden");
    }
    else {
      $("#tools_bottom").addClass("hidden");
    }
    
    // console.log($(window).height());
  });

  // 返回顶部按钮#btn_backtop处理过程
  $("#btn_backtop").click(function() {
    $body.animate({scrollTop: 0}, 300);
  });

});

function scrollTo(target) {
  var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $("html") : $("body")) : $("html,body");
  $body.animate({scrollTop: $(target).offset().top}, 600, function(){
    $(this).removeClass("of-hidden").find("[id='full-screen']").addClass("hidden");
    // 解决Safari浏览器滚动BUG
    $(this).animate({scrollTop: 0}, 0);
  });
}

/**
 * 获取指定cookie键的值
 * @param key 指定要获取的cookie键
*/
function getCookie(key) {
  var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)) {
    return unescape(arr[2]);
  }
  else {
    return null;
  }
}

/**
 * 设置浏览器Cookie，默认不设置过期时间，浏览器关闭时清除
 * @param key cookie键
 * @param value cookie值
 * @param expires cookie过期时间，以秒为单位，默认为0，即不设置过期时间，浏览器关闭时清除
*/
function setCookie(key, value, expires=0) {
  var cookie = key + "=" + escape(value);
  if (expires) {
    var date = new Date();
    date.setTime(date.getTime()+expires*1000);
    cookie = cookie + ";expires=" + date.toGMTString();
  }
  document.cookie = cookie;
}

/**
 * 清除指定cookie键的值
 * @param key 指定要清除的cookie键
**/
function delCookie(key) {
  var date = new Date();
  date.setTime(date.getTime() - 1000);
  document.cookie = key + "='';expires=" + date.toGMTString();
}