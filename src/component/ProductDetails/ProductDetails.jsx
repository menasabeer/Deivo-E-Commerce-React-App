import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { ThreeDots } from "react-loader-spinner";
import { CartContext } from "../../context/cartContext";
import toast from 'react-hot-toast'
import { WishlistContext } from "../../context/wishlistContext";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let {addToCart,setNumOfCartItems}= useContext(CartContext)
  const { addToWishlist, deleteItemFromWishlist, getWishlist, setCount, setWishlistItems } = useContext(WishlistContext);
  const [localWishlistItems, setLocalWishlistItems] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };
  
  const[productDetails,setProductDetails] = useState({});
  const[isLoading , setIsLoading] = useState(true);
    let params = useParams();
    async function getProductDetails(id) {
      let {data} = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data) 
      setIsLoading(false)
  }
  async function addCart(id){
    let res = await addToCart(id)
      if(res.data.status == "success"){
        toast.success('Product Added Successfully To Your Cart',{
          duration: 2000,
          iconTheme: {
            primary: '#09c',
            secondary: '#fff',
          },});
          setNumOfCartItems(res.data.numOfCartItems)

      }else{
        toast.error('This is an error!');
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
  useEffect(()=>{
    getProductDetails(params.id)
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setLocalWishlistItems(storedWishlist);
        setWishlistItems(storedWishlist);
        getWishlist();
  },[setWishlistItems, getWishlist])
    return (
      <>
      <Helmet>
        <title>Product Details</title>
        <meta name="description" content="Product Details Page" />
      </Helmet>
      <div className="container mt-5">
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
                <div className="row pt-5 align-items-center">
                    <div className="col-md-4 products">
                    <i onClick={() => toggleWishlist(productDetails._id)} className={`fa-${localWishlistItems.includes(productDetails._id) ? 'solid' : 'regular'} fa-heart loved`}></i>
                    <Slider className="mb-5" {...settings}>
                        {productDetails.images.map((ele ,index) => <img key={index} src={ele} alt=""/>)}
                      </Slider>                    
                    </div>
                    <div className="col-md-8">
                        <h1 type="button" data-toggle="tooltip" data-placement="bottom" title={productDetails.title} className="text-main pb-3">{productDetails.title.split(" ").slice(0, 3).join(" ")}</h1>
                        <p>{productDetails.description}</p>
                        <p>{productDetails.category.name}</p>
                        <div className="d-flex justify-content-between">
                            <h5>{productDetails.price} EGP</h5>
                            <h5>
                                <i className="fa fa-star rating-color"></i> {productDetails.ratingsAverage}
                            </h5>
                        </div>
                        <button onClick={()=> addCart(productDetails.id)} className="mt-3 btn bg-main text-white w-100">
                            Add To Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
      </>
        
    );
}
