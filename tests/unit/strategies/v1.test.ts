import { describe, expect, test, vi } from "vitest";
import * as v1 from "../../../src/utils/headerGenerator/strategies/v1";

import { IyzicoHeaderGeneratorData } from "../../../src/utils/headerGenerator/IyzicoHeaderGenerator.types";
import * as utils from "../../../src/utils/utils";
import Constants from "../../../src/constants";

vi.mock("../../src/utils/utils");

describe("V1 Header Generator", () => {
  test("generateV1AuthorizationHeaderContent should return correct header content", async () => {
    const data: IyzicoHeaderGeneratorData = {
      apiKey: "apiKey",
      secretKey: "secretKey",
      body: '{"key":"value"}',
      url: "url",
      randomString: "randomString",
    };
    vi.spyOn(utils, "generateRandomString").mockReturnValue("mockRandomString");
    vi.spyOn(utils, "convertJsonToPKIString").mockReturnValue("mockPkiString");
    vi.spyOn(utils, "createSha1SummaryAsBase64").mockReturnValue(Promise.resolve("mockSha1Hash"));

    const result = await v1.generateV1AuthorizationHeaderContent(data);

    expect(result).toBe(`${Constants.IYZI_WS_HEADER_NAME} apiKey:mockSha1Hash`);
  });

  test("generateV1HeaderHash should return correct hash value", async () => {
    const data: IyzicoHeaderGeneratorData = {
      apiKey: "apiKey",
      secretKey: "secretKey",
      body: '{"key":"value"}',
      url: "url",
      randomString: "randomString",
    };
    vi.spyOn(utils, "generateRandomString").mockReturnValue("randomString");
    vi.spyOn(utils, "convertJsonToPKIString").mockReturnValue("pkiString");
    const mockCreateSha1SummaryAsBase64 = vi
      .spyOn(utils, "createSha1SummaryAsBase64")
      .mockReturnValue(Promise.resolve("sha1Hash"));

    const result = await v1.generateV1HeaderHash(data);

    expect(mockCreateSha1SummaryAsBase64).toHaveBeenCalledWith(
      "apiKeyrandomStringsecretKeypkiString",
    );
    expect(result).toBe("sha1Hash");
  });
});
