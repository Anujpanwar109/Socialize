import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Creative from '../components/layout/Creative'

const LoginPage = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)

    console.log(result)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }
  return (
    <div className='login-container'>


      <Creative/>

        <div className='login-box'>
            <h1 >Socialize</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} >
                <input
                  type="email"
                  placeholder='email'
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)}
                 
                  required 
                />
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  
                    required
                />
                <button type='submit'
                disabled={loading}
               
                
                >{loading ? 'Logging in...' : 'Log In'}</button>
            </form>
            <p >
              Don't have an account? <Link to="/signup" > sign up</Link>  
            </p>
        </div>
    </div>
  )
}

export default LoginPage