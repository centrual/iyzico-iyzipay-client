import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";

const iyzipay = createIyzipayClient(
  process.env.IYZIPAY_API_KEY!,
  process.env.IYZIPAY_SECRET!,
  Constants.IYZICO_HOSTS.SANDBOX,
);

test("should upgrade subscription", async () => {
  try {
    const response = await iyzipay.subscriptions.upgradeSubscription(
      "6508c266-837e-422b-aef8-1cd23e8ccda5",
      {
        newPricingPlanReferenceCode: "9abcf485-8d55-4da5-b94b-4076b42fd6a3",
        upgradePeriod: "NOW",
      },
    );

    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
