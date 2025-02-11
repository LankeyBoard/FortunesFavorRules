"use client";

import React, { useState } from "react";
import { ItemShop, ShopItem } from "@/utils/ShopGenerator";

const ShopBuilderPage: React.FC = () => {
  const [shop, setShop] = useState<ItemShop>(new ItemShop());

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.shopName = event.target.value;
    setShop(updatedShop);
  };

  const toggleAvailability = (index: number) => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.inventory[index].inStock =
      !updatedShop.inventory[index].inStock;
    setShop(updatedShop);
  };

  const toggleDiscount = (index: number) => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.inventory[index].discounted =
      !updatedShop.inventory[index].discounted;
    setShop(updatedShop);
  };

  const markAllAvailable = () => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.inventory.forEach((item) => {
      item.inStock = true;
    });
    setShop(updatedShop);
  };

  const markAllFullPrice = () => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.inventory.forEach((item) => {
      item.discounted = false;
    });
    setShop(updatedShop);
  };

  const randomizeAvailability = () => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.inventory.forEach((item) => {
      item.inStock = Math.random() < 0.5;
    });
    setShop(updatedShop);
  };

  const randomizeDiscounts = () => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.inventory.forEach((item) => {
      item.discounted = Math.random() < 0.5;
    });
    setShop(updatedShop);
  };

  const revisitShop = () => {
    const updatedShop = new ItemShop(shop.encodeShop());
    updatedShop.updateShopContents(15);
    setShop(updatedShop);
  };

  return (
    <div className="pb-6">
      <h1 className="text-4xl mt-8 font-light text-center tracking-wider p-6">
        Shop Builder
      </h1>
      <div className="m-4">
        <p>{shop.encodeShop()}</p>
        <label className="block text-lg font-semibold mb-2">Shop Name:</label>
        <input
          type="text"
          value={shop.shopName}
          onChange={handleNameChange}
          className="w-full p-2 border border-gray-300 rounded dark:text-black"
        />
      </div>
      <div className="m-4 flex justify-between">
        <button
          onClick={markAllAvailable}
          className="p-2 bg-green-500 text-white rounded"
        >
          Mark All Available
        </button>
        <button
          onClick={markAllFullPrice}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Mark All Full Price
        </button>
        <button
          onClick={randomizeAvailability}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Randomize Availability
        </button>
        <button
          onClick={randomizeDiscounts}
          className="p-2 bg-purple-500 text-white rounded"
        >
          Randomize Discounts
        </button>
        <button
          onClick={revisitShop}
          className="p-2 bg-pink-500 text-white rounded"
        >
          Revisit Shop
        </button>
      </div>
      <ul className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {shop.inventory.map((item, index) => (
          <li key={item.name} className="pb-3 dark:bg-slate-800 bg-slate-200">
            <div className="flex p-2 bg-teal-300 dark:bg-teal-800">
              <h1 className="text-lg font-semibold float-left grow">
                {item.name}
              </h1>
              <h3 className="flex items-center justify-center float-right rounded-full bg-amber-300 w-8 h-8 text-black font-semibold">
                {item.cost}
              </h3>
            </div>
            <div className="clear-both px-4">
              <p>{item.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => toggleAvailability(index)}
                  className={`mr-2 p-2 rounded ${
                    item.inStock ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </button>
                <button
                  onClick={() => toggleDiscount(index)}
                  className={`p-2 rounded ${
                    item.discounted ? "bg-yellow-500" : "bg-gray-500"
                  } text-white`}
                >
                  {item.discounted ? "Discounted" : "Full Price"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopBuilderPage;
