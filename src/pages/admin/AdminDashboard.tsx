import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Settings,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

// Mock data
const dashboardStats = {
  totalUsers: 1247,
  totalPosts: 342,
  totalEvents: 28,
  totalGroups: 15,
  activeUsers: 89,
  pendingReports: 3
}

const recentActivities = [
  {
    id: '1',
    type: 'user_registration',
    message: 'مستخدم جديد: أحمد محمد انضم للمنصة',
    timestamp: '2024-01-15T10:30:00Z',
    icon: Users,
    color: 'text-green-500'
  },
  {
    id: '2',
    type: 'post_created',
    message: 'منشور جديد: "تجربتي في تعلم البرمجة"',
    timestamp: '2024-01-15T09:15:00Z',
    icon: FileText,
    color: 'text-blue-500'
  },
  {
    id: '3',
    type: 'event_created',
    message: 'فعالية جديدة: ورشة عمل الذكاء الاصطناعي',
    timestamp: '2024-01-15T08:45:00Z',
    icon: Calendar,
    color: 'text-purple-500'
  },
  {
    id: '4',
    type: 'report',
    message: 'تقرير جديد: محتوى غير مناسب',
    timestamp: '2024-01-14T16:20:00Z',
    icon: AlertCircle,
    color: 'text-red-500'
  }
]

const quickActions = [
  {
    title: 'إدارة المستخدمين',
    description: 'عرض وإدارة حسابات المستخدمين',
    icon: Users,
    color: 'bg-blue-500',
    link: '/admin/users'
  },
  {
    title: 'إدارة المحتوى',
    description: 'مراجعة المنشورات والتعليقات',
    icon: FileText,
    color: 'bg-green-500',
    link: '/admin/content'
  },
  {
    title: 'إدارة الفعاليات',
    description: 'إنشاء وإدارة الفعاليات',
    icon: Calendar,
    color: 'bg-purple-500',
    link: '/admin/events'
  },
  {
    title: 'إدارة الأخبار',
    description: 'نشر وتحديث الأخبار',
    icon: MessageSquare,
    color: 'bg-orange-500',
    link: '/admin/news'
  },
  {
    title: 'التقارير والإحصائيات',
    description: 'عرض تقارير مفصلة',
    icon: BarChart3,
    color: 'bg-indigo-500',
    link: '/admin/reports'
  },
  {
    title: 'الإعدادات',
    description: 'إعدادات النظام العامة',
    icon: Settings,
    color: 'bg-gray-500',
    link: '/admin/settings'
  }
]

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('week')

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('ar-SA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-navy-500 mb-2 font-arabic">
            لوحة التحكم الإدارية
          </h1>
          <p className="text-navy-500/70 font-arabic">
            مرحباً بك في لوحة التحكم الإدارية لمنصة مدينة البعثة الإسلامية
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-arabic">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-navy-500">{dashboardStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-arabic">إجمالي المنشورات</p>
                <p className="text-2xl font-bold text-navy-500">{dashboardStats.totalPosts}</p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-arabic">الفعاليات</p>
                <p className="text-2xl font-bold text-navy-500">{dashboardStats.totalEvents}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-arabic">مجموعات الدراسة</p>
                <p className="text-2xl font-bold text-navy-500">{dashboardStats.totalGroups}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-arabic">المستخدمون النشطون</p>
                <p className="text-2xl font-bold text-navy-500">{dashboardStats.activeUsers}</p>
              </div>
              <Activity className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-arabic">التقارير المعلقة</p>
                <p className="text-2xl font-bold text-navy-500">{dashboardStats.pendingReports}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-navy-500 mb-6 font-arabic">
                الإجراءات السريعة
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      to={action.link}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy-500 font-arabic">{action.title}</h3>
                          <p className="text-sm text-gray-600 font-arabic">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy-500 font-arabic">
                  النشاطات الأخيرة
                </h2>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 font-arabic"
                >
                  <option value="day">اليوم</option>
                  <option value="week">هذا الأسبوع</option>
                  <option value="month">هذا الشهر</option>
                </select>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-navy-500 font-arabic">{activity.message}</p>
                        <p className="text-xs text-gray-500 font-arabic">{formatTime(activity.timestamp)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/admin/activities"
                  className="text-emerald-500 hover:text-emerald-600 text-sm font-arabic"
                >
                  عرض جميع النشاطات
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* User Growth Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-500 font-arabic">
                نمو المستخدمين
              </h2>
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-arabic">مخطط نمو المستخدمين</p>
                <p className="text-sm text-gray-400 font-arabic">سيتم إضافة المخططات قريباً</p>
              </div>
            </div>
          </div>

          {/* Content Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-500 font-arabic">
                توزيع المحتوى
              </h2>
              <PieChart className="w-6 h-6 text-blue-500" />
            </div>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-arabic">توزيع أنواع المحتوى</p>
                <p className="text-sm text-gray-400 font-arabic">سيتم إضافة المخططات قريباً</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
