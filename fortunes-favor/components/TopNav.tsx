import { cookies } from "next/headers";
import NavHeader from "./blocks/NavHeader";
import SearchBar from "./blocks/SearchBar";
import SignupLoginButtons from "./SignupLoginButtons";

const TopNav = async () => {
  // Read the auth cookie on the server so the buttons render in the correct
  // state on first paint (no logged-out flash before hydration).
  const isAuthenticated = (await cookies()).has("token");
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
          <div className="md:order-3 pr-2 md:pr-0">
            <SignupLoginButtons initialIsAuthenticated={isAuthenticated} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
