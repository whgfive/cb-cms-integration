const express = require('express')
const path = require('path')
const request = require('request')
const sharp = require('sharp');
const fs = require('fs');
const lodash = require('lodash');

const PORT = process.env.PORT || 5000
var app = express();


var cms_icon,cms_logo,cms_name = "";
var cms_images,cms_partners_json,cms_content=[];
var cms_brand = process.env.cms_brand || 'nto';

fs.readFile('cms-partners.json',
	function(err, data) {		
		var jsonData = data;
		var jsonParsed = JSON.parse(jsonData);
		cms_partners_json = jsonParsed;
		cms_icon = process.env.cms_icon || jsonParsed[0].cms_icon;
		cms_logo = process.env.cms_logo || jsonParsed[0].cms_logo_url;
		cms_name = process.env.cms_name || jsonParsed[0].cms_name;
});

fs.readFile('cb-content.json',
	function(err, data) {		
		var jsonData = data;
		var jsonParsed = JSON.parse(jsonData);
		cms_content = jsonParsed;
		cms_images = lodash.filter(jsonParsed, { 'id': cms_brand })[0].img_src;
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', function(req, res){
	res.render('pages/index', {
		"cms_icon":cms_icon,
		"cms_logo":cms_logo,
		"cms_name":cms_name,
		"cms_images":cms_images
	});
}); 

app.get('/install', function(req, res){
	res.render('pages/install', {
		"cms_content":cms_content,
		"cms_partners":cms_partners_json
	});
}); 

app.get(["/icon.png","/dragIcon.png"], function(req, res) {
   var requestSettings = {
        url: cms_icon,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function(error, response, body) {      
       	sharp(body).resize(40).pipe(res);
    });
});