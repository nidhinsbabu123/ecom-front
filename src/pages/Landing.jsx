import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProducts from '../components/VerticalCardProducts'

function Landing() {
  return (
    <div>
      <CategoryList/>

      <BannerProduct/>

      <HorizontalCardProduct category = {"airpodes"} heading={ "Top Airpodes Collection" } />

      <HorizontalCardProduct category = {"watches"} heading={ "Popular Smart Watches" } />

      <VerticalCardProducts category = {"mobiles"} heading={ "Trending Mobiles" }  />

      <VerticalCardProducts category = {"mouse"} heading={ "Popular Mouse models" }  />

      <VerticalCardProducts category = {"televisions"} heading={ "Television Brands" }  />

      <VerticalCardProducts category = {"camera"} heading={ "Cameras & Accessories " }  />

      <VerticalCardProducts category = {"earphones"} heading={ "New Earphone Collections" }  />

      <VerticalCardProducts category = {"speakers"} heading={ "Speakers" }  />

      <VerticalCardProducts category = {"refrigerator"} heading={ "Refrigerators " }  />

      <VerticalCardProducts category = {"trimmers"} heading={ "Trimmers" }  />

      

    </div>
  )
}

export default Landing