import React, { useState } from "react";
import { useFormik } from "formik";
import  axios  from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const [isLoading , setIsLoading] = useState(false)
  const [apiError , setApiError] = useState("")
  let navigate = useNavigate()
  async function register (values){
    setApiError("")
    setIsLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      setApiError(err.response.data.message)
      setIsLoading(false)
 
    })

    if(data.message==="success"){
      setIsLoading(false)
      navigate("/login")
    }
  }
    let validationSchema = yup.object({
        name: yup.string().min(3,"Name min length is 3").max(15,"Name max length is 15").required('Name is required'),
        email: yup.string().email("Email not valid").required('Email is required'),
        password: yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"Password should starts with capital letter").required("Password is required"),
        rePassword: yup.string().oneOf([yup.ref('password')],"password and repassword should match ").required("password is required"),
        phone: yup.string().matches(/^01[0125][0-9]{8}$/,"phone is invalid").required("phone is required"),
    });

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema:validationSchema,
        onSubmit: (values) => register(values),
    });
    return (
        <>
        <Helmet>
        <title>Register</title>
        <meta name="description" content="Register Page" />
      </Helmet>
            <div className="container mt-5">
                <h2 className="my-3 pt-5 font-bold">Register Now</h2>
                {apiError? <div className="alert alert-danger">{apiError}</div>:''}
                <form className="w-75 mx-auto " onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-2">
                        <label className="mb-1 text-main" htmlFor="name">
                            NAME :
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name ? (
                            <div className="mt-2 alert alert-danger">
                                {formik.errors.name}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

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

                    <div className="form-group mb-2">
                        <label className="mb-1 text-main" htmlFor="rePassword">
                            REPASSWORD :
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="rePassword"
                            name="rePassword"
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.rePassword &&
                        formik.touched.rePassword ? (
                            <div className="mt-2 alert alert-danger">
                                {formik.errors.rePassword}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="form-group mb-2">
                        <label className="mb-1 text-main" htmlFor="phone">
                            PHONE :
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                            <div className="mt-2 alert alert-danger">
                                {formik.errors.phone}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    
                      {
                      isLoading?
                      <button className="btn bg-main ms-auto mt-3 d-block text-white"><i className="fa-solid fa-spin fa-circle-notch"></i></button>
                      :<button disabled = {!(formik.isValid && formik.dirty)} className="btn bg-main ms-auto mt-3 d-block text-white">Register</button>
                      }
                </form>
            </div>
        </>
    );
}
