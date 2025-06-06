import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import CommentForm from '../components/post/CommentForm'
import CommentList from '../components/post/CommentList'
import { useAuth } from '../context/AuthContext'
import { usePost } from '../context/PostContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

// import { commentApi } from '../services/api'





function HomePage() {
  const { user } = useAuth()
  const { posts, loading, fetchFeed, likePost, unlikePost } = usePost()

  const [likeData, setLikeData] = useState(null)

  console.log(likeData)

  console.log("ajbdkjbd")

  // const [comments, setComments] = useState({})

  // console.log("comments",comments)

  const navigate = useNavigate()

  const [newComments, setNewComments] = useState({})
  const [error,setError]=useState(null)


   
 

   useEffect(() => {

    //  setInterval(()=>navigate(0), 10000)

    const loadFeed = async () => {
      try {
         const response =  await fetchFeed() 
        //  for(let t of response.data.data){
        //     let postId = t._id
        //      let haveIliked = allPeopleWhoLiked.find(like => like._id == user.id)
        //      if(haveIliked){
        //        setLikeData({...likeData, [postId]: 1})
        //      }
        //      else{
        //          setLikeData({...likeData, [postId]: 0})
        //      }
        //  }
        
      } catch (err) {
        setError('Failed to load posts. Please try again.')
      }
    }

    loadFeed()
  }, [])

  const handleLike = async (post) => {
       let allPeopleWhoLiked = post.likes
       let haveIliked = allPeopleWhoLiked.find(like => like._id == user.id)
       if(haveIliked){
             // unlike api call
            await unlikePost(post._id)


       }
       else{
           // like wala api
           await likePost(post._id)
       }
  }


  const handleCommentAdded = (postId, comment) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: comment
    }))
  }

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
          <h2 className="feed-title ">Your Feed</h2>

          {
            posts&& posts.data && posts.data.length>0 ? (posts.data.map(post => (
              
              <div key={post._id} className="post">
                <div className="post-header">
                  <div className="user-info">
                    <div className="avatar">
                      {post.user?.name?.[0] || 'U'}
                    </div>
                    <span>{post.user?.name || 'Anonymous'}</span>
                  </div>
                </div>

                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt="Post" className="post-image" />
                  </div>
                )}

                <div className="post-actions">
                  {console.log(post)}
                  <button
                    onClick={() => handleLike(post)}
                    className={`like-button ${post.isLiked ? 'liked' : ''}`}
                  >
                    {post.likes.find(like => like._id = user.id) ? '❤️' : '🤍'} {post.likesCount || 0}
                  </button>
                  <button className="comment-button">💬 Comment</button>
                  <button className="share-button">📤 Share</button>
                </div>
                

                <div className="post-content">
                  {post.text && (
                    <p><span className="user-name">{post.user?.name}</span> {post.text}</p>
                   )}
                  <p className="post-date">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
                 <CommentList postId={post._id} />

                <div className="border-t border-gray-100 px-4 py-2">
                  <CommentForm
                    postId={post._id}
                    // onCommentAdded={(comment) => handleCommentAdded(post._id, comment)}
                  />
                </div>
                 



              </div>
            ))
          ):(
             <div>
              <h1>No Posts</h1>
              <p>Create your first Post</p>
             </div>
          
          )}
        </div>

        <div className="sidebar">
          
           <div className="suggestion-for">
           
              <div className="avatar">
                 {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="user-name">
                {/* <p>{user?.name}</p> */}
                
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
