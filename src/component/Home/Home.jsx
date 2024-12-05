import React from 'react'
import MainSlider from'../MainSlider/MainSlider'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Helmet } from 'react-helmet'
export default function Home() {

  return (
    <>
    <Helmet>
        <title>Home</title>
        <meta name="description" content="Home Page" />
      </Helmet>
        <MainSlider/>
        <CategoriesSlider/>
        <FeatureProducts/>
    </>
  )
}
