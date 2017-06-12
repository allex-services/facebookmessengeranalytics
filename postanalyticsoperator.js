function createPostAnalyticsOperator(execlib,BlazeHTML,MetaHTML){

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib;
  
  function PostAnalyticsOperator(method){
    this.method = method;
  }

  PostAnalyticsOperator.prototype.destroy = function(){
    this.method = null;
  };

  function escapeHTMLChars(mystring){
    if (!mystring) return mystring;
    return mystring.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  };

  PostAnalyticsOperator.prototype.replaceMetaData = function(finalResponse,HTML,metadata){
    var metaImageURL = metadata.metaImageURL;
    var metaTitle = escapeHTMLChars(metadata.metaTitle);
    var metaDescription = escapeHTMLChars(metadata.metaDescription);
    var myIndex = metadata.myIndex;
    var items = metadata.items;
    if (!!metaTitle){
      finalResponse = finalResponse.replace(new RegExp(MetaHTML.placeholders.metaTitle,'g'),metaTitle);
    }
    if (!!metaDescription){
      finalResponse = finalResponse.replace(new RegExp(MetaHTML.placeholders.metaDescription,'g'),metaDescription);
    }
    if (!!metaImageURL){
      finalResponse = finalResponse.replace(new RegExp(MetaHTML.placeholders.metaImageURL,'g'),metaImageURL);
    }
    return finalResponse;
  };

  PostAnalyticsOperator.prototype.doRedirectJob = function(res,url,metadata){
    /*
    res.writeHead(302,{
      'Location' : url 
    });
    */
    var finalResponse = MetaHTML.html.replace(new RegExp(MetaHTML.placeholders.url,'g'),url);
    finalResponse = finalResponse.replace(new RegExp(MetaHTML.placeholders.url,'g'),url);
    finalResponse = this.replaceMetaData(finalResponse,MetaHTML,metadata);
    res.setHeader('content-type', 'text/html');
    res.end(finalResponse);
  };

  PostAnalyticsOperator.prototype.replaceHTML = function(res,url,metadata){
    var finalHTML = BlazeHTML.createHTML(metadata);
    finalHTML = finalHTML.replace(new RegExp(BlazeHTML.placeholders.url,'g'),url);
    finalHTML = this.replaceMetaData(finalHTML,BlazeHTML,metadata);
    res.setHeader('content-type', 'text/html');
    res.end(finalHTML);
  };

  PostAnalyticsOperator.prototype.checkIfEmbedingIsForbiden = function(res,url,metadata,urlContent){
    var headers = urlContent.headers;
    if (!headers){
      this.doRedirectJob(res,url,metadata);
      return;
    }
    var xFrameOptions = headers['x-frame-options'];
    if ((!!xFrameOptions && xFrameOptions !== 'ALLOWALL') || (url.indexOf('https://m.me') >= 0)){
      //TODO fallback for youtube
      /*
      if (url.indexOf('https://www.youtube.com/watch?v=') === 0){
        url = url.replace('watch?v=','embed/');
        this.replaceHTML(res,url,metadata);
        return;
      }
      */
      this.doRedirectJob(res,url,metadata);
      return;
    }
		//TODO fallback for youtube
		if (url.indexOf('http://timesofindia.indiatimes.com') === 0){
			url = url.replace('http://timesofindia.indiatimes.com','http://m.timesofindia.com');
			this.replaceHTML(res,url,metadata);
			return;
		}
    this.replaceHTML(res,url,metadata);
  };

  PostAnalyticsOperator.prototype.errorHandler = function(res,url,error){
    this.doRedirectJob(res,url);
  };

  PostAnalyticsOperator.prototype.doHTMLJob = function(res,url,metadata){
    lib.request(url,{
      parameters : {},
      method : 'GET',
      onComplete : this.checkIfEmbedingIsForbiden.bind(this,res,url,metadata),
      onError : this.errorHandler.bind(this,res,url)
    });
  };

  PostAnalyticsOperator.prototype.doJob = function(res,url,metadata){
    switch (this.method){
      case 'redirect':
        return this.doRedirectJob(res,url,metadata);
      case 'html':
        return this.doHTMLJob(res,url,metadata);
    }
  };

  return PostAnalyticsOperator;

}

module.exports = createPostAnalyticsOperator;
