import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TokenContextProvider from "./context/tokenContext";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import CartContextProvider from "./context/cartContext";
import WishlistContextProvider from "./context/wishlistContext";
import OrderContextProvider from "./context/orderContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
let query = new QueryClient()
root.render(
        <WishlistContextProvider>
            <CartContextProvider>
                <OrderContextProvider>
                    <QueryClientProvider client={query}>
                        <TokenContextProvider>
                            <App/>
                        </TokenContextProvider>
                    </QueryClientProvider>
                </OrderContextProvider>
            </CartContextProvider>
        </WishlistContextProvider>
    
);
