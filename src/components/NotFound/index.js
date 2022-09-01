import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661851048/Group_7484_gxypce.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="redirect-button" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
