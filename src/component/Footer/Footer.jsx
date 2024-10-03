import React from "react";
import partnerImg1 from "../../assets/footer/amazon-logo.aa3d48df057a15fc12d9.png"
import partnerImg2 from "../../assets/footer/american-express-logo.65c7eb81c156128376d2.png"
import partnerImg3 from "../../assets/footer/mastercard-logo.2a663b803dbf010de8fc.png"
import partnerImg4 from "../../assets/footer/paypal logo.fc32cd2e9f125109e1f7.png"
import partnerImg5 from "../../assets/footer/app-store.1d436959d10ff5044835.png"
import partnerImg6 from "../../assets/footer/google-play.1d282319389edc9899fa.png"
export default function Footer() {
    return (
      <footer className="p-5 mt-5 text-white bg-dark">
        <div className="container-sm">
          <h3 className="h5 fw-semibold mb-2">Get the DievoCart App</h3>
          <p>We will sent you a link, open it on your phone to download it.</p>
          <div className="row g-4 justify-content-between align-items-center pb-3 border-bottom border-opacity-25 border-light">
            <div className="col-md-9">
              <input type="text" className="form-control w-100" placeholder="Your Email" />
            </div>
            <div className="col-md-3 text-end">
              <button className="btn bg-main text-light w-100">Share App Link</button>
            </div>
          </div>
          <div className="row py-3 border-bottom border-opacity-25 border-light justify-content-between align-items-center">
            <div className="col-lg-6 partners">
              <span className="me-3 fw-semibold">Payment Partners</span>
              <img className="size" src={partnerImg1} alt="Amazon" />
              <img className="size" src={partnerImg2} alt="American" />
              <img className="size" src={partnerImg3} alt="Master" />
              <img className="size" src={partnerImg4} alt="Paypal" />
            </div>
            <div className="col-lg-6 text-lg-end">
              <span className="me-3 fw-semibold">Get Deliveries with DievoCart</span>
              <a href="/"><img className="appStore" src={partnerImg5} alt="app store" /></a>
              <a href="/"><img className="googlePlay" src={partnerImg6} alt="google Play" /></a>
            </div>

          </div>
        </div>
      </footer>
    )
}
