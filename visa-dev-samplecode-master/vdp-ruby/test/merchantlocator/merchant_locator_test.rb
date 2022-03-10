require 'test/unit'
require 'rest-client'
require 'json'
require 'yaml'
require File.expand_path('../../../lib/visa_api_client', __FILE__)

class MerchantLocatorTest < Test::Unit::TestCase
  def setup
    @visa_api_client = VisaAPIClient.new
    @strDate = Time.now.strftime("%Y-%m-%dT%H:%M:%S.%L")
    @locatorRequest ='''{
    "header": {
        "messageDateTime": "''' + @strDate + '''",
        "requestMessageId": "Request_001",
        "startIndex": "0"
    },
    "searchAttrList": {
        "merchantName": "Starbucks",
        "merchantCountryCode": "840",
        "latitude": "37.363922",
        "longitude": "-121.929163",
        "distance": "2",
        "distanceUnit": "M"
    },
    "responseAttrList": [
    "GNLOCATOR"
    ],
    "searchOptions": {
        "maxRecords": "5",
        "matchIndicators": "true",
        "matchScore": "true"
    }
  }'''
  end
  
  def test_merchantLocator
    base_uri = 'merchantlocator/'
    resource_path = 'v1/locator'
    response_code = @visa_api_client.doMutualAuthRequest("#{base_uri}#{resource_path}", "Merchant Locator Test", "post", @locatorRequest)
    assert_equal("200", response_code, "Merchant Locator test failed")
  end
end
