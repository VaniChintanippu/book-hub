import {Redirect, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BookshelvesList from '../BookshelvesList'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    bookshelvesLabel: 'All',
  }

  changeShelfLabel = id => {
    const onClickLabelData = bookshelvesList.filter(book => book.id === id)
    this.setState({
      bookshelvesLabel: onClickLabelData.label,
    })
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="bookshelf-bg-container">
        <Header />
        <div className="bookshelf-bottom-container">
          <div className="bookshelves-list-container">
            <h1 className="shelf-heading">Bookshelves</h1>
            <div className="shelves-list-container">
              {bookshelvesList.map(bookshelves => (
                <BookshelvesList
                  key={bookshelves.id}
                  bookshelvesDetails={bookshelves}
                  changeShelfLabel={this.changeShelfLabel}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
