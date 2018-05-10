<?php
$cms_icon = getenv('cms_icon');

$fp = fopen($cms_icon, 'r');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($fp));

//fpassthru($fp);
echo strlen($fp);
?>