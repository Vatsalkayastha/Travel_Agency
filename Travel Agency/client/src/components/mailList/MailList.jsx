import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <h1 className="mailDesc">Sign up and we'll send the best deals to you</h1>
      <div className="mailInputContainer">
        <br></br>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList