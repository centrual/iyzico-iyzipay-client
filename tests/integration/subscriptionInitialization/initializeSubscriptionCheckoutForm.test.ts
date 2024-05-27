import { expect, test } from "vitest";
import { v4 as uuidv4 } from "uuid";
import { Constants, createIyzipayClient } from "../../../src";

const iyzipay = createIyzipayClient(
  process.env.IYZIPAY_API_KEY!,
  process.env.IYZIPAY_SECRET!,
  Constants.IYZICO_HOSTS.SANDBOX,
);

test("should initialize subscription checkout form", async () => {
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
      pricingPlanReferenceCode: "b8278941-1415-46e0-8c05-a4f0e3a66971",
      callbackUrl: "https://201c-78-163-157-177.ngrok-free.app/callback",
    });

    console.log(response.data.checkoutFormContent);
    console.log(response.data.token);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe("success");
  } catch (e) {
    console.log(e);
  }
});
