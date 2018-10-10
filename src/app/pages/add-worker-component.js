import React from 'react'
import { withRouter } from 'react-router-dom'
import './css/add-worker-menu-component.css'
import { validate, format } from 'rut.js'

var validator = require('email-validator')

class AddWorkerComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      width: window.innerWidth,
      isRutValid: false,
      isMailValid: false,
      namew: '',
      surname1: '',
      surname2: '',
      address1: '',
      city1: '',
      address2: '',
      city2: '',
      rut: '',
      email: '',
      finit: '',
      turno: '',
      borndate: '',
      marriedstatus: '',
      phone: '',
      department: ''
    }

    this.addUser = this.addUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
    this.handleChangeRut = this.handleChangeRut.bind(this)
  }

  addUser (e) {
    e.preventDefault()

    console.log(this.state)

    fetch('/api/workers/addWorker', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.token
      }
    }).then(response => {
      return response.json()
    }).then(r => {
      console.log(r.message)
    })
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })

    if (name === 'email') {
      const v = validator.validate(value)
      this.setState({ isMailValid: v })
    }

    if (name === 'fInit') {
      console.log('fecha')
    }
  }

  handleChangeRut (e) {
    const { name, value } = e.target
    let c = format(value)
    if (validate(c)) {
      this.setState({ isRutValid: true })
    } else {
      this.setState({ isRutValid: false })
    }
    this.setState({
      [name]: c
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowSizeChange)

    var elems = document.querySelectorAll('.datepicker')

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker')
      var instances = M.Datepicker.init(elems)

    })

  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowSizeChange)

  }

  handleWindowSizeChange () {
    this.setState({ width: window.innerWidth })
  }

  render () {
    return (
      <div className='container'>
        <div className='card marginElements center'>
          <h4 className=' '>Agregar Nuevo Afiliado Sindicato</h4>
          <form onSubmit={this.addUser}>
            <div className='row'>

              <div className='input-field col'>

                <i className="material-icons prefix">account_circle</i>
                <input required id="rut" type="text" name='rut' onChange={this.handleChangeRut} value={this.state.rut}/>
                <label htmlFor="rut">Numero RUT</label>
                {!this.state.isRutValid ? <p className="errorMessage">Rut no válido</p> : null}
              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">account_circle</i>
                <input id="namew" type="text" name='namew' onChange={this.handleChange} value={this.state.namew}/>
                <label htmlFor="namew">Nombre</label>
              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">account_circle</i>
                <input id="surname1" type="text" name='surname1' onChange={this.handleChange}
                       value={this.state.surname1}/>
                <label htmlFor="surname1">Apellido Paterno</label>

              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">account_circle</i>
                <input id="surname2" type="text" name='surname2' onChange={this.handleChange}
                       value={this.state.surname2}/>
                <label htmlFor="surname2">Apellido Materno</label>
              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">account_circle</i>
                <input id="address1" type="text" name='address1' onChange={this.handleChange}
                       value={this.state.address1}/>
                <label htmlFor="address1">Direccion 1</label>

              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">account_circle</i>
                <input id="city1" type="text" name='city1' onChange={this.handleChange} value={this.state.city1}/>
                <label htmlFor="city1">Ciudad 1</label>
              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">account_circle</i>
                <input id="adress2" type="text" name='adress2' onChange={this.handleChange}
                       value={this.state.address2}/>
                <label htmlFor="adress2">Direccion 2</label>
              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">account_circle</i>
                <input id="city2" type="text" name='city2' onChange={this.handleChange} value={this.state.city2}/>
                <label htmlFor="city2">Ciudad2</label>

              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">mail</i>
                <input id="email" type="email" name='email' onChange={this.handleChange} value={this.state.email}/>
                <label htmlFor="email">Email</label>
                {!this.state.isMailValid ? <p className="errorMessage">Email no válido</p> : null}
              </div>

              <div className='input-field col'>
                <i className="material-icons prefix">date</i>
                <input id="finit" type="text" className="datepicker" name='fInit' onChange={this.handleChange}
                       value={this.state.finit}/>
                <label htmlFor="finit">Fecha Inicio Contrato</label>
              </div>

            </div>
            <button className='btn light blue darken 4 waves-effect waves-light'>Agregar</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(AddWorkerComponent)
