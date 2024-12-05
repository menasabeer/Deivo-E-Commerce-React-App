import React from 'react'
import styles from './AddAddress.module.css'
import { Helmet } from 'react-helmet'
import { Link, Outlet } from 'react-router-dom'
import AddressForm from '../AddressForm/AddressForm'

export default function AddAddress() {
  return (
    <>
      <Helmet>
        <title>Add Checkout Address</title>
        <meta name="description" content="Checkout Address Page" />
      </Helmet>
      <div className="container">
      <h1 className='mt-5 pt-5 h4 fw-bold' >Pay your order to get it ready!</h1>
      <div className="w-100 mx-auto pt-5">
      <ul className="list-unstyled d-flex justify-content-center align-items-center gap-2 flex-wrap">
      <li>
          <Link to="payCash" className="px-3 btn bg-main text-light fw-bold rounded-2">
          Pay By Cash
          </Link>
        </li>
        <li>
          <Link to="payOnline" className="px-3 btn bg-main text-light fw-bold rounded-2">
          Pay Online
          </Link>
        </li>
      </ul>
      </div>
      </div>
      <Outlet/>
    </>
  )
}
