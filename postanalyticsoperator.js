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

  PostAnalyticsOperator.prototype.doRedirectJob = function(res,url,metadata){
    console.log('DAJ METADATA',metadata);
    var metaImageURL = metadata.metaImageURL;
    var metaTitle = escapeHTMLChars(metadata.metaTitle);
    var metaDescription = escapeHTMLChars(metadata.metaDescription);
    console.log('POSLE ESCAPE-------->',metaTitle,metaDescription);
    /*
    res.writeHead(302,{
      'Location' : url 
    });
    */
    var finalResponse = MetaHTML.html.replace(new RegExp(MetaHTML.placeholders.url,'g'),url);
    if (!!metaTitle){
      finalResponse = finalResponse.replace(new RegExp(MetaHTML.placeholders.metaTitle,'g'),metaTitle);
    }
    if (!!metaDescription){
      finalResponse = finalResponse.replace(new RegExp(MetaHTML.placeholders.metaDescription,'g'),metaDescription);
    }
    if (!!metaImageURL){
      finalResponse = finalResponse.replace(new RegExp(MetaHTML.placeholders.metaImageURL,'g'),metaImageURL);
    }
    console.log('------------ DA VIDIMO FINAL RESPONSE',finalResponse);
    res.setHeader('content-type', 'text/html');
    res.end(finalResponse);
  };

  PostAnalyticsOperator.prototype.replaceHTML = function(res,url){
    var finalHTML = BlazeHTML.html.replace(BlazeHTML.placeholders.url,url);
    console.log('------------ DA VIDIMO FINAL HTML',finalHTML);
    res.end(finalHTML);
  };

  PostAnalyticsOperator.prototype.checkIfEmbedingIsForbiden = function(res,url,urlContent){
    var headers = urlContent.headers;
    if (!headers){
      this.doRedirectJob(res,url);
    }
    var xFrameOptions = headers['x-frame-options'];
    console.log('X-FRAME-OPTIONS',xFrameOptions);
    if (!!xFrameOptions){
      //TODO fallback for youtube
      this.doRedirectJob(res,url);
    }
    this.replaceHTML(res,url);
  };

  PostAnalyticsOperator.prototype.errorHandler = function(res,url,error){
    console.log('ERROR FETCHING URL',error);
    this.doRedirectJob(res,url);
  };

  PostAnalyticsOperator.prototype.doHTMLJob = function(res,url){
    lib.request(url,{
      parameters : {},
      method : 'GET',
      onComplete : this.checkIfEmbedingIsForbiden.bind(this,res,url),
      onError : this.errorHandler.bind(this,res,url)
    });
  };

  PostAnalyticsOperator.prototype.doJob = function(res,url,metadata){
    switch (this.method){
      case 'redirect':
        return this.doRedirectJob(res,url,metadata);
      case 'html':
        return this.doHTMLJob(res,url);
    }
  };

  return PostAnalyticsOperator;

}

module.exports = createPostAnalyticsOperator;
