export const isFontDoc = val => {
  return typeof val === 'object' && 'url' in val && 'family' in val
}