import { IyzicoHeaderGeneratorData } from "../IyzicoHeaderGenerator.types";
import crypto from "crypto";
import Constants from "../../../constants";
import { generateRandomString } from "../../utils";

/**
 * V1 header hash değerini oluşturur ve header içeriğini oluşturur.
 * @param data - Header içeriği oluşturulacak veri
 * @returns Oluşturulan header içeriği
 */
export const generateV1AuthorizationHeaderContent = (data: IyzicoHeaderGeneratorData): string => {
  return `${Constants.IYZI_WS_HEADER_NAME} ${data.apiKey}:${generateV1HeaderHash(data)}`;
};

/**
 * Verilen veriye göre V1 header hash değerini oluşturur.
 * @param data - Header hash değeri oluşturulacak veri
 * @returns Oluşturulan header hash değeri
 */
const generateV1HeaderHash = (data: IyzicoHeaderGeneratorData): string => {
  const { apiKey, secretKey, body } = data;

  const randomString = generateRandomString(Constants.RANDOM_STRING_SIZE);
  const pkiString = convertToPKIString(body);

  const shaSum = crypto.createHash("sha1");
  shaSum.update(`${apiKey}${randomString}${secretKey}${pkiString}`, "utf8");
  return shaSum.digest("base64");
};

/**
 * Verilen nesne veya diziyi PKI string formatına dönüştürür.
 * @param requestBody - Dönüştürülecek nesne veya dizi
 * @returns PKI string formatındaki metin
 */
function convertToPKIString(requestBody: unknown): string {
  if (Array.isArray(requestBody)) {
    return `[${requestBody.map((value) => convertNestedValueToString(value)).join(", ")}]`;
  } else if (typeof requestBody === "object" && requestBody !== null) {
    const entries = Object.entries(requestBody).filter(([, value]) => value !== undefined && typeof value !== "function");
    const requestString = entries.map(([key, value]) => `${key}=${convertNestedValueToString(value)}`).join(",");
    return `[${requestString}]`;
  } else {
    return String(requestBody);
  }
}

/**
 * Verilen değeri string formatına dönüştürür. Eğer değer bir nesne ise, yeniden convertToPKIString fonksiyonunu çağırır.
 * @param value - İşlenecek değer
 * @returns String formatındaki değer
 */
function convertNestedValueToString(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(convertNestedValueToString).join(", ")}]`;
  } else if (typeof value === "object" && value !== null) {
    return convertToPKIString(value);
  } else {
    return String(value);
  }
}
