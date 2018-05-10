<?php
$cms_icon = getenv('cms_icon');
$fp = fopen($cms_icon, 'rb');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($fp));

//fpassthru($fp);
echo filesize($fp);
?>