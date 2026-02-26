"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.payload) };

    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      };

    case "SET_CART":
      return { items: action.payload };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart-storage");
    if (savedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart-storage", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
