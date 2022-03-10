from visa.helpers.visa_api_client import VisaAPIClient
import json
import datetime
import unittest
'''
@author: visa
'''

class TestMerchantSearchAPI(unittest.TestCase):

    def setUp(self):
        date = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3]
        self.visa_api_client = VisaAPIClient()
        self.locator_request = json.loads('''{
                         "header": {
                             "messageDateTime": "'''+ date  +'''",
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
                    }''')
    
    def test_merchant_search_API(self):
        base_uri = 'merchantsearch/'
        resource_path = 'v1/search'
        response = self.visa_api_client.do_mutual_auth_request(base_uri + resource_path, self.locator_request, 'Merchant Search Test', 'post')
        self.assertEqual(str(response.status_code) ,"200" ,"Merchant search test failed")
        pass
