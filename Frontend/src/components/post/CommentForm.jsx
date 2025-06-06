import React,{useState} from 'react'
import { commentApi } from '../../services/api'

import { useNavigate } from 'react-router-dom'

const CommentForm = ({postId,onCommentAdded}) => {

    const[text,setText]=useState('')
    const[loading,setLoading]=useState(false)

     const navigate = useNavigate()
  

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(!text.trim()){
            return
        }
        setLoading(true)
        try{
            const response=await commentApi.createComment(postId,{text})
            setText('')
            console.log("comment", response)
            // onCommentAdded(response.data)
            //  navigate("/")
        }
        catch(error){
            console.error('Error adding comment:',error)
        }
        finally{
            setLoading(false)
        }

       

    }
  return (
    <form onSubmit={handleSubmit} className="comment-form">
  <input
    type="text"
    placeholder="Add a comment..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    className="comment-input"
    disabled={loading}
  />
  {text.trim() && (
    <button
      type="submit"
      className={`comment-submit ${loading ? 'disabled' : ''}`}
      disabled={loading}
    >
      Post
    </button>
  )}
</form>

  )
}

export default CommentForm