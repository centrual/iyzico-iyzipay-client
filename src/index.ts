import axios, { AxiosInstance } from "axios";
import Constants from "./constants.js";
import { OperationsApiFactory, SubscriptionInitializationApiFactory, SubscriptionsApiFactory, TestingApiFactory } from "iyzico-iyzipay";
import { iyzicoRequestInterceptor } from "./interceptors/iyzicoRequestInterceptor.js";

export const createIyzipayClient = (apiKey: string, apiSecret: string, baseURL: string = Constants.IYZICO_HOSTS.SANDBOX) => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.request.use(iyzicoRequestInterceptor(apiKey, apiSecret, baseURL));

  return {
    axiosInstance,
    subscriptions: SubscriptionsApiFactory(undefined, undefined, axiosInstance),
    operations: OperationsApiFactory(undefined, undefined, axiosInstance),
    testing: TestingApiFactory(undefined, undefined, axiosInstance),
    subscriptionInitialization: SubscriptionInitializationApiFactory(undefined, undefined, axiosInstance),
  };
};

export { Constants };
