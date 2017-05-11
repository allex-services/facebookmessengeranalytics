var MetaTitlePlaceholder = '%%META_TITLE%%';
var MetaDescriptionPlaceholder = '%%META_DESCRIPTION%%';
var MetaImageURLPlaceholder = '%%META_IMAGE_URL%%';
var URLPlaceholder = '%%URL%%';

module.exports = {
  placeholders : {
    metaTitle : MetaTitlePlaceholder,
    metaDescription : MetaDescriptionPlaceholder,
    metaImageURL : MetaImageURLPlaceholder,
    url : URLPlaceholder
  },
  html : '<html style="padding:0;margin:0;overflow:hidden;"><head><meta charset="UTF-8"><title>Blaze</title><meta name=viewport content="width=device-width, initial-scale=1"><meta name="description" content="' + MetaDescriptionPlaceholder + '"><meta property="og:title" content="' + MetaTitlePlaceholder + '"><meta property="og:url" content="' + URLPlaceholder + '" /><meta property="og:description" content="' + MetaDescriptionPlaceholder + '"><meta property="og:image" itemprop="image" content="' + MetaImageURLPlaceholder + '"><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="' + MetaTitlePlaceholder + '"/><meta name="twitter:description" content="' + MetaDescriptionPlaceholder + '"/><meta name="twitter:image" content="' + MetaImageURLPlaceholder + '"/><meta http-equiv="refresh" content="0; url=' + URLPlaceholder + '" /></head><body style="padding:0;margin:0;overflow:hidden;"><iframe style="margin:0;width:100%;height:100%;border:0px solid white;" src="' + URLPlaceholder + '" ></iframe></body></html>'
};
