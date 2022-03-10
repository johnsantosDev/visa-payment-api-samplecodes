using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Vdp
{
    [TestClass]
    public class MerchantLocatorAPITest
    {
        private string locatorRequest;
        private VisaAPIClient visaAPIClient;

        public MerchantLocatorAPITest()
        {
            visaAPIClient = new VisaAPIClient();
            string strDate = DateTime.UtcNow.ToString("yyyy-MM-ddThh:mm:ss.SSS");
            locatorRequest =
            "{"
                + "\"header\": {"
                + "\"messageDateTime\": \"" + strDate + "\","
                + "\"requestMessageId\": \"Request_001\","
                + "\"startIndex\": \"0\""
                + "},"
                + "\"searchAttrList\": {"
                + "\"merchantName\": \"Starbucks\","
                + "\"merchantCountryCode\": \"840\","
                + "\"latitude\": \"37.363922\","
                + "\"longitude\": \"-121.929163\","
                + "\"distance\": \"2\","
                + "\"distanceUnit\": \"M\""
                + "},"
                + "\"responseAttrList\": ["
                + "\"GNLOCATOR\""
                + "],"
                + "\"searchOptions\": {"
                + "\"maxRecords\": \"5\","
                + "\"matchIndicators\": \"true\","
                + "\"matchScore\": \"true\""
                + "}"
                + "}";
        }

        [TestMethod]
        public void TestMerchantLocatorAPI()
        {
            string baseUri = "merchantlocator/";
            string resourcePath = "v1/locator";
            string status = visaAPIClient.DoMutualAuthCall(baseUri + resourcePath, "POST", "Merchant Locator API Test", locatorRequest);
            Assert.AreEqual(status, "OK");
        }
    }
}
