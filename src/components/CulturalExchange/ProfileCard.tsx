
import { MessageCircle, Star, MapPin, Languages } from 'lucide-react'

interface ProfileCardProps {
  id: string
  name: string
  nationality: string
  flag: string
  languages: string[]
  skills: string[]
  rating: number
  location: string
  bio: string
  avatar: string
  isOnline: boolean
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  nationality,
  flag,
  languages,
  skills,
  rating,
  location,
  bio,
  avatar,
  isOnline
}) => {
  return (
    <div className="card-islamic hover:scale-105 transition-all duration-300 relative">
      {/* Online Status */}
      {isOnline && (
        <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      )}

      {/* Avatar and Basic Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/30"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-navy-500 font-arabic">{name}</h3>
            <span className="text-2xl">{flag}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-navy-500/70 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="font-arabic">{nationality}</span>
            <span className="text-gold-500">•</span>
            <span className="font-arabic">{location}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'text-gold-500 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-navy-500/70 mr-2">({rating}/5)</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-navy-500/80 text-sm mb-4 leading-relaxed font-arabic">
        {bio}
      </p>

      {/* Languages */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Languages className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-navy-500 font-arabic">اللغات:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full font-arabic"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="text-sm font-medium text-navy-500 mb-2 font-arabic">المهارات:</div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gold-50 text-gold-600 text-xs rounded-full font-arabic"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Button */}
      <button className="w-full btn-primary flex items-center justify-center gap-2 text-sm">
        <MessageCircle className="w-4 h-4" />
        <span className="font-arabic">تواصل معي</span>
      </button>
    </div>
  )
}

export default ProfileCard
