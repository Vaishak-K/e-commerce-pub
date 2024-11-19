"use client";

import React, { useTransition } from "react";
// import { deleteCustomer } from "@/app/actions/customer";
// import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
// import Modal from "@/app/invoice/_components/Modal";

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownSection,
//   DropdownItem,
// } from "@nextui-org/dropdown";
// import { Button } from "@nextui-org/button";
import { deleteAddress } from "@/app/actions/FetchAddress";
import { DeleteIcon } from "@/app/address/_components/DeleteIcon";
import { Button } from "@nextui-org/button";

function DeleteAddress({ pathname, id }: { pathname: any; id: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  console.log(`Delete Address for ${id} is Executing`);
  return (
    <Button
      key="delete"
      color="danger"
      className="cursor-pointer"
      onClick={() => {
        startTransition(async () => {
          await deleteAddress(id, pathname);
          router.refresh();
        });
      }}
    >
      <DeleteIcon />
    </Button>
  );
}
export default DeleteAddress;
