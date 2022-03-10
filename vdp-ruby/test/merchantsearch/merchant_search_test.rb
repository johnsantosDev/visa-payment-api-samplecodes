require 'test/unit'
require 'rest-client'
require 'json'
require 'yaml'
require File.expand_path('../../../lib/visa_api_client', __FILE__)

class MerchantSearchTest < Test::Unit::TestCase
  def setup
    @visa_api_client = VisaAPIClient.new
    @strDate = Time.now.strftime("%Y-%m-%dT%H:%M:%S.%L")
    @searchRequest ='''{
    "header": {
        "messageDateTime": "'''+ @strDate  +'''",
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
   }'''
  end
  
  def test_merchantSearch
    base_uri = 'merchantsearch/'
    resource_path = 'v1/search'
    response_code = @visa_api_client.doMutualAuthRequest("#{base_uri}#{resource_path}", "Merchant Search Test", "post", @searchRequest)
    assert_equal("200", response_code, "Merchant Search test failed")
  end
end
