import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("allCategories", getCategories);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 992, // Medium screens and below
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576, // Extra small screens
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <p className='mt-3 text-main font-bold'>Shop Popular Categories</p>
          <Slider {...settings}>
            {data?.data?.data.map((ele, index) => (
              <div key={index}>
                <img height={300}  className='widthSlider' src={ele.image} alt=''/>
                <h6 className='text-center'>{ele.name}</h6> 
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>  
  );
}
