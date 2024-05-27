import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";

const iyzipay = createIyzipayClient(
  process.env.IYZIPAY_API_KEY!,
  process.env.IYZIPAY_SECRET!,
  Constants.IYZICO_HOSTS.SANDBOX,
);

test("should search subscriptions", async () => {
  try {
    const response = await iyzipay.subscriptions.searchInSubscriptions(
      1,
      10,
      "7fe2590c-655e-4e1d-b722-0bae17acd007",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );

    console.dir(response.data, { depth: Infinity });
    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
