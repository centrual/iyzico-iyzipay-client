import { describe, expect, test, vi } from "vitest";
import { generateAuthorizationHeaderContent } from "../../src/utils/headerGenerator/IyzicoHeaderGenerator";
import * as v1 from "../../src/utils/headerGenerator/strategies/v1";
import * as v2 from "../../src/utils/headerGenerator/strategies/v2";
import { IyzicoHeaderGeneratorData } from "../../src/utils/headerGenerator/IyzicoHeaderGenerator.types";

vi.mock("../src/utils/headerGenerator/strategies/v1");
vi.mock("../src/utils/headerGenerator/strategies/v2");

describe("IyzicoHeaderGenerator", () => {
  test("should call generateV2AuthorizationHeaderContent for /v2/ URL", () => {
    const data: IyzicoHeaderGeneratorData = {
      url: "https://api.example.com/v2/resource",
      apiKey: "apiKey",
      secretKey: "secretKey",
      body: "",
      randomString: "",
    };
    const mockGenerateV2 = vi.spyOn(v2, "generateV2AuthorizationHeaderContent").mockReturnValue("v2Header");
    const result = generateAuthorizationHeaderContent(data);

    expect(mockGenerateV2).toHaveBeenCalledWith(data);
    expect(result).toBe("v2Header");

    mockGenerateV2.mockRestore();
  });

  test("should call generateV1AuthorizationHeaderContent for non-/v2/ URL", () => {
    const data: IyzicoHeaderGeneratorData = {
      url: "https://api.example.com/resource",
      apiKey: "apiKey",
      secretKey: "secretKey",
      body: "",
      randomString: "",
    };
    const mockGenerateV1 = vi.spyOn(v1, "generateV1AuthorizationHeaderContent").mockReturnValue("v1Header");
    const result = generateAuthorizationHeaderContent(data);

    expect(mockGenerateV1).toHaveBeenCalledWith(data);
    expect(result).toBe("v1Header");

    mockGenerateV1.mockRestore();
  });
});
