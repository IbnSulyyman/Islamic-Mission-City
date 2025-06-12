import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Users, ShoppingBag, Newspaper, UtensilsCrossed, User, Bell, LayoutDashboard } from 'lucide-react'
import { useAuthContext } from '../../contexts/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated } = useAuthContext()

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home, href: '/' },
    { id: 'students', label: 'الطلاب', icon: Users, href: '/students' },
    { id: 'marketplace', label: 'السوق', icon: ShoppingBag, href: '/marketplace' },
    { id: 'food', label: 'الطعام', icon: UtensilsCrossed, href: '/food' },
    { id: 'feed', label: 'التدفق', icon: Newspaper, href: '/feed' }
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-emerald-500 font-arabic hover:text-emerald-600 transition-colors">
              مدينة البحوث
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            <div className="flex items-center space-x-reverse space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium font-arabic transition-colors duration-200 flex items-center gap-2 ${
                    isActive(item.href)
                      ? 'text-emerald-500 bg-emerald-50'
                      : 'text-navy-500 hover:text-emerald-500'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-reverse space-x-4 border-r border-gray-200 pr-4">
                <Link
                  to="/dashboard"
                  className="text-navy-500 hover:text-emerald-500 p-2 rounded-full transition-colors"
                  title="لوحة التحكم"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Link>

                <Link
                  to="/notifications"
                  className="text-navy-500 hover:text-emerald-500 p-2 rounded-full transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-crimson-500 rounded-full"></span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-navy-500 hover:text-emerald-500 transition-colors"
                >
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=00695C&color=fff&size=32`}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-gold-500/30"
                  />
                  <span className="text-sm font-arabic">{user?.name}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-reverse space-x-4">
                <Link
                  to="/login"
                  className="text-navy-500 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium font-arabic transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium font-arabic transition-colors"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-500 hover:text-emerald-500 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gold-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium font-arabic transition-colors duration-200 flex items-center gap-3 ${
                  isActive(item.href)
                    ? 'text-emerald-500 bg-emerald-50'
                    : 'text-navy-500 hover:text-emerald-500'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}

            {/* Mobile User Menu */}
            {isAuthenticated ? (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium font-arabic text-navy-500 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  لوحة التحكم
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium font-arabic text-navy-500 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5" />
                  الملف الشخصي
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium font-arabic text-navy-500 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Bell className="w-5 h-5" />
                  الإشعارات
                </Link>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium font-arabic text-navy-500 hover:text-emerald-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium font-arabic bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
