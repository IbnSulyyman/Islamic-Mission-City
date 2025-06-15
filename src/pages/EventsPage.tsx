import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Plus,
  Star,
  Share2,
  Bookmark
} from 'lucide-react'

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'ورشة عمل: مقدمة في الذكاء الاصطناعي',
    description: 'ورشة عمل تفاعلية لتعلم أساسيات الذكاء الاصطناعي وتطبيقاته العملية',
    date: '2024-01-25T14:00:00Z',
    endDate: '2024-01-25T17:00:00Z',
    location: 'قاعة المؤتمرات الكبرى - مبنى الهندسة',
    organizer: {
      name: 'نادي الطلاب التقني',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
      type: 'نادي طلابي'
    },
    category: 'تقنية',
    attendees: 45,
    maxAttendees: 60,
    price: 'مجاني',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    tags: ['ذكاء اصطناعي', 'تقنية', 'ورشة عمل'],
    rating: 4.8,
    isRegistered: false,
    isFavorite: false
  },
  {
    id: '2',
    title: 'مهرجان الثقافات العالمية',
    description: 'احتفال بالتنوع الثقافي مع عروض فولكلورية وأطعمة تقليدية من مختلف البلدان',
    date: '2024-01-28T18:00:00Z',
    endDate: '2024-01-28T22:00:00Z',
    location: 'الساحة الرئيسية للجامعة',
    organizer: {
      name: 'اتحاد الطلاب الدوليين',
      avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop',
      type: 'منظمة طلابية'
    },
    category: 'ثقافي',
    attendees: 120,
    maxAttendees: 200,
    price: 'مجاني',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
    tags: ['ثقافة', 'تنوع', 'فعالية اجتماعية'],
    rating: 4.9,
    isRegistered: true,
    isFavorite: true
  },
  {
    id: '3',
    title: 'محاضرة: ريادة الأعمال في العصر الرقمي',
    description: 'محاضرة ملهمة حول كيفية بناء شركة ناشئة ناجحة في العصر الرقمي',
    date: '2024-01-30T19:00:00Z',
    endDate: '2024-01-30T21:00:00Z',
    location: 'مدرج الاقتصاد - مبنى إدارة الأعمال',
    organizer: {
      name: 'د. أحمد الريادي',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      type: 'أستاذ جامعي'
    },
    category: 'أعمال',
    attendees: 35,
    maxAttendees: 80,
    price: '20 رنجت',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    tags: ['ريادة أعمال', 'تقنية', 'محاضرة'],
    rating: 4.7,
    isRegistered: false,
    isFavorite: false
  }
]

const categories = ['الكل', 'تقنية', 'ثقافي', 'أعمال', 'رياضي', 'أكاديمي', 'اجتماعي']

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [, setShowCreateModal] = useState(false)

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'الكل' || event.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleRegister = (eventId: string) => {
    console.log('Registering for event:', eventId)
  }

  const handleFavorite = (eventId: string) => {
    console.log('Adding to favorites:', eventId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-navy-500 mb-4 font-arabic">
            الفعاليات والأنشطة
          </h1>
          <p className="text-xl text-navy-500/70 font-arabic">
            اكتشف الفعاليات المثيرة واشترك في الأنشطة الجامعية
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث عن فعالية..."
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
          </div>

          {/* Create Event Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-arabic transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إنشاء فعالية جديدة
            </button>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-arabic">
                    {event.category}
                  </span>
                </div>
                <button
                  onClick={() => handleFavorite(event.id)}
                  className={`absolute top-4 left-4 p-2 rounded-full transition-colors ${
                    event.isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${event.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-navy-500 mb-2 font-arabic">
                  {event.title}
                </h3>
                
                <p className="text-navy-500/70 text-sm font-arabic leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <Calendar className="w-4 h-4" />
                    <span className="font-arabic">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <Clock className="w-4 h-4" />
                    <span className="font-arabic">
                      {formatTime(event.date)} - {formatTime(event.endDate)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <MapPin className="w-4 h-4" />
                    <span className="font-arabic">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <Users className="w-4 h-4" />
                    <span className="font-arabic">{event.attendees}/{event.maxAttendees} مشارك</span>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="text-sm font-semibold text-navy-500 font-arabic">{event.organizer.name}</span>
                    <div className="text-xs text-navy-500/60 font-arabic">{event.organizer.type}</div>
                  </div>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{event.rating}</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-600 font-arabic">
                    {event.price}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-arabic"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {event.isRegistered ? (
                    <button className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-arabic">
                      مسجل
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(event.id)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-arabic transition-colors"
                    >
                      تسجيل
                    </button>
                  )}
                  
                  <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2 font-arabic">
              لا توجد فعاليات
            </h3>
            <p className="text-gray-500 font-arabic">
              جرب تغيير معايير البحث أو أنشئ فعالية جديدة
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default EventsPage
