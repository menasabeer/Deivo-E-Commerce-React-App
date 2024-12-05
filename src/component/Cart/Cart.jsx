import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState({ data: { totalCartPrice: 0, numOfCartItems: 0, products: [] } });
  let { getCart, deletProductFromCart, clearCartItems, updateProductQuantity ,setNumOfCartItems} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  async function getCartDetails() {
    let { data } = await getCart();
    setNumOfCartItems(data?.numOfCartItems)
    setCartDetails(data);
    setIsLoading(false);
  }

  async function removeProductFromCart(id) {
    let { data } = await deletProductFromCart(id);
    setNumOfCartItems(data?.numOfCartItems)
    setCartDetails(data);
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
    if (count <= 0) {
      removeProductFromCart(id);
    }
  }

  async function clearCart() {
    setIsLoading(true);
    let { data } = await clearCartItems();
    if (data?.message === "success") {
      setNumOfCartItems(data?.numOfCartItems)
      setCartDetails({ data: { totalCartPrice: 0, numOfCartItems: 0, products: [] } });
      toast.success("Cart is cleared successfully");
    } else {
      toast.error("Error in clearing the cart, please try again");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (<>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart Page" />
      </Helmet>
  <div className='container pt-5 mt-5'>
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
        <div className="bg-main-light  p-3">
          <div className="d-flex mt-5 justify-content-between">
            <h1>Cart Shop</h1>
            <button onClick={() => clearCart()} className='btn btnClear text-danger'>
              <i className="fa-solid text-black fa-broom"></i> Clear Cart
            </button>
          </div>

          {cartDetails?.data ? (
            <>
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <h4>Total Price: <span className='text-main'>{cartDetails.data.totalCartPrice} EGP</span></h4>
                <h4>Total Cart Items: <span className='text-main'>{cartDetails.numOfCartItems}</span></h4>
              </div>
              {cartDetails.data.products.length > 0 ? (
                <>
                  {cartDetails.data.products.map((ele) => (
                    <div key={ele.product._id} className="row py-2 border-bottom">
                      <div className="col-md-1">
                        <img src={ele.product.imageCover} className='w-100' alt="" />
                      </div>
                      <div className="col-md-11">
                        <div className="mt-3 d-flex justify-content-between">
                          <div className="left-side">
                            <h4 type="button" data-toggle="tooltip" data-placement="bottom" title={ele.product.title}>
                              {ele.product.title.split(" ").slice(0, 3).join(" ")}
                            </h4>
                            <h6>{ele.price} EGP</h6>
                            <button onClick={() => removeProductFromCart(ele.product._id)} className='p-0 btnClear btn text-danger'>
                              <i className="fa-regular fa-trash-can"></i> Remove
                            </button>
                          </div>
                          <div className="m-0 p-0 right-side">
                            <button className='btn bg-main text-white' onClick={() => updateCount(ele.product._id, ele.count - 1)}>-</button>
                            <span className='px-2'>{ele.count}</span>
                            <button className='btn bg-main text-white' onClick={() => updateCount(ele.product._id, ele.count + 1)}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center">
                    <Link className='btn text-white bg-main w-50 my-5' to={'/addAddress'}>CheckOut</Link>
                  </div>
                </>
              ) : (
                <div className="text-center mt-5">
                  <h3>The cart is empty, please fill it</h3>
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
