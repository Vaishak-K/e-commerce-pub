"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import FunctionalModal from "./FunctionalModal"; // Keep the name as is
import { ExtractProductData } from "../ExtractData";
import * as XLSX from "xlsx";

function ModalProducts() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const exportToXLSX = async () => {
    // Convert data to worksheet
    const product_details: any = await ExtractProductData();

    const worksheet = XLSX.utils.json_to_sheet(product_details);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Export the workbook to a file
    XLSX.writeFile(workbook, `workbook1.xlsx`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="text-teal-600 hover:text-teal-700 transition duration-200" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-lg">
          <DropdownMenuLabel className="text-gray-800 font-semibold">
            Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              onClick={openModal}
              className="w-full bg-teal-500 text-white hover:bg-teal-600 transition duration-200"
            >
              Import Product Values
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              onClick={exportToXLSX}
              className="w-full py-2 px-6 rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
            >
              Export Data
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      <FunctionalModal show={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default ModalProducts;
