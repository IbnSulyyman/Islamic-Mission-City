import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  TrendingUp, 
  Loader2, 
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react'
import { useMarketplace } from '../hooks/useBackend'
import { useAuthContext } from '../contexts/AuthContext'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import ItemCard from '../components/Marketplace/ItemCard'

const categories = ['جميع الفئات', 'إلكترونيات', 'كتب ومراجع', 'رياضة ولياقة', 'أدوات منزلية', 'ملابس وأزياء', 'أخرى']
const sortOptions = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
  { value: 'popular', label: 'الأكثر مشاهدة' }
]

const MarketplacePage = () => {
  const { isAuthenticated } = useAuthContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('جميع الفئات')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

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
    setShowFilters(false)
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('جميع الفئات')
    setPriceRange({ min: '', max: '' })
    setSortBy('newest')
    setCurrentPage(1)
    refetch()
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
            <ShoppingBag className="w-8 h-8 text-emerald-500" />
            <TrendingUp className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6 font-arabic">
            سوق الطلاب
          </h1>
          <p className="text-lg text-navy-500/70 max-w-3xl mx-auto leading-relaxed font-arabic">
            اشتري وبع مع زملائك الطلاب. من الكتب إلى الإلكترونيات، كل ما تحتاجه في مكان واحد.
          </p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-500/50 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              className="w-full pr-10 pl-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gold-500/20 rounded-lg hover:bg-gold-500/10 transition-colors font-arabic"
            >
              <SlidersHorizontal className="w-5 h-5" />
              فلاتر
            </button>

            <div className="flex border border-gold-500/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${
                  viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-50'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${
                  viewMode === 'list' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {isAuthenticated && (
              <Link
                to="/marketplace/create"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors font-arabic"
              >
                <Plus className="w-5 h-5" />
                أضف منتج
              </Link>
            )}
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            className="bg-white rounded-lg p-6 mb-8 shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">الفئة</label>
                <select
                  className="w-full px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">السعر الأدنى</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">السعر الأعلى</label>
                <input
                  type="number"
                  placeholder="1000"
                  className="w-full px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-navy-500 mb-2 font-arabic">ترتيب حسب</label>
                <select
                  className="w-full px-4 py-3 border border-gold-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-right"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'price-low' | 'price-high' | 'popular')}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleApplyFilters}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors font-arabic"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'تطبيق الفلاتر'}
              </button>
              <button
                onClick={handleClearFilters}
                className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors font-arabic"
              >
                مسح الفلاتر
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Count and Error Handling */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
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

        {/* Items Grid/List */}
        {!loading && !error && (
          <motion.div
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ItemCard {...item} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
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
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-navy-500 mb-2 font-arabic">
              لم يتم العثور على منتجات
            </h3>
            <p className="text-navy-500/70 font-arabic mb-6">
              جرب تغيير معايير البحث أو الفلتر
            </p>
            {isAuthenticated && (
              <Link
                to="/marketplace/create"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors font-arabic"
              >
                <Plus className="w-5 h-5" />
                كن أول من يضيف منتج
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MarketplacePage
