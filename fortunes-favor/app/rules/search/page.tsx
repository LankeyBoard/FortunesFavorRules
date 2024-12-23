import { Suspense } from "react";
import SearchResuls from "../../components/SearchResults";

const SearchPage = async (
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) => {
  const searchParams = await props.searchParams;
  return (
    <Suspense>
      <SearchResuls searchParams={searchParams} />
    </Suspense>
  );
};
export default SearchPage;
