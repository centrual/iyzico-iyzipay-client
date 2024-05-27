import {InternalAxiosRequestConfig} from "axios";
import Constants from "../constants.js";
import {extractPathFromUrl, generateRandomString} from "../utils/utils.js";
import {generateAuthorizationHeaderContent} from "../utils/headerGenerator/IyzicoHeaderGenerator.js";

/**
 * Iyzico API isteklerine otomatik olarak header ekleyen interceptor.
 * @param apiKey - API anahtarı
 * @param apiSecret - API gizli anahtarı
 * @param baseUrl - API'nin temel adresi
 */
export const iyzicoRequestInterceptor = (apiKey: string, apiSecret: string, baseUrl: string) => {
  return (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (!config.url) {
      throw new Error("URL is required");
    }

    const urlPath = extractPathFromUrl(config.url, baseUrl);
    const randomString = generateRandomString(Constants.RANDOM_STRING_SIZE);

    const authorizationHeaderContent = generateAuthorizationHeaderContent({
      apiKey,
      randomString,
      secretKey: apiSecret,
      url: urlPath,
      body: config.data,
    });

    if (config.data == null) {
      config.data = {};
    }

    config.headers.set(Constants.RANDOM_HEADER_NAME, randomString);
    config.headers.set(Constants.CLIENT_VERSION, Constants.CLIENT_VERSION_VALUE);
    config.headers.set("Authorization", authorizationHeaderContent);

    return config;
  };
};
