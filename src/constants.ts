export default class Constants {
  static readonly RANDOM_STRING_SIZE = 8;
  static readonly RANDOM_HEADER_NAME = "x-iyzi-rnd";
  static readonly CLIENT_VERSION = "x-iyzi-client-version";
  static readonly CLIENT_VERSION_VALUE = "iyzico-iyzipay-client-1.0.7";
  static readonly IYZI_WS_HEADER_NAME = "IYZWS";
  static readonly IYZI_WS_HEADER_NAME_V2 = "IYZWSv2";

  static readonly IYZICO_HOSTS = {
    PRODUCTION: "https://api.iyzipay.com",
    SANDBOX: "https://sandbox-api.iyzipay.com",
  };
}
