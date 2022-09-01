import {Redirect, Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const mobileSettings = {
  dots: false,
  slidesToShow: 2,
  slidesToScroll: 1,
}

const deskSettings = {
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
}

class Home extends Component {
  state = {
    popularBooks: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularBooks()
  }

  getPopularBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(book => ({
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        title: book.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        popularBooks: updatedData,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderPopularBooksFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661942080/Group_7522_gdsj57.png"
        alt="Books Failed"
        className="failure-image"
      />
      <p className="failure-descripton">
        Something went wrong. Please try Again.
      </p>
      <button type="button" className="button">
        Try Again
      </button>
    </div>
  )

  render() {
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
              </div>
              <div className="mobile-slider">
                <h1>video</h1>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
