export const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  }).replace(/\s+/g, '')
}

export const capitalize = (value) => {
  if (!value) return
  const string = value.toString()
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}
