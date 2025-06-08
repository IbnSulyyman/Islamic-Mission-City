import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Globe, MapPin, MessageCircle } from 'lucide-react'
import { useStudentProfiles } from '../hooks/useBackend'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNationality, setSelectedNationality] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const { profiles, loading, error, totalCount } = useStudentProfiles({
    nationality: selectedNationality,
    skill: selectedSkill,
    language: selectedLanguage,
    page: 1,
    limit: 20
  })

  // Filter profiles by search term locally
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    profile.bio.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleContact = (profile: any) => {
    const message = `السلام عليكم ${profile.name}، أود التواصل معك من خلال موقع مدينة البحوث.`
    const whatsappUrl = `https://wa.me/${profile.whatsappNumber?.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return <LoadingSpinner text="جاري تحميل ملفات الطلاب..." />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-500">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-navy-500 mb-4 font-arabic">
            حدث خطأ في تحميل البيانات
          </h1>
          <p className="text-navy-500/70 font-arabic">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-beige-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-emerald-500" />
            <Globe className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6 font-arabic">
            دليل الطلاب
          </h1>
          <p className="text-lg text-navy-500/70 max-w-3xl mx-auto leading-relaxed font-arabic">
            تواصل مع زملائك الطلاب من جميع أنحاء العالم، تعلم لغات جديدة، وتبادل المهارات والخبرات.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white rounded-lg p-6 mb-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-500/50 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث بالاسم أو المهارة..."
                className="w-full pr-10 pl-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Nationality Filter */}
            <select
              className="px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
              value={selectedNationality}
              onChange={(e) => setSelectedNationality(e.target.value)}
            >
              <option value="">جميع الجنسيات</option>
              <option value="إندونيسيا">إندونيسيا</option>
              <option value="ماليزيا">ماليزيا</option>
              <option value="نيجيريا">نيجيريا</option>
              <option value="الصومال">الصومال</option>
              <option value="بنغلاديش">بنغلاديش</option>
              <option value="باكستان">باكستان</option>
            </select>

            {/* Language Filter */}
            <select
              className="px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">جميع اللغات</option>
              <option value="العربية">العربية</option>
              <option value="الإنجليزية">الإنجليزية</option>
              <option value="الإندونيسية">الإندونيسية</option>
              <option value="الماليزية">الماليزية</option>
              <option value="الأردية">الأردية</option>
              <option value="البنغالية">البنغالية</option>
            </select>

            {/* Skill Filter */}
            <select
              className="px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">جميع المهارات</option>
              <option value="مطور مواقع">مطور مواقع</option>
              <option value="تصميم جرافيك">تصميم جرافيك</option>
              <option value="ترجمة">ترجمة</option>
              <option value="تدريس">تدريس</option>
              <option value="كتابة إبداعية">كتابة إبداعية</option>
              <option value="طبخ">طبخ</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-navy-500/70 font-arabic">
            تم العثور على {filteredProfiles.length} من أصل {totalCount} طالب
          </div>
        </motion.div>

        {/* Students Grid */}
        {filteredProfiles.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Profile Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=00695C&color=fff&size=64`}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/30"
                      />
                      {profile.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-navy-500 font-arabic">{profile.name}</h3>
                        <span className="text-2xl">{profile.flag}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-navy-500/70 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-arabic">{profile.nationality}</span>
                        <span className="text-gold-500">•</span>
                        <span className="font-arabic">{profile.location}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < profile.rating ? 'bg-gold-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-navy-500/70 mr-2">({profile.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  {/* Bio */}
                  <p className="text-navy-500/80 text-sm mb-4 leading-relaxed font-arabic line-clamp-3">
                    {profile.bio}
                  </p>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-navy-500 mb-2 font-arabic">اللغات:</div>
                    <div className="flex flex-wrap gap-1">
                      {profile.languages.slice(0, 3).map((lang, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full font-arabic"
                        >
                          {lang}
                        </span>
                      ))}
                      {profile.languages.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{profile.languages.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-navy-500 mb-2 font-arabic">المهارات:</div>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gold-50 text-gold-600 text-xs rounded-full font-arabic"
                        >
                          {skill}
                        </span>
                      ))}
                      {profile.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{profile.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button
                    onClick={() => handleContact(profile)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-arabic"
                  >
                    <MessageCircle className="w-4 h-4" />
                    تواصل معي
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-navy-500 mb-2 font-arabic">
              لم يتم العثور على طلاب
            </h3>
            <p className="text-navy-500/70 font-arabic">
              جرب تغيير معايير البحث أو الفلتر
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredProfiles.length > 0 && filteredProfiles.length < totalCount && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-arabic transition-colors">
              عرض المزيد من الطلاب
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default StudentsPage
