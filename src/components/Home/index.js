import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import RenderPopularBooks from '../RenderPopularBooks'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-bottom-container">
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link to="/shelf">
          <button type="button" className="home-button mobile-button">
            Find Books
          </button>
        </Link>
        <div className="home-slider-container">
          <div className="slider-heading-button-container">
            <h1 className="home-slider-heading">Top Rated Books</h1>
            <Link to="/shelf">
              <button type="button" className="home-button desk-button">
                Find Books
              </button>
            </Link>
          </div>
          <RenderPopularBooks />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
