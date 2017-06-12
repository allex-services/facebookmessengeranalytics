var blacklistedURLs = [
  'https://www.youtube.com/watch?v=',
  'www.thehindu.com',
  'www.theverge.com',
  'www.theguardian.com',
  'www.independent.co.uk',
  'www.livemint.com'
];

function isBlacklisted(ret,url,blacklistedURL){
  if (url.indexOf(blacklistedURL) >= 0) ret.blacklisted = true;
}

function checkURL(url){
  var ret = {blacklisted : false, replacementURL : ''};
  blacklistedURLs.forEach(isBlacklisted.bind(null,ret,url));
  return ret;
};

module.exports = {
  blacklistedURLs : blacklistedURLs,
  checkURL : checkURL
};
