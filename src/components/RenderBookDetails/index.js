import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const RenderBookDetails = props => {
  const {bookDetails} = props
  const {
    rating,
    authorName,
    coverPic,
    title,
    readStatus,
    aboutAuthor,
    aboutBook,
  } = bookDetails

  return (
    <div>
      <div className="image-container">
        <img src={coverPic} alt={title} />
        <div className="values-container">
          <h1 className="title">{title}</h1>
          <p className="author">{authorName}</p>
          <div className="rating-container">
            <p className="author">Avg Rating</p>
            <BsFillStarFill />
            <p className="author">{rating}</p>
          </div>
          <p className="author">Status: {readStatus}</p>
        </div>
      </div>
      <hr />
      <h1>About Author</h1>
      <p>{aboutAuthor}</p>
      <h1>About Book</h1>
      <p>{aboutBook}</p>
    </div>
  )
}

export default RenderBookDetails
