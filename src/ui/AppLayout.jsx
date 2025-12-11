import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  /* we could access loading state in react router using useNavigation hook (not useNavigate) with it we could see the app either idle, loading or submitting. this information is for the entire application not for a specific page, so if one page is loading , the navigation state will become 'loading' no matter any page is loading! so we have to write it in a global place not in a specific page as we will not know which page is loading when navigation state is 'loading' */

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />} {/*plus the original content if it is loading , we will show the loader */}
      <Header />
      <main>
        <h1>Content</h1>
        <Outlet />
        {/* to change content dynamically with nested router path changing */}
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
