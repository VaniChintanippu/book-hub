import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/shelf" component={Bookshelves} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
