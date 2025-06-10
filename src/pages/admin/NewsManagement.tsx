import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Calendar,
  User,
  Globe,
  Save,
  X
} from 'lucide-react'

// Mock data
const mockNews = [
  {
    id: '1',
    title: 'افتتاح مركز جديد للطلاب الدوليين',
    content: 'تم افتتاح مركز جديد لخدمة الطلاب الدوليين في الحرم الجامعي...',
    excerpt: 'مركز جديد يقدم خدمات شاملة للطلاب الدوليين',
    author: 'إدارة الجامعة',
    publishDate: '2024-01-15T10:00:00Z',
    status: 'published',
    category: 'أخبار الجامعة',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    views: 234,
    featured: true
  },
  {
    id: '2',
    title: 'ورشة عمل حول ريادة الأعمال',
    content: 'ستقام ورشة عمل متخصصة في ريادة الأعمال للطلاب...',
    excerpt: 'ورشة عمل تفاعلية لتعلم أساسيات ريادة الأعمال',
    author: 'د. أحمد محمد',
    publishDate: '2024-01-14T14:30:00Z',
    status: 'published',
    category: 'فعاليات',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    views: 156,
    featured: false
  },
  {
    id: '3',
    title: 'تحديث نظام التسجيل الإلكتروني',
    content: 'سيتم تحديث نظام التسجيل الإلكتروني لتحسين تجربة المستخدم...',
    excerpt: 'تحسينات جديدة على نظام التسجيل الإلكتروني',
    author: 'قسم تقنية المعلومات',
    publishDate: '2024-01-13T09:15:00Z',
    status: 'draft',
    category: 'تقنية',
    image: null,
    views: 0,
    featured: false
  }
]

const categories = ['الكل', 'أخبار الجامعة', 'فعاليات', 'تقنية', 'أكاديمي', 'رياضة']
const statuses = ['الكل', 'published', 'draft', 'archived']

const NewsManagement = () => {
  const [news, setNews] = useState(mockNews)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [selectedStatus, setSelectedStatus] = useState('الكل')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingNews, setEditingNews] = useState<any>(null)

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'الكل' || item.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
      setNews(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    setNews(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'منشور'
      case 'draft':
        return 'مسودة'
      case 'archived':
        return 'مؤرشف'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-navy-500 mb-2 font-arabic">
              إدارة الأخبار
            </h1>
            <p className="text-navy-500/70 font-arabic">
              إنشاء وإدارة أخبار المنصة
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-arabic transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            خبر جديد
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث في الأخبار..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'الكل' ? status : getStatusText(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* News Table */}
        <motion.div
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-arabic">
                    العنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-arabic">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-arabic">
                    الكاتب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-arabic">
                    تاريخ النشر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-arabic">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-arabic">
                    المشاهدات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-arabic">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover ml-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-navy-500 font-arabic">
                            {item.title}
                            {item.featured && (
                              <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                مميز
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 font-arabic">{item.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-arabic">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-900 font-arabic">{item.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-900 font-arabic">{formatDate(item.publishDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-sm rounded-full px-3 py-1 font-arabic ${getStatusColor(item.status)}`}
                      >
                        <option value="published">منشور</option>
                        <option value="draft">مسودة</option>
                        <option value="archived">مؤرشف</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-900">{item.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingNews(item)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2 font-arabic">
                لا توجد أخبار
              </h3>
              <p className="text-gray-500 font-arabic">
                جرب تغيير معايير البحث أو أنشئ خبراً جديداً
              </p>
            </div>
          )}
        </motion.div>

        {/* Create/Edit Modal */}
        {(showCreateModal || editingNews) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy-500 font-arabic">
                  {editingNews ? 'تعديل الخبر' : 'خبر جديد'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingNews(null)
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                    عنوان الخبر
                  </label>
                  <input
                    type="text"
                    defaultValue={editingNews?.title || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                    placeholder="اكتب عنوان الخبر..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                    الفئة
                  </label>
                  <select
                    defaultValue={editingNews?.category || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">
                    المحتوى
                  </label>
                  <textarea
                    rows={8}
                    defaultValue={editingNews?.content || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right resize-none"
                    placeholder="اكتب محتوى الخبر..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false)
                      setEditingNews(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-arabic"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-arabic flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingNews ? 'حفظ التغييرات' : 'نشر الخبر'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsManagement
