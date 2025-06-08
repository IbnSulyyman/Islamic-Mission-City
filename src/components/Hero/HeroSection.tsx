
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useAppStats } from '../../hooks/useBackend'

const HeroSection = () => {
  const { stats, loading: statsLoading } = useAppStats()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-gold-500/10"></div>
        
        {/* Floating Islamic Geometric Patterns */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-gold-500/20 rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-24 h-24 border-2 border-emerald-500/20 rotate-12"
          animate={{ rotate: [12, 372] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-navy-500/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy-500 mb-6 leading-tight font-arabic">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              مرحبًا بك في
            </motion.span>
            <br />
            <motion.span
              className="inline-block text-emerald-500"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              مدينة البحوث
            </motion.span>
            <br />
            <motion.span
              className="inline-block text-gold-500 text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              حيث يلتقي الطلاب والثقافات
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-navy-500/80 mb-8 max-w-3xl mx-auto leading-relaxed font-arabic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            انضم إلى مجتمعنا المتنوع من الطلاب الدوليين في القاهرة. 
            تبادل الثقافات، تسوق، تعلم، وكوّن صداقات تدوم مدى الحياة.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <button className="btn-primary text-lg px-8 py-4 flex items-center gap-3 group">
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-arabic">ابدأ الآن</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="btn-secondary text-lg px-8 py-4 font-arabic">
              تعرف على المجتمع
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2">
                {statsLoading ? '...' : `${stats?.studentsCount || 500}+`}
              </div>
              <div className="text-navy-500/70 font-arabic">طالب دولي</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-500 mb-2">
                {statsLoading ? '...' : `${stats?.countriesCount || 50}+`}
              </div>
              <div className="text-navy-500/70 font-arabic">دولة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-crimson-500 mb-2">
                {statsLoading ? '...' : `${stats?.itemsCount || 1000}+`}
              </div>
              <div className="text-navy-500/70 font-arabic">منتج في السوق</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-navy-500 mb-2">24/7</div>
              <div className="text-navy-500/70 font-arabic">دعم المجتمع</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-navy-500/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-navy-500/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
