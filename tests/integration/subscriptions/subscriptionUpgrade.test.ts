import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";
import { config } from "dotenv";

config();

test("should upgrade subscription", async () => {
  const iyzipay = createIyzipayClient(process.env.IYZIPAY_API_KEY!, process.env.IYZIPAY_SECRET!, Constants.IYZICO_HOSTS.SANDBOX);

  try {
    const response = await iyzipay.subscriptions.upgradeSubscription("22b53e69-5ac9-4cc3-806b-617ddc9dfb0e", {
      newPricingPlanReferenceCode: "d6a852c5-a70f-4363-b9e0-b77692bd96a5",
      upgradePeriod: "NOW",
    });

    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
