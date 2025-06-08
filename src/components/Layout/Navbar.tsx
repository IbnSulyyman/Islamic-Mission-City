import { useState } from 'react'
import { Menu, X, Home, Users, ShoppingBag, Newspaper, UtensilsCrossed } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home, href: '#home' },
    { id: 'exchange', label: 'التبادل الثقافي', icon: Users, href: '#cultural-exchange' },
    { id: 'marketplace', label: 'السوق', icon: ShoppingBag, href: '#marketplace' },
    { id: 'news', label: 'الأخبار', icon: Newspaper, href: '#news' },
    { id: 'food', label: 'الطعام اليوم', icon: UtensilsCrossed, href: '#food' }
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-emerald-500 font-arabic">
              مدينة البحوث
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-reverse space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-navy-500 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium font-arabic transition-colors duration-200 flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>
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
              <a
                key={item.id}
                href={item.href}
                className="text-navy-500 hover:text-emerald-500 block px-3 py-2 rounded-md text-base font-medium font-arabic transition-colors duration-200 flex items-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
