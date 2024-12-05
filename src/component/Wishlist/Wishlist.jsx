import React, { useContext, useEffect, useState } from "react";
import styles from "./Wishlist.module.css";
import { WishlistContext } from "../../context/wishlistContext";
import { ThreeDots } from "react-loader-spinner";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Wishlist() {
    const [wishlistDetails, setWishlistDetails] = useState({
        data: { numOfWishlistItems: 0, products: [] },
    });
    let { getWishlist, deleteItemFromWishlist, setCount } =
        useContext(WishlistContext);
    let { addToCart, setNumOfCartItems } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);

    async function addCart(id) {
        let res = await addToCart(id);
        if (res.data.status === "success") {
            toast.success("Product Added Successfully To Your Cart", {
                duration: 2000,
                iconTheme: {
                    primary: "#09c",
                    secondary: "#fff",
                },
            });
            setNumOfCartItems(res.data.numOfCartItems);
            removeItemFromWishlist(id);
        } else {
            toast.error("there is an error!");
        }
    }

    async function getWishlistDetails() {
        let { data } = await getWishlist();
        setCount(data.count);
        setWishlistDetails(data);
        setIsLoading(false);
    }

    async function removeItemFromWishlist(_id) {
        let { data } = await deleteItemFromWishlist(_id);
        if (data?.status === "success") {
            toast.success("Product removed successfully from your wishlist", {
                duration: 2000,
                iconTheme: {
                    primary: "#09c",
                    secondary: "#fff",
                },
            });
            // Reload the page upon successful removal
            window.location.reload();
        } else {
            toast.error("Error in removing the product from your wishlist", {
                duration: 2000,
            });
        }
    }

    useEffect(() => {
        getWishlistDetails();
    }, []);

    return (
        <>
            <Helmet>
                <title>Wishlist</title>
                <meta name="description" content="Wishlist Page" />
            </Helmet>
            <div className="container pt-2 mt-5">
                {isLoading ? (
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#098da8"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="justify-content-center"
                    />
                ) : (
                    <div className="bg-light mb-5 pb-5  mx-auto mt-5 p-5">
                        <h1 className="mb-3">Wishlist</h1>
                        <h4 className="h5 pb-3">
                            Total numbers of items:{" "}
                            <span className="text-main">
                                {wishlistDetails.count}
                            </span>
                        </h4>
                        {wishlistDetails?.data ? (
                            <>
                                {wishlistDetails.data.length > 0 ? (
                                    <>
                                        {wishlistDetails.data.map((ele) => (
                                            <div
                                                key={ele._id}
                                                className="row border-bottom pb-2 mb-2"
                                            >
                                                <div className="col-md-3">
                                                    <img
                                                        className="w-100"
                                                        src={ele.imageCover}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-md-9 pb-2">
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <div className="left-side">
                                                            <h3
                                                                type="button"
                                                                data-toggle="tooltip"
                                                                data-placement="bottom"
                                                                title={
                                                                    ele.title
                                                                }
                                                            >
                                                                {ele.title
                                                                    ?.split(" ")
                                                                    .slice(0, 2)
                                                                    .join(" ")}
                                                            </h3>
                                                            <h5>
                                                                Price:{" "}
                                                                <span className="fw-bolder bold text-main">
                                                                    {ele.price}{" "}
                                                                    EGP
                                                                </span>
                                                            </h5>
                                                            <h5>
                                                                <i className="fa fa-star rating-color"></i>{" "}
                                                                {
                                                                    ele.ratingsAverage
                                                                }
                                                            </h5>
                                                        </div>
                                                        <div className="right-side">
                                                            <button
                                                                onClick={() =>
                                                                    removeItemFromWishlist(
                                                                        ele._id
                                                                    )
                                                                }
                                                                className="btn border-danger text-danger"
                                                            >
                                                                <i className="fa-solid fa-trash"></i>{" "}
                                                                Remove
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    addCart(
                                                                        ele._id
                                                                    )
                                                                }
                                                                className="btn border-primary text-primary ms-4"
                                                            >
                                                                <i className="fa-solid fa-plus"></i>{" "}
                                                                Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="text-center mt-5">
                                        <h3>
                                            The Wishlist is empty, please fill
                                            it
                                        </h3>
                                    </div>
                                )}
                            </>
                        ) : (
                            <ThreeDots
                                visible={true}
                                height="80"
                                width="80"
                                color="#098da8"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass="justify-content-center"
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
