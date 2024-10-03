import axios from "axios";
import { createContext, useEffect, useState } from "react";

let headers = {
    token: localStorage.getItem('userToken')
};

export let CartContext = createContext();

async function addToCart(id) {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
        productId: id
    }, {
        headers
    }).then((res) => res).catch((err) => err);
}

async function getCart() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
    }).then((res) => res).catch((err) => err);
}

async function deletProductFromCart(id) {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers
    }).then((res) => res).catch((err) => err);
}

async function clearCartItems() {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
    }).then((res) => res).catch((err) => err);
}

async function updateProductQuantity(id,count) {
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count
    }, {
        headers
    }).then((res) => res).catch((err) => err);
}
 
export default function CartContextProvider(props) {
    const[cartID,setCartId]=useState(null);
    const[numOfCartItems,setNumOfCartItems]=useState(null);

    async function cashOrder(id , values){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{
            shippingAddress:values
        },{
            headers
        }).then((res)=>res).catch((err)=>err)

    }
    async function onlineOrder(cartID,host, values) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${host}`,{
            shippingAddress:values
        }, {
            headers
        }).then((res) => res).catch((err) => err);
    }

    async function getInitialCart(){
        let{data}=await getCart();
        setNumOfCartItems(data?.numOfCartItems)
        setCartId(data?.data._id)
    }

    useEffect(()=>{
        getInitialCart()
    },[cartID])
    
    return (
        <CartContext.Provider value={{ 
            addToCart, 
            getCart, 
            deletProductFromCart, 
            clearCartItems, 
            updateProductQuantity, 
            onlineOrder, 
            cashOrder,
            cartID, 
            numOfCartItems,
            setNumOfCartItems}}>
            {props.children}
        </CartContext.Provider>
    );
}
