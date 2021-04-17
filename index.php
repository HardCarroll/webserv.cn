<?php
$article_json = '[{"url": "/colorboard/index.php", "title": "色卡丨多种颜色，总有一种是你想要找的"}]';
$article_array = json_decode($article_json, TRUE);
?>
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>积硅步，以至千里</title>
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="/library/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="/include/css/home.min.css">
</head>

<body>
  <div class="layer">
    <div class="index glyphicon">
      <div class="inner">
        <?php
        echo '<ul class="article">';
        for($i=0; $i<count($article_array); $i++) {
          echo '<li class="text-ellipsis item"><a href="'.$article_array[$i]["url"].'">'.$article_array[$i]["title"].'</a></li>';
        }
        echo '</ul>';
        ?>
      </div>
    </div>
    <div class="hello">
      <span>hello</span>
      <span>world</span>
    </div>
    <div class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank"><img src="/media/images/icp.jpg">湘ICP备18017808号-2</a>
    </div>
  </div>
</body>

<script src="/library/jquery/jquery.min.js"></script>
<script>
  $(function() {
    $(".index").off("click").on("click", function() {
      $(this).toggleClass("active")
    });
  });
</script>

</html>