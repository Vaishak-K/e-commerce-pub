import OrderView from "./_components/OrderView";
import AdminOrder from "./_components/AdminOrder";
import { prisma } from "@/lib/prisma";
async function page() {
  const orderval = await prisma.order.findMany({
    where: {
      approveOrder: {
        equals: false,
      },
    },
    include: {
      user: true,
      address: true, // Include related orders
    },
  });
  const products = await prisma?.product.findMany();

  return (
    <div>
      <AdminOrder orderval={orderval} products={products} />
    </div>
  );
}

export default page;
