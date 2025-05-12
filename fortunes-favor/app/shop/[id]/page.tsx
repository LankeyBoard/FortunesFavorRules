import Shop from "@/components/Shop";
import { Rarity, RechargeOn } from "@/utils/enums";
import client from "@/utils/graphQLclient";
import {
  GET_ITEM_SHOP,
  ItemShopQueryDataType,
} from "@/utils/graphQLQueries/ItemShopQuery";
import { ItemShop, ShopItem } from "@/utils/ItemShop";

const convertDataToItemShop = (data: ItemShopQueryDataType): ItemShop => {
  return new ItemShop(
    data.itemShop.name,
    data.itemShop.description,
    data.itemShop.itemsInStock.map(
      (item) =>
        new ShopItem(
          item.title,
          item.text,
          item.isMagic,
          item.rarity as unknown as Rarity,
          item.effects,
          item.tags,
          item.defaultPrice,
          true,
          item.id,
          item.uses
            ? {
                ...item.uses,
                rechargeOn: item.uses.rechargeOn as unknown as RechargeOn,
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
          item.rarity as unknown as Rarity,
          item.effects,
          item.tags,
          item.defaultPrice,
          true,
          item.id,
          item.uses
            ? {
                ...item.uses,
                rechargeOn: item.uses.rechargeOn as unknown as RechargeOn,
              }
            : undefined,
        ),
    ),
    data.itemShop.id,
  );
};

export default async function ShopView(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { data } = await client.query({
    query: GET_ITEM_SHOP,
    variables: { id: params.id },
  });
  return <Shop shop={convertDataToItemShop(data.itemShop)} />;
}
