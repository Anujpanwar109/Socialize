import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Creative from '../components/layout/creative'

const SignupPage = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { signup } = useAuth()
    const navigate = useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError('')
        setLoading(true)

        const result=await signup(name,email,password)

        if(result.success){
            navigate('/')
        }else{
            setError(result.error)
        }
        setLoading(false)
    }
  return (
    <div className='login-container'>
    <Creative/>

        <div className='login-box'>
        <h1>Socialize</h1>
        <p className="subtitlee">Sign up to see photos and videos from your friends.</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                />
                <input
                    type='email'
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
                <button type='submit'>
                     {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
            <p>
             Have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    </div>
  )
}

export default SignupPage