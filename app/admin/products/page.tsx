import { prisma } from "@/lib/prisma";
import ProductView from "../_components/ProductRel/ProductView";

async function ProductForm() {
  const adddata = await prisma.product.findMany();
  return (
    <div>
      <ProductView addData={adddata} />
    </div>
  );
}

export default ProductForm;
