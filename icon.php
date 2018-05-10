<?php
$cms_icon = getenv('cms_icon');
$fp = fopen($cms_icon, 'rb');

/header("Content-Type: image/png");
header("Content-Length: " . filesize($cms_icon));

fpassthru($fp);