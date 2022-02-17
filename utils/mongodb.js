/**
 * @abstract This script handles the database connection and ensures connections are reused.
 */
 import { MongoClient } from 'mongodb'

 const { MONGODB_URI, MONGODB_DB } = process.env
 
 if (!MONGODB_URI) {
   throw new Error(
     'Please define the MONGODB_URI environment variable inside .env.local'
   )
 }
 
 if (!MONGODB_DB) {
   throw new Error(
     'Please define the MONGODB_DB environment variable inside .env.local'
   )
 }
 
 /**
  * Global is used here to maintain a cached connection across hot reloads
  * in development. This prevents connections growing exponentially
  * during API Route usage.
  */
 let cached = global.mongo
 
 if (!cached) {
   console.log('mongodb connection not established')
   cached = global.mongo = { conn: null, promise: null }
 }
 
 export async function connectToDatabase() {
   if (cached.conn) {
     console.log('mongodb connection cached')
     return cached.conn
   }
 
   if (!cached.promise) {
     const opts = {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     }
 
     cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
       console.log('mongodb connection created')
       return {
         client,
         db: client.db(MONGODB_DB),
       }
     })
   }
   cached.conn = await cached.promise
   return cached.conn
 }