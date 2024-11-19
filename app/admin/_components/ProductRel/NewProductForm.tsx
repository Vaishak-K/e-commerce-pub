"use client";

import { addProduct, updateProduct } from "@/app/actions/product";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";

function NewProductForm({ product }: { product?: any }) {
  const [isAvailableForPurchase, setIsAvailableForPurchase] = useState(
    product?.isAvailableForPurchase || false
  );
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product?.id),
    {}
  );
  const categories = ["Fashion", "Electronics", "Toys", "Software", "Mobile"];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form className="grid grid-cols-1 gap-4" action={action}>
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1">
            Name:
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={product?.name || ""}
            className={`border-gray-300 focus:border-primary-500 focus:ring-primary-500 ${error.name ? "border-danger-500" : ""}`}
          />
          {error.name && (
            <div className="text-red-500 text-sm mt-1">{error.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold mb-1">
            Price:
          </label>
          <Input
            type="number"
            name="price"
            id="price"
            defaultValue={product?.price || ""}
            className={`border-gray-300 focus:border-primary-500 focus:ring-primary-500 ${error.price ? "border-danger-500" : ""}`}
          />
          {error.price && (
            <div className="text-red-500 text-sm mt-1">{error.price}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold mb-1"
          >
            Category:
          </label>
          <Select
            id="category"
            name="category"
            label="Categories"
            placeholder="Select a Category"
            className={`max-w-xs ${error.category ? "border-danger-500" : ""}`}
            defaultSelectedKeys={[product?.category || ""]}
          >
            {categories.map((category) => (
              <SelectItem value={category} key={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          {error.category && (
            <div className="text-danger-500 text-sm mt-1">{error.category}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-semibold mb-1"
          >
            Quantity:
          </label>
          <Input
            type="number"
            name="quantity"
            id="quantity"
            defaultValue={product?.quantity || ""}
            className={`border-gray-300 focus:border-primary-500 focus:ring-primary-500 ${error.quantity ? "border-danger-500" : ""}`}
          />
          {error.quantity && (
            <div className="text-red-500 text-sm mt-1">{error.quantity}</div>
          )}
        </div>

        <div>
          <label htmlFor="tax" className="block text-sm font-semibold mb-1 ">
            Tax (%):
          </label>
          <Input
            type="number"
            name="tax"
            id="tax"
            defaultValue={product?.tax || ""}
            className={`border-gray-300 focus:border-primary-500 focus:ring-primary-500 ${error.tax ? "border-danger-500" : ""}`}
          />
          {error.tax && (
            <div className="text-red-500 text-sm mt-1">{error.tax}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="imagePath"
            className="block text-sm font-semibold mb-1"
          >
            Image Path:
          </label>
          <Input
            type="text"
            name="imagePath"
            id="imagePath"
            defaultValue={product?.imagePath || ""}
            className={`border-gray-300 focus:border-primary-500 focus:ring-primary-500  ${error.imagePath ? "border-red-500" : ""}`}
          />
          {error.imagePath && (
            <div className="text-danger-500 text-sm mt-1">
              {error.imagePath}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-1"
          >
            Description:
          </label>
          <Input
            type="textarea"
            name="description"
            id="description"
            defaultValue={product?.description || ""}
            className={`border-gray-300  focus:border-primary-500 focus:ring-primary-500 ${error.description ? "border-danger-500" : ""}`}
          />
          {error.description && (
            <div className="text-red-500 text-sm mt-1">{error.description}</div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAvailableForPurchase"
            id="isAvailableForPurchase"
            onChange={(e) => setIsAvailableForPurchase(e.target.checked)}
            checked={isAvailableForPurchase}
            className="mr-2"
          />
          <label
            htmlFor="isAvailableForPurchase"
            className="text-sm font-semibold"
          >
            Available for Purchase
          </label>
          {error.isAvailableForPurchase && (
            <div className="text-red-500 text-sm mt-1">
              {error.isAvailableForPurchase}
            </div>
          )}
        </div>

        <Button
          className="mt-4 bg-primary-600 text-white hover:bg-primary-700 transition duration-300 w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default NewProductForm;
