import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreatePostPage from './pages/CreatePostPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/common/ProtectedRoute'



const App = () => {
  return (
   
          <Routes>
              <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
              <Route path='/login' element={<ProtectedRoute requireAuth={false}><LoginPage/></ProtectedRoute>}/>
              <Route path='/signup' element={<ProtectedRoute requireAuth={false}><SignupPage/></ProtectedRoute>}/>
              <Route path="/create" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
           </Routes>
      
      
    
  )
}

export default App