// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {details, isStarred} = props
  const {title, date, id, isStar} = details
  const onStarClicked = () => {
    isStarred(id)
  }

  const star = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list">
      <div className="title-image-cont">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onStarClicked}
        >
          <img src={star} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
