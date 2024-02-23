import SearchResuls from "../components/SearchResults";

const SearchPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  return <SearchResuls searchParams={searchParams} />;
};
export default SearchPage;
