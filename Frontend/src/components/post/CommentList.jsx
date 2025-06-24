import { useState, useEffect } from 'react'
import { postApi, commentApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function CommentList({ postId, newComment }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchComments()
  }, [postId])

  useEffect(() => {
    if (newComment) {
      setComments(prev => [newComment, ...prev])
    }
  }, [newComment])

  const fetchComments = async () => {
    try {
      const response = await postApi.getPostComments(postId)
      setComments(response.data.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      
      await commentApi.deleteComment(commentId)
      setComments(prev => prev.filter(comment => comment._id !== commentId))
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  if (loading) {
    return <div className="text-xs text-gray-500 px-4 pb-2">Loading comments...</div>
  }

  

  return (
    <div className="comment-section">
      {comments.length>0?(comments.map(comment => (
        
        <div key={comment._id} className="comment-row">
          <p className="comment-text">
            <span className="comment-user">{comment.user?.name}</span> {comment.text}
          </p>
          {comment.user?._id === user?.id && (
            <button
              onClick={() => handleDelete(comment._id)}
              className="comment-delete-button"
            >
              Delete
            </button>
          )}
        </div>
      ))):(<div>No Comments</div>)}
    </div>
  )
}

export default CommentList
