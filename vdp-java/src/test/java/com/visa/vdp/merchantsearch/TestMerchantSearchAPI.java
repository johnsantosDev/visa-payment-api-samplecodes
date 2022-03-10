package com.visa.vdp.merchantsearch;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.TimeZone;

import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import com.visa.vdp.utils.VisaAPIClient;
import com.visa.vdp.utils.MethodTypes;

public class TestMerchantSearchAPI {

    String searchRequest;
    VisaAPIClient visaAPIClient;

    @BeforeTest(groups = "merchantsearch")
    public void setup() {
        this.visaAPIClient = new VisaAPIClient();
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        TimeZone utc = TimeZone.getTimeZone("UTC");
        sdfDate.setTimeZone(utc);
        Date now = new Date();
        String strDate = sdfDate.format(now);

        this.searchRequest = "{"
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

    @Test(groups = "merchantsearch")
    public void testMerchantSearch() throws Exception {
        String baseUri = "merchantsearch/";
        String resourcePath = "v1/search";

        CloseableHttpResponse response = this.visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, "Merchant Search API Test", this.searchRequest, MethodTypes.POST, new HashMap<String, String>());
        Assert.assertEquals(response.getStatusLine().getStatusCode(), HttpStatus.SC_OK);
        response.close();
    }

}
