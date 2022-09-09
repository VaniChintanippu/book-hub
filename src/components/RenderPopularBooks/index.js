import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import DisplayPopularBooks from '../DisplayPopularBooks'

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

class RenderPopularBooks extends Component {
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
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-descripton">
        Something went wrong. Please try Again.
      </p>
      <Link to="/">
        <button type="button" className="button">
          Try Again
        </button>
      </Link>
    </div>
  )

  renderPopularBooksSuccessView = () => {
    const {popularBooks} = this.state

    return (
      <>
        <div className="mobile-view" testid="mobile">
          <Slider>
            {popularBooks.map(eachBook => (
              <DisplayPopularBooks bookData={eachBook} key={eachBook.id} />
            ))}
          </Slider>
        </div>
        <div className="desk-view" testid="desk">
          <Slider>
            {popularBooks.map(eachBook => (
              <DisplayPopularBooks bookData={eachBook} key={eachBook.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularBooksSuccessView()
      case apiStatusConstants.failure:
        return this.renderPopularBooksFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default RenderPopularBooks
