import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  Clock, 
  MapPin, 
  Calendar,
  Star,
  MessageCircle
} from 'lucide-react'
import { useAuthContext } from '../contexts/AuthContext'

// Mock data
const mockStudyGroups = [
  {
    id: '1',
    name: 'مجموعة دراسة الرياضيات المتقدمة',
    description: 'مجموعة لدراسة الرياضيات المتقدمة والتحضير للامتحانات النهائية',
    subject: 'رياضيات',
    level: 'متقدم',
    members: 12,
    maxMembers: 15,
    meetingTime: 'الأحد والثلاثاء 7:00 مساءً',
    location: 'مكتبة الجامعة - الطابق الثاني',
    admin: {
      name: 'أحمد محمد',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      nationality: '🇪🇬'
    },
    tags: ['رياضيات', 'امتحانات', 'دراسة جماعية'],
    rating: 4.8,
    isJoined: false,
    nextMeeting: '2024-01-21T19:00:00Z'
  },
  {
    id: '2',
    name: 'نادي البرمجة والتطوير',
    description: 'مجموعة لتعلم البرمجة ومشاركة المشاريع والخبرات التقنية',
    subject: 'علوم حاسوب',
    level: 'مبتدئ إلى متوسط',
    members: 25,
    maxMembers: 30,
    meetingTime: 'السبت 2:00 ظهراً',
    location: 'مختبر الحاسوب - مبنى الهندسة',
    admin: {
      name: 'فاطمة أحمد',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      nationality: '🇸🇦'
    },
    tags: ['برمجة', 'تطوير', 'مشاريع'],
    rating: 4.9,
    isJoined: true,
    nextMeeting: '2024-01-20T14:00:00Z'
  },
  {
    id: '3',
    name: 'مجموعة اللغة الإنجليزية للأعمال',
    description: 'تحسين مهارات اللغة الإنجليزية للتواصل في بيئة العمل',
    subject: 'لغة إنجليزية',
    level: 'متوسط',
    members: 8,
    maxMembers: 12,
    meetingTime: 'الخميس 6:00 مساءً',
    location: 'قاعة المؤتمرات - مبنى الإدارة',
    admin: {
      name: 'محمد علي',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      nationality: '🇯🇴'
    },
    tags: ['إنجليزية', 'أعمال', 'تواصل'],
    rating: 4.6,
    isJoined: false,
    nextMeeting: '2024-01-18T18:00:00Z'
  }
]

const subjects = ['الكل', 'رياضيات', 'علوم حاسوب', 'لغة إنجليزية', 'فيزياء', 'كيمياء', 'أحياء']
const levels = ['الكل', 'مبتدئ', 'متوسط', 'متقدم']

const StudyGroupsPage = () => {
  const { user } = useAuthContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('الكل')
  const [selectedLevel, setSelectedLevel] = useState('الكل')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredGroups = mockStudyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'الكل' || group.subject === selectedSubject
    const matchesLevel = selectedLevel === 'الكل' || group.level.includes(selectedLevel)
    
    return matchesSearch && matchesSubject && matchesLevel
  })

  const handleJoinGroup = (groupId: string) => {
    // Handle join group logic
    console.log('Joining group:', groupId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
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
            مجموعات الدراسة
          </h1>
          <p className="text-xl text-navy-500/70 font-arabic">
            انضم إلى مجموعات الدراسة أو أنشئ مجموعتك الخاصة
          </p>
        </motion.div>

        {/* Search and Filters */}
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
                  placeholder="ابحث عن مجموعة دراسة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-arabic text-right"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Create Group Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-arabic transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إنشاء مجموعة جديدة
            </button>
          </div>
        </motion.div>

        {/* Study Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Group Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-emerald-600 font-arabic">{group.subject}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{group.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-navy-500 mb-2 font-arabic">
                  {group.name}
                </h3>
                
                <p className="text-navy-500/70 text-sm font-arabic leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Group Details */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <Users className="w-4 h-4" />
                    <span className="font-arabic">{group.members}/{group.maxMembers} عضو</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <Clock className="w-4 h-4" />
                    <span className="font-arabic">{group.meetingTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <MapPin className="w-4 h-4" />
                    <span className="font-arabic">{group.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <Calendar className="w-4 h-4" />
                    <span className="font-arabic">الاجتماع القادم: {formatDate(group.nextMeeting)}</span>
                  </div>
                </div>

                {/* Admin Info */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={group.admin.avatar}
                    alt={group.admin.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy-500 font-arabic">{group.admin.name}</span>
                      <span className="text-sm">{group.admin.nationality}</span>
                    </div>
                    <span className="text-xs text-navy-500/60 font-arabic">مدير المجموعة</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map((tag, tagIndex) => (
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
                  {group.isJoined ? (
                    <button className="flex-1 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-arabic flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" />
                      عضو في المجموعة
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-arabic transition-colors"
                    >
                      انضم للمجموعة
                    </button>
                  )}
                  
                  <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2 font-arabic">
              لا توجد مجموعات دراسة
            </h3>
            <p className="text-gray-500 font-arabic">
              جرب تغيير معايير البحث أو أنشئ مجموعة جديدة
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default StudyGroupsPage
