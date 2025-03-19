import { ItemShop, ShopItem } from "@/utils/ShopGenerator";

type ShopItemCardProps = {
  item: ShopItem;
};

const ShopItemCard = ({ item }: ShopItemCardProps) => {
  const titleStyle = "flex p-2 bg-teal-300 dark:bg-teal-800";
  const cardStyle = item.discounted
    ? "pb-3 dark:bg-slate-800 bg-slate-200 border-l-amber-300 dark:border-l-amber-800 border-l-4"
    : "pb-3 dark:bg-slate-800 bg-slate-200";
  return (
    <div className={cardStyle}>
      <div className={titleStyle}>
        <h1 className="text-lg font-semibold float-left grow">{item.name}</h1>
        <h3 className="flex items-center justify-center float-right rounded-full bg-amber-300 w-8 h-8 text-black font-semibold">
          {item.cost}
        </h3>
      </div>
      <div className="clear-both">
        <p className="px-4">{item.description}</p>
      </div>
    </div>
  );
};

type ShopProps = { seed?: string };

const Shop = ({ seed }: ShopProps): JSX.Element => {
  let shop;
  try {
    shop = new ItemShop(seed);
  } catch (e) {
    if (e instanceof DOMException) {
      console.warn(e.message);
    } else throw e;
  }
  if (!shop)
    return <div className="text-center text-2xl mt-8">Invalid seed</div>;

  return (
    <div className="pb-6">
      <h1 className="text-4xl mt-8 font-light text-center tracking-wider p-6">
        {shop.shopName}
      </h1>
      <ul className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {shop.availableItems.map((item) => (
          <li key={item.name}>
            <ShopItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
