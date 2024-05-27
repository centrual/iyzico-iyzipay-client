import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";

const iyzipay = createIyzipayClient(process.env.IYZIPAY_API_KEY!, process.env.IYZIPAY_SECRET!, Constants.IYZICO_HOSTS.SANDBOX);

test("should cancel subscription", async () => {
  try {
    const response = await iyzipay.subscriptions.cancelSubscription("83a338bc-40a2-4c0b-8fe3-badfa24fd257");

    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
