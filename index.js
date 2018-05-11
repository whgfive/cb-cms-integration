const express = require('express')
const path = require('path')
const request = require('request')
//const sharp = require('sharp');

const PORT = process.env.PORT || 5000
var app = express();

const cms_icon = process.env.cms_icon||'https://cdn.iconscout.com/public/images/icon/free/png-256/sitecore-logo-3ddc9d97c71aab37-256x256.png';
const cms_logo = process.env.cms_logo||'https://www.sitecore.com/-/media/www/images/legal/sitecore1.jpg?la=en&hash=35BB41A72D7B3D5CB6E7F2250DE1A05E9D86D35F';
const cms_name = process.env.cms_name||'Sitecore CMS';

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => res.render('pages/index'));

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