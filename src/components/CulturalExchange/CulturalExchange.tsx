import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Globe } from 'lucide-react'
import ProfileCard from './ProfileCard'

// Mock data for student profiles
const mockProfiles = [
  {
    id: '1',
    name: 'أحمد محمد',
    nationality: 'إندونيسيا',
    flag: '🇮🇩',
    languages: ['العربية', 'الإندونيسية', 'الإنجليزية'],
    skills: ['مطور مواقع', 'تصميم جرافيك', 'تدريس القرآن'],
    rating: 5,
    location: 'المبنى أ - الدور الثالث',
    bio: 'طالب دكتوراه في علوم الحاسوب، أحب تعليم البرمجة ومساعدة الطلاب الجدد في التأقلم مع الحياة في القاهرة.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: '2',
    name: 'فاطمة عبدالله',
    nationality: 'ماليزيا',
    flag: '🇲🇾',
    languages: ['العربية', 'الماليزية', 'الإنجليزية', 'الصينية'],
    skills: ['طبخ آسيوي', 'ترجمة', 'تصوير فوتوغرافي'],
    rating: 5,
    location: 'المبنى ب - الدور الثاني',
    bio: 'طالبة ماجستير في الدراسات الإسلامية، أحب الطبخ وتبادل الوصفات التقليدية من بلدي.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isOnline: false
  },
  {
    id: '3',
    name: 'عمر حسن',
    nationality: 'نيجيريا',
    flag: '🇳🇬',
    languages: ['العربية', 'الإنجليزية', 'الهوسا', 'اليوروبا'],
    skills: ['كتابة إبداعية', 'خطابة', 'تنظيم فعاليات'],
    rating: 4,
    location: 'المبنى ج - الدور الأول',
    bio: 'طالب ماجستير في الأدب العربي، أحب تنظيم الأمسيات الثقافية وورش الكتابة الإبداعية.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: '4',
    name: 'آمنة يوسف',
    nationality: 'الصومال',
    flag: '🇸🇴',
    languages: ['العربية', 'الصومالية', 'الإنجليزية'],
    skills: ['طب بديل', 'يوجا', 'استشارات نفسية'],
    rating: 5,
    location: 'المبنى د - الدور الثاني',
    bio: 'طالبة دكتوراه في الطب النفسي، أقدم جلسات استرخاء ودعم نفسي للطلاب.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  }
]

const CulturalExchange = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNationality, setSelectedNationality] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')

  const nationalities = [...new Set(mockProfiles.map(p => p.nationality))]
  const allSkills = [...new Set(mockProfiles.flatMap(p => p.skills))]

  const filteredProfiles = mockProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesNationality = !selectedNationality || profile.nationality === selectedNationality
    const matchesSkill = !selectedSkill || profile.skills.includes(selectedSkill)
    
    return matchesSearch && matchesNationality && matchesSkill
  })

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
            <button className="btn-primary flex items-center justify-center gap-2">
              <Filter className="w-5 h-5" />
              <span className="font-arabic">تطبيق الفلتر</span>
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-navy-500/70 font-arabic">
            تم العثور على {filteredProfiles.length} طالب
          </p>
        </motion.div>

        {/* Profile Cards Grid */}
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

        {/* No Results */}
        {filteredProfiles.length === 0 && (
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
