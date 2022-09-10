import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RenderBookshelfResults extends Component {
  state: {
    apiStatus: apiStatusConstants.initial,
    bookshelfData: [],
  }

  componentDidMount() {
    this.getBookshelfData()
  }

  getBookshelfData = async () => {
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
  }

  render() {
    return <h1> SDg</h1>
  }
}

export default RenderBookshelfResults
