var request = require('request');
var config = require('../../config/configuration.json');
var VisaAPIClient = require('../../libs/visaapiclient.js');
var assert = require('chai').assert;
var req = request.defaults();
var randomstring = require('randomstring');

describe('Cybersource Payments Test', function() {
	var visaAPIClient = new VisaAPIClient();
	var paymentAuthorizationRequest = JSON.stringify({
		"amount": "0",
		"currency": "USD",
		"payment": {
			"cardNumber": "4111111111111111",
			"cardExpirationMonth": "10",
			"cardExpirationYear": "2016"
		}
	});

	it('Cybersource Payments Authorization Test',function(done){
		this.timeout(10000);
		var apiKey = config.apiKey;
		var baseUri = 'cybersource/';
		var resourcePath = 'payments/v1/authorizations';
		var queryParams = 'apikey=' + apiKey;
		visaAPIClient.doXPayRequest(baseUri, resourcePath, queryParams, paymentAuthorizationRequest, 'POST', {}, 
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
