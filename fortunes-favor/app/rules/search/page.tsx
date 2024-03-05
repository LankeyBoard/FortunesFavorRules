import { Suspense } from "react";
import SearchResuls from "../../components/SearchResults";

const SearchPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  return (
    <Suspense>
      <SearchResuls searchParams={searchParams} />
    </Suspense>
  );
};
export default SearchPage;
