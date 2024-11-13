const removeSeparator = (value: string) => {
  return value.replace(/\D/g, '') // remove all non-digit characters
}

export default removeSeparator
