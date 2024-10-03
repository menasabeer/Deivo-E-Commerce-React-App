import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../context/wishlistContext';

export default function FeatureProducts() {
    const { addToCart, setNumOfCartItems } = useContext(CartContext);
    const { addToWishlist, deleteItemFromWishlist, getWishlist, setCount, setWishlistItems } = useContext(WishlistContext);
    const [localWishlistItems, setLocalWishlistItems] = useState([]);

    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    const { data, isLoading } = useQuery("FeatureProducts", getProducts);

    async function addCart(id) {
        let res = await addToCart(id);
        if (res.data.status === "success") {
            toast.success('Product Added Successfully To Your Cart', {
                duration: 2000,
                iconTheme: {
                    primary: '#09c',
                    secondary: '#fff',
                },
            });
            setNumOfCartItems(res.data.numOfCartItems);
        } else {
            toast.error('There is an error!');
        }
    }

    async function toggleWishlist(id) {
        let updatedWishlist;
        if (localWishlistItems.includes(id)) {
            let res = await deleteItemFromWishlist(id);
            if (res.data.status === "success") {
                toast.success("Product Removed Successfully From Your Wishlist", {
                    duration: 2000,
                    iconTheme: {
                        primary: "#09c",
                        secondary: "#fff",
                    },
                });
                setCount(prevCount => prevCount - 1);
                updatedWishlist = localWishlistItems.filter(item => item !== id);
                setLocalWishlistItems(updatedWishlist);
                setWishlistItems(updatedWishlist);
            } else {
                toast.error("There is an error!");
            }
        } else {
            let res = await addToWishlist(id);
            if (res.data.status === "success") {
                toast.success("Product Added Successfully To Your Wishlist", {
                    duration: 2000,
                    iconTheme: {
                        primary: "#09c",
                        secondary: "#fff",
                    },
                });
                setCount(prevCount => prevCount + 1);
                updatedWishlist = [...localWishlistItems, id];
                setLocalWishlistItems(updatedWishlist);
                setWishlistItems(updatedWishlist);
            } else {
                toast.error("There is an error!");
            }
        }
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setLocalWishlistItems(storedWishlist);
        setWishlistItems(storedWishlist);
        getWishlist();
    }, [setWishlistItems, getWishlist]);

    return (
        <div className="container mt-5 py-5">
            {isLoading ? <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#098da8"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="justify-content-center"
            /> :
                <div className="row">
                    {data?.data?.data?.map((ele) => (ele && (
                        <div key={ele._id} className="col-sm-6 col-md-4 col-lg-2">
                            <div className="product products p-3">
                                <i onClick={() => toggleWishlist(ele._id)} className={`fa-${localWishlistItems.includes(ele._id) ? 'solid' : 'regular'} fa-heart loved`}></i>
                                <Link to={'productDetails/' + ele._id}>
                                    <img src={ele.imageCover} className='w-100' alt="" />
                                    <p className='text-center text-main'>{ele.category?.name}</p>
                                    <h3 className='text-center h6' type="button" data-toggle="tooltip" data-placement="bottom" title={ele.title}>{ele.title.split(" ").slice(0, 2).join(" ")}</h3>
                                    <div className="d-flex justify-content-between">
                                        <p>{ele.price} EGP</p>
                                        <p>
                                            <i className='fa fa-star rating-color'></i>
                                            {ele.ratingsAverage}
                                        </p>
                                    </div>
                                </Link>
                                <button onClick={() => addCart(ele._id)} className='btn bg-main text-white w-100'>Add To Cart</button>
                            </div>
                        </div>
                    )))}
                </div>}
        </div>
    );
}
