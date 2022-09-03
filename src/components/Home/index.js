import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import RenderPopularBooks from '../RenderPopularBooks'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-width">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/book-hub/books">
            <button type="button" className="button mobile-view">
              Find Books
            </button>
          </Link>
          <div className="slick-container">
            <div className="desk-show">
              <h1 className="top-rated-heading"> Top rated Books </h1>
              <Link to="/book-hub/books">
                <button type="button" className="button desk-view">
                  Find Books
                </button>
              </Link>
              <RenderPopularBooks />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
