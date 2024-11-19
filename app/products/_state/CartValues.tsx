"use client";
import { socket } from "../../socket";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CartProduct from "@/components/CartProduct";
import { usePathname, useRouter } from "next/navigation";
import { FetchCart } from "../_actions/FetchUserDetails";
import { signIn, useSession } from "next-auth/react";

// Define the shape of your context
interface CartContextType {
  cart: number;
  addToCart: (product: any, addval?: number) => void;
  rendered: React.ReactNode[]; // Ensure rendered is defined here
  products: any[];
  loading: boolean;
  handleIncrease: (id: string) => void;
  handleDecrease: (id: string, index: number) => void;
  handleDelete: (id: string, index: number) => void;
  quantity: { [key: string]: number };
  total: number;
  val: any;
  setCartQuantity: any;
  setQuantity: any;
  setVal: any;
  selectedAddress: any;
  setSelectedAddress: any;
  setTotal: any;
}

// Create context with a default value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartValues({ children }: { children: React.ReactNode }) {
  const [quantity, setQuantity] = useState<{ [id: string]: number }>({});
  const [cartQuantity, setCartQuantity] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();
  const [val, setVal] = useState<string[]>([]); // Maintain the list of product IDs for rendered components
  const [selectedAddress, setSelectedAddress] = useState("");
  const [check, setCheck] = useState(true);
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await FetchCart();
      setQuantity(data?.cart ? JSON.parse(String(data.cart)) : {});
      setVal(data?.val ? JSON.parse(String(data.val)) : []);
      setCartQuantity(data?.quantity ? Number(data.quantity) : 0);
      setTotal(data?.total ? Number(data.total) : 0);
    };
    fetchOrder();
  }, []);
  socket.on("hello", (value) => {
    console.log("Value:", value);
    console.log("Check", check);
    setCheck(true);
  });
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (check) {
      fetchProducts();
    }
    setCheck(false);
  }, [check]);

  const handleIncrease = (id: string) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setCartQuantity((prev) => prev + 1);
    const price = products.find((product) => product.id === id)?.price || 0;
    setTotal((prev) => parseFloat((prev + price).toFixed(2)));
  };

  const handleDecrease = (id: string, index: number) => {
    if (quantity[id] === 1) {
      handleDelete(id, index);
    } else {
      setQuantity((prev) => ({
        ...prev,
        [id]: Math.max((prev[id] || 0) - 1, 0),
      }));
      const price = products.find((product) => product.id === id)?.price || 0;
      setTotal((prev) => parseFloat((prev - price).toFixed(2)));
      setCartQuantity((prev) => prev - 1);
    }
  };

  const handleDelete = (id: string, index: number) => {
    const price = products.find((product) => product.id === id)?.price || 0;
    const itemTotal = (quantity[id] || 0) * price;
    setTotal((prev) => parseFloat((prev - itemTotal).toFixed(2)));
    setCartQuantity((prev) => prev - (quantity[id] || 0));
    setQuantity((prev) => {
      const newQuantity = { ...prev };
      delete newQuantity[id];
      return newQuantity;
    });
    // Update the val array to remove the deleted product ID
    setVal((prev) => prev.filter((_, i) => i !== index));
  };

  const addToCart = (product: any, addval: number = 1) => {
    if (!session) {
      signIn();
    }
    setCartQuantity((prev) => prev + addval);
    setQuantity((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + addval,
    }));
    setTotal((prev) => parseFloat((prev + product.price * addval).toFixed(2)));
    // Update the val array to include the new product ID if it doesn't exist
    if (!val.includes(product.id)) {
      setVal((prev) => [...prev, product.id]);
    }
  };

  // const buynow = (product: any, addval: number = 1) => {

  //   let pazhayatotal=total

  //   setTotal((prev) => parseFloat((prev + product.price * addval).toFixed(2)));
  //   // Update the val array to include the new product ID if it doesn't exist
  //   let pazhaya=val
  //   setVal([])
  //   if (!val.includes(product.id)) {
  //     setVal((prev) => [...prev, product.id]);
  //   }
  // };

  // Create the rendered array of CartProduct components based on val
  const rendered = val.map((id, index) => (
    <CartProduct key={id} id={id} index={index} />
  ));

  const value = useMemo(
    () => ({
      cart: cartQuantity,
      addToCart,
      rendered,
      products,
      loading,
      val,
      handleDelete,
      handleIncrease,
      handleDecrease,
      quantity,
      total,
      setCartQuantity,
      setQuantity,
      setVal,
      selectedAddress,
      setSelectedAddress,
      setTotal,
    }),
    [cartQuantity, products, loading, quantity, total, val, selectedAddress]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartValues provider");
  }
  return context;
}
