
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import WhatsAppButton from './components/Common/WhatsAppButton'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ProfilePage from './pages/user/ProfilePage'
import DashboardPage from './pages/user/DashboardPage'
import StudentsPage from './pages/StudentsPage'
import CreatePostPage from './pages/posts/CreatePostPage'
import PostDetailPage from './pages/posts/PostDetailPage'
import FeedPage from './pages/FeedPage'
import StudyGroupsPage from './pages/StudyGroupsPage'
import EventsPage from './pages/EventsPage'
import NotificationsPage from './pages/NotificationsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import NewsManagement from './pages/admin/NewsManagement'

// Marketplace Pages
import MarketplacePage from './pages/MarketplacePage'
import ItemDetailPage from './pages/marketplace/ItemDetailPage'
import CreateItemPage from './pages/marketplace/CreateItemPage'

// Food Pages
import FoodPage from './pages/FoodPage'

// Auth Context
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-beige-500" dir="rtl">
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Marketplace Routes */}
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/item/:id" element={<ItemDetailPage />} />

              {/* Food Routes */}
              <Route path="/food" element={<FoodPage />} />

              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/students" element={
                <ProtectedRoute>
                  <StudentsPage />
                </ProtectedRoute>
              } />
              <Route path="/create-post" element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              } />
              <Route path="/post/:id" element={
                <ProtectedRoute>
                  <PostDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/feed" element={
                <ProtectedRoute>
                  <FeedPage />
                </ProtectedRoute>
              } />
              <Route path="/study-groups" element={
                <ProtectedRoute>
                  <StudyGroupsPage />
                </ProtectedRoute>
              } />
              <Route path="/events" element={
                <ProtectedRoute>
                  <EventsPage />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              } />

              {/* Protected Marketplace Routes */}
              <Route path="/marketplace/create" element={
                <ProtectedRoute>
                  <CreateItemPage />
                </ProtectedRoute>
              } />

              {/* Protected Food Routes */}
              <Route path="/food/create" element={
                <ProtectedRoute>
                  {/* CreateFoodPage - to be created */}
                  <div>Create Food Page - Coming Soon</div>
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/news" element={
                <AdminRoute>
                  <NewsManagement />
                </AdminRoute>
              } />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />

          {/* Toast Notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0A192F',
                color: '#F8F5F0',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl'
              }
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
