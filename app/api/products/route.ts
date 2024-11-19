import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma"; // Adjust the import based on your project structure

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany(); // This returns an array of products

    // Return the products as a JSON response
    return new Response(JSON.stringify({ products }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}
