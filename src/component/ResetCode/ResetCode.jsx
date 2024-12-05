import React, { useState } from 'react'
import styles from './ResetCode.module.css'
import { Helmet } from 'react-helmet'
import { useFormik } from "formik";
import * as Yup  from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const [error , setError] = useState(null);
  const [isLoading , setIsLoading] = useState(false);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    resetCode:Yup.string()
    .matches(/^[0-9]{1,}$/,"Reset Code is invalid")
    .required("Reset Code is required"),
  });
  let formik = useFormik({
    initialValues:{
      resetCode:"",
    },
    validationSchema,
    onSubmit:submitResetCode,
  });
  async function submitResetCode(values){
    setIsLoading(true);
    let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    ).catch((err)=>{
      setIsLoading(false);
      setError(err.response.data.message)
    })
    navigate("/resetPassword")
  }
  return (
    <main className='my-5 pt-4 mx-auto w-75'>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Reset Password Page" />
      </Helmet>
        {error?(<div className=" mt-5 alert alert-danger px-2 py-1 text-center">{error}</div>
            ):(
              ""
        )}
       
        <h1 className='h4 text-main text-center fw-bold'>Enter Reset Code</h1>
        <p className=' h5 text-center my-3'>We've sent the reset code to your E-mail, please check it and enter the code below.</p>
        <form method='post' onSubmit={formik.handleSubmit}>
          <label htmlFor='resetCode' className='fw-semibold'>
            Reset Code:
          </label>
          <input 
            type='text'
            name='resetCode'
            value={formik.values.resetCode}
            id='resetCode'
            className='form-control my-3'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.resetCode?(
            <div className='alert alert-danger px-2 py-1'>
              {formik.errors.resetCode}
            </div>
          ):(
            ""
          )}
          {isLoading?(
            <button
            type="button"
            className="bg-main text-light btn px-3 rounded-1"
            disabled
          >
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button type="submit" className="btn mb-4 bg-main text-light">
            Submit
          </button>
          )}
        </form>
      
        
  </main>
  )
}
