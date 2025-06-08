import { useState } from 'react'
import { commentApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function CommentForm({ postId, onCommentAdded }) {
  const { user } = useAuth()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    try {
      const response = await commentApi.createComment(postId, { text })
      const newComment = response.data.data
      onCommentAdded && onCommentAdded(newComment)
      setText('')
    } catch (err) {
      console.error('Error creating comment:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="comment-input"
        disabled={loading}
      />
      <button type="submit" className="comment-submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  )
}

export default CommentForm
