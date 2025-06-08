import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAuth } from '../context/AuthContext'
import { userApi, postApi } from '../services/api'

function ProfilePage(){

    const {userId}=useParams()
    const{user}=useAuth()
    const navigate=useNavigate()

    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState('') 
    const [loading, setLoading] = useState(true)


    const targetUserId = userId || user?.id
    const isOwnProfile = !userId || userId === user?.id

    console.log("userId param:", userId);
console.log("user from context:", user);
console.log("targetUserId to fetch:", targetUserId);

    useEffect(()=>{
        if(!user ){
            navigate('/login')
            return
        }
        const fetchProfile=async()=>{
            try{
                const profileResponse=await userApi.getUserProfile(targetUserId)
                console.log(profileResponse)
                setProfile(profileResponse.data.data)
                
                setEditName(profileResponse.data.name)

                const postsResponse=await postApi.getMyPosts()
                
                setPosts(postsResponse.data.data)
            }
            catch (error){
                console.error('Error fetching profile:',error)
            }
            finally{
                setLoading(false)
            }
        }

        fetchProfile()
    },[targetUserId,user,navigate])

const handleDelete = async (postId) => {
  try {
    const response = await userApi.deletePost(postId); 

    if (response.status === 200 || response.status === 204) {
      
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert("Post deleted successfully");

    } else {
      console.error("Delete failed:", response);
    }
  } catch (error) {
    console.error("Error while deleting post:", error);
  }
};


    const handleEditProfile=async()=>{
        try{
            const response=await userApi.updateProfile({name:editName})
            
            setProfile(response.data)
            setIsEditing(false)
        }
        catch(error){
            console.error('Error updating profile:',error)
        }
    }
    if (loading) {
    return <div className="text-center mt-20">Loading...</div>
    }

    if (!profile) {
    return <div className="text-center mt-20">Profile not found</div>
    }
    return(
        

    <div>
      <Navbar />
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name?.[0] || 'U'}
          </div>

          <div className="profile-details">
            <div className="profile-name-section">
              {isEditing ? (
                <div className="edit-controls">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="edit-name-input"
                  />
                  <button onClick={handleEditProfile} className="save-button">Save</button>
                  <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                </div>
              ) : (
                <>
                  <h2 className="profile-name">{profile.name}</h2>
                  {isOwnProfile && (
                    <button onClick={() => setIsEditing(true)} className="edit-profile-button">Edit Profile</button>
                  )}
                </>
              )}
            </div>

            <div className="profile-stats">
              <span><strong>{posts.length}</strong> posts</span>
              <span><strong>0</strong> followers</span>
              <span><strong>0</strong> following</span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {posts && posts.length>0 && posts.map(post => (
            <div key={post._id} className="post-tile">
            <button onClick={()=>handleDelete(post._id)}>❌</button>
              {post.image ? (
                <div className="image-text-tile">
                
                <img src={post.image} alt="img" className="post-image" />
                <div>
                  <span className="text-only-message">{post.text}</span>
                </div>
                </div>
                
              ) : (
                <div className="text-only-tile">
                  <span className="text-only-message">{post.text}</span>
                </div>
              )}
              
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-posts-message">No posts yet</div>
        )}
      </div>
    </div>
  


    )
}
export default ProfilePage
