import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Search, Plus, TrendingUp, Loader2 } from 'lucide-react'
import ItemCard from './ItemCard'
import { useMarketplace } from '../../hooks/useBackend'
import LoadingSpinner from '../Common/LoadingSpinner'

const categories = ['جميع الفئات', 'إلكترونيات', 'كتب ومراجع', 'رياضة ولياقة', 'أدوات منزلية', 'ملابس وأزياء']

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('جميع الفئات')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch marketplace items from backend
  const {
    items,
    loading,
    error,
    totalCount,
    totalPages,
    refetch
  } = useMarketplace({
    category: selectedCategory !== 'جميع الفئات' ? selectedCategory : undefined,
    minPrice: priceRange.min ? parseInt(priceRange.min) : undefined,
    maxPrice: priceRange.max ? parseInt(priceRange.max) : undefined,
    sortBy,
    page: currentPage,
    limit: 12
  })

  // Filter items by search term (client-side for better UX)
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items

    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [items, searchTerm])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, priceRange, sortBy])

  // Handle filter application
  const handleApplyFilters = () => {
    setCurrentPage(1)
    refetch()
  }

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

          {/* Apply Filters Button */}
          <div className="mt-4 text-center">
            <button
              className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
              onClick={handleApplyFilters}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span className="font-arabic">تطبيق الفلاتر</span>
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
              {loading ? 'جاري التحميل...' : `تم العثور على ${filteredItems.length} منتج من أصل ${totalCount}`}
            </p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        )}

        {/* Items Grid */}
        {!loading && !error && (
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
        {!loading && !error && filteredItems.length === 0 && (
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
