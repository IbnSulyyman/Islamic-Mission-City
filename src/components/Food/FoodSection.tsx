import { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Clock, Star, MessageCircle, ChefHat, MapPin } from 'lucide-react'

// Mock food data
const foodItems = [
  {
    id: '1',
    name: 'جولوف رايس نيجيري أصلي',
    chef: 'فاطمة عبدالله',
    nationality: '🇳🇬',
    price: 30,
    description: 'أرز جولوف نيجيري تقليدي مطبوخ بالطماطم والتوابل الأفريقية الأصلية مع الدجاج والخضار.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
    rating: 4.8,
    prepTime: '45 دقيقة',
    servings: 4,
    location: 'المبنى أ - الدور الثاني',
    available: true,
    tags: ['حلال', 'حار', 'أفريقي'],
    phone: '+201234567890'
  },
  {
    id: '2',
    name: 'ناسي لماك الماليزي',
    chef: 'أحمد حسن',
    nationality: '🇲🇾',
    price: 25,
    description: 'أرز جوز الهند الماليزي التقليدي مع السمبل والخيار والبيض المسلوق والفول السوداني.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    rating: 4.9,
    prepTime: '30 دقيقة',
    servings: 2,
    location: 'المبنى ب - الدور الأول',
    available: true,
    tags: ['حلال', 'حار', 'آسيوي'],
    phone: '+201234567891'
  },
  {
    id: '3',
    name: 'كباب هندي بالتوابل',
    chef: 'عائشة محمد',
    nationality: '🇮🇳',
    price: 35,
    description: 'كباب هندي مشوي بالتوابل الهندية الأصلية مع الأرز البسمتي والسلطة.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    rating: 4.7,
    prepTime: '60 دقيقة',
    servings: 3,
    location: 'المبنى ج - الدور الثالث',
    available: false,
    tags: ['حلال', 'حار', 'هندي'],
    phone: '+201234567892'
  },
  {
    id: '4',
    name: 'مندي يمني أصلي',
    chef: 'سالم العبسي',
    nationality: '🇾🇪',
    price: 40,
    description: 'مندي يمني تقليدي مطبوخ في التنور مع اللحم والأرز البسمتي والسلطة اليمنية.',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
    rating: 5.0,
    prepTime: '90 دقيقة',
    servings: 6,
    location: 'المبنى د - الدور الأول',
    available: true,
    tags: ['حلال', 'عربي', 'تقليدي'],
    phone: '+201234567893'
  }
]

const FoodSection = () => {

  const handleOrder = (food: typeof foodItems[0]) => {
    const message = `السلام عليكم، أريد طلب ${food.name} من ${food.chef} بسعر ${food.price} جنيه.`
    const whatsappUrl = `https://wa.me/${food.phone.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
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

        {/* Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {foodItems.map((food, index) => (
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
