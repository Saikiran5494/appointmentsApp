// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

// console.log(format(new Date(), 'dd MMMM yyyy, EEEE'))

class Appointments extends Component {
  state = {details: [], title: '', date: '', isActive: false}

  starButtonClicked = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  getFilteredAppointmentsList = () => {
    const {details, isActive} = this.state

    if (isActive) {
      return details.filter(eachDetail => eachDetail.isStar === true)
    }
    return details
  }

  isStarred = id => {
    this.setState(prevState => ({
      details: prevState.details.map(eachDetail => {
        if (eachDetail.id === id) {
          return {...eachDetail, isStar: !eachDetail.isStar}
        }
        return eachDetail
      }),
    }))
  }

  onInputClicked = event => {
    this.setState({title: event.target.value})
  }

  onDateClicked = event => {
    this.setState({date: event.target.value})
  }

  onSubmitClicked = event => {
    event.preventDefault()
    const {title, date} = this.state
    const displayDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: displayDate,
      isStar: false,
    }
    this.setState(prevState => ({
      details: [...prevState.details, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {title, date, isActive} = this.state
    const button = isActive ? 'starred' : 'star'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="image-details">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
            <form type="submit" onSubmit={this.onSubmitClicked}>
              <label htmlFor="text" className="label">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="text"
                className="input"
                placeholder="Title"
                onChange={this.onInputClicked}
                value={title}
              />
              <br />
              <label htmlFor="date" className="label">
                Date
              </label>
              <br />
              <input
                type="date"
                className="input"
                id="date"
                onChange={this.onDateClicked}
                value={date}
              />
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>

          <hr className="line" />
          <div className="appointments">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={button}
              onClick={this.starButtonClicked}
            >
              Starred
            </button>
          </div>
          <ul className="un-orderedList">
            {filteredAppointmentsList.map(eachDetail => (
              <AppointmentItem
                details={eachDetail}
                key={eachDetail.id}
                isStarred={this.isStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
