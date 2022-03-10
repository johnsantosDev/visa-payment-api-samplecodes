<?php

namespace Vdp;

class MerchantLocatorTest extends \PHPUnit_Framework_TestCase {
	
	public function setUp() {
		$this->visaAPIClient = new VisaAPIClient;
		$strDate = date('Y-m-d\TH:i:s:z', time());
		$this->locatorRequest = json_encode ([
                "header" =>  [
                    "messageDateTime" =>  $strDate,
                    "requestMessageId" =>  "Request_001",
                    "startIndex" =>  "0"
                ],
                "searchAttrList" =>  [
                    "merchantName" =>  "Starbucks",
                    "merchantCountryCode" =>  "840",
                    "latitude" =>  "37.363922",
                    "longitude" =>  "-121.929163",
                    "distance" =>  "2",
                    "distanceUnit" =>  "M"
                ],
                "responseAttrList" =>  [
                "GNLOCATOR"
                ],
                "searchOptions" =>  [
                    "maxRecords" =>  "5",
                    "matchIndicators" =>  "true",
                    "matchScore" =>  "true"
                ]
            ]);
	}
	
	public function testMerchantLocatorAPI() {
		$baseUrl = "merchantlocator/";
		$resourcePath = "v1/locator";
		$statusCode = $this->visaAPIClient->doMutualAuthCall ( 'post', $baseUrl.$resourcePath, 'Merchant Locator Test', $this->locatorRequest );
		$this->assertEquals($statusCode, "200");
	}
}
