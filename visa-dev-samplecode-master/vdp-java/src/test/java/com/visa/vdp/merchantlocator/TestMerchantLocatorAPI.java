package com.visa.vdp.merchantlocator;

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

public class TestMerchantLocatorAPI {

    String locatorRequest;
    VisaAPIClient visaAPIClient;

    @BeforeTest(groups = "merchantlocator")
    public void setup() {
        this.visaAPIClient = new VisaAPIClient();
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        TimeZone utc = TimeZone.getTimeZone("UTC");
        sdfDate.setTimeZone(utc);
        Date now = new Date();
        String strDate = sdfDate.format(now);

        this.locatorRequest = "{"
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

    @Test(groups = "merchantlocator")
    public void testMerchantLocatorAPI() throws Exception {
        String baseUri = "merchantlocator/";
        String resourcePath = "v1/locator";

        CloseableHttpResponse response = this.visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, "Merchant Locator Test", this.locatorRequest, MethodTypes.POST, new HashMap<String, String>());
        Assert.assertEquals(response.getStatusLine().getStatusCode(), HttpStatus.SC_OK);
        response.close();
    }

}
