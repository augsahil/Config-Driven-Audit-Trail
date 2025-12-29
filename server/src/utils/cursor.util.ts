export const encodeCursor = (id: string) =>
  Buffer.from(JSON.stringify({ id })).toString('base64')

export const decodeCursor = (cursor: string) =>
  JSON.parse(Buffer.from(cursor, 'base64').toString())
