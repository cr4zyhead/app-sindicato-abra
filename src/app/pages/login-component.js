import React from 'react'
import { withRouter } from 'react-router-dom'

class LoginComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      token: '',
      redirectMe: true
    }
    this.redirectTo = this.redirectTo.bind(this)
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  login (e) {
    e.preventDefault()
    console.log('iniciando sesion ' + e)

    fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(r => {
      if (r.status == 401) {
        var toastHTML = '<span>Datos no validos, Intente Nuevamente</span>'
        M.toast({ html: toastHTML })
      } else {
        this.state.token = r.token
        sessionStorage.setItem('token', r.token)
        window.location.replace('menu')
      }
    })
  }

  redirectTo (path) {
    let { history } = this.props
    history.push({
      pathname: path
    })
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div className='container'>

        <div className='card '>
          <div className='card-content'>
            <form onSubmit={this.login}>
              <div className='row'>
                <div className='input-field col s12'>
                  <i className="material-icons prefix">account_circle</i>
                  <input id="user" type="text" name='username' onChange={this.handleChange} value={this.state.username}/>
                  <label htmlFor="user">Nombre de Usuario</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <i className="material-icons prefix">input</i>
                  <input id="pass" type="password" name='password' onChange={this.handleChange} value={this.state.password}/>
                  <label htmlFor="pass">Contraseña</label>
                </div>
              </div>
              <button className='btn light blue darken 4 waves-effect waves-light'>Enviar</button>
            </form>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(LoginComponent)
