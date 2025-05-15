export function generateRandomSKU(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let sku = ''

  for (let i = 0; i < length; i++) {
    sku += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return sku
}
