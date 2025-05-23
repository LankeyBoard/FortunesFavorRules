import { ItemShop } from "@/utils/ItemShop";
import ItemCard from "./blocks/ItemCard";

type ShopProps = { shop: ItemShop };
const Shop = ({ shop }: ShopProps) => {
  return (
    <div className="pb-6">
      <h1 className="text-4xl mt-8 font-light text-center tracking-wider p-6">
        {shop.name}
      </h1>
      <div className="m-2 p-2">
        <p className="max-w-xl">{shop.description}</p>
      </div>
      <div>
        <h2>Items For Sale</h2>
        <ul className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {shop.itemsInStock.length > 0 ? (
            shop.itemsInStock.map((item) => (
              <li key={item.title}>
                <ItemCard isExpanded item={item} showDetails />
              </li>
            ))
          ) : (
            <p>Nothing for sale, check back later</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
