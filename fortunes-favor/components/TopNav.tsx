import NavHeader from "./blocks/NavHeader";
import SearchBar from "./blocks/SearchBar";

const TopNav = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-slate-900 border-b-2 border-b-teal-400 h-20">
        <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
          <div className="flex md:order-2 grow align-right">
            <div className="flex-auto md:min-w-96 min-w-20">
              <SearchBar />
            </div>
          </div>
          <div className="md:order-1">
            <NavHeader />
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
