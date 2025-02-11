import { ItemShop, ShopItem } from "@/utils/ShopGenerator";

type ShopItemCardProps = {
  item: ShopItem;
};

const ShopItemCard = ({ item }: ShopItemCardProps) => {
  let titleStyle = "flex p-2 bg-teal-300 dark:bg-teal-800";

  return (
    <div className="pb-3 dark:bg-slate-800 bg-slate-200">
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
export default function ShopView() {
  const defaultShop = new ItemShop(undefined);
  console.log(defaultShop.encodeShop());
  const testShop = new ItemShop(defaultShop.encodeShop());

  console.log(testShop.availableItems);
  return (
    <div>
      <h1 className="text-4xl mt-8 font-light text-center tracking-wider">
        {defaultShop.shopName}
      </h1>
      <ul className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {defaultShop.availableItems.map((item) => (
          <li key={item.name}>
            <ShopItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
