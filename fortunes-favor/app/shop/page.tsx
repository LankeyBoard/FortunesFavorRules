import FullPageLoading from "@/components/FullPageLoading";
import ALL_SHOPS_QUERY, {
  AllShopsQueryData,
} from "@/utils/graphQLQueries/AllShopsQuery";
import client from "@/utils/graphQLclient";
import Link from "next/link";

const ShopView = async (): Promise<JSX.Element> => {
  let data: AllShopsQueryData | undefined;
  try {
    const result = await client.query<{
      allShops: AllShopsQueryData["allShops"];
    }>({
      query: ALL_SHOPS_QUERY,
      fetchPolicy: "no-cache", // optional, but recommended for SSR
    });
    data = result.data;
  } catch (error) {
    console.error(error, data);
    return <div>Error loading shops.</div>;
  }

  if (!data || !data.allShops) return <div>No shops found.</div>;

  return (
    <div className="m-4">
      <h1 className="text-4xl mt-8 font-light text-center tracking-wider p-6">
        Shops
      </h1>
      <ul className="flex flex-wrap flex-row space-x-2">
        {data.allShops.map((shop) => (
          <li key={shop.id} className="mt-2">
            <Link
              href={`/shop/${shop.id}`}
              className="p-4 max-w-md border-2 border-teal-500 block"
            >
              <h1 className="text-xl font-bold text-center">{shop.name}</h1>
              <p>{shop.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopView;
