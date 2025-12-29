export const diffObjects = (
  before: any,
  after: any,
  exclude: readonly string[]
) => {
  const diff: any = {}

  for (const key in after) {
    if (exclude.includes(key)) continue
    if (before?.[key] !== after[key]) {
      diff[key] = { before: before?.[key], after: after[key] }
    }
  }

  return diff
}
