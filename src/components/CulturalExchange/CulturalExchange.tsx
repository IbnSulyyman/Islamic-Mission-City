import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Globe, Loader2 } from 'lucide-react'
import ProfileCard from './ProfileCard'
import { useStudentProfiles } from '../../hooks/useBackend'
import LoadingSpinner from '../Common/LoadingSpinner'

const CulturalExchange = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNationality, setSelectedNationality] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch profiles from backend with filters
  const {
    profiles,
    loading,
    error,
    totalCount,
    totalPages,
    refetch
  } = useStudentProfiles({
    nationality: selectedNationality || undefined,
    skill: selectedSkill || undefined,
    page: currentPage,
    limit: 12
  })

  // Get unique nationalities and skills for filters
  const nationalities = useMemo(() => {
    if (!profiles.length) return []
    return [...new Set(profiles.map(p => p.nationality))]
  }, [profiles])

  const allSkills = useMemo(() => {
    if (!profiles.length) return []
    return [...new Set(profiles.flatMap(p => p.skills))]
  }, [profiles])

  // Filter profiles by search term (client-side for better UX)
  const filteredProfiles = useMemo(() => {
    if (!searchTerm) return profiles

    return profiles.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesSearch
    })
  }, [profiles, searchTerm])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedNationality, selectedSkill])

  // Handle filter application
  const handleApplyFilters = () => {
    setCurrentPage(1)
    refetch()
  }

  return (
    <section id="cultural-exchange" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-emerald-500" />
            <Globe className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6 font-arabic">
            التبادل الثقافي ورفقاء اللغة
          </h2>
          <p className="text-lg text-navy-500/70 max-w-3xl mx-auto leading-relaxed font-arabic">
            تواصل مع طلاب من جميع أنحاء العالم، تعلم لغات جديدة، وتبادل المهارات والخبرات في بيئة ودية ومتنوعة.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-beige-500 rounded-lg p-6 mb-12 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
              {nationalities.map(nationality => (
                <option key={nationality} value={nationality}>{nationality}</option>
              ))}
            </select>

            {/* Skill Filter */}
            <select
              className="px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">جميع المهارات</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            {/* Filter Button */}
            <button
              className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={handleApplyFilters}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Filter className="w-5 h-5" />
              )}
              <span className="font-arabic">تطبيق الفلتر</span>
            </button>
          </div>
        </motion.div>

        {/* Results Count and Error Handling */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 font-arabic">
                حدث خطأ في تحميل البيانات: {error}
              </p>
              <button
                onClick={refetch}
                className="mt-2 text-red-600 hover:text-red-800 underline font-arabic"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <p className="text-navy-500/70 font-arabic">
              {loading ? 'جاري التحميل...' : `تم العثور على ${filteredProfiles.length} طالب من أصل ${totalCount}`}
            </p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        )}

        {/* Profile Cards Grid */}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProfileCard {...profile} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gold-500/20 rounded-lg disabled:opacity-50 hover:bg-gold-500/10 font-arabic"
              >
                السابق
              </button>

              <span className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-arabic">
                {currentPage} من {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gold-500/20 rounded-lg disabled:opacity-50 hover:bg-gold-500/10 font-arabic"
              >
                التالي
              </button>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && filteredProfiles.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-navy-500 mb-2 font-arabic">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-navy-500/70 font-arabic">
              جرب تغيير معايير البحث أو الفلتر
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default CulturalExchange
