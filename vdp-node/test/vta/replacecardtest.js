var request = require('request');
var fs = require('fs');
var config = require('../../config/configuration.json');
var VisaAPIClient = require('../../libs/visaapiclient.js');
var assert = require('chai').assert;
var randomstring = require('randomstring');

var req = request.defaults();
var userId = config.userId ;
var password = config.password;
var keyFile = config.key;
var certificateFile = config.cert;

describe('Replace Cards', function() {
	var visaAPIClient = new VisaAPIClient();
	var date = new Date().toISOString();
	var replaceCardsRequest = JSON.stringify({
        "communityCode": config.vtaCommunityCode,
        "newCard": {
            "address": config.vtaReplaceCardNewAddress,
            "billCycleDay": "22",
            "bin": null,
            "cardEnrollmentDate": "2016-06-10T08:36:59+00:00",
            "cardExpiryDate": config.vtaReplaceCardExpiryDate,
            "cardNickName": "My Visa 3",
            "cardNumber": config.vtaReplaceCardNumber,
            "cardSecurityCode": config.vtaReplaceCardSecurityCode,
            "isActive": true,
            "lastFour": config.vtaReplaceCardLastFour,
            "nameOnCard": "Mradul",
            "paused": false,
            "portfolioNum": config.vtaPortfolioNumber,
            "previousCardNumber": null,
            "productId": null,
            "productIdDescription": "Credit",
            "productType": "Credit",
            "productTypeExtendedCode": "123",
            "rpin": null
        },
        "oldCard": {
            "address": config.vtaCreateCustomerAddress,
            "billCycleDay": "22",
            "bin": null,
            "cardEnrollmentDate": "2016-06-10T08:36:59+00:00",
            "cardExpiryDate": config.vtaCreateCustomerCardExpiryDate,
            "cardNickName": "My Visa 3",
            "cardNumber": config.vtaCreateCustomerCardNumber,
            "cardSecurityCode": config.vtaCreateCustomerCardSecurityCode,
        "isActive": true,
        "lastFour":  config.vtaCreateCustomerLastFour,
        "nameOnCard": "ddd",
        "paused": false,
        "portfolioNum": config.vtaPortfolioNumber,
        "previousCardNumber": null,
        "productId": null,
        "productIdDescription": "Credit",
        "productType": "Credit",
        "productTypeExtendedCode": "123",
        "rpin": null
      }
});

	it('Replace Cards Test',function(done) {
		this.timeout(10000);
		var baseUri = 'vta/';
		var resourcePath = 'v3/communities/'+ config.vtaCommunityCode +'/cards';
		visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, replaceCardsRequest, 'POST', {'ServiceId' : config.vtaServiceId}, 
		function(err, responseCode) {
			if(!err) {
				assert.equal(responseCode, 200);
			} else {
				assert(false);
			}
			done();
		});
	});
});
