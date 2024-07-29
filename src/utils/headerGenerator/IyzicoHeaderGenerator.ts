import { IyzicoHeaderGeneratorData } from "./IyzicoHeaderGenerator.types.js";
import { generateV1AuthorizationHeaderContent } from "./strategies/v1.js";
import { generateV2AuthorizationHeaderContent } from "./strategies/v2.js";

export const generateAuthorizationHeaderContent = (data: IyzicoHeaderGeneratorData): string => {
  if (data.url.includes("/v2/")) {
    return generateV2AuthorizationHeaderContent(data);
  }

  return generateV1AuthorizationHeaderContent(data);
};
