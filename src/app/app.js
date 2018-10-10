import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch, NavLink } from 'react-router-dom'
import decode from 'jwt-decode'

import MainMenu from './pages/main-menu-component'
import LoginComponent from './pages/login-component'
import AddWorker from './pages/add-worker-component'
import Footer from './pages/footer'
import Error from './pages/error-component'
import Swc from './pages/search-worker-component'

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

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/' }}/>
    )
  )}/>
)

const logout = () => {
  console.log('wewe')
  sessionStorage.setItem('token', '')
  window.location.replace('/')
}

export default function () {
  return (
    <BrowserRouter>
      <div className='main-container'>
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="blue nav-wrapper">
                <div className='row'>
                  <div className='col s12'>
                    <a className='brand-logo left' href='/'> Sindicato</a>

                    <ul className="right">
                      <li><NavLink to="/">Login</NavLink></li>
                      {checkAuth()?<li><NavLink to="/menu">Menu</NavLink></li>:null}
                      {checkAuth()?<li><NavLink to="/addworker">Nuevo Trabajador</NavLink></li>:null}
                      <li>
                        <a className="btn-floating btn-small waves-effect waves-light light red" onClick={logout}>
                          <i className="material-icons ">logout</i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className='container'>
          <Switch>
            <Route exact path="/" component={props => <LoginComponent {...props} />}/>
            <AuthRoute exact path="/menu" component={props => <MainMenu {...props} />}/>
            <AuthRoute exact path="/addworker"
                       component={props => <AddWorker token={sessionStorage.getItem('token')} {...props} />}/>
            <AuthRoute exact path="/search" component={props => <Swc token={sessionStorage.getItem('token')} {...props} />}/>
            <Route component={Error}/>
          </Switch>
        </div>

        <Footer/>
      </div>
    </BrowserRouter>
  )
}

