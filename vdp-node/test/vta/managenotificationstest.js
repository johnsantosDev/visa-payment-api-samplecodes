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

describe('Manage Notifications', function() {
	var visaAPIClient = new VisaAPIClient();
	var notificationSubscriptionRequest = JSON.stringify({
        "contactType": config.vtaNotificationContactType,
        "contactValue": "john@visa.com",
        "emailFormat": "None",
        "last4": config.vtaCreateCustomerLastFour,
        "phoneCountryCode": "en-us",
        "platform": "None",
        "preferredLanguageCode": config.vtaPreferredLanguageCode,
        "serviceOffering": "WelcomeMessage",
        "serviceOfferingSubType": "WelcomeMessage",
        "substitutions": {}
     });

	it('Notification Subscriptions Test',function(done) {
		this.timeout(10000);
		var baseUri = 'vta/';
		var resourcePath = 'v3/communities/'+ config.vtaCommunityCode +'/portfolios/' + config.vtaPortfolioNumber +'/customers/' + config.vtaCustomerId+ '/notifications';
		visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, notificationSubscriptionRequest, 'POST', {'ServiceId' : config.vtaServiceId}, 
		function(err, responseCode) {
			if(!err) {
				assert.equal(responseCode, 201);
			} else {
				assert(false);
			}
			done();
		});
	});
});
