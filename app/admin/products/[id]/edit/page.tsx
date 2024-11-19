import NewProductForm from "@/app/admin/_components/ProductRel/NewProductForm";
import { prisma } from "@/lib/prisma";

async function page({ params }: { params: any }) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <NewProductForm product={product} />
    </div>
  );
}

export default page;
