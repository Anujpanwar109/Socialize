import React from 'react'
import img1 from '../../assets/lg-sg-1.jpg' 
import img2 from '../../assets/lg-sg-2.jpg' 

const Creative = () => {
  return (
    <div className="login-side-info">
       
        
        <p className="subtitle">Create your memories</p>
        <div className='images'>
          <img src={img1} alt="img" />
          <img src={img2} alt="img" />
          
        </div>
  
      </div>
  )
}

export default Creative