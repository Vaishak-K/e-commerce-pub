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
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortProducts } from "../SortProducts";

import ModalProducts from "./ModalProducts";
import { Input } from "@nextui-org/input";

import { deleteProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import { ChangeAvailability } from "./_actions/ChangeAvailability";
import { socket } from "@/app/socket";

const PRODUCTS_PER_PAGE = 15;

export default function ProductView({ addData }: { addData: any }) {
  const [adddata, setAddData] = useState(addData);
  const totalCustomers = adddata.length;
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [id, setID] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SortProducts(sortOption);
        setAddData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOption]);

  useEffect(() => {
    const ChangeAvailable = async () => {
      id ? await ChangeAvailability(id) : "";
    };
    ChangeAvailable();

    socket.emit("hello", true);
    setID("");
  }, [id]);

  function handleAvailChange(data: any) {
    setID(data?.id);
  }

  const totalPages = Math.ceil(totalCustomers / PRODUCTS_PER_PAGE);

  const filtered = useMemo(
    () =>
      adddata?.filter((data: any) =>
        data?.name.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [searchInput, adddata]
  );

  const handleSortChange = (e: any) => {
    setSortOption(e.target.value);
  };

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentCustomers = filtered.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-background rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Link href="products/new" passHref>
          <Button className="bg-primary-400 text-background hover:bg-primary-600 transition duration-300 shadow-md rounded-lg w-full sm:w-auto mb-2 sm:mb-0">
            <p className="block w-full text-center py-2">Add New Product</p>
          </Button>
        </Link>
        <ModalProducts />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Input
          id="search"
          type="text"
          name="search"
          placeholder="Search for a product..."
          className="max-w-md border border-gray-300 rounded-lg focus:ring focus:ring-indigo-400"
          onChange={(e) => setSearchInput(e.target.value)}
          autoComplete="off"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="ml-4 border border-gray-300 rounded-lg p-2"
        >
          <option value="default">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>
      <Table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <TableCaption className="">Overview of Products</TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead className="p-4 text-left font-semibold"></TableHead>
            <TableHead className="p-4 text-left font-semibold">
              Product Name
            </TableHead>
            <TableHead className="p-4 text-left font-semibold">Price</TableHead>
            <TableHead className="p-4 text-left font-semibold">
              Quantity
            </TableHead>
            <TableHead className="p-4 text-right font-semibold">Tax</TableHead>
            <TableHead className="p-4 text-right  font-semibold">
              Updated At
            </TableHead>
            <TableHead className="p-4 text-center font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {currentCustomers.map((data: any) => (
            <TableRow
              key={data.id}
              className="hover:bg-background transition duration-200"
            >
              <TableCell className="p-3 border-t border-gray-300 text-foreground">
                <input
                  type="checkbox"
                  defaultChecked={data?.isAvailableForPurchase}
                  onChange={() => handleAvailChange(data)}
                />
              </TableCell>
              <TableCell className="p-3 border-t border-gray-300">
                <Link
                  href={`/admin/products/${data.id}`}
                  className="hover:underline"
                >
                  {data.name.length > 25
                    ? `${data.name.substring(0, 25)}...`
                    : data.name}
                </Link>
              </TableCell>
              <TableCell className="p-3 border-t border-gray-300">
                Rs.{data.price.toFixed(2)}
              </TableCell>
              <TableCell className="p-3 border-t border-gray-300">
                {data.quantity}
              </TableCell>
              <TableCell className="p-3 border-t border-gray-300">
                {data.tax}%
              </TableCell>
              <TableCell className="p-3 border-t border-gray-300">
                {new Date(data.updatedAt).toDateString()}
              </TableCell>
              <TableCell className="p-3 text-center border-t border-gray-300">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="default"
                      className=" hover:bg-primary-600 border border-primary-300"
                    >
                      <MoreVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Action menu">
                    <DropdownItem key="view">
                      <Link href={`products/${data.id}`}>View</Link>
                    </DropdownItem>
                    <DropdownItem key="edit">
                      <Link href={`products/${data.id}/edit`}>Edit</Link>
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      color="danger"
                      onClick={async () => {
                        await deleteProduct(data?.id);
                        router.refresh();
                      }}
                    >
                      Delete Item
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
