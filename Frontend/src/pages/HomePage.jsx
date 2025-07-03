
import { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import CommentForm from '../components/post/CommentForm'
import CommentList from '../components/post/CommentList'
import { useAuth } from '../context/AuthContext'
import { usePost } from '../context/PostContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

function HomePage() {
  const { user } = useAuth()
  const { posts, loading, fetchFeed, likePost, unlikePost } = usePost()
  const [newComments, setNewComments] = useState({})
  const [error, setError] = useState(null)


  // try to make comment card
    const [activePostId, setActivePostId] = useState(null)

  

  useEffect(() => {
    const loadFeed = async () => {
      try {
        await fetchFeed()
      } catch (err) {
        setError('Failed to load posts. Please try again.')
      }
    }
    loadFeed()
  }, [])

  const handleLike = async (post) => {
    console.log(post)
    const allPeopleWhoLiked = post.likes
    const haveILiked = allPeopleWhoLiked.find(like => like._id === user.id)
    if (haveILiked) {
      await unlikePost(post._id)
    } else {
      await likePost(post._id)
    }
  }
  


  const handleCommentAdded = (postId, comment) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: comment
    }))
  }

  // try to make comment-card
  useEffect(() => {
  if (activePostId !== null) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
  }, [activePostId])



  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-5xl mx-auto mt-20">
          <LoadingSpinner size="large" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="max-w-5xl mx-auto mt-20 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="feed">
          <h2 className="feed-title">Your Feed</h2>
          {posts?.data?.length > 0 ? (
            posts.data.map(post => (
              <div key={post._id} className="post">
                <div className="post-header">
                  <div className="user-info">
                    <div className="avatar">{post.user?.name?.[0] || 'U'}</div>
                    <span>{post.user?.name || 'Anonymous'}</span>
                  </div>
                </div>

                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt="Post" className="post-image-img" />
                  </div>
                )}

                <div className="post-content">
                  {post.text && <p> {post.text}</p>}
                  <p className="post-date">{new Date(post.createdAt).toLocaleString()}</p>
                </div>

                <div className="post-actions">
                  <button
                    onClick={() => handleLike(post)}
                    className={`like-button ${post.isLiked ? 'liked' : ''}`}
                  >
                    {post.likes.find(like => like._id === user.id) ? '❤️' : '🤍'} {post.likesCount || 0}
                  </button>

                    

                  <button className="comment-button" onClick={() => setActivePostId(post._id)}>💬 Comment</button>
                  <button className="share-button">📤 Share</button>
                </div>
                {activePostId === post._id && (
                  <div className='comment-card'>
                  <button onClick={() => setActivePostId(null)} className="close-button">❌</button>
                  <div className='comment-card-inner'>
                  
                  <CommentList postId={post._id} newComment={newComments[post._id]} />
                  </div>
                </div>
                )}
                
                
                <div className="border-t border-gray-100 px-4 py-2">
                  <CommentForm postId={post._id} onCommentAdded={(comment) => handleCommentAdded(post._id, comment)} />
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>No Posts</h1>
              <p>Create your first Post</p>
            </div>
          )}
        </div>
        <div className="sidebar">
          <div className="suggestion-for">
            <div className="avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
            <div className="user-name">
              <p>@{user?.name?.toLowerCase().replace(/\s+/g, '_')}</p>
            </div>
            <p className='for-user'>suggestion for you</p> 
          </div>
          <div className="suggestions">
            <div className="sidebar-suggestions">
              <p className="coming-soon">Coming soon...</p>
            </div>
            <div className="footer-text">
              <p>&copy; 2025 social media</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage
