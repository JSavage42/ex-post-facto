export const DELETE = 'DELETE'
export const GET = 'GET'
export const POST = 'POST'
export const HEADERS = {
  'Accept': 'application/json',
}
export const DB = {
  url: process.env.MONGO_URL || 'http://localhost',
  port: process.env.MONGO_PORT || 5000,
}
