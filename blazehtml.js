var Util = require('./util.js');
var MetaTitlePlaceholder = '%%META_TITLE%%';
var MetaDescriptionPlaceholder = '%%META_DESCRIPTION%%';
var MetaImageURLPlaceholder = '%%META_IMAGE_URL%%';
var URLPlaceholder = '%%URL%%';

function createHTML(metadata){
  var HTML = '';
  HTML = addHead(HTML);
  HTML = addBody(HTML,metadata);
  HTML = wrapUp(HTML);
  return HTML;
};

function checkIfYoutubeURL(url){
  if (url.indexOf('https://www.youtube.com/watch?v=') === 0){
    return true;
  }else{
    return false;
  }
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
  HTML += 'function detectPlatform(){var userAgent = window.navigator.userAgent; var iOS = userAgent.match(/iPad/i) || userAgent.match(/iPhone/i); var chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); if (!chrome) {console.log("---- IOS ----");window.location.replace("' + URLPlaceholder + '");} else if (!!chrome) {console.log("---- CHROME ----");} else {}}; detectPlatform();';
  HTML += 'function doPrev(){var currentIndex = parseInt($("#currentIndex").attr("data-index")); console.log("DAJ INDEX",currentIndex,typeof currentIndex); if (currentIndex === 0) return; $("#indicator"+currentIndex).removeClass("active"); currentIndex--; $("#indicator"+currentIndex).addClass("active"); var url = $("#article" + currentIndex).attr("data-url"); console.log("DAJ URL",url); $("#myFrame").attr("src",url); $("#currentIndex").attr("data-index",currentIndex);};';
  HTML += 'function doNext(){var currentIndex = parseInt($("#currentIndex").attr("data-index")); var articleCount = parseInt($("#articleCount").attr("data-count")); console.log("DAJ INDEX",currentIndex,typeof currentIndex,articleCount,typeof articleCount); if (currentIndex === articleCount - 1) return; $("#indicator"+currentIndex).removeClass("active"); currentIndex++; $("#indicator"+currentIndex).addClass("active"); var url = $("#article" + currentIndex).attr("data-url"); console.log("DAJ URL",url); $("#myFrame").attr("src",url); $("#currentIndex").attr("data-index",currentIndex);};';
  HTML += '</script>';
  //css
  HTML += '<script src="https://use.fontawesome.com/a302c3bc77.js"></script>';
  HTML += '<link rel="stylesheet" href="https://bbcdn0.blaze.im/styles.css" >';
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

function addBody(HTML,metadata){
  HTML += '<body style="padding:0;margin:0;overflow:hidden;">';
  if (metadata.myIndex !== undefined && !!metadata.items && !!metadata.items.length){
	  HTML += '<div class="topbar">';
    HTML += '<a id="previousButton" class="left carousel-control" onclick="doPrev()"><span><i class="fa fa-angle-left" aria-hidden="true"></i></span></a>';
    HTML += '<a id="nextButton" class="right carousel-control" onclick="doNext()"><span><i class="fa fa-angle-right" aria-hidden="true"></i></span></a>';
    HTML += '</div>';
    HTML += '<div id="Carousel" class="caroselContainer carousel slide">';
    //carousel
    HTML += '<ol class="carousel-indicators">';
    var j=0;
    for (var i=0; i<metadata.items.length; i++){
      if (!metadata.items[i].url) continue;
      if (Util.checkURL(metadata.items[i].url).blacklisted) continue;
      HTML += '<li id="indicator' + j + '" class="' + (metadata.myIndex !== i ? '' : 'active ') + ' Carousel-target"></li>';
      j++;
    }
    HTML += '</ol>';
  }
	HTML += '<div class="carousel-inner">'
  if (metadata.myIndex === undefined || !metadata.items || !metadata.items.length || !metadata.items[metadata.myIndex]){
    //only 1 item 
    HTML += '<div class="item active">';
    HTML += '<iframe style="margin:0;width:100%;height:100%;border:0px solid white;" src="' + URLPlaceholder + '" allowfullscreen></iframe>';
    HTML += '</div>';
  }else{
    HTML += '<div class="item active">';
    HTML += '<iframe id="myFrame" style="margin:0;width:100%;height:100%;border:0px solid white;" src="' + metadata.items[metadata.myIndex].url + '" allowfullscreen></iframe>';
    HTML += '</div>';
    var myIndex = metadata.myIndex;
    var currentIndex = metadata.myIndex;
    var articleCount = 0;
    for (var i=0; i<metadata.items.length; i++){
      if (!metadata.items[i].url || Util.checkURL(metadata.items[i].url).blacklisted){
        if (myIndex >= i) currentIndex--;
        continue;
      }
      HTML += '<div id="article' + articleCount + '" data-url="' + metadata.items[i].url + '" style="display:none;"></div>';
      articleCount++;
    }
    HTML += '<div id="currentIndex" data-index="' + currentIndex + '" style="display:none;"></div>';
    HTML += '<div id="articleCount" data-count="' + articleCount + '" style="display:none;"></div>';
  }
  //end of carousel
  HTML += '</div>';
  HTML += '</div>';
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
  createHTML : createHTML
};
