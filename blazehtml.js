var MetaTitlePlaceholder = '%%META_TITLE%%';
var MetaDescriptionPlaceholder = '%%META_DESCRIPTION%%';
var MetaImageURLPlaceholder = '%%META_IMAGE_URL%%';
var URLPlaceholder = '%%URL%%';

function createHTML(){
  var HTML = '';
  HTML = addHead(HTML);
  HTML = addBody(HTML);
  HTML = wrapUp(HTML);
  return HTML;
};

function addHead(HTML){
  HTML += '<head>';
  HTML += '<title>Blaze</title>';
  //jquery,bootstrap
  HTML += '<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>';
  HTML += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>';
  HTML += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">';
  //custom javascript
  HTML += '<script>';
  HTML += 'function detectPlatform(){var userAgent = window.navigator.userAgent; var iOS = userAgent.match(/iPad/i) || userAgent.match(/iPhone/i); var chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); if (!!iOS) {console.log("---- IOS ----");window.location.replace("' + URLPlaceholder + '");} else if (!!chrome) {console.log("---- CHROME ----");} else {}}; detectPlatform();';
  HTML += '</script>';
  //css
  HTML += '<script src="https://use.fontawesome.com/a302c3bc77.js"></script>';
  HTML += '<link rel="stylesheet" href="https://cdn0ntb.blaze.im/styles.css" >';
  /*
  HTML += '<style type="text/css">';
	HTML += 'body { padding-top:50px; } ';
	HTML += 'div.topbar { position:fixed; height:60px; background-color:#095f6b; width:100%; } ';
	HTML += 'div.caroselContainer { margin-top:60px; } ';
	HTML += 'ol.carousel-indicators { position: fixed; top: 20px; bottom:auto; } ';
	HTML += 'ol.carousel-indicators li { width: 7px; height: 7px; margin:1px;	} ';
	HTML += 'ol.carousel-indicators li.active { width: 7px; height: 7px; } ';
	HTML += 'a.carousel-control { background-image:none; } ';
	HTML += '.carousel-control span { font-family: cursive;	text-align: center; position: relative; top: 25%; -webkit-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%);	} ';
  HTML += '</style>';
  */
  //meta
  HTML += '<meta charset="UTF-8">';
  HTML += '<meta name="viewport" content="width=device-width, initial-scale=1" />';
  HTML += '<meta name="description" content="' + MetaDescriptionPlaceholder + '">';
  HTML += '<meta property="og:title" content="' + MetaTitlePlaceholder + '">';
  HTML += '<meta property="og:description" content="' + MetaDescriptionPlaceholder + '">';
  HTML += '<meta property="og:image" itemprop="image" content="' + MetaImageURLPlaceholder + '">';
  HTML += '<meta name="twitter:card" content="summary_large_image"/>';
  HTML += '<meta name="twitter:title" content="' + MetaTitlePlaceholder + '"/>';
  HTML += '<meta name="twitter:description" content="' + MetaDescriptionPlaceholder + '"/>';
  HTML += '<meta name="twitter:image" content="' + MetaImageURLPlaceholder + '"/>';
  HTML += '</head>';
  return HTML;
}

function addBody(HTML){
  HTML += '<body style="padding:0;margin:0;overflow:hidden;">';
	HTML += '<div class="topbar">';
	HTML += '<a class="left carousel-control" href="#Carousel" data-slide="prev"><span><i class="fa fa-angle-left" aria-hidden="true"></i></span></a>';
	HTML += '<a class="right carousel-control" href="#Carousel" data-slide="next"><span><i class="fa fa-angle-right" aria-hidden="true"></i></span></a>';
	HTML += '</div>';
	//carousel
	HTML += '<div id="Carousel" class="caroselContainer carousel slide" data-ride="carousel" data-interval="false" data-wrap="false">';
	HTML += '<ol class="carousel-indicators">';
  HTML += '<li data-target="#Carousel" data-slide-to="0" class="active Carousel-target"></li>';
  HTML += '<li data-target="#Carousel" data-slide-to="1" class="Carousel-target"></li>';
  HTML += '<li data-target="#Carousel" data-slide-to="2" class="Carousel-target"></li>';
  HTML += '</ol>';
	HTML += '<div class="carousel-inner">'
  //item 0
  HTML += '<div data-slide-no="0" class="item active">';
  HTML += '<iframe style="margin:0;width:100%;height:100%;border:0px solid white;" src="' + URLPlaceholder + '" allowfullscreen></iframe>';
  HTML += '</div>';
  //item 1
  HTML += '<div data-slide-no="1" class="item">';
  HTML += '<iframe style="margin:0;width:100%;height:100%;border:0px solid white;" src="' + URLPlaceholder + '" allowfullscreen></iframe>';
  HTML += '</div>';
  //item 2
  HTML += '<div data-slide-no="2" class="item">';
  HTML += '<iframe style="margin:0;width:100%;height:100%;border:0px solid white;" src="' + URLPlaceholder + '" allowfullscreen></iframe>';
  HTML += '</div>';
  HTML += '</div>';
  HTML += '</div>';
  //end of carousel
  HTML += '</body>';
  return HTML;
}

function wrapUp(HTML){
  HTML = '<html style="padding:0;margin:0;overflow:hidden;">' + HTML;
  HTML += '</html>';
  return HTML;
}

module.exports = {
  placeholders : {
    metaTitle : MetaTitlePlaceholder,
    metaDescription : MetaDescriptionPlaceholder,
    metaImageURL : MetaImageURLPlaceholder,
    url : URLPlaceholder
  },
  html : createHTML()
};
