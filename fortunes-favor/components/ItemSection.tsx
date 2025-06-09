"use client";
import { ShopItem } from "@/utils/ItemShop";
import React, { useState } from "react";
import ItemCard from "./blocks/ItemCard";
import DropdownField from "./blocks/Inputs/DropdownField";

type ItemSectionProps = {
  Items: ShopItem[];
};

const ItemSection: React.FC<ItemSectionProps> = ({ Items }) => {
  const [sortType, setSortType] = useState<"alpha" | "cost">("alpha");

  const sortedItems = [...Items].sort((a, b) => {
    if (sortType === "alpha") {
      return a.title.localeCompare(b.title);
    } else {
      return a.price - b.price;
    }
  });

  return (
    <div>
      <div className="w-fit mt-2 mx-auto">
        <DropdownField
          name="Sort"
          defaultValue={sortType}
          options={[
            { title: "Alphabetical", slug: "alpha" },
            { title: "Cost", slug: "cost" },
          ]}
          onChange={(e) => setSortType(e.target.value as "alpha" | "cost")}
        />
      </div>
      <ul className="m-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedItems.map((item) => (
          <li key={item.title}>
            <ItemCard isExpanded item={item} showDetails />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemSection;
