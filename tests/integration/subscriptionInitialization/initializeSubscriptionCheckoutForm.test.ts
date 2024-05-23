import { expect, test } from "vitest";
import { Constants, createIyzipayClient } from "../../../src";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";

config();

test("should initialize subscription checkout form", async () => {
  const iyzipay = createIyzipayClient(process.env.IYZIPAY_API_KEY!, process.env.IYZIPAY_SECRET!, Constants.IYZICO_HOSTS.SANDBOX);

  const conversationId: string = uuidv4();

  try {
    const response = await iyzipay.subscriptionInitialization.initializeSubscriptionCheckoutForm({
      locale: "tr",
      conversationId,
      subscriptionInitialStatus: undefined,
      customer: {
        identityNumber: "11111111111",
        gsmNumber: "+905301234567",
        email: "john.doe@example.com",
        name: "John",
        surname: "Doe",
        shippingAddress: {
          address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
          zipCode: "34742",
          contactName: "John Doe",
          city: "Istanbul",
          country: "Turkey",
        },
        billingAddress: {
          address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
          zipCode: "34742",
          contactName: "John Doe",
          city: "Istanbul",
          country: "Turkey",
        },
      },
      pricingPlanReferenceCode: "d6a852c5-a70f-4363-b9e0-b77692bd96a5",
      callbackUrl: "http://localhost:3000/callback",
    });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
