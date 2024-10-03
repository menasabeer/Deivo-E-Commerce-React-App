import React from 'react'
import ErrorAnimation from "./ErrorAnimation.json";
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (<>
  <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Not Found Page" />
      </Helmet>
      <div className="container mt-5">
`     <div className="pt-3 out">
        <div className='pages  d-flex flex-column align-items-center '>
        <Lottie className='error-animation' animationData={ErrorAnimation}/>
        <div className='error-content'>
        <p>it seems like we don't find what you searched.</p>
        <p>the page you looking for doesn't exist ,</p>
        <p>isn't available or was loading incorrectly .</p>
        </div>
        </div>
      </div>    
    </div>
  </>
    
    
  )
}
