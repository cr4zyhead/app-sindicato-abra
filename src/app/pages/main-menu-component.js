import React from 'react'
import './css/main-menu-component.css'
import { withRouter } from 'react-router-dom'

class MainMenuComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      token: '',
      redirectMe: true
    }
  }

  redirectTo (path) {
    if (this.state.redirectMe === true) {
      let { history } = this.props
      history.push({
        pathname: path
      })
    }
  }

  componentWillMount () {
    console.log(this.state.username)
  }
  render () {
    return (

      <div>
        <div className='container'>
          <div className='card '>
            <div className='card-container'>
              <div className='row ' >

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="large material-icons" >account_box</i>
                    <a href='/'>ir</a>
                  </div>
                </div>

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn " onClick={(e) => this.redirectTo('wewe', e)}>ir</a>
                </div>

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn">ir</a>
                </div>

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn">ir</a>
                </div>

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn">ir</a>
                </div>

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn">ir</a>
                </div>

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn">ir</a>
                </div>

                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn">ir</a>
                </div>
                <div className='col s4 m4 center marginRow'>
                  <div className='center'>
                    <i className="waves-effect large material-icons ">account_box</i>
                  </div>
                  <a className="waves-effect waves-light btn">ir</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(MainMenuComponent)
