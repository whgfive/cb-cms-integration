const express = require('express')
const path = require('path')
const request = require('request')
const sharp = require('sharp');
var fs = require('fs');

const PORT = process.env.PORT || 5000
var app = express();


var cms_icon,cms_logo,cms_name = "";
fs.readFile('cms-partners.json',
	function(err, data) {		
		var jsonData = data;
		var jsonParsed = JSON.parse(jsonData);
		cms_icon = process.env.cms_icon || jsonParsed.sitecore.cms_icon;
		cms_logo = process.env.cms_logo || jsonParsed.sitecore.cms_logo_url;
		cms_name = process.env.cms_name || jsonParsed.sitecore.cms_name;
});

var cms_images=[];
fs.readFile('cb-content.json',
	function(err, data) {		
		var jsonData = data;
		var jsonParsed = JSON.parse(jsonData);
		cms_images = jsonParsed.travel.img_src;
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