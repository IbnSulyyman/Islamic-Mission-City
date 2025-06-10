import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Check, 
  X, 
  Filter,
  MoreVertical,
  Heart,
  MessageCircle,
  Users,
  Calendar,
  BookOpen,
  Star,
  Settings
} from 'lucide-react'

// Mock data
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    title: 'إعجاب جديد',
    message: 'أعجب أحمد محمد بمنشورك "تجربتي في تعلم البرمجة"',
    user: {
      name: 'أحمد محمد',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      nationality: '🇪🇬'
    },
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
    actionUrl: '/post/1'
  },
  {
    id: '2',
    type: 'comment',
    title: 'تعليق جديد',
    message: 'علقت فاطمة أحمد على منشورك: "نصائح رائعة! شكراً لك على المشاركة"',
    user: {
      name: 'فاطمة أحمد',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      nationality: '🇸🇦'
    },
    timestamp: '2024-01-15T09:15:00Z',
    isRead: false,
    actionUrl: '/post/1#comments'
  },
  {
    id: '3',
    type: 'group',
    title: 'دعوة لمجموعة دراسة',
    message: 'دعاك محمد علي للانضمام إلى مجموعة "دراسة الرياضيات المتقدمة"',
    user: {
      name: 'محمد علي',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      nationality: '🇯🇴'
    },
    timestamp: '2024-01-14T16:45:00Z',
    isRead: true,
    actionUrl: '/study-groups/1'
  },
  {
    id: '4',
    type: 'event',
    title: 'تذكير بفعالية',
    message: 'ورشة عمل "مقدمة في الذكاء الاصطناعي" ستبدأ غداً في الساعة 2:00 ظهراً',
    timestamp: '2024-01-14T14:20:00Z',
    isRead: true,
    actionUrl: '/events/1'
  },
  {
    id: '5',
    type: 'achievement',
    title: 'إنجاز جديد',
    message: 'تهانينا! حصلت على شارة "المساهم النشط" لمشاركتك الفعالة في المجتمع',
    timestamp: '2024-01-13T11:30:00Z',
    isRead: true,
    actionUrl: '/profile'
  }
]

const notificationTypes = [
  { value: 'all', label: 'الكل', icon: Bell },
  { value: 'like', label: 'الإعجابات', icon: Heart },
  { value: 'comment', label: 'التعليقات', icon: MessageCircle },
  { value: 'group', label: 'المجموعات', icon: Users },
  { value: 'event', label: 'الفعاليات', icon: Calendar },
  { value: 'achievement', label: 'الإنجازات', icon: Star }
]

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedType, setSelectedType] = useState('all')
  const [showSettings, setShowSettings] = useState(false)

  const filteredNotifications = notifications.filter(notification => 
    selectedType === 'all' || notification.type === selectedType
  )

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'منذ قليل'
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `منذ ${diffInDays} يوم`
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case 'group':
        return <Users className="w-5 h-5 text-green-500" />
      case 'event':
        return <Calendar className="w-5 h-5 text-purple-500" />
      case 'achievement':
        return <Star className="w-5 h-5 text-yellow-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-navy-500 mb-2 font-arabic">
              الإشعارات
            </h1>
            <p className="text-navy-500/70 font-arabic">
              {unreadCount > 0 ? `لديك ${unreadCount} إشعار غير مقروء` : 'جميع الإشعارات مقروءة'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-arabic"
              >
                <Check className="w-4 h-4" />
                قراءة الكل
              </button>
            )}
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Settings className="w-5 h-5 text-navy-500" />
            </button>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2">
            {notificationTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-arabic ${
                    selectedType === type.value
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                !notification.isRead ? 'border-r-4 border-emerald-500' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Notification Icon */}
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* User Avatar (if applicable) */}
                  {notification.user && (
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  )}

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-navy-500 mb-1 font-arabic">
                          {notification.title}
                        </h3>
                        <p className="text-navy-500/70 font-arabic leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {notification.user && (
                            <span className="text-lg">{notification.user.nationality}</span>
                          )}
                          <span className="text-sm text-navy-500/50 font-arabic">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-emerald-500 hover:bg-emerald-50 rounded transition-colors"
                            title="وضع علامة كمقروء"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="حذف الإشعار"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        <button className="p-1 text-gray-400 hover:bg-gray-50 rounded transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2 font-arabic">
              لا توجد إشعارات
            </h3>
            <p className="text-gray-500 font-arabic">
              ستظهر إشعاراتك هنا عند وصولها
            </p>
          </motion.div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy-500 font-arabic">
                  إعدادات الإشعارات
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {notificationTypes.slice(1).map((type) => {
                  const Icon = type.icon
                  return (
                    <div key={type.value} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-500" />
                        <span className="font-arabic">{type.label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-arabic"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-arabic"
                >
                  حفظ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
