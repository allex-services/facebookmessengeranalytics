function createFacebookMessengerAnalyticsService(execlib, ParentService) {
  'use strict';
  
  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib;

  var validUrl = require('valid-url');
  var BlazeHTML = require('./blazehtml.js');
  var MetaHTML = require('./metahtml.js');
  var PostAnalyticsOperator = require('./postanalyticsoperator.js')(execlib,BlazeHTML,MetaHTML);
  var crypto = require('crypto');

  function createHashFromString(string){
    var md5sum = crypto.createHash('md5');
    return crypto.createHash('md5').update(string).digest('hex');
  }

  function createFacebookAnalyitcsAPIEndpoint(appId){
    return 'https://graph.facebook.com/' + appId + '/activities';
  }

  function factoryCreator(parentFactory) {
    return {
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')),
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')) 
    };
  }

  function FacebookMessengerAnalyticsService(prophash) {
    ParentService.call(this, prophash);
    this.appId = prophash.app_id;
    this.pageId = prophash.page_id;
    this.page_access_token = prophash.page_access_token;
    this.postAnalyticsOperator = new PostAnalyticsOperator(prophash.post_analytics);
  }
  
  ParentService.inherit(FacebookMessengerAnalyticsService, factoryCreator);
  
  FacebookMessengerAnalyticsService.prototype.__cleanUp = function() {
    if (!!this.postAnalyticsOperator){
      this.postAnalyticsOperator.destroy();
    }
    this.postAnalyticsOperator = null;
    this.page_access_token = null;
    this.pageId = null;
    this.appId = null;
    ParentService.prototype.__cleanUp.call(this);
  };

  FacebookMessengerAnalyticsService.prototype.catchHelper = function(res,err){
    res.end('{}');
    console.error(err);
    res = null;
    err = null;
  }

  FacebookMessengerAnalyticsService.prototype.doAfterAnalyticsJob = function(res,url,metadata){
    this.postAnalyticsOperator.doJob(res,url,metadata);
  };

  FacebookMessengerAnalyticsService.prototype.onAnalyticsDone = function(defer,results){
    console.log('ANALYTICS RESULTS',results);
    defer.resolve(true);
  };

  FacebookMessengerAnalyticsService.prototype.createCustomEvents = function(req){
    return [{
      _eventName : 'User opened an URL',
      url : req.url,
      contentType : req.contentType,
      country : req.country || null,
      countryISOCode : req.countryISOCode || null,
      category : req.category || null,
      source : req.source || null
    }];
  };

  FacebookMessengerAnalyticsService.prototype.doAnalytics = function(req){
    var defer = q.defer();
    var params = {
      event : 'CUSTOM_APP_EVENTS',
      custom_events : this.createCustomEvents(req),
      advertiser_tracking_enabled : 0,
      application_tracking_enabled : 0,
      extinfo : ['mb1'],
      page_id : this.pageId,
      page_scoped_user_id : req.userId
    };
    lib.request(createFacebookAnalyitcsAPIEndpoint(this.appId),{
      parameters : params,
      method : 'POST',
      onComplete : this.onAnalyticsDone.bind(this,defer),
      onReject : defer.reject.bind(defer, new Error('Error while doing FB analytics!'))
    });
    return defer.promise;
  };

  FacebookMessengerAnalyticsService.prototype.doOpen = function(res,req){
    try{
      console.log('DAJ DA VIDIMO REQ',req);
      if (!req.url){
        throw new Error('Method \'open\' requires parameter \'url\'');
      }
      var URL = req.url;
      if (!validUrl.isUri(URL)){
        //sees deeplink as invalid URL
        //throw new Error('Parameter \'url\' does not represent a valid URL');
      }
      if (!req.page_access_token){
        throw new Error('Parameter \'page_access_token\' is required');
      }
      if (req.page_access_token !== createHashFromString(this.page_access_token)){
        throw new Error('Parameter \'page_access_token\' is incorrect');
      }
      var metaImageURL = req.metaImageURL;
      var metaTitle = req.metaTitle;
      var metaDescription = req.metaDescription;
      var metadata = {
        metaTitle : metaTitle,
        metaDescription : metaDescription,
        metaImageURL : metaImageURL
      }
      this.doAnalytics(req).then(
        this.doAfterAnalyticsJob.bind(this,res,URL,metadata),
        this.catchHelper.bind(this,res)
      );
    }catch(e){
      console.error(e);
      res.end('{}');
    }
  };

  FacebookMessengerAnalyticsService.prototype.open = function(url, req, res){
    this.extractRequestParams(url, req).then(
      this.doOpen.bind(this,res)
    ).catch(
      this.catchHelper.bind(this,res)
    );
  };

  FacebookMessengerAnalyticsService.prototype.anonymousMethods = ['open'];
  FacebookMessengerAnalyticsService.prototype.allowAnonymous = true;
  FacebookMessengerAnalyticsService.prototype.propertyHashDescriptor = {
    app_id : {
      type : 'string'
    },
    page_id : {
      type : 'string'
    },
    page_access_token : {
      type : 'string'
    }
  };
  
  return FacebookMessengerAnalyticsService;
}

module.exports = createFacebookMessengerAnalyticsService;
