import {Link} from 'react-router-dom'
import './index.css'

const DisplayPopularBooks = props => {
  const {bookDetails} = props
  const {id, authorName, coverPic, title} = bookDetails

  return (
    <Link to={`/books/${id}`}>
      <div className="mobile-viewing">
        <img src={coverPic} alt={title} className="cover-pic" />
        <h1 className="book-title">{title}</h1>
        <p className="author-name">{authorName}</p>
      </div>
    </Link>
  )
}

export default DisplayPopularBooks
