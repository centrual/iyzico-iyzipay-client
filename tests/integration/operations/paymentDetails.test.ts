import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";

const iyzipay = createIyzipayClient(process.env.IYZIPAY_API_KEY!, process.env.IYZIPAY_SECRET!, Constants.IYZICO_HOSTS.SANDBOX);

test("should retrieve payment details", async () => {
  try {
    const response = await iyzipay.operations.paymentDetails({
      paymentId: "22245755",
    });

    console.dir(response.data, {
      depth: Infinity,
    });
    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
