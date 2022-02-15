export function connectToDatabase() {
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://forage:forage@cluster0.hoy9e.mongodb.net/recipesDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
return client
}
