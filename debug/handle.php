<?php
$ret = file_get_contents($_SERVER["DOCUMENT_ROOT"]."/debug/debug.json");
// echo json_encode($ret, 320);
echo $ret;