"use client";

import Modal from "../Modal";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AddProductValue,
  JustAddProductValue,
  UpdateProductValue,
} from "@/app/actions/product";

import { Button } from "../../../../components/ui/button";
import { prisma } from "@/lib/prisma";
import { ExtractProductData } from "../ExtractData";
import { Input } from "@nextui-org/input";

export default function ProductsTable({ users }: any) {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // file
  const [nums, setNums] = useState<Number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const [errval, setErrVal] = useState<any>([]);

  const previewData = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const saveData = () => {
    let k: any;
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(workSheet);

          nums === 1 ? (k = UpdateProductValue) : (k = JustAddProductValue);

          json.map((customer: any) => {
            const val: any = k(customer);
            setErrVal((prevErrVal: any) => [
              ...prevErrVal,
              val ? { success: true } : { success: false },
            ]);
          });

          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <div className="py-8 space-y-8 bg-gray-100 rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="sm:flex sm:justify-start w-full">
            <label
              className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              htmlFor="file_input"
            >
              Upload File
            </label>
            <Input
              className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              id="file_input"
              type="file"
              accept=".xls,.xlsx"
              onChange={(e: any) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <Button
            onClick={previewData}
            className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Preview Data
          </Button>

          <Modal show={isModalOpen} onClose={closeModal} onConfirm={saveData} />

          <Button
            onClick={() => {
              setNums(2);
              openModal();
            }}
            className="py-2 px-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
          >
            Save Data
          </Button>

          <Button
            onClick={() => {
              setNums(1);
              openModal();
            }}
            className="py-2 px-6 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition duration-200"
          >
            Add and Update Data
          </Button>
        </div>

        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
          {jsonData}
        </pre>

        {errval.map((err: any, i: number) => {
          if (!err.success) {
            return (
              <div key={i} className="text-red-600">
                <h1>Error at row {i + 1}: Check the values.</h1>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
