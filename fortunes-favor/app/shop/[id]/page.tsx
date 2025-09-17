"use client";

import { use, useEffect, useState } from "react";
import Shop from "@/components/Shop";
import { Rarity, RechargeOn } from "@/utils/enums";
import client from "@/utils/graphQLclient";
import {
  GET_ITEM_SHOP,
  ItemShopQueryDataType,
} from "@/utils/graphQLQueries/ItemShopQuery";
import { ItemShop, ShopItem } from "@/utils/ItemShop";
import EditableShop from "@/components/EditableShop";
import FullPageLoading from "@/components/FullPageLoading";

const convertDataToItemShop = (data: ItemShopQueryDataType): ItemShop => {
  console.log("data:", data);
  return new ItemShop(
    data.itemShop.name,
    data.itemShop.description,
    data.itemShop.itemsInStock.map(
      (item) =>
        new ShopItem(
          item.title,
          item.text,
          item.isMagic,
          Rarity[item.rarity as unknown as keyof typeof Rarity],
          item.effects,
          item.tags,
          item.defaultPrice,
          true,
          item.slots,
          item.id,
          item.uses
            ? {
                ...item.uses,
                rechargeOn:
                  RechargeOn[
                    item.uses.rechargeOn as unknown as keyof typeof RechargeOn
                  ],
              }
            : undefined,
          item.salePrice,
        ),
    ),
    data.itemShop.itemsCouldStock.map(
      (item) =>
        new ShopItem(
          item.title,
          item.text,
          item.isMagic,
          Rarity[item.rarity as unknown as keyof typeof Rarity],
          item.effects,
          item.tags,
          item.defaultPrice,
          true,
          item.slots,
          item.id,
          item.uses
            ? {
                ...item.uses,
                rechargeOn:
                  RechargeOn[
                    item.uses.rechargeOn as unknown as keyof typeof RechargeOn
                  ],
              }
            : undefined,
        ),
    ),
    data.itemShop.id,
  );
};

const ShopPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // Unwrap the params promise

  const [shop, setShop] = useState<ItemShop | null>(null);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<any>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const { data } = await client.query({
          query: GET_ITEM_SHOP,
          variables: { id },
        });
        if (data.itemShop) {
          setShop(convertDataToItemShop(data));
          setCanEdit(!!data.itemShop.canEdit);
        }
      } catch (error) {
        setLoadingError(error);
      }
    };
    fetchShop();
  }, [id]);

  if (loadingError) {
    console.error(loadingError);
    return <div>Error loading shop data.</div>;
  }

  if (!shop) {
    return <FullPageLoading />;
  }

  return canEdit ? <EditableShop shop={shop} /> : <Shop shop={shop} />;
};

export default ShopPage;
