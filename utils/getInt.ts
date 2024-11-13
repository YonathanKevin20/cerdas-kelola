const getInt = (num: string): string => {
  return num.split('.')[0] || '0' // remove decimal part
}

export default getInt
