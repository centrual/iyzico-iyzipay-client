import crypto from "crypto";

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

/**
 * Verilen veriye göre SHA1 özetini oluşturur ve base64 formatında döner.
 * @param data - SHA1 özeti oluşturulacak veri
 * @returns Oluşturulan SHA1 özeti
 */
export function createSha1SummaryAsBase64(data: string): string {
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
