<?php
$cms_icon = getenv('cms_icon');
$ch = curl_init($cms_icon);    

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$data = curl_exec($ch);
curl_close($ch);

if ($data === false) {
        die('cURL failed');
}

header('Content-Type: image/png');
header('Content-Length: ' . curl_getinfo( $ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD ) );
echo $data;
?>
