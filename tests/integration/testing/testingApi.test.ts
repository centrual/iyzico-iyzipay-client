import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";

const iyzipay = createIyzipayClient(process.env.IYZIPAY_API_KEY!, process.env.IYZIPAY_SECRET!, Constants.IYZICO_HOSTS.SANDBOX);

test("Test endpoint should return 200", async () => {
  let isErrorHappened = false;

  try {
    const response = await iyzipay.testing.paymentTest();

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
    isErrorHappened = true;
  }

  expect(isErrorHappened).toBe(false);
});
