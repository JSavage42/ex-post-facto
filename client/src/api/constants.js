export const GET = 'GET'
export const POST = 'POST'
export const DELETE = 'DELETE'
export const HEADERS = {}
export const database = {
  db: process.env.RDB_DB || 'epf',
  host: process.env.RDB_HOST || 'localhost',
  port: process.env.RDB_PORT || '5000'
}
