import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";

const iyzipay = createIyzipayClient(process.env.IYZIPAY_API_KEY!, process.env.IYZIPAY_SECRET!, Constants.IYZICO_HOSTS.SANDBOX);

test("should create subscription pricing plan", async () => {
  try {
    const response = await iyzipay.subscriptionPricingPlanManagement.createSubscriptionPricingPlan("a2f2554e-6781-49e5-b127-1f33dd001076", {
      name: "Saatlik Deneme Diğer Ürün 2",
      paymentIntervalCount: 0.1,
      planPaymentType: "RECURRING",
      currencyCode: "TRY",
      paymentInterval: "HOURLY",
      locale: "tr",
      price: 5,
    });

    console.log(response.data);
    expect(response.status).toBe(201);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
