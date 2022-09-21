const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('removed')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className='correct'>
      {message}
    </div>
  )
}

export default Notification