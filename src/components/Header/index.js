import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const onClickHam = () => {}

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661793112/Group_7732_jbkary.png"
          alt="website logo"
          className="logo"
        />
      </Link>

      <img
        src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661863778/icon_qfr2pw.png"
        className="hamburger"
        alt="hamburger"
        onClick={onClickHam}
      />
      <div className="nav-menu">
        <ul className="nav-list">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/shelf" className="nav-link">
            <li>Bookshelves</li>
          </Link>
        </ul>
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
