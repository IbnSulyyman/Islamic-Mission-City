
import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Clock, Eye, User } from 'lucide-react'

interface ItemCardProps {
  id: string
  title: string
  price: number
  description: string
  location: string
  category: string
  image: string
  seller: string
  postedAt: string
  views: number
  isNegotiable: boolean
  viewMode?: 'grid' | 'list'
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  price,
  description,
  location,
  category,
  image,
  seller,
  postedAt,
  views,
  isNegotiable,
  viewMode = 'grid'
}) => {
  const handleContact = () => {
    const message = `السلام عليكم، أنا مهتم بـ ${title} المعروض بسعر ${price} جنيه.`
    const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex">
          {/* Image */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <Link to={`/marketplace/item/${id}`}>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover hover:opacity-95 transition-opacity"
              />
            </Link>

            {/* Category Badge */}
            <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium font-arabic">
              {category}
            </div>

            {/* Negotiable Badge */}
            {isNegotiable && (
              <div className="absolute top-2 left-2 bg-gold-500 text-white px-2 py-1 rounded-full text-xs font-medium font-arabic">
                قابل للتفاوض
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <Link to={`/marketplace/item/${id}`} className="flex-1">
                <h3 className="text-lg font-semibold text-navy-500 font-arabic hover:text-emerald-500 transition-colors line-clamp-1">
                  {title}
                </h3>
              </Link>
              <div className="text-xl font-bold text-emerald-500 mr-4">
                {price} جنيه
              </div>
            </div>

            <p className="text-navy-500/70 text-sm leading-relaxed font-arabic line-clamp-2 mb-3">
              {description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-navy-500/60">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span className="font-arabic">{seller}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-arabic">{location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-arabic">{postedAt}</span>
                </div>
              </div>

              <button
                onClick={handleContact}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-arabic"
              >
                <MessageCircle className="w-4 h-4" />
                تواصل
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-islamic hover:scale-105 transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative mb-4 -mx-6 -mt-6">
        <Link to={`/marketplace/item/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover hover:opacity-95 transition-opacity"
          />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium font-arabic">
          {category}
        </div>

        {/* Negotiable Badge */}
        {isNegotiable && (
          <div className="absolute top-3 left-3 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-medium font-arabic">
            قابل للتفاوض
          </div>
        )}

        {/* Views */}
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>{views}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start gap-3">
          <Link to={`/marketplace/item/${id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-navy-500 font-arabic leading-tight hover:text-emerald-500 transition-colors">
              {title}
            </h3>
          </Link>
          <div className="text-right">
            <div className="text-xl font-bold text-emerald-500">
              {price} جنيه
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-navy-500/70 text-sm leading-relaxed font-arabic line-clamp-2">
          {description}
        </p>

        {/* Location and Seller */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-navy-500/70">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span className="font-arabic">{location}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-navy-500/70">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-arabic">{postedAt}</span>
            </div>
            <span className="font-arabic">البائع: {seller}</span>
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={handleContact}
          className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-arabic">تواصل عبر واتساب</span>
        </button>
      </div>
    </div>
  )
}

export default ItemCard
