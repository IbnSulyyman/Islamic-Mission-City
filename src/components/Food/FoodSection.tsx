import { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Clock, Star, MessageCircle, ChefHat, MapPin, Loader2 } from 'lucide-react'
import { useFoodListings } from '../../hooks/useBackend'
import LoadingSpinner from '../Common/LoadingSpinner'

const FoodSection = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch food listings from backend
  const {
    listings,
    loading,
    error,
    totalPages,
    refetch
  } = useFoodListings({
    availableOnly: true,
    page: currentPage,
    limit: 8
  })

  const handleOrder = (food: any) => {
    const message = `السلام عليكم، أريد طلب ${food.name} من ${food.chef} بسعر ${food.price} جنيه.`
    const whatsappUrl = `https://wa.me/${food.chefPhone?.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Handle load more
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <section id="food" className="py-20 bg-beige-500">
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
            <UtensilsCrossed className="w-8 h-8 text-emerald-500" />
            <ChefHat className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6 font-arabic">
            طعام اليوم
          </h2>
          <p className="text-lg text-navy-500/70 max-w-3xl mx-auto leading-relaxed font-arabic">
            اكتشف أشهى الأطباق التقليدية من جميع أنحاء العالم، مطبوخة بحب من زملائك الطلاب.
          </p>
        </motion.div>

        {/* Error Handling */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-red-600 font-arabic">
              حدث خطأ في تحميل قائمة الطعام: {error}
            </p>
            <button
              onClick={refetch}
              className="mt-2 text-red-600 hover:text-red-800 underline font-arabic"
            >
              إعادة المحاولة
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        )}

        {/* Food Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {listings.map((food, index) => (
            <motion.div
              key={food.id}
              className="card-islamic hover:scale-105 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="relative mb-6 -mx-6 -mt-6">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Availability Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium font-arabic ${
                  food.available 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {food.available ? 'متوفر الآن' : 'غير متوفر'}
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-gold-500" />
                  <span>{food.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Title and Price */}
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-navy-500 font-arabic mb-2">
                      {food.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-navy-500/70">
                      <ChefHat className="w-4 h-4 text-gold-500" />
                      <span className="font-arabic">{food.chef}</span>
                      <span className="text-lg">{food.nationality}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-500">
                      {food.price} جنيه
                    </div>
                    <div className="text-sm text-navy-500/70 font-arabic">
                      {food.servings} أشخاص
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-navy-500/80 leading-relaxed font-arabic">
                  {food.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {food.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gold-50 text-gold-600 text-xs rounded-full font-arabic"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-navy-500/70">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span className="font-arabic">وقت التحضير: {food.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <span className="font-arabic">{food.location}</span>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => handleOrder(food)}
                  disabled={!food.available}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    food.available
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-arabic">
                    {food.available ? 'اطلب عبر واتساب' : 'غير متوفر حالياً'}
                  </span>
                </button>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && currentPage < totalPages && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : null}
              <span className="font-arabic">عرض المزيد من الأطباق</span>
            </button>
          </motion.div>
        )}

        {/* No Food Message */}
        {!loading && !error && listings.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-navy-500 mb-2 font-arabic">
              لا توجد أطباق متوفرة حالياً
            </h3>
            <p className="text-navy-500/70 font-arabic">
              سيتم عرض الأطباق المتوفرة هنا عند إضافتها
            </p>
          </motion.div>
        )}

        {/* Add Your Food */}
        <motion.div
          className="text-center mt-16 p-8 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ChefHat className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-navy-500 mb-4 font-arabic">
            هل تجيد الطبخ؟
          </h3>
          <p className="text-navy-500/70 mb-6 font-arabic">
            شارك أطباقك المفضلة مع زملائك واكسب دخل إضافي
          </p>
          <button className="btn-secondary">
            <span className="font-arabic">أضف طبقك المميز</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FoodSection
