import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // 3- we use the loader's data in a component using useLoader hook

  const menu = useLoaderData(); // we don't pass anything to the function as react router know automatically that the data we want is the one that associated to this page (loader prop in route)

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Steps of render as you fetch strategy -> react router will start fetching while it renders the route VS. what we have used before with useEffect was fetch on render approach -> after the component is rendered we fetch the data (it is created data loading waterfall )

// 1- create a loader function to load data from api
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
