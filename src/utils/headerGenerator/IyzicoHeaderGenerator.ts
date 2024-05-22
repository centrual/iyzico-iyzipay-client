import { IyzicoHeaderGeneratorData } from "./IyzicoHeaderGenerator.types";
import { generateV1AuthorizationHeaderContent } from "./strategies/v1";
import { generateV2AuthorizationHeaderContent } from "./strategies/v2";

export const generateAuthorizationHeaderContent = (data: IyzicoHeaderGeneratorData): string => {
  if (data.url.includes("/v2/")) {
    return generateV2AuthorizationHeaderContent(data);
  }

  return generateV1AuthorizationHeaderContent(data);
};
