var request = require('request');
var fs = require('fs');
var XPayUtil = require('./xpayutil.js')
var config = require('../config/configuration.json');
var randomstring = require('randomstring');

function logRequest(requestBody, path) {
	console.log("URL : " + config.visaUrl + path);
	if (requestBody !== null && requestBody !== '') {
		console.log("Request Body : " + JSON.stringify(JSON.parse(requestBody),null,4));
	}
}

function logResponseBody(response, body) {
	console.log("Response Code: " + response.statusCode);
	console.log("Headers:");
	for(var item in response.headers) {
		console.log(item + ": " + response.headers[item]);
	}
	console.log("Body: "+ JSON.stringify(JSON.parse(body),null,4));
}

function getBasicAuthHeader(userId, password) {
	return 'Basic ' + new Buffer(userId + ':' + password).toString('base64');
}

function VisaAPIClient() {
	
}

VisaAPIClient.prototype.doMutualAuthRequest = function(path, requestBody, methodType, headers, callback) {
	
	var userId = config.userId ;
	var password = config.password;
	var keyFile = config.key;
	var certificateFile = config.cert;
	logRequest(requestBody, path);
	
	if (methodType === 'POST' || methodType === 'PUT') {
		headers['Content-Type'] = 'application/json';
	}

	headers['Accept'] = 'application/json';
	headers['Authorization'] = getBasicAuthHeader(userId, password);
	headers['x-correlation-id'] = randomstring.generate({length:12, charset: 'alphanumeric'}) + '_SC'
	request({
		uri : config.visaUrl + path,
		key: fs.readFileSync(keyFile),
		method : methodType,
		cert: fs.readFileSync(certificateFile),
		headers: headers,
		body: requestBody,
		timeout: 30000
	}, function(error, response, body) {
		if (!error) {
			logResponseBody(response, body);
			callback(null, response.statusCode);
		} else {
			console.log(error);
			callback(error);
		}
	});
};

VisaAPIClient.prototype.doXPayRequest = function(baseUri, resourcePath, queryParams, requestBody, methodType, headers, callback) {
	logRequest(requestBody, baseUri + resourcePath + '?' + queryParams);
	
	var xPayUtil = new XPayUtil();
	
	if (methodType === 'POST' || methodType === 'PUT') {
		headers['Content-Type'] = 'application/json';
	}
	
	headers['Accept'] = 'application/json';
	headers['x-pay-token'] = xPayUtil.getXPayToken(resourcePath, queryParams, requestBody);
	headers['x-correlation-id'] = randomstring.generate({length:12, charset: 'alphanumeric'}) + '_SC'
	request({
		uri : config.visaUrl + baseUri + resourcePath + '?' + queryParams,
		method : methodType,
		headers: headers,
		body: requestBody
	}, function(error, response, body) {
		if (!error) {
			logResponseBody(response, body);
			callback(null, response.statusCode);
		} else {
			console.log(error);
			callback(error);
		}
	});
};

module.exports = VisaAPIClient;