import {IyzicoHeaderGeneratorData} from "../IyzicoHeaderGenerator.types.js";
import crypto from "crypto";
import Constants from "../../../constants.js";

/**
 * V2 header içeriğini oluşturur.
 * @param data - Header içeriği oluşturulacak veri
 * @returns Oluşturulan header içeriği
 */
export const generateV2AuthorizationHeaderContent = (data: IyzicoHeaderGeneratorData): string => {
  const signature = createSignature(data);
  const base64AuthorizationParams = createBase64AuthorizationParams(data, signature);

  return `${Constants.IYZI_WS_HEADER_NAME_V2} ${base64AuthorizationParams}`;
};

/**
 * Hmac sha256 algoritması kullanarak verilen verileri kullanarak bir imza oluşturur.
 * @param data - İmza oluşturulacak veriler
 * @returns Oluşturulan hex formatındaki imza
 */
export const createSignature = (data: IyzicoHeaderGeneratorData): string => {
  return crypto
    .createHmac("sha256", data.secretKey)
    .update(data.randomString + data.url + JSON.stringify(data.body))
    .digest("hex");
};

/**
 * Verilen verileri kullanarak base64 formatında bir authorization parametresi oluşturur.
 * @param data - Base64 formatında oluşturulacak veriler
 * @param signature - Oluşturulan imza
 * @returns Oluşturulan base64 formatındaki authorization parametresi
 */
export const createBase64AuthorizationParams = (data: IyzicoHeaderGeneratorData, signature: string): string => {
  return Buffer.from(`apiKey:${data.apiKey}&randomKey:${data.randomString}&signature:${signature}`, "utf8").toString("base64");
};
