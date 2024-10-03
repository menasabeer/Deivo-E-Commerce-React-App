import React, { useContext } from 'react'
import styles from './AddressForm.module.css'
import { Helmet } from "react-helmet";
import { useFormik } from 'formik';
import { CartContext } from '../../context/cartContext';
import * as Yup from "yup";

export default function AddressForm({ submitFn, btnTxt }) {
  let {cartID}=useContext(CartContext)

  async function submitAddress(value){
    submitFn(cartID , value)
  }

  const validationSchema = Yup.object({
    details:Yup.string().required("Address Details is Required"),
    phone:Yup.string().required("Phone is Required"),
    city:Yup.string().required("city is Required")
  });

  const formik = useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: ""
    },
    validationSchema,
    onSubmit: submitAddress,
  });

  return (
    <>
    <Helmet>
        <title>Add Checkout Address</title>
        <meta name="description" content="Checkout Address Page" />
    </Helmet>
    <div className="container ">
      <div className="mx-auto mt-3 p-3">
        <form method='post' onSubmit={formik.handleSubmit}>
          <div className="form-group mb-2">
            <label className='h5 mt-2' htmlFor="details">Address details : </label>
            <input type="text" className="form-control" id="details" name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.details && formik.touched.details ? (
              <p className="alert alert-danger px-2 py-1 mt-2">
                {formik.errors.details}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mb-2">
            <label className='h5 mt-2' htmlFor="phone">Your Phone : </label>
            <input type="number" className="form-control" id="phone" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="alert alert-danger px-2 py-1 mt-2">
                {formik.errors.phone}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mb-2">
            <label className='h5 mt-2' htmlFor="city">Your City : </label>
            <input type="text" className="form-control" id="city" name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.city && formik.touched.city ? (
              <p className="alert alert-danger px-2 py-1 mt-2">
                {formik.errors.city}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex justify-content-center">
          <button type='submit' className='btn d-block bg-main text-white w-50 mt-2'> {btnTxt} </button>
          </div>

        </form>
      </div>
    </div>
      
    </>
  )
}
