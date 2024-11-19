"use client";

import React, { useTransition } from "react";
// import { deleteCustomer } from "@/app/actions/customer";
// import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
// import Modal from "@/app/invoice/_components/Modal";
import { deleteProduct } from "@/app/actions/product";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

function DeleteProduct({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  console.log(`Delete Product for ${id} is Executing`);
  return (
    <DropdownItem
      key="delete"
      color="danger"
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete Page
    </DropdownItem>
  );
}
export default DeleteProduct;
