const currencyIDRFormatted = (amount: number) => {
  const currencyIDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })

  return currencyIDR.format(amount).replace(/\s/g, '') // remove whitespace
}

export default currencyIDRFormatted
