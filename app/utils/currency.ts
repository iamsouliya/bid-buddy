export function formatToDollars(amount: number) {
  return Math.floor(amount / 100).toFixed(2)
}
