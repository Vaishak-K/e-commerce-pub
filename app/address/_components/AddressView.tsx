"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../../products/_state/CartValues";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import AddressForm from "@/app/checkout/_components/AddressForm";
import { FetchAddress } from "../../actions/FetchAddress";

import { EditIcon } from "./EditIcon";

import DeleteAddress from "./DeleteAddress";
import { usePathname } from "next/navigation";

function AddressView({ Add }: { Add: any }) {
  const c = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [newAdd, setNewAdd] = useState(false);
  const [address, setAddress] = useState<any>(Add || []);

  const handleChange = (event: any) => {
    setSelectedLanguage(event.target.value);
  };
  console.log(selectedLanguage);
  const { total, val } = useCart();

  return (
    <div className="mx-9 grid sm:grid-cols-4 ">
      <div className="sm:col-span-3 flex flex-col">
        <h1 className="font-semibold text-2xl">Delivery Address</h1>

        <div className="grid cols-2">
          {address?.map((add: any) => {
            return (
              <>
                <div className="flex justify-between">
                  <div>
                    <h1>{add?.name}</h1>
                    <h1>{add?.address1}</h1>
                    <h1>{add?.address2}</h1>
                    <h1>{add?.phone}</h1>
                    <h1>{add?.pincode}</h1>
                    <br />
                  </div>
                  <div className="flex justify-evenly gap-3 gap-x-4 text-2xl">
                    {/* <Link href={`address/${add?.id}`}>
                      <EyeIcon />
                    </Link> */}
                    <Link href={`address/${add?.id}/edit`}>
                      <EditIcon />
                    </Link>

                    <DeleteAddress pathname={c} id={add?.id} />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <Link
          className="bg-slate-200 hover:bg-slate-300 p-2 max-w-44 rounded-md"
          href="address/new"
        >
          Add a New Address
        </Link>
      </div>
    </div>
  );
}

export default AddressView;
