import React from 'react'
import './css/search-worker-component.css'

class Swc extends React.Component {
  constructor () {
    super()

    this.state = {
      workers: []
    }

    this.getAll = this.getAll.bind(this)
  }

  componentDidMount () {
    this.getAll()
  }

  getAll () {
    // e.preventDefault()

    fetch(
      '/api/workers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        }
      })
      .then(response => {
        return response.json()
      })
      .then(re => {
        this.setState({ workers: re })
        console.log(this.state.workers)
      })
  }

  render () {
    return (
      <div className='container'>
        <div className='card '>
          <div className='card-content'>
            <button className='btn' onClick={this.getAll}>click</button>
            <table className="responsive-table centered striped">
              <thead>
                <tr>
                  <th>Rut</th>
                  <th>Nombre</th>
                  <th>Apellido p</th>
                  <th>Apellido m</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Direccion 1</th>
                  <th>Ciudad 1</th>
                  <th>Direccion 2</th>
                  <th>Ciudad 2</th>
                  <th>Departamento</th>
                  <th>Turno</th>
                  <th>Fecha de Nacimiento</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.workers.map(w =>
                    <tr key={w._id}>
                      <th>{w.rut !== '' ? w.rut : '-'}</th>
                      <th>{w.namew !== '' ? w.namew : '-'}</th>
                      <th>{w.surname1 !== '' ? w.surname1 : '-'}</th>
                      <th>{w.surname2 !== '' ? w.surname2 : '-'}</th>
                      <th>{w.phone !== '' ? w.phone : '-'}</th>
                      <th>{w.email !== '' ? w.email : '-'}</th>
                      <th>{w.address1 !== '' ? w.address1 : '-'}</th>
                      <th>{w.city1 !== '' ? w.city1 : '-'}</th>
                      <th>{w.address2 !== '' ? w.address2 : '-'}</th>
                      <th>{w.city2 !== '' ? w.city2 : '-'}</th>
                      <th>{w.department !== '' ? w.department : '-'}</th>
                      <th>{w.turno !== '' ? w.turno : '-'}</th>
                      <th>{w.borndate !== '' ? w.borndate : '-'}</th>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Swc
