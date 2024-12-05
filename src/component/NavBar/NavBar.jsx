import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'
import { CartContext } from '../../context/cartContext'
import { WishlistContext } from '../../context/wishlistContext'

export default function NavBar() {
  let {token , setToken} = useContext(tokenContext)
  let{numOfCartItems} = useContext(CartContext)
  let{count} = useContext(WishlistContext)
  let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem("userToken");
    setToken(null);
    navigate('/login')
  }

  return (
<>
<nav className="navbar fixed-top py-0 navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <p className="navbar-brand me-5 font-bold pt-3" ><i className="fa-solid logo-bg fa-cart-shopping"></i> Dievo cart</p>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      { token? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page"to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/products'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/brands'}>Brands</Link>
        </li> 
          
      </ul>  : "" }
      
      <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <i className="fa-brands mx-1 fa-facebook"></i>
        <i className="fa-brands mx-1 fa-instagram"></i>
        <i className="fa-brands mx-1 fa-twitter"></i>
        <i className="fa-brands mx-1 fa-tiktok"></i>
        <i className="fa-brands mx-1 fa-linkedin"></i>
        <i className="fa-brands mx-1 fa-youtube"></i>
        </li>

        {token?
        <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
          <li className="position-relative nav-item">
            <Link className=' ms-3 me-2 nav-link' to={"/wishlist"}>
              <i className="fa-regular text-danger fa-heart"></i>
              {count > 0 && <span className='notification-badge position-absolute'>{count}</span>
}
            </Link>
          </li>
          <li className="position-relative nav-item">
            <Link className="me-3 nav-link" to={'/cart'}>
              <i className="fa-solid logo-bg fa-cart-shopping"></i>
              <span className='notification-badge position-absolute'>{numOfCartItems}</span>
            </Link>
          </li>
          <li className="nav-item">
          <button className="nav-link" onClick={logOut}>LogOut</button>
        </li>
          </ul>
         :
        <>
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'/register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/login'}>Login</Link>
        </li>
        </>}
        
        
      </ul>
      
    </div>
  </div>
</nav>

</>
  )
}
