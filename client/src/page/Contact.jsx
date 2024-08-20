import './css/Contact.css'
import Content_Img from '../assets/about.jpeg'
import { useState } from 'react'
import axios from '../helper/axios'
import Alert from '../component/alert/Alert'

export default function Contact() {
  let [fullname,setFullname] = useState('')
  let [email,setEmail] = useState('')
  let [message,setMessage] = useState('')
  let [showAlert,setShowAlert] = useState(false)

  let ContentHandler = async(e) =>{
    e.preventDefault()
    try {
      let data = {fullname,email,message}
      let res = await axios.post('/content/create',data)
      if(res.status == 200){
        setFullname('')
        setEmail('')
        setMessage('')
        setShowAlert(true)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  let closeAlert = ()=>{
    setShowAlert(false)
  }


  return (
    <>
      {/* content hero start */}
      <div className='content'>
        <div className='content-background' style={{ backgroundImage: `url(${Content_Img})` }}></div>
        <div className='content-overlay'></div>
        <div className='content-content'>
          <h1>CONTENT</h1>
        </div>
      </div>
      {/* content hero end */}

      {/* --------------------------------------------------------------------------------------- */}

      <div className="msg">
        <div className="box">
          <h4>Send Us A Message</h4>
          <form onSubmit={ContentHandler}>
            <input type="text" placeholder="Your Name" value={fullname} required onChange={(e) => setFullname(e.target.value)} />
            <input type="email" placeholder="email@example.com" value={email} required onChange={(e) => setEmail(e.target.value)} />
            <textarea placeholder='How can we help?' value={message} required onChange={(e) => setMessage(e.target.value)}></textarea>
            <button type='submit'>Send</button>
          </form> 
        </div>

        <div className="add">
            <div className='address'>
              <div><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <p>Address</p>
                <span>Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US</span>
              </div>
            </div>

            <div className="phone">
              <div><i className="fa-solid fa-phone"></i></div>
              <div>
                <p>Phone</p>
                <span>+123456789</span>
              </div>
            </div>

            <div className="mail">
              <div><i className="fa-regular fa-envelope"></i></div>
              <div>
                <p>Sale Support</p>
                <span>support@yourdomain.com</span>
              </div>
            </div>
        </div>
        {
          showAlert && (
            <Alert message="Your Message has been sent successfully. We will reply you as soon as possible. Have a nice day." onClose={closeAlert}/>
          )
        }
      </div>
    </>
  )
}
