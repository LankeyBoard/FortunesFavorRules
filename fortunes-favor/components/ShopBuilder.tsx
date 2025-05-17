"use client";
import React, { useState } from "react";
import { ItemShop, ShopItem } from "@/utils/ItemShop";
import CreateItem, { ItemType } from "./blocks/Inputs/CreateItem";
import ItemCard from "./blocks/ItemCard";
import { useMutation } from "@apollo/client";
import CREATE_SHOP_MUTATION from "@/utils/graphQLMutations/CreateShopMutation";
import { useRouter } from "next/navigation";
import Button, { ButtonType } from "./blocks/Inputs/Button";

const ItemShopToGraphQLInput = (shop: ItemShop) => {
  console.log(shop);
  let graphQLInput: any = { ...shop };
  console.log("unprocessed graph inputs", graphQLInput);
  graphQLInput.itemsInStock = graphQLInput.itemsInStock.map(
    (item: ShopItem) => {
      const { inStock, ...trimmedItem } = item;
      return {
        ...trimmedItem,
        rarity: item.rarity.toString().toUpperCase(),
      };
    },
  );
  graphQLInput.itemsCouldStock = graphQLInput.itemsCouldStock.map(
    (item: ShopItem) => {
      const { inStock, salePrice, ...trimmedItem } = item;
      return {
        ...trimmedItem,
        rarity: item.rarity.toString().toUpperCase(),
      };
    },
  );

  console.log(graphQLInput);
  return graphQLInput;
};

const ShopBuilder = () => {
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [itemsInStock, setItemsInStock] = useState<ShopItem[]>([]);
  const [itemsCouldStock, setItemsCouldStock] = useState<ShopItem[]>([]);
  const [CreateShop] = useMutation(CREATE_SHOP_MUTATION);

  const router = useRouter();

  const AddItemToShop = (item: ShopItem) => {
    if (item.inStock) {
      setItemsInStock([...itemsInStock, item]);
    } else {
      setItemsCouldStock([...itemsCouldStock, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newShop = new ItemShop(
      shopName,
      shopDescription,
      itemsInStock,
      itemsCouldStock,
    );
    const { data } = await CreateShop({
      variables: {
        itemShopInput: ItemShopToGraphQLInput(newShop),
      },
    });

    console.log("shop created", data);
    if (!data.createShop.id) throw new Error("Error creating new Item Shop");

    // Reset form inputs
    setShopName("");
    setShopDescription("");
    setItemsInStock([]);
    setItemsCouldStock([]);

    router.push(`/shop/${data.createShop.id}`);
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
          <CreateItem
            addItemToParent={(item) => AddItemToShop(item as ShopItem)}
            itemType={ItemType.SHOP_ITEM}
          />
        </div>
        <Button buttonType={ButtonType.default} type="submit" color="green">
          Create Shop
        </Button>
      </form>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Items In Stock</h2>
        <ul>
          {itemsInStock.map((item, index) => (
            <ItemCard
              key={item.title + item.id}
              item={item}
              isExpanded={false}
            />
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
