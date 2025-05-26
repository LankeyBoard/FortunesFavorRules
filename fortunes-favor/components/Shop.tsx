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
        <h2 className="text-3xl tracking-wider font-extralight py-4 px-3 bg-teal-300 dark:bg-teal-800 text-center">
          Items For Sale
        </h2>
        <ul className="m-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {shop.itemsInStock.length > 0 ? (
            shop.itemsInStock.map((item) => (
              <li key={item.title}>
                <ItemCard isExpanded item={item} showDetails />
              </li>
            ))
          ) : (
            <p className="text-center">Nothing for sale, check back later</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Shop;
