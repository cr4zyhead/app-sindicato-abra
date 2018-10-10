import React from 'react'
import { BrowserRouter, Redirect, Route, Switch, NavLink } from 'react-router-dom'
import decode from 'jwt-decode'

import MainMenu from './pages/main-menu-component'
import LoginComponent from './pages/login-component'
import AddWorker from './pages/add-worker-component'
import Footer from './pages/footer'
import Error from './pages/error-component'
import Swc from './pages/search-worker-component'
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (

    window.location.replace('/')
    )
  )}/>
)
const checkAuth = () => {

  const token = sessionStorage.getItem('token')
  if (!token) {
    return false
  }
  try {
    // { exp: 12903819203 }
    const { exp } = decode(token)

    if (exp < new Date().getTime() / 1000) {

      return false
    }

  } catch (e) {

    return false
  }

  return true
}

class App2 extends React.Component {

  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      token: '',
      redirectMe: true,
      islogin: false
    }
    this.logout = this.logout.bind(this)
  }

  logout () {

    sessionStorage.setItem('token', '')
    window.location.replace('/')
  }

  componentWillMount () {
    this.setState({ islogin: checkAuth() })

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav')
      var instances = M.Sidenav.init(elems)
    })
  }

  render () {
    return (
      <BrowserRouter>
        <div className='main-container'>
          <header>
            <nav>
              <div className="nav-wrapper blue navbar-fixed">
                <a href="/" className="brand-logo center">Sindicato</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                  <li><a href="/">Login</a></li>
                  {checkAuth()?<li><a href="/menu">Menu</a></li>:null}
                  {checkAuth()?<li><a href="/addworker">Agregar Trabajador</a></li>:null}
                  {checkAuth()?<li><a href="/search">Buscar Trabajador</a></li>:null}
                  <li>
                    <a
                      className="btn-floating tooltipped data-position='bottom'' data-tooltip='Cerrar Sesioón' btn-small waves-effect waves-light light red"
                      onClick={this.logout}>
                      <i className="material-icons ">logout</i>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
             <li><a href="/">Login</a></li>
              {checkAuth()? <li><a href="/menu">Menu</a></li>:null}
              {checkAuth()? <li><a href="/addworker">Agregar Trabajador</a></li>:null}
              {checkAuth()? <li><a href="/search">Buscar Trabajador</a></li>:null}
              <li>
                <a
                  className=" btn-small waves-effect waves-light light red"
                  onClick={this.logout}>
                  Cerrar sesion
                  <i className="material-icons ">logout</i>
                </a>
              </li>
            </ul>
          </header>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={props => <LoginComponent  {...props} />}/>
              <AuthRoute exact path="/menu" component={props => <MainMenu islogin={this.state.islogin} {...props} />}/>
              <AuthRoute exact path="/addworker"
                         component={props => <AddWorker islogin={this.state.islogin}
                                                        token={sessionStorage.getItem('token')} {...props} />}/>
              <AuthRoute exact path="/search"
                         component={props => <Swc token={sessionStorage.getItem('token')} {...props} />}/>
              <Route component={Error}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App2
