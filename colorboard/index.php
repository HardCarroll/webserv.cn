<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Board</title>
  <link rel="stylesheet" href="/library/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="./colorboard.css">
</head>
<body>
  <div class="board">
    <!-- <div class="container-fluid row"> -->
      <?php
      $color_json = file_get_contents($_SERVER["DOCUMENT_ROOT"]."/colorboard/colorboard.json");
      $color_array = json_decode($color_json, TRUE);
      for($col=0; $col<5; $col++) {
        echo '<div class="column">';
        for($row=0; $col+$row*5<count($color_array); $row++) {
          $item = $color_array[$col+$row*5];
          echo '<div class="item" data-color="'.$item["value"].'"><span class="name">'.$item["name"].'</span><span class="value">'.$item["value"].'</span></div>';
        }
        echo '</div>';
      }
      ?>
    <!-- </div> -->
  </div>
  <script src="/library/jquery/jquery.min.js"></script>
  <script>
    $(function() {
      $(".board .item").each(function() {
        $(this).css({"background-color": $(this).attr("data-color")});
      });
    });
  </script>
</body>
</html>