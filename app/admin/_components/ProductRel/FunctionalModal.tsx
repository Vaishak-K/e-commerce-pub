import React, { useEffect } from "react";
import ProductsTable from "./ProductsTable";
import { Button } from "../../../../components/ui/button";

const FunctionalModal = ({ show, onClose }: any) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-transparent/80  flex items-center justify-center z-50 overflow-auto">
      <button
        className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-8 overflow-y-auto sm:max-w-4xl md:max-w-5xl"
        style={{ maxHeight: "80%", marginTop: "5%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 transition duration-300 text-white absolute right-4 top-4 rounded-full p-2"
        >
          X
        </Button>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Import Products
        </h2>
        <ProductsTable />
      </button>
    </div>
  );
};

export default FunctionalModal;
