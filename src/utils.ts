
export const toQuerystring = (obj: any) => Object.keys(obj)
.filter((key: any) => obj[key] !== null && obj[key] !== undefined)
.map((key: any) => {
  let value = obj[key]

  if (Array.isArray(value)) {
    value = value.join('/')
  }
  return [
    encodeURIComponent(key),
    encodeURIComponent(value)
  ].join('=')
}).join('&')