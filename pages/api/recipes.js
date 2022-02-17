import { connectToDatabase } from "../../utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const recipesDB = await db
    .collection("recipes")
    .find({})
    .sort({ metacritic: -1 })
    .limit(100)
    .toArray();

  res.json(recipesDB);
};