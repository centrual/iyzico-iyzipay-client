/**
 * Verilen sayıda rastgele karakterlerden oluşan bir string döner.
 * @param size - Oluşturulacak string'in uzunluğu
 * @returns Oluşturulan rastgele string
 */
export function generateRandomString(size: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const result = new Array(size);

  for (let i = 0; i < size; i++) {
    result[i] = characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.join("");
}

/**
 * Verilen URL'den base URL ve query string'i kaldırarak geri döner.
 * @param url - İşlenecek URL
 * @param baseUrl - Kaldırılacak base URL
 * @returns Query string ve base URL olmadan kalan URL path
 */
export function extractPathFromUrl(url: string, baseUrl: string): string {
  return url.replace(baseUrl, "").split("?")[0];
}

export function isPlatformDeno(): boolean {
  // @ts-expect-error It throws error if platform is not Deno
  return typeof Deno !== "undefined";
}

/**
 * Verilen veriye göre SHA256 özetini oluşturur ve hex formatında döner.
 * @param data - SHA256 özeti oluşturulacak veri
 * @param secretKey - Özet oluşturulurken kullanılacak gizli anahtar
 */
export function hmacSha256Hex(data: string, secretKey: string): Promise<string> {
  return isPlatformDeno() ? hmacSha256HexDeno(data, secretKey) : hmacSha256HexNodeJs(data, secretKey);
}

/**
 * Verilen veriye göre SHA256 özetini oluşturur ve hex formatında döner. Sadece Node.js ortamında çalışır.
 * @param data - SHA256 özeti oluşturulacak veri
 * @param secretKey - Özet oluşturulurken kullanılacak gizli anahtar
 */
async function hmacSha256HexNodeJs(data: string, secretKey: string): Promise<string> {
  const crypto = await import("crypto");
  
  return crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest("hex");
}

/**
 * Verilen veriye göre SHA256 özetini oluşturur ve hex formatında döner. Sadece Deno ortamında çalışır.
 * @param data - SHA256 özeti oluşturulacak veri
 * @param secretKey - Özet oluşturulurken kullanılacak gizli anahtar
 */
async function hmacSha256HexDeno(data: string, secretKey: string): Promise<string> {
  // @ts-expect-error It throws error if platform is not Deno
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {hmac} = await import("https://deno.land/x/hmac@v2.0.1/mod.ts");
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
  return hmac("sha256", secretKey, data, "utf8", "hex") as string;
}

/**
 * Verilen veriye göre SHA1 özetini oluşturur ve base64 formatında döner.
 * @param data - SHA1 özeti oluşturulacak veri
 */
export function createSha1SummaryAsBase64(data: string): Promise<string> {
  return isPlatformDeno() ? createSha1SummaryAsBase64Deno(data) : createSha1SummaryAsBase64NodeJs(data);
}

/**
 * Verilen veriye göre SHA1 özetini oluşturur ve base64 formatında döner. Sadece Deno ortamında çalışır.
 * @param data - SHA1 özeti oluşturulacak veri
 * @returns Oluşturulan SHA1 özeti
 */
async function createSha1SummaryAsBase64Deno(data: string): Promise<string> {
  // @ts-expect-error It throws error if platform is not Deno
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { sha1 } = await import("https://denopkg.com/chiefbiiko/sha1/mod.ts");
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const hash = sha1(data, "utf8", "hex");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return btoa(String.fromCharCode(...hash));
}

/**
 * Verilen veriye göre SHA1 özetini oluşturur ve base64 formatında döner. Sadece NodeJs ortamında çalışır.
 * @param data - SHA1 özeti oluşturulacak veri
 * @returns Oluşturulan SHA1 özeti
 */
async function createSha1SummaryAsBase64NodeJs(data: string): Promise<string> {
  const crypto = await import("crypto");
  
  const shaSum = crypto.createHash("sha1");
  shaSum.update(data, "utf8");
  return shaSum.digest("base64");
}

/**
 * Verilen nesne veya diziyi PKI string formatına dönüştürür.
 * @param requestBody - Dönüştürülecek nesne veya dizi
 * @returns PKI string formatındaki metin
 */
export function convertJsonToPKIString(requestBody: unknown): string {
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
export function convertNestedValueToString(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(convertNestedValueToString).join(", ")}]`;
  } else if (typeof value === "object" && value !== null) {
    return convertJsonToPKIString(value);
  } else {
    return String(value);
  }
}
