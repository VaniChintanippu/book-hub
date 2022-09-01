import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form className="loginform-container" onSubmit={this.submitForm}>
        <img
          src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661791592/Ellipse_99_hlxzku.png"
          alt="website login"
          className="log-img-1"
        />
        <img
          src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661791065/Rectangle_1467_xmy8pu.png"
          alt="website login"
          className="log-img-2"
        />
        <div className="login-box">
          <div className="login-container">
            <img
              src="https://res.cloudinary.com/dyrfx9ekj/image/upload/v1661793112/Group_7732_jbkary.png"
              alt="login website logo"
              className="logo-1"
            />
            <label htmlFor="username" className="label-name">
              Username*
            </label>
            <input
              type="text"
              id="username"
              onChange={this.onChangeUserName}
              value={username}
              className="input-field user-input"
            />
            <label htmlFor="password" className="label-name">
              Password*
            </label>
            <input
              type="password"
              id="password"
              onChange={this.onChangePassword}
              value={password}
              className="input-field"
            />
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button className="button" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default LoginForm
