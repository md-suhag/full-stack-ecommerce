import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Shop/Menu";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Cart from "../pages/Shop/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart-page", element: <Cart /> },
      {
        path: "/menu",
        element: (
          <PrivateRoute>
            <Menu />{" "}
          </PrivateRoute>
        ),
      },
      { path: "/update-profile", element: <UpdateProfile /> },
    ],
  },
]);

export default router;
