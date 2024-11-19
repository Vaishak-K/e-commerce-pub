import { prisma } from "@/lib/prisma";
import Image from "next/image";

async function Page({ params }: { params: any }) {
  const viewData: any = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });
  console.log("This is working");
  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row md:items-start">
      <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
        <Image
          src={viewData?.imagePath}
          alt={viewData?.name || "Product Image"}
          height={400}
          width={400}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-2">{viewData?.name}</h1>
        <p className="text-success text-lg mb-1">
          Product ID: <span className="font-semibold">{viewData?.id}</span>
        </p>
        <p className="text-foreground text-lg mb-1">
          Category: <span className="font-semibold">{viewData?.category}</span>
        </p>
        <p className="text-foreground text-lg mb-1">
          Price: <span className="font-semibold">${viewData?.price}</span>
        </p>

        <p className="text-foreground text-lg mb-1">
          Quantity:{" "}
          <span
            className={
              viewData?.quantity < 20
                ? "text-danger font-semibold"
                : "font-semibold"
            }
          >
            {viewData?.quantity}
          </span>
        </p>
        <p className="text-foreground text-lg mb-1">
          Tax: <span className="font-semibold">{viewData?.tax}</span>
        </p>
        <p className="text-foreground text-lg mb-1">
          Description:{" "}
          <span className="font-semibold">{viewData?.description}</span>
        </p>
        <p className="text-destructive text-lg mb-1">
          Created At:{" "}
          <span className="font-semibold">
            {viewData?.createdAt.toDateString()}
          </span>
        </p>
        <p className="text-foreground text-lg mb-1">
          Updated At:{" "}
          <span className="font-semibold">
            {viewData?.updatedAt.toDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Page;
