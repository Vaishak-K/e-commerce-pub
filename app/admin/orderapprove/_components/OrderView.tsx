"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
// import { SortProducts } from "../SortProducts";

import { useRouter } from "next/navigation";
import { OrderApprovals } from "../../_components/ProductRel/_actions/OrderApprovals";
import AdminOrder from "./AdminOrder";
import { useCart } from "@/app/products/_state/CartValues";

const APPROVALS_PER_PAGE = 15;

export default function OrderView({ orderval }: { orderval: any }) {
  const [adddata, setAddData] = useState();
  const totalCustomers = 10;
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();
  //   const { products } = useCart();
  //   console.log("Products inside Order view", products);
  const [id, setID] = useState<any>("");
  useEffect(() => {
    const ChangeAvailable = async () => {
      id ? await OrderApprovals(id) : "";
    };
    ChangeAvailable();
    setID("");
  }, [id]);

  function handleAvailChange(data: any) {
    setID(data?.id);
  }

  const totalPages = Math.ceil(totalCustomers / APPROVALS_PER_PAGE);

  //   const filtered = useMemo(
  //     () =>
  //       addData?.filter((data: any) =>
  //         data?.name.toLowerCase().includes(searchInput.toLowerCase())
  //       ),
  //     [searchInput, adddata]
  //   );

  //   const handleSortChange = (e: any) => {
  //     setSortOption(e.target.value);
  //   };

  const startIndex = (currentPage - 1) * APPROVALS_PER_PAGE;
  //   const currentCustomers = filtered.slice(
  //     startIndex,
  //     startIndex + APPROVALS_PER_PAGE
  //   );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-background rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6"></div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-full sm:w-auto mb-2 sm:mb-0 bg-primary-400 hover:bg-foreground-700 transition duration-300"
        >
          Previous
        </Button>
        <span className="">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="w-full sm:w-auto mt-2 sm:mt-0 bg-primary-400 hover:bg-foreground-700 transition duration-300"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
