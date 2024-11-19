import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

type ProductsProps = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: ProductsProps) {
  try {
    const products = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    // Return the products as JSON by stringifying the response
    return new Response(JSON.stringify({ products }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}
