import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export let OrderContext = createContext();

export default function OrderContextProvider(props) {
  let [ordersDetails, setOrderDetails] = useState([]);
  let [lastOrder, setLastOrder] = useState(null);

  async function getCheckoutOrders(userId) {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((response) => {
        setOrderDetails(response?.data);
        return response;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    setLastOrder(ordersDetails[ordersDetails.length - 1]);
  },[ordersDetails]);

  return (
    <OrderContext.Provider
      value={{ getCheckoutOrders, ordersDetails, lastOrder }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}