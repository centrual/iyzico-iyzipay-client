import { IyzicoHeaderGeneratorData } from "../IyzicoHeaderGenerator.types";
import crypto from "crypto";

/**
 * V2 header içeriğini oluşturur.
 * @param data - Header içeriği oluşturulacak veri
 * @returns Oluşturulan header içeriği
 */
export const generateV2AuthorizationHeaderContent = (data: IyzicoHeaderGeneratorData): string => {
  const { apiKey, secretKey, url, randomString, body } = data;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(randomString + url + JSON.stringify(body))
    .digest("hex");

  const authorizationParams = [`apiKey:${apiKey}`, `randomKey:${randomString}`, `signature:${signature}`];

  return Buffer.from(authorizationParams.join("&")).toString("base64");
};
