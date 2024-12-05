import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Brands() {
  function getPrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data,isLoading} = useQuery("Brands",getPrands)

  return (<>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Brands Page" />
      </Helmet>
    <div className="container mt-5 py-5">
      {isLoading?< ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#098da8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="justify-content-center"
    />: <div className='row'>
        {data?.data?.data.map((ele)=><div key={ele.id} className="col-sm-6 col-md-4 col-lg-2">
          <div className="brands">
            <Link >
              <img src={ele.image} className='w-100' alt={ele.name} />
              <h2 className='text-center text-main' >{ele.name}</h2>
            </Link>
          </div>
        </div>)}
      </div>}
    </div>
  </>
      
  )
}
