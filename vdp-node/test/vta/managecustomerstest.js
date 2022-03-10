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

describe('Manage Customers', function() {
	var visaAPIClient = new VisaAPIClient();
	var date = new Date().toISOString();
	var createCustomersRequest = JSON.stringify({
	    "customer": {
	        "cards": [
	            {
	                "address": config.vtaCreateCustomerAddress,
	                "billCycleDay": "7",
	                "bin": 431263,
	                "cardEnrollmentDate": date ,
	                "cardExpiryDate": config.vtaCreateCustomerCardExpiryDate,
	                "cardNickName": "Mradul",
	                "cardNumber": config.vtaCreateCustomerCardNumber,
	                "cardSecurityCode":  config.vtaCreateCustomerCardSecurityCode,
	                "contactServiceOfferings": [
	                    {
	                        "contact": {
	                            "contactNickName": "testEmail",
	                            "contactType": "Email",
	                            "contactValue": "john@visa.com",
	                            "isVerified": true,
	                            "lastUpdateDateTime":  date ,
	                            "mobileCountryCode": null,
	                            "mobileVerificationCode": null,
	                            "mobileVerificationCodeDate": "2016-06-10T14:53:07"  ,
	                            "platform": "None",
	                            "preferredEmailFormat": "Html",
	                            "securityPhrase": null,
	                            "status": "Active"
	                        },
	                        "serviceOfferings": [
	                            {
	                                "isActive": true,
	                                "offeringId": "Threshold",
	                                "offeringProperties": [
	                                    {
	                                        "key": "ThresholdAmount",
	                                        "value": "10"
	                                    }
	                                ]
	                            },
	                            {
	                                "isActive": true,
	                                "offeringId": "CrossBorder",
	                                "offeringProperties": [
	                                    {
	                                        "key": "ThresholdAmount",
	                                        "value": "10"
	                                    }
	                                ]
	                            },
	                            {
	                                "isActive": true,
	                                "offeringId": "Declined",
	                                "offeringProperties": [
	                                    {
	                                        "key": "ThresholdAmount",
	                                        "value": "10"
	                                    }
	                                ]
	                            },
	                            {
	                                "isActive": true,
	                                "offeringId": "CardNotPresent",
	                                "offeringProperties": [
	                                    {
	                                        "key": "ThresholdAmount",
	                                        "value": "10"
	                                    }
	                                ]
	                            }
	                        ]
	                    }
	                ],
	                "isActive": true,
	                "lastFour":  config.vtaCreateCustomerLastFour,
	                "nameOnCard": "Migration",
	                "paused": false,
	                "portfolioNum":  config.vtaPortfolioNumber,
	                "previousCardNumber": null,
	                "productId": null,
	                "productIdDescription": "Credit",
	                "productType": "Credit",
	                "productTypeExtendedCode": "Credit",
	                "rpin": null
	            }
	        ],
	        "communityCode":  config.vtaCommunityCode,
	        "contacts": [
	            {
	                "contactNickName": "testEmail",
	                "contactType": "Email",
	                "contactValue": "john@visa.com",
	                "isVerified": true,
	                "lastUpdateDateTime":  date ,
	                "mobileCountryCode": null,
	                "mobileVerificationCode": null,
	                "mobileVerificationCodeDate":  "2016-06-10T14:53:07",
	                "platform": "None",
	                "preferredEmailFormat": "Html",
	                "securityPhrase": null,
	                "status": "Active"
	            }
	        ],
	        "customerEnrollmentDate":  date ,
	        "customerId": "a1bb6fe1-ea64-4269-b29d-169aebd8780a",
	        "firstName": "James",
	        "isActive": config.vtaCreateCustomerIsActive,
	        "lastName": "Bond",
	        "preferredCountryCode":  config.vtaCreateCustomerPreferedCountryCode,
	        "preferredCurrencyCode":  config.vtaCreateCustomerPreferedCurrencyCode,
	        "preferredFuelAmount": "75",
	        "preferredLanguage":  config.vtaCreateCustomerPreferedLanguage,
	        "preferredTimeZone":  config.vtaCreateCustomerPreferedTimeZone,
	        "preferredTipPercentage": "15"
	    }
	});
	
	it('Create Customers Test',function(done) {
		this.timeout(10000);
		var baseUri = 'vta/';
		var resourcePath = 'v3/communities/'+ config.vtaCommunityCode +"/customers";
		visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, createCustomersRequest, 'POST', {'ServiceId' : config.vtaServiceId}, 
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
