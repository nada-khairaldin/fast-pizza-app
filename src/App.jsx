/*
features --> app features as every feature is in a separate folder to achieve decoupling 
services --> api fetching 
ui --> ui reuseable components
utils --> js functions for methods like date formatting
etc ... like pages --> but here we will separate pages inside features */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error"
import Menu, { loader as menuLoader } from "./features/menu/Menu"; // we will have many loader so we renamed them
import Order, { loader as orderLoader}  from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";

/* this way is an imperative way of defining router api for data fetching , previously in other projects we had used the declarative way of router defining as we don't need any data fetching */

const router = createBrowserRouter([
  {
    element: <AppLayout />, // this element is a parent for a nested routers , so we used the children prop
    errorElement : <Error/>, // any error is thrown by child route (failed fetching , wrong path, etc) will bubble up to the parent , so we showed the errorElement here 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // 2- with loader prop we connect loader with route 
        // Note : even that the loader is in the component function, but fetching data is fired here in route
         errorElement : <Error/> // we add it here even that the error in fetching data will bubble up to the parent ! as that error will appear out of the layout in a separate page (just the error component in the full page) but by this way , the error will appear inside the layout (instead of the fetched data)
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement : <Error/> 
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
