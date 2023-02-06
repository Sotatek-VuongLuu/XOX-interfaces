export const formatToShowBalance = (balance: string) => {
  const data = String(balance)
  if (parseFloat(balance) <= 0.000001) {
    return `0.000000...`
  }
  if (data.length <= 10) {
    return data
  }
  return `${data.slice(0, 10)}...`
}
