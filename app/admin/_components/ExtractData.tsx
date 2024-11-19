"use server";

import { prisma } from "@/lib/prisma";

export async function ExtractProductData() {
  const product_details: any = await prisma?.product.findMany();
  return product_details;
}

// export async function ExtractInvoiceData(invoiceid: any) {
//   const invoice_details: any = await prisma?.invoices.findUnique({
//     where: {
//       id: invoiceid,
//     },
//     include: {
//       customer: true,
//     },
//   });
//   return invoice_details;
// }

// export async function ExtractItemsData() {
//   const item_details: any = await prisma?.item.findMany();
//   return item_details;
// }
