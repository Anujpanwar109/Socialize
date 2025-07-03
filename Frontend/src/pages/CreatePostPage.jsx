import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'
import { postApi } from '../services/api'

function CreatePostPage() {
  const [text, setText] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  const navigate = useNavigate()
  const { user } = useAuth()

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Preview image before uploading
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result) 
      }
      reader.readAsDataURL(file)

      try {
        const uploadResponse = await postApi.uploadFile(file)
        const imageUrl = uploadResponse.data.data.file_url
        setSelectedFile(imageUrl)
      } catch (err) {
        console.error(err)
        setError('Image upload failed')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim() && !selectedFile) {
      setError('Please enter some text or select an image')
      return
    }

    setLoading(true)
    setError('')

    try {
      const postData = {
        text: text.trim(),
        image: selectedFile
      }

      await postApi.createPost(postData)
      navigate('/')
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div>
      <Navbar />
      <div className="create-container">
        <div className="create-card">
          <h2 className="create-title">Create New Post</h2>

          {error && <p className="create-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="create-textarea"
            />

            <div className="create-upload">
              <label className="create-label">Add an image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {imagePreview && (
                <div className="create-preview-wrapper">
                  <img src={imagePreview} alt="Preview" className="create-preview-img" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null)
                      setImagePreview(null)
                    }}
                    className="create-remove-btn"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            <div className="create-buttons">
              <button
                type="submit"
                disabled={loading}
                className="create-post-btn"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="create-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePostPage
