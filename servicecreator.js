function createFacebookMessengerAnalyticsService(execlib, ParentService) {
  'use strict';
  

  function factoryCreator(parentFactory) {
    return {
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')),
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')) 
    };
  }

  function FacebookMessengerAnalyticsService(prophash) {
    ParentService.call(this, prophash);
  }
  
  ParentService.inherit(FacebookMessengerAnalyticsService, factoryCreator);
  
  FacebookMessengerAnalyticsService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };
  
  return FacebookMessengerAnalyticsService;
}

module.exports = createFacebookMessengerAnalyticsService;
