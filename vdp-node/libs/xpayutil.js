var crypto = require('crypto');
var config = require('../config/configuration.json');

function XPayUtil() {
	
}

XPayUtil.prototype.getXPayToken = function(resourcePath , queryParams , postBody) {
	var timestamp = Math.floor(Date.now() / 1000);
	var sharedSecret = config.sharedSecret;
	var preHashString = timestamp + resourcePath + queryParams + postBody;
	var hashString = crypto.createHmac('SHA256', sharedSecret).update(preHashString).digest('hex');
	var preHashString2 = resourcePath + queryParams + postBody;
	var hashString2 = crypto.createHmac('SHA256', sharedSecret).update(preHashString2).digest('hex');
	var xPayToken = 'xv2:' + timestamp + ':' + hashString;
	return xPayToken;	
};

module.exports = XPayUtil;
