import axios from 'axios'
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { tokenContext } from '../../context/tokenContext';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../context/cartContext';
import { WishlistContext } from '../../context/wishlistContext';


export default function Login() {
  const [isLoading , setIsLoading] = useState(false)
  const [apiError , setApiError] = useState("")
  let {setToken} = useContext(tokenContext)
  const {getCart} = useContext(CartContext)
  const {getWishlist} = useContext(WishlistContext)
  let navigate = useNavigate()
  async function login (values){
    setApiError("")

    setIsLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      setApiError(err.response.data.message)
      setIsLoading(false)
 
    })

    if(data.message==="success"){
      setIsLoading(false)
      localStorage.setItem("userToken",data.token)
      await setToken(data.token)
      navigate("/")
      await getCart();
      await getWishlist();
    }
  }

    let validationSchema = yup.object({
        email: yup.string().email("Email not valid").required('Email is required'),
        password: yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"Password should starts with capital letter").required("Password is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema:validationSchema,
        onSubmit: (values) => login(values),
    });
    return (
        <>
        <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>
            <div className="container mt-5 ">
                <h2 className="my-3 pt-5 font-bold">Login Now</h2>
                {apiError? <div className="alert alert-danger">{apiError}</div>:''}
                <form className="w-75 mx-auto " onSubmit={formik.handleSubmit}>

                    <div className="form-group mb-2">
                        <label className="mb-1 text-main" htmlFor="email">
                            E-MAIL :
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="mt-2 alert alert-danger">
                                {formik.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="form-group mb-2">
                        <label className="mb-1 text-main" htmlFor="password">
                            PASSWORD :
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className="mt-2 alert alert-danger">
                                {formik.errors.password}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    
                    <div className="mb-3">
                        {
                           isLoading?(
                            <button className="btn bg-main ms-auto mt-3 d-block text-white"><i className="fa-solid fa-spin fa-circle-notch"></i></button>

                           ) :(
                            <div>
                                <button disabled = {!(formik.isValid && formik.dirty)} className="btn bg-main ms-auto mt-3 d-block text-white">Login</button>
                                <div className="text-center">
                                    <Link className='d-inline-block my-3 text-main fw-semibold' to='/register'>
                                    Create an Account
                                    </Link>
                                    <span className='ms-5 fw-semibold'>|</span>
                                    <Link className='d-inline-block ms-3 text-center fw-semibold' to='/forgetPassword'>
                                    Forget Password?
                                    </Link>
                                </div>
                            </div>
                        )
                        }
                    </div>
                      
                </form>
            </div>
        </>
    );
}
