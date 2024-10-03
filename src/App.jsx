import "./App.css";
import {
    RouterProvider,
    createBrowserRouter,
    createHashRouter,
} from "react-router-dom";
import Layout from "./component/Layout/Layout";
import ProtectedRoutes from "./component/ProtectedRoutes/ProtectedRoutes";
import Home from "./component/Home/Home";
import Products from "./component/Products/Products";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import Categories from "./component/Categories/Categories";
import Cart from "./component/Cart/Cart";
import Brands from "./component/Brands/Brands";
import ProtectedRoutesLogin from "./component/ProtectedRoutesLogin/ProtectedRoutesLogin";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import ResetCode from "./component/ResetCode/ResetCode";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import NotFound from "./component/NotFound/NotFound";
import { useContext, useEffect } from "react";
import { tokenContext } from "./context/tokenContext";
import AllOrders from "./component/AllOrders/AllOrders";
import CashPayment from "./component/CashPayment/CashPayment";
import OnlinePayment from "./component/OnlinePayment/OnlinePayment";
import Wishlist from "./component/Wishlist/Wishlist";
import AddAddress from "./component/AddAddress/AddAddress";


let routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "products",
                element: (
                    <ProtectedRoutes>
                        <Products />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "productDetails/:id",
                element: (
                    <ProtectedRoutes>
                        <ProductDetails />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "products/productDetails/:id",
                element: (
                    <ProtectedRoutes>
                        <ProductDetails />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "categories",
                element: (
                    <ProtectedRoutes>
                        <Categories />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "cart",
                element: (
                    <ProtectedRoutes>
                        <Cart />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "wishlist",
                element: (
                    <ProtectedRoutes>
                        <Wishlist />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "brands",
                element: (
                    <ProtectedRoutes>
                        <Brands />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "addAddress",
                element: (
                    <ProtectedRoutes>
                        <AddAddress />
                    </ProtectedRoutes>
                ),
                children: [
                    { path: "", element: <CashPayment /> },
                    { path: "payCash", element: <CashPayment /> },
                    { path: "payOnline", element: <OnlinePayment /> },
                ],
            },
            {
                path: "allorders",
                element: (
                    <ProtectedRoutes>
                        <AllOrders />
                    </ProtectedRoutes>
                ),
            },
            {
                path: "register",
                element: (
                    <ProtectedRoutesLogin>
                        <Register />
                    </ProtectedRoutesLogin>
                ),
            },
            {
                path: "login",
                element: (
                    <ProtectedRoutesLogin>
                        <Login />
                    </ProtectedRoutesLogin>
                ),
            },
            {
                path: "forgetPassword",
                element: (
                    <ProtectedRoutesLogin>
                        <ForgetPassword />
                    </ProtectedRoutesLogin>
                ),
            },
            {
                path: "resetCode",
                element: (
                    <ProtectedRoutesLogin>
                        <ResetCode />
                    </ProtectedRoutesLogin>
                ),
            },
            {
                path: "resetPassword",
                element: (
                    <ProtectedRoutesLogin>
                        <ResetPassword />
                    </ProtectedRoutesLogin>
                ),
            },
            {
                path: "*",
                element: (
                    <ProtectedRoutes>
                        <NotFound />
                    </ProtectedRoutes>
                ),
            },
        ],
    },
]);

function App() {
    let { setToken } = useContext(tokenContext);
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setToken(localStorage.getItem("userToken"));
        }
    }, [setToken]);
    return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
