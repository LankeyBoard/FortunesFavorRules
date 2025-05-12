"use client";
import React, { useState } from "react";
import { ItemShop, ShopItem } from "@/utils/ItemShop";
import { Rarity, RechargeOn } from "@/utils/enums";

const ShopBuilder = () => {
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [itemsInStock, setItemsInStock] = useState<ShopItem[]>([]);
  const [itemsCouldStock, setItemsCouldStock] = useState<ShopItem[]>([]);

  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [newItemIsMagic, setNewItemIsMagic] = useState(false);
  const [newItemRarity, setNewItemRarity] = useState<Rarity>(Rarity.COMMON);
  const [newItemDefaultPrice, setNewItemDefaultPrice] = useState(0);
  const [newItemTags, setNewItemTags] = useState<string>("");
  const [newItemInStock, setNewItemInStock] = useState(false);

  const handleAddItem = () => {
    const newItem = new ShopItem(
      newItemTitle,
      [{ text: newItemText }],
      newItemIsMagic,
      newItemRarity,
      [],
      newItemTags.split(",").map((tag) => tag.trim()),
      newItemDefaultPrice,
      newItemInStock,
    );

    if (newItemInStock) {
      setItemsInStock([...itemsInStock, newItem]);
    } else {
      setItemsCouldStock([...itemsCouldStock, newItem]);
    }

    // Reset item inputs
    setNewItemTitle("");
    setNewItemText("");
    setNewItemIsMagic(false);
    setNewItemRarity(Rarity.COMMON);
    setNewItemDefaultPrice(0);
    setNewItemTags("");
    setNewItemInStock(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newShop = new ItemShop(
      shopName,
      shopDescription,
      itemsInStock,
      itemsCouldStock,
    );

    console.log("New ItemShop Created:", newShop);

    // Reset form inputs
    setShopName("");
    setShopDescription("");
    setItemsInStock([]);
    setItemsCouldStock([]);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Shop Builder</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Shop Description</label>
          <textarea
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Add Item</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Item Title</label>
              <input
                type="text"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Item Text</label>
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Is Magic</label>
              <input
                type="checkbox"
                checked={newItemIsMagic}
                onChange={(e) => setNewItemIsMagic(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Rarity</label>
              <select
                value={newItemRarity}
                onChange={(e) =>
                  setNewItemRarity(e.target.value as unknown as Rarity)
                }
                className="w-full p-2 border rounded"
              >
                {Object.values(Rarity).map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Default Price</label>
              <input
                type="number"
                value={newItemDefaultPrice}
                onChange={(e) =>
                  setNewItemDefaultPrice(parseInt(e.target.value, 10))
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={newItemTags}
                onChange={(e) => setNewItemTags(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">In Stock</label>
              <input
                type="checkbox"
                checked={newItemInStock}
                onChange={(e) => setNewItemInStock(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Item
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Shop
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Items In Stock</h2>
        <ul>
          {itemsInStock.map((item, index) => (
            <li key={index} className="mb-2">
              {item.title} - {item.price} coins
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-bold mt-4 mb-2">Items Could Stock</h2>
        <ul>
          {itemsCouldStock.map((item, index) => (
            <li key={index} className="mb-2">
              {item.title} - {item.price} coins
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopBuilder;
