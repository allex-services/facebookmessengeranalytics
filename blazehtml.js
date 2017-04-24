var URLPlaceholder = '%%URL%%';

module.exports = {
  placeholders : {
    url : URLPlaceholder
  },
  html : '<html style="padding:0;margin:0;overflow:hidden;"><head><title>Blaze</title></head><body style="padding:0;margin:0;overflow:hidden;"><iframe style="margin:0;width:100%;height:100%;border:0px solid white;" src="' + URLPlaceholder + '" ></iframe></body></html>'
};
