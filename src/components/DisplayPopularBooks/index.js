import './index.css'

const DisplayPopularBooks = props => {
  const {bookData} = props
  const {authorName, coverPic, title} = bookData

  return (
    <div className="mobile-viewing">
      <img src={coverPic} alt={title} className="cover-pic" />
      <h1 className="book-title">{title}</h1>
      <p className="author-name">{authorName}</p>
    </div>
  )
}

export default DisplayPopularBooks
