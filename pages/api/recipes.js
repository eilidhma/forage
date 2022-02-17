import { connectToDatabase } from '../../utils/mongodb';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            //console.log('hi')
            return await getRecipes(req, res);
        }
    }
}

async function getRecipes(req,res){
  try {
        let client = connectToDatabase();
        await client.connect();
        let recipes = client.db('recipesDB')
        .collection('recipes')
        // return the recipes
        console.log(recipes)
        client.close();
        return res.json({
            message: JSON.parse(JSON.stringify(recipes)),
            success: true,
        });
  } catch (error) {
      // return the error
      return res.json({
          message: new Error(error).message,
          success: false,
      });
  }
}