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

describe('Merchant Search Test', function() {
    var visaAPIClient = new VisaAPIClient();
    var strDate = new Date().toISOString().replace(/Z/, '');
    var searchRequest = JSON.stringify({
        "header": {
            "messageDateTime": strDate,
            "requestMessageId": "Request_001",
            "startIndex": "0"
        },
     "searchAttrList": {
        "merchantName": "cmu edctn materials cntr",
        "merchantStreetAddress": "802 industrial dr",
        "merchantCity": "Mount Pleasant",
        "merchantState": "MI",
        "merchantPostalCode": "48858",
        "merchantCountryCode": "840",
        "merchantPhoneNumber": "19897747123",
        "merchantUrl": "http://www.emc.cmich.edu",
        "businessRegistrationId": "386004447",
        "acquirerCardAcceptorId": "424295031886",
        "acquiringBin": "476197"
     },
     "responseAttrList": [
        "GNBANKA"
     ],
     "searchOptions": {
        "maxRecords": "5",
        "matchIndicators": "true",
        "matchScore": "true",
        "proximity": [
          "merchantName"
       ],
        "wildCard": [
          "merchantName"
       ]
     }
   });
    
    it('Merchant Search API Test',function(done) {
        this.timeout(10000);
        var baseUri = 'merchantsearch/';
        var resourcePath = 'v1/search';
        visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, searchRequest, 'POST', {}, 
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
