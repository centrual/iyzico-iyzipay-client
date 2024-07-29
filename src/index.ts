import axios from "axios";
import Constants from "./constants.js";
import {
  OperationsApiFactory,
  SubscriptionCustomerManagementApiFactory,
  SubscriptionInitializationApiFactory,
  SubscriptionPricingPlanManagementApiFactory,
  SubscriptionProductManagementApiFactory,
  SubscriptionsApiFactory,
  TestingApiFactory,
} from "iyzico-iyzipay";
import { iyzicoRequestInterceptor } from "./interceptors/iyzicoRequestInterceptor.js";

export const createIyzipayClient = (
  apiKey: string,
  apiSecret: string,
  baseURL: string = Constants.IYZICO_HOSTS.SANDBOX,
) => {
  const axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.request.use(iyzicoRequestInterceptor(apiKey, apiSecret, baseURL));

  return {
    axiosInstance,
    operations: OperationsApiFactory(undefined, undefined, axiosInstance),
    testing: TestingApiFactory(undefined, undefined, axiosInstance),
    subscriptions: SubscriptionsApiFactory(undefined, undefined, axiosInstance),
    subscriptionInitialization: SubscriptionInitializationApiFactory(undefined, undefined, axiosInstance),
    subscriptionCustomerManagement: SubscriptionCustomerManagementApiFactory(undefined, undefined, axiosInstance),
    subscriptionPricingPlanManagement: SubscriptionPricingPlanManagementApiFactory(undefined, undefined, axiosInstance),
    subscriptionProductManagement: SubscriptionProductManagementApiFactory(undefined, undefined, axiosInstance),
  };
};

export { Constants };

export * from "iyzico-iyzipay";
