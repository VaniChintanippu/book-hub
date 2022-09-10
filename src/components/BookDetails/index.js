import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import RenderBookDetails from '../RenderBookDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookDetails: {},
  }

  componentDidMount() {
    this.getBookDetailsData()
  }

  getBookDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.book_details.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        aboutBook: eachBook.about_book,
        aboutAuthor: eachBook.about_author,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookDetails: updatedData,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="Rings" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661942080/Group_7522_gdsj57.png"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <Link to="/books/:id">
        <button type="button" className="try-again-button">
          Try Again
        </button>
      </Link>
    </div>
  )

  renderSuccessView = () => {
    const {bookDetails} = this.state
    return (
      <div className="results-container">
        {bookDetails.map(book => (
          <RenderBookDetails bookDetails={book} key={book.id} />
        ))}
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="book-bg-details-container">
        <Header />
        <div>{this.renderView()}</div>
        <Footer />
      </div>
    )
  }
}

export default BookDetails
