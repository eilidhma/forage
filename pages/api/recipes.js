import { connectToDatabase } from "../../utils/mongodb";

export default something = async(req, res) => {
  const { db } = await connectToDatabase();

  const recipes = await db
    .collection("recipes")
    .find({})
    .sort({})
    .limit(10)
    .toArray();

  res.json(recipes);
};