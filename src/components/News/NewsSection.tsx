
import { motion } from 'framer-motion'
import { Newspaper, AlertCircle, Calendar, Clock, Pin } from 'lucide-react'

// Mock news data
const newsItems = [
  {
    id: '1',
    type: 'announcement',
    title: 'انقطاع المياه غداً من الساعة 10 صباحاً حتى 4 عصراً',
    content: 'سيتم قطع المياه عن جميع المباني غداً الثلاثاء للصيانة الدورية. يرجى تخزين المياه مسبقاً.',
    date: '2024-01-15',
    time: '09:30',
    priority: 'high',
    building: 'جميع المباني'
  },
  {
    id: '2',
    type: 'event',
    title: 'أمسية ثقافية: "ليلة التراث العربي"',
    content: 'ندعوكم لحضور أمسية ثقافية مميزة تتضمن شعر وموسيقى تراثية من مختلف البلدان العربية.',
    date: '2024-01-18',
    time: '19:00',
    priority: 'medium',
    building: 'القاعة الكبرى'
  },
  {
    id: '3',
    type: 'lost-found',
    title: 'مفقود: محفظة جلدية بنية اللون',
    content: 'فُقدت محفظة جلدية بنية تحتوي على بطاقات شخصية ومبلغ من المال. من يجدها يرجى التواصل.',
    date: '2024-01-14',
    time: '14:20',
    priority: 'medium',
    building: 'المبنى أ'
  },
  {
    id: '4',
    type: 'rule',
    title: 'قواعد جديدة لاستخدام المطبخ المشترك',
    content: 'تم وضع قواعد جديدة لاستخدام المطبخ المشترك لضمان النظافة والتنظيم. يرجى الاطلاع عليها.',
    date: '2024-01-12',
    time: '16:45',
    priority: 'low',
    building: 'جميع المباني'
  },
  {
    id: '5',
    type: 'maintenance',
    title: 'صيانة المصاعد في المبنى ب',
    content: 'سيتم إجراء صيانة دورية للمصاعد في المبنى ب يوم الجمعة. يرجى استخدام السلالم.',
    date: '2024-01-19',
    time: '08:00',
    priority: 'medium',
    building: 'المبنى ب'
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'announcement': return AlertCircle
    case 'event': return Calendar
    case 'lost-found': return Pin
    case 'rule': return Newspaper
    case 'maintenance': return Clock
    default: return Newspaper
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'announcement': return 'text-crimson-500 bg-crimson-50'
    case 'event': return 'text-emerald-500 bg-emerald-50'
    case 'lost-found': return 'text-gold-500 bg-gold-50'
    case 'rule': return 'text-navy-500 bg-navy-50'
    case 'maintenance': return 'text-orange-500 bg-orange-50'
    default: return 'text-navy-500 bg-navy-50'
  }
}

const getPriorityBorder = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-r-4 border-r-crimson-500'
    case 'medium': return 'border-r-4 border-r-gold-500'
    case 'low': return 'border-r-4 border-r-emerald-500'
    default: return 'border-r-4 border-r-gray-300'
  }
}

const NewsSection = () => {
  return (
    <section id="news" className="py-20 bg-white">
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
            <Newspaper className="w-8 h-8 text-emerald-500" />
            <AlertCircle className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6 font-arabic">
            الأخبار والإعلانات
          </h2>
          <p className="text-lg text-navy-500/70 max-w-3xl mx-auto leading-relaxed font-arabic">
            ابق على اطلاع بآخر الأخبار والإعلانات المهمة، من صيانة المرافق إلى الفعاليات الثقافية والقواعد الجديدة.
          </p>
        </motion.div>

        {/* News Ticker for High Priority */}
        <motion.div
          className="bg-crimson-500 text-white p-4 rounded-lg mb-12 overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div className="font-arabic font-medium">
              إعلان عاجل: {newsItems.find(item => item.priority === 'high')?.title}
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {newsItems.map((item, index) => {
            const IconComponent = getTypeIcon(item.type)
            
            return (
              <motion.div
                key={item.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 ${getPriorityBorder(item.priority)}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-full ${getTypeColor(item.type)}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy-500 mb-2 font-arabic leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-navy-500/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-arabic">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-navy-500/80 leading-relaxed mb-4 font-arabic">
                  {item.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-navy-500/70">
                    <Pin className="w-4 h-4 text-gold-500" />
                    <span className="font-arabic">{item.building}</span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'high' ? 'bg-crimson-100 text-crimson-600' :
                    item.priority === 'medium' ? 'bg-gold-100 text-gold-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    <span className="font-arabic">
                      {item.priority === 'high' ? 'عاجل' :
                       item.priority === 'medium' ? 'مهم' : 'عادي'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="btn-secondary">
            <span className="font-arabic">عرض المزيد من الأخبار</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsSection
