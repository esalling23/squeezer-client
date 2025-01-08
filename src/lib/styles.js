export const isFontDoc = val => {
  if (!val) return false
  return typeof val === 'object' && 'url' in val && 'family' in val
}