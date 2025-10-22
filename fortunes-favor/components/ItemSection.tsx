"use client";
import { ShopItem } from "@/utils/ItemShop";
import React, { useEffect, useState } from "react";
import ItemCard from "./blocks/ItemCard";
import DropdownField from "./blocks/Inputs/DropdownField";
import ITEM_SECTION_QUERY, {
  ItemSectionData,
} from "@/utils/graphQLQueries/ItemSectionQuery";
import client from "@/utils/graphQLclient";
import Button, { ButtonType } from "./blocks/Inputs/Button";
import { gql, useMutation } from "@apollo/client";
import { UserProvider, useUser } from "./UserContext";
import BuyItemButton from "./blocks/BuyItemButton";

type ItemSectionProps = {
  items: ShopItem[];
  shopId?: string;
};

type ItemCardWButtonsProps = {
  item: ShopItem;
  itemSectionData?: ItemSectionData;
  shopId?: string;
};
const ItemCardWButtons: React.FC<ItemCardWButtonsProps> = ({
  item,
  itemSectionData,
  shopId,
}) => {
  const charactersInCampaign = itemSectionData?.me.characters.filter(
    (char) => char.campaign?.id === itemSectionData.itemShop.campaign?.id,
  );

  const { isLoggedIn } = useUser();
  const showButtons = itemSectionData && shopId && isLoggedIn();
  console.log(
    "showButtons:",
    showButtons,
    itemSectionData,
    shopId,
    isLoggedIn(),
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-800 pb-2">
      <ItemCard isExpanded item={item} showDetails />
      {showButtons && charactersInCampaign && (
        <BuyItemButton
          charactersInCampaign={charactersInCampaign}
          item={item}
          shopId={shopId}
        />
      )}
    </div>
  );
};

const ItemSection: React.FC<ItemSectionProps> = ({ items, shopId }) => {
  const [sortType, setSortType] = useState<"alpha" | "cost">("alpha");
  const [itemSectionData, setItemSectionData] = useState<
    ItemSectionData | undefined
  >(undefined);
  useEffect(() => {
    const fetchMyCharacters = async () => {
      try {
        const { data } = await client.query({
          query: ITEM_SECTION_QUERY,
          variables: { shopId },
        });
        console.log("Item Section Data: ", data);
        if (data) {
          setItemSectionData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (shopId) fetchMyCharacters();
  }, [shopId]);

  const sortedItems = [...items].sort((a, b) => {
    if (sortType === "alpha") {
      return a.title.localeCompare(b.title);
    } else {
      return a.price - b.price;
    }
  });

  return (
    <div>
      <UserProvider>
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
              <ItemCardWButtons
                item={item}
                itemSectionData={itemSectionData}
                shopId={shopId}
              />
            </li>
          ))}
        </ul>
      </UserProvider>
    </div>
  );
};

export default ItemSection;
