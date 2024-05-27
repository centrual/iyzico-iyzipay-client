import {IyzicoHeaderGeneratorData} from "../IyzicoHeaderGenerator.types.js";
import Constants from "../../../constants.js";
import {convertJsonToPKIString, createSha1SummaryAsBase64} from "../../utils.js";

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
export const generateV1HeaderHash = (data: IyzicoHeaderGeneratorData): string => {
  const { apiKey, secretKey } = data;
  let { body } = data;

  if (body == "" || body == null) {
    body = "{}";
  }

  const pkiString = convertJsonToPKIString(JSON.parse(body as string));

  return createSha1SummaryAsBase64(apiKey + data.randomString + secretKey + pkiString);
};
