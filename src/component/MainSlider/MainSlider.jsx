import React from 'react'
import styles from './MainSlider.module.css'
import mainImg4 from '../../assets/images/slider/slider-image-4.jpg'
import mainImg1 from '../../assets/images/slider/slider-image-1.jpeg'
import mainImg2 from '../../assets/images/slider/slider-image-2.jpeg'
import mainImg3 from '../../assets/images/slider/slider-image-3.jpeg'
import sideImg1 from '../../assets/images/slider/sideImg1.jpg'
import sideImg2 from '../../assets/images/slider/sideImg2.webp'
import Slider from 'react-slick';
export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  }
  return (
    <div className="container mt-5">
      <div className="row pt-5 gx-0 mt-3">
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={mainImg4} height='400' className='w-100' alt="" />  
            <img src={mainImg1} height='400' className='w-100' alt="" />  
            <img src={mainImg2} height='400' className='w-100' alt="" />  
            <img src={mainImg3} height='400' className='w-100' alt="" />  
          </Slider>
        </div>
        <div className="col-md-3">
        <img src={sideImg1} height='200' className='w-100' alt="" />
        <img src={sideImg2} height='200' className='w-100' alt="" />
        </div>
      </div>
    </div>
  )
}
