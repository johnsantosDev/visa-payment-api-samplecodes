using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Vdp
{
    [TestClass]
    public class MerchantSearchAPITest
    {
        private string searchRequest;
        private VisaAPIClient visaAPIClient;

        public MerchantSearchAPITest()
        {
            visaAPIClient = new VisaAPIClient();
            string strDate = DateTime.UtcNow.ToString("yyyy-MM-ddThh:mm:ss.fff");
            searchRequest =
                 "{"
                        + "\"header\": {"
                        + "\"messageDateTime\": \"" + strDate + "\","
                        + "\"requestMessageId\": \"Request_001\","
                        + "\"startIndex\": \"0\""
                        + "},"
                        + "\"searchAttrList\": {"
                        + "\"merchantName\": \"cmu edctn materials cntr\","
                        + "\"merchantStreetAddress\": \"802 industrial dr\","
                        + "\"merchantCity\": \"Mount Pleasant\","
                        + "\"merchantState\": \"MI\","
                        + "\"merchantPostalCode\": \"48858\","
                        + "\"merchantCountryCode\": \"840\","
                        + "\"merchantPhoneNumber\": \"19897747123\","
                        + "\"merchantUrl\": \"http://www.emc.cmich.edu\","
                        + "\"businessRegistrationId\": \"386004447\","
                        + "\"acquirerCardAcceptorId\": \"424295031886\","
                        + "\"acquiringBin\": \"476197\""
                        + "},"
                        + "\"responseAttrList\": ["
                        + "\"GNBANKA\""
                        + "],"
                        + "\"searchOptions\": {"
                        + "\"maxRecords\": \"5\","
                        + "\"matchIndicators\": \"true\","
                        + "\"matchScore\": \"true\","
                        + "\"proximity\": ["
                          + "\"merchantName\""
                        + "],"
                        + "\"wildCard\": ["
                          + "\"merchantName\""
                       + "]"
                     + "}"
                   + "}";
        }

        [TestMethod]
        public void TestMerchantSearchAPI()
        {
            string baseUri = "merchantsearch/";
            string resourcePath = "v1/search";
            string status = visaAPIClient.DoMutualAuthCall(baseUri + resourcePath, "POST", "Merchant Search API Test", searchRequest);
            Assert.AreEqual(status, "OK");
        }
    }
}
