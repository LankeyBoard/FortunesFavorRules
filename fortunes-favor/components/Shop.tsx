import RuleData from "@/utils/GenericRuleData";
import { ItemShop, ShopItem } from "@/utils/ItemShop";
import TextBlock from "./blocks/TextBlock";

type ShopItemCardProps = {
  item: ShopItem;
};

const ShopItemCard = ({ item }: ShopItemCardProps) => {
  const titleStyle = "flex p-2 bg-teal-300 dark:bg-teal-800";
  const cardStyle = item.onSale
    ? "pb-3 dark:bg-slate-800 bg-slate-200 border-l-amber-300 dark:border-l-amber-800 border-l-4"
    : "pb-3 dark:bg-slate-800 bg-slate-200";
  return (
    <div className={cardStyle}>
      <div className={titleStyle}>
        <h1 className="text-lg font-semibold float-left grow">{item.title}</h1>
        <h3 className="flex items-center justify-center float-right rounded-full bg-amber-300 w-8 h-8 text-black font-semibold">
          {item.price}
        </h3>
      </div>
      <div className="clear-both">
        <p className="px-4">
          <TextBlock text={item.text} />
        </p>
      </div>
    </div>
  );
};

type ShopProps = { shop: ItemShop };
const Shop = ({ shop }: ShopProps) => {
  return (
    <div className="pb-6">
      <h1 className="text-4xl mt-8 font-light text-center tracking-wider p-6">
        {shop.name}
      </h1>
      <ul className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {shop.itemsInStock.map((item) => (
          <li key={item.title}>
            <ShopItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
