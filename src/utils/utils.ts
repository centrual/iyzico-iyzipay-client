/**
 * Verilen sayıda rastgele karakterlerden oluşan bir string döner.
 * @param size - Oluşturulacak string'in uzunluğu
 * @returns Oluşturulan rastgele string
 */
export function generateRandomString(size: number): string {
  return `${process.hrtime()[0]}${Math.random().toString(size).slice(2)}`;
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
