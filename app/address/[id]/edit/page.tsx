import AddressForm from "@/app/checkout/_components/AddressForm";
import { Button } from "@nextui-org/button";
import React from "react";
import { prisma } from "@/lib/prisma";
import { add } from "lodash";

async function page({ params }: any) {
  const address = await prisma.address.findUnique({
    where: {
      id: Number(params?.id),
    },
  });

  return (
    <div>
      <AddressForm address={address} />
    </div>
  );
}

export default page;
