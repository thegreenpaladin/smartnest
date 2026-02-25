// components/product/product-tabs.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductSpecs } from "./product-specs";

export const ProductTabs = ({ product }: { product: any }) => {
  return (
    <Tabs defaultValue="specs" className="w-full max-w-md">
      {/* 1. Static Header: This never moves */}
      <TabsList className="w-full justify-start bg-transparent border-b border-neutral-100 rounded-none h-auto p-0 mb-8">
        <TabsTrigger 
          value="description" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 mr-8 pb-4 text-xs font-bold uppercase tracking-widest transition-all"
        >
          Overview
        </TabsTrigger>
        
        <TabsTrigger 
          value="specs" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 mr-8 pb-4 text-xs font-bold uppercase tracking-widest transition-all"
        >
          Tech Specs
        </TabsTrigger>
        <TabsTrigger 
          value="shipping" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0 pb-4 text-xs font-bold uppercase tracking-widest transition-all"
        >
          Delivery
        </TabsTrigger>
      </TabsList>

      {/* 2. Fixed-Height Container: 
          Adjust 'min-h-[300px]' to match your longest content 
      */}
      <div className="h-max transition-all duration-300">
        <TabsContent value="specs" className="mt-0 outline-none animate-in fade-in duration-500">
          <ProductSpecs specs={product.specs} />
        </TabsContent>

        <TabsContent value="description" className="mt-0 outline-none animate-in fade-in duration-500">
          <p className="text-sm text-neutral-500 leading-relaxed">
            {product.description}
          </p>
        </TabsContent>

        <TabsContent value="shipping" className="mt-0 outline-none animate-in fade-in duration-500">
          <ul className="space-y-4 text-sm text-neutral-500">
            <li className="flex justify-between border-b border-neutral-50 pb-2">
              <span>Standard Shipping</span>
              <span className="text-black font-medium">Free</span>
            </li>
            <li className="flex justify-between border-b border-neutral-50 pb-2">
              <span>Express (Global)</span>
              <span className="text-black font-medium">$15.00</span>
            </li>
            <li className="flex justify-between border-b border-neutral-50 pb-2">
              <span>Processing Time</span>
              <span className="text-black font-medium">24 Hours</span>
            </li>
          </ul>
        </TabsContent>
      </div>
    </Tabs>
  );
};