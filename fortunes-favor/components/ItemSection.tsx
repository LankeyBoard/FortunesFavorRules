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

const SELL_ITEM_MUTATION = gql`
  mutation SellItem($shopId: ID!, $itemId: ID!, $characterId: ID!) {
    sellItem(shopId: $shopId, itemId: $itemId, characterId: $characterId) {
      id
      itemsInStock {
        id
        title
      }
    }
  }
`;

type ItemSectionProps = {
  items: ShopItem[];
  shopId?: string;
};

type ItemCardWButtonsProps = {
  item: ShopItem;
  itemSectionData?: ItemSectionData;
  loadingError: any;
  shopId?: string;
};
const ItemCardWButtons: React.FC<ItemCardWButtonsProps> = ({
  item,
  itemSectionData,
  loadingError,
  shopId,
}) => {
  const [showSelectCharacter, setShowSelectCharacter] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [sellError, setSellError] = useState<string | null>(null);
  const [sellItem, { loading: selling }] = useMutation(SELL_ITEM_MUTATION);

  const showButtons = itemSectionData && shopId;

  const handleSell = async () => {
    if (!selectedCharId) return;
    setSellError(null);
    try {
      await sellItem({
        variables: {
          shopId,
          itemId: item.id,
          characterId: selectedCharId,
        },
      });
      setShowSelectCharacter(false);
      setSelectedCharId(null);
      window.location.reload();
    } catch (e) {
      console.log("error handling sell", e);
      setSellError("Failed to buy item.");
    }
  };

  const charactersInCampaign = itemSectionData?.me.characters.filter(
    (char) => char.campaign?.id === itemSectionData.itemShop.campaign.id,
  );
  console.log(
    "Characters in campaign",
    charactersInCampaign,
    itemSectionData?.me.characters,
    itemSectionData?.itemShop.campaign,
  );
  useEffect(() => {
    if (charactersInCampaign?.length === 1) {
      setSelectedCharId(charactersInCampaign[0].id);
    }
  }, [charactersInCampaign]);

  return (
    <div className="bg-slate-50 dark:bg-slate-800 pb-2">
      <ItemCard isExpanded item={item} showDetails />
      {showButtons && (
        <div className="p-2">
          {showSelectCharacter ? (
            <>
              <div className="flex flex-row">
                {charactersInCampaign ? (
                  <div>
                    {charactersInCampaign.length > 1 && (
                      <DropdownField
                        name="character"
                        options={charactersInCampaign.map((char) => ({
                          title: char.name,
                          slug: char.id,
                        }))}
                        onChange={(e) => setSelectedCharId(e.target.value)}
                        unselectedOption={true}
                      />
                    )}
                    {charactersInCampaign.length === 1 && (
                      <span className="font-light">
                        <span className="font-bold">
                          {charactersInCampaign[0].name}
                        </span>{" "}
                        is your only character in this campaign
                      </span>
                    )}
                  </div>
                ) : (
                  <p>No characters in this campaign!</p>
                )}
                <Button
                  buttonType={ButtonType.default}
                  color="green"
                  type="button"
                  disabled={!selectedCharId || loadingError || selling}
                  onClick={handleSell}
                >
                  Add to Character
                </Button>
                <Button
                  buttonType={ButtonType.default}
                  color="gray"
                  type="button"
                  onClick={() => {
                    setSelectedCharId(null);
                    setShowSelectCharacter(false);
                    setSellError(null);
                  }}
                  disabled={loadingError || selling}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Button
              buttonType={ButtonType.default}
              color="green"
              type="button"
              disabled={loadingError}
              onClick={() => setShowSelectCharacter(true)}
            >
              Buy
            </Button>
          )}
          {sellError && (
            <div className="text-red-600 text-sm mt-1">
              {sellError} Do you have enough coin?
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ItemSection: React.FC<ItemSectionProps> = ({ items, shopId }) => {
  const [sortType, setSortType] = useState<"alpha" | "cost">("alpha");
  const [itemSectionData, setItemSectionData] = useState<
    ItemSectionData | undefined
  >(undefined);
  const [loadingError, setLoadingError] = useState<any>(null);
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
        setLoadingError(error);
      }
    };
    if (shopId) fetchMyCharacters();
  }, [shopId]);

  if (loadingError) {
    console.error(loadingError);
    return <div>Error loading shop data.</div>;
  }
  const sortedItems = [...items].sort((a, b) => {
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
            <ItemCardWButtons
              item={item}
              itemSectionData={itemSectionData}
              loadingError={loadingError}
              shopId={shopId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemSection;
