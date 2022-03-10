<?php

namespace Vdp;

class MerchantSearchTest extends \PHPUnit_Framework_TestCase {
	
	public function setUp() {
		$this->visaAPIClient = new VisaAPIClient;
		$strDate = date('Y-m-d\TH:i:s:z', time());
		$this->searchRequest = json_encode ([
                         "header" => [
                             "messageDateTime" => $strDate,
                             "requestMessageId" => "Request_001",
                             "startIndex" => "0"
                         ],
                      "searchAttrList" => [
                         "merchantName" => "cmu edctn materials cntr",
                         "merchantStreetAddress" => "802 industrial dr",
                         "merchantCity" => "Mount Pleasant",
                         "merchantState" => "MI",
                         "merchantPostalCode" => "48858",
                         "merchantCountryCode" => "840",
                         "merchantPhoneNumber" => "19897747123",
                         "merchantUrl" => "http://www.emc.cmich.edu",
                         "businessRegistrationId" => "386004447",
                         "acquirerCardAcceptorId" => "424295031886",
                         "acquiringBin" => "476197"
                      ],
                      "responseAttrList" => [
                         "GNBANKA"
                      ],
                      "searchOptions" => [
                         "maxRecords" => "5",
                         "matchIndicators" => "true",
                         "matchScore" => "true",
                         "proximity" => [
                           "merchantName"
                        ],
                         "wildCard" => [
                           "merchantName"
                        ]
                      ]
                    ]);
	}
	
	public function testMerchantSearchAPI() {
		$baseUrl = "merchantsearch/";
		$resourcePath = "v1/search";
		$statusCode = $this->visaAPIClient->doMutualAuthCall ( 'post', $baseUrl.$resourcePath, 'Merchant Search Test', $this->searchRequest );
		$this->assertEquals($statusCode, "200");
	}
}
