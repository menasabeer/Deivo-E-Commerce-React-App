import axios from "axios";
import { createContext, useEffect, useState } from "react";

let headers = {
    token: localStorage.getItem('userToken')
};

export let WishlistContext = createContext();

async function addToWishlist(id) {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId: id
    }, {
        headers
    }).then((res) => res).catch((err) => err);
}

async function getWishlist() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers
    }).then((res) => res).catch((err) => err);
}

async function deleteItemFromWishlist(_id) {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${_id}`, {
        headers
    }).then((res) => res).catch((err) => err);
}

export default function WishlistContextProvider(props) {
    const [count, setCount] = useState(0);
    const [wishlistItems, setWishlistItems] = useState([]);

    async function getInitialWishlist() {
        try {
            let { data } = await getWishlist();
            setCount(data?.count || 0);
            if (data?.data) {
                const storedItems = data.data.map(item => item.product?._id).filter(id => id);
                localStorage.setItem('wishlistItems', JSON.stringify(storedItems));
                setWishlistItems(storedItems);
            } else {
                setWishlistItems([]);
            }
        } catch (error) {
            console.error("Error fetching wishlist: ", error);
            setWishlistItems([]);
        }
    }

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        setWishlistItems(storedItems);
        getInitialWishlist();
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    return (
        <WishlistContext.Provider value={{ addToWishlist, getWishlist, deleteItemFromWishlist, count, setCount, wishlistItems, setWishlistItems }}>
            {props.children}
        </WishlistContext.Provider>
    );
}
