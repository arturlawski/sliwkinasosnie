import type { NextApiRequest, NextApiResponse } from "next";
// My import.
import prisma from "../../../utils/db/prisma";
import Drink from "src/models/Drink";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("drinks?");

  if (req.method === "GET") {
    // Get drinks.
    let drinks;
    try {
      drinks = await prisma.drink.findMany();
      console.log(drinks,"here drinks?");
    } catch (error) {
      res.status(500).json({ message: "Fetching menu data failed!" });
      return;
    }
    // Transform the list fetch from our database to an array we will used to display the available drinks.
    const drinksListTransformed: Drink[] = drinks.map((drink: { id: any; name: any; ounces: any; description: any; price: any; imgSrc: any; originalSource: any; }) => {
      return {
        id: drink.id,
        name: drink.name,
        ounces: drink.ounces,
        description: drink.description,
        price: drink.price, 
        imgSrc: drink.imgSrc,
        originalSource: drink.originalSource,
      }
    })
    res.status(200).json(drinksListTransformed);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
