import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Search, Plus, TrendingUp } from 'lucide-react'
import ItemCard from './ItemCard'

// Mock data for marketplace items
const mockItems = [
  {
    id: '1',
    title: 'لابتوب Dell XPS 13 مستعمل بحالة ممتازة',
    price: 15000,
    description: 'لابتوب Dell XPS 13 مستعمل لمدة سنة واحدة فقط، بحالة ممتازة جداً. مناسب للطلاب والمبرمجين. يأتي مع الشاحن الأصلي وحقيبة الحماية.',
    location: 'المبنى أ - الدور الثالث',
    category: 'إلكترونيات',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    seller: 'أحمد محمد',
    postedAt: 'منذ يومين',
    views: 45,
    isNegotiable: true
  },
  {
    id: '2',
    title: 'كتب طبية مستعملة - مجموعة كاملة',
    price: 800,
    description: 'مجموعة كتب طبية مستعملة في حالة جيدة جداً. تشمل كتب التشريح وعلم وظائف الأعضاء والأمراض الباطنة.',
    location: 'المبنى ب - الدور الأول',
    category: 'كتب ومراجع',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    seller: 'فاطمة عبدالله',
    postedAt: 'منذ 3 أيام',
    views: 23,
    isNegotiable: false
  },
  {
    id: '3',
    title: 'دراجة هوائية للبيع - حالة ممتازة',
    price: 1200,
    description: 'دراجة هوائية مستعملة بحالة ممتازة، مناسبة للتنقل داخل الحرم الجامعي والمدينة. تم صيانتها مؤخراً.',
    location: 'المبنى ج - موقف الدراجات',
    category: 'رياضة ولياقة',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    seller: 'عمر حسن',
    postedAt: 'منذ أسبوع',
    views: 67,
    isNegotiable: true
  },
  {
    id: '4',
    title: 'أدوات مطبخ كاملة للطلاب',
    price: 300,
    description: 'مجموعة أدوات مطبخ كاملة تشمل أواني الطبخ والأطباق والأكواب. مناسبة للطلاب الجدد.',
    location: 'المبنى د - الدور الثاني',
    category: 'أدوات منزلية',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    seller: 'آمنة يوسف',
    postedAt: 'منذ 4 أيام',
    views: 34,
    isNegotiable: true
  },
  {
    id: '5',
    title: 'ملابس شتوية - جاكيت وبلوفرات',
    price: 500,
    description: 'مجموعة ملابس شتوية تشمل جاكيت وبلوفرات بحالة جيدة جداً. مقاسات متنوعة.',
    location: 'المبنى أ - الدور الثاني',
    category: 'ملابس وأزياء',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    seller: 'سارة أحمد',
    postedAt: 'منذ 5 أيام',
    views: 28,
    isNegotiable: false
  }
]

const categories = ['جميع الفئات', 'إلكترونيات', 'كتب ومراجع', 'رياضة ولياقة', 'أدوات منزلية', 'ملابس وأزياء']

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('جميع الفئات')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('newest')

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'جميع الفئات' || item.category === selectedCategory
    const matchesPrice = (!priceRange.min || item.price >= parseInt(priceRange.min)) &&
                        (!priceRange.max || item.price <= parseInt(priceRange.max))
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <section id="marketplace" className="py-20 bg-beige-500">
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
            <ShoppingBag className="w-8 h-8 text-emerald-500" />
            <TrendingUp className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6 font-arabic">
            السوق الطلابي
          </h2>
          <p className="text-lg text-navy-500/70 max-w-3xl mx-auto leading-relaxed font-arabic">
            اشتري وبع كل ما تحتاجه من زملائك الطلاب. من الكتب والإلكترونيات إلى الأدوات المنزلية والملابس.
          </p>
        </motion.div>

        {/* Add Item Button */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="btn-secondary inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="font-arabic">أضف منتج جديد</span>
          </button>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white rounded-lg p-6 mb-12 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-500/50 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                className="w-full pr-10 pl-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="من"
                className="w-full px-3 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
              />
              <input
                type="number"
                placeholder="إلى"
                className="w-full px-3 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
              />
            </div>

            {/* Sort */}
            <select
              className="px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">الأحدث</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="popular">الأكثر مشاهدة</option>
            </select>
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
            تم العثور على {filteredItems.length} منتج
          </p>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ItemCard {...item} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-navy-500 mb-2 font-arabic">
              لم يتم العثور على منتجات
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

export default Marketplace
