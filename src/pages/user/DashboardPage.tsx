import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  ShoppingBag, 
  UtensilsCrossed, 
  Heart, 
  Eye, 
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'
import LoadingSpinner from '../../components/Common/LoadingSpinner'

interface DashboardStats {
  totalListings: number
  totalViews: number
  totalMessages: number
  totalFavorites: number
}

interface UserListing {
  id: string
  title: string
  type: 'marketplace' | 'food'
  price: number
  image: string
  views: number
  messages: number
  isActive: boolean
  createdAt: string
}

const DashboardPage = () => {
  const { user } = useAuthContext()
  const [activeTab, setActiveTab] = useState<'overview' | 'marketplace' | 'food' | 'favorites'>('overview')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    totalViews: 0,
    totalMessages: 0,
    totalFavorites: 0
  })
  const [userListings, setUserListings] = useState<UserListing[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Mock data - replace with actual API calls
        const mockStats: DashboardStats = {
          totalListings: 5,
          totalViews: 234,
          totalMessages: 18,
          totalFavorites: 12
        }

        const mockListings: UserListing[] = [
          {
            id: '1',
            title: 'لابتوب Dell XPS 13 مستعمل',
            type: 'marketplace',
            price: 15000,
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop',
            views: 45,
            messages: 8,
            isActive: true,
            createdAt: '2024-01-15'
          },
          {
            id: '2',
            title: 'جولوف رايس نيجيري أصلي',
            type: 'food',
            price: 30,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=150&fit=crop',
            views: 67,
            messages: 12,
            isActive: true,
            createdAt: '2024-01-14'
          }
        ]

        setStats(mockStats)
        setUserListings(mockListings)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleDeleteListing = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      setUserListings(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setUserListings(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    )
  }

  if (loading) {
    return <LoadingSpinner text="جاري تحميل لوحة التحكم..." />
  }

  const filteredListings = userListings.filter(listing => {
    if (activeTab === 'marketplace') return listing.type === 'marketplace'
    if (activeTab === 'food') return listing.type === 'food'
    return true
  })

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=00695C&color=fff&size=80`}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-gold-500/30"
            />
            <div className="text-right">
              <h1 className="text-3xl font-bold text-navy-500 font-arabic">
                مرحباً، {user?.name}
              </h1>
              <p className="text-navy-500/70 font-arabic">
                لوحة التحكم الشخصية
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-navy-500/70 font-arabic">إجمالي الإعلانات</p>
                <p className="text-2xl font-bold text-navy-500">{stats.totalListings}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-navy-500/70 font-arabic">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold text-navy-500">{stats.totalViews}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-navy-500/70 font-arabic">الرسائل</p>
                <p className="text-2xl font-bold text-navy-500">{stats.totalMessages}</p>
              </div>
              <div className="bg-gold-100 p-3 rounded-full">
                <MessageCircle className="w-6 h-6 text-gold-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-navy-500/70 font-arabic">المفضلة</p>
                <p className="text-2xl font-bold text-navy-500">{stats.totalFavorites}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="bg-white rounded-lg shadow-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-reverse space-x-8 px-6">
              {[
                { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
                { id: 'marketplace', label: 'السوق', icon: ShoppingBag },
                { id: 'food', label: 'الطعام', icon: UtensilsCrossed },
                { id: 'favorites', label: 'المفضلة', icon: Heart }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm font-arabic transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-navy-500 font-arabic">آخر الإعلانات</h3>
                  <div className="flex gap-2">
                    <Link
                      to="/marketplace/create"
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors font-arabic text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      إعلان جديد
                    </Link>
                    <Link
                      to="/food/create"
                      className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg transition-colors font-arabic text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      طبق جديد
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userListings.slice(0, 4).map((listing) => (
                    <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex gap-4">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-navy-500 font-arabic line-clamp-1">
                            {listing.title}
                          </h4>
                          <p className="text-emerald-600 font-bold">{listing.price} جنيه</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {listing.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {listing.messages}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'marketplace' || activeTab === 'food') && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-navy-500 font-arabic">
                    {activeTab === 'marketplace' ? 'إعلانات السوق' : 'أطباق الطعام'}
                  </h3>
                  <Link
                    to={activeTab === 'marketplace' ? '/marketplace/create' : '/food/create'}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors font-arabic"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة جديد
                  </Link>
                </div>

                <div className="space-y-4">
                  {filteredListings.map((listing) => (
                    <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex gap-4">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-navy-500 font-arabic">
                              {listing.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-arabic ${
                                listing.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {listing.isActive ? 'نشط' : 'غير نشط'}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-emerald-600 font-bold mb-2">{listing.price} جنيه</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {listing.views} مشاهدة
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {listing.messages} رسالة
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(listing.createdAt).toLocaleDateString('ar-SA')}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Link
                              to={`/${listing.type}/item/${listing.id}`}
                              className="text-emerald-600 hover:text-emerald-800 text-sm font-arabic"
                            >
                              عرض
                            </Link>
                            <button
                              onClick={() => {/* Edit functionality */}}
                              className="text-blue-600 hover:text-blue-800 text-sm font-arabic"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => handleToggleStatus(listing.id)}
                              className="text-yellow-600 hover:text-yellow-800 text-sm font-arabic"
                            >
                              {listing.isActive ? 'إيقاف' : 'تفعيل'}
                            </button>
                            <button
                              onClick={() => handleDeleteListing(listing.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-arabic"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredListings.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">
                      {activeTab === 'marketplace' ? '🛍️' : '🍽️'}
                    </div>
                    <h3 className="text-xl font-semibold text-navy-500 mb-2 font-arabic">
                      لا توجد إعلانات
                    </h3>
                    <p className="text-navy-500/70 font-arabic mb-4">
                      ابدأ بإضافة {activeTab === 'marketplace' ? 'منتج' : 'طبق'} جديد
                    </p>
                    <Link
                      to={activeTab === 'marketplace' ? '/marketplace/create' : '/food/create'}
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors font-arabic"
                    >
                      <Plus className="w-5 h-5" />
                      إضافة الآن
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold text-navy-500 mb-2 font-arabic">
                  المفضلة
                </h3>
                <p className="text-navy-500/70 font-arabic">
                  ستظهر هنا العناصر التي أضفتها للمفضلة
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
