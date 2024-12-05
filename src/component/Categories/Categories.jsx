import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data ,isLoading} = useQuery("allCategories", getCategories);
  return (<>
  <Helmet>
        <title>Categories</title>
        <meta name="description" content="Categories Page" />
      </Helmet>
      <div className="container mt-5  py-5">
      {isLoading?< ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#098da8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="justify-content-center"
    />:
      <div className=" row pt-4 gy-4">
          {data?.data?.data.map((ele)=><div key={ele.id} className="col-sm-6 col-md-4 col-lg-2">
            <div className="category">
            <img src={ele.image} height={300} className='w-100 widthSlider' alt="" />
            <p className='text-center text-main' >{ele.name}</p>
            </div>
            </div>
            )};

      </div>}
    </div>
  </>
    
  )
}
