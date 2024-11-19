"use server";

import { prisma } from "@/lib/prisma";

export async function GetOrderData() {
  const date = new Date();
  let data = []; // Initialize data as an empty array

  for (let i = -6; i <= 0; i++) {
    let startDate = new Date(date.getFullYear(), date.getMonth() + i, 1);

    // Set the end date to the last day of the current month in the loop
    let endDate = new Date(date.getFullYear(), date.getMonth() + i + 1, 0);

    // Query for customer data based on invoices
    const query = await prisma.order.aggregate({
      where: {
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },

      _sum: {
        price: true,
      },
    });
    // console.log("Query", query);
    let a = {
      name: `Month: ${6 + i}`, // Month number relative to current month
      sales: query?._sum?.price || 0, // Handle missing values
      // Handle missing values
    };

    // Add the result to the data array
    data.push(a);
  }

  return data;
}
