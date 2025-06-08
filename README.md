# 🕌 Islamic Mission City Website

<div align="center">

![Islamic Mission City](https://img.shields.io/badge/Islamic%20Mission%20City-Community%20Hub-emerald?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![UnoCSS](https://img.shields.io/badge/UnoCSS-0.57.7-green?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple?style=for-the-badge&logo=vite)

**مرحبًا بك في مدينة البحوث – حيث يلتقي الطلاب والثقافات**

*A comprehensive, Arabic-first community platform for international students at Islamic Mission City, Cairo*

[🌐 Live Demo](#) • [📖 Documentation](#features) • [🚀 Quick Start](#quick-start) • [🤝 Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎨 Design System](#-design-system)
- [🌍 Internationalization](#-internationalization)
- [📱 Responsive Design](#-responsive-design)
- [🔧 Development](#-development)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🕌 **Hero Section**
- **Fullscreen Arabic Welcome**: "مرحبًا بك في مدينة البحوث – حيث يلتقي الطلاب والثقافات"
- **Animated Islamic Patterns**: Floating geometric shapes with smooth animations
- **Call-to-Action Buttons**: "ابدأ الآن" (Start Now) and community introduction
- **Live Statistics**: 500+ students, 50+ countries, 1000+ marketplace items

### 🧑‍🤝‍🧑 **Cultural Exchange & Language Buddies**
- **Student Profiles**: Searchable cards with nationality, languages, and skills
- **Advanced Filtering**: By nationality, language, skill, and availability
- **Rating System**: 5-star rating with review counts
- **Real-time Status**: Online/offline indicators
- **Direct Contact**: WhatsApp integration for instant communication

### 🛒 **Student Marketplace**
- **Product Listings**: Title, image, price, description, and location
- **Smart Filtering**: Category, price range, building location
- **Negotiation Support**: "قابل للتفاوض" (Negotiable) badges
- **View Tracking**: Popular items with view counters
- **WhatsApp Orders**: One-click ordering with pre-filled messages

### 📰 **News & Announcements**
- **Priority System**: Urgent (عاجل), Important (مهم), Normal (عادي)
- **News Categories**: Announcements, events, lost & found, rules, maintenance
- **Location Tags**: Building-specific announcements
- **Real-time Updates**: Scrolling ticker for urgent news
- **Date/Time Stamps**: Arabic date formatting

### 🍽️ **Food Today**
- **Cultural Cuisine**: International dishes from student chefs
- **Chef Profiles**: Name, nationality flag, and rating
- **Detailed Info**: Price, prep time, serving size, dietary tags
- **WhatsApp Ordering**: Direct contact with chefs
- **Availability Status**: Real-time availability tracking
- **Add Your Dish**: Platform for students to sell their cooking

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/IbnSulyyman/Islamic-Mission-City.git
cd Islamic-Mission-City

# Install dependencies
npm install

# Setup backend (optional - for full functionality)
npm run setup-backend

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

### Backend Setup (Optional)

For full functionality with real-time data, set up the Back4App backend:

```bash
# Run the automated setup script
npm run setup-backend

# Follow the instructions to:
# 1. Create Back4App account
# 2. Update .env with your credentials
# 3. Setup database schema
# 4. Deploy cloud code
```

**Detailed backend setup instructions**: See [BACKEND_SETUP.md](BACKEND_SETUP.md)

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality

# Backend Setup
npm run setup-backend # Automated backend setup script
npm run deploy-cloud  # Deploy cloud code to Back4App
```

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.2.2** - Type-safe development
- **Vite 5.0.0** - Lightning-fast build tool and dev server

### **Styling & UI**
- **UnoCSS 0.57.7** - Atomic CSS engine with RTL support
- **Framer Motion 10.16.4** - Production-ready motion library
- **Lucide React 0.294.0** - Beautiful, customizable icons

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite React Plugin** - Optimized React development experience

## 📁 Project Structure

```
Islamic-Mission-City/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Common/         # Shared components
│   │   │   └── WhatsAppButton.tsx
│   │   ├── CulturalExchange/
│   │   │   ├── CulturalExchange.tsx
│   │   │   └── ProfileCard.tsx
│   │   ├── Food/
│   │   │   └── FoodSection.tsx
│   │   ├── Hero/
│   │   │   └── HeroSection.tsx
│   │   ├── Layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── Marketplace/
│   │   │   ├── ItemCard.tsx
│   │   │   └── Marketplace.tsx
│   │   └── News/
│   │       └── NewsSection.tsx
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── uno.config.ts           # UnoCSS configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## 🎨 Design System

### **Color Palette**
```css
/* Islamic Mission City Brand Colors */
--emerald: #00695C    /* Primary actions, success states */
--navy: #0A192F       /* Text, headers, navigation */
--gold: #C5A66A       /* Accents, highlights, premium features */
--beige: #F8F5F0      /* Background, cards, subtle elements */
--crimson: #B00020    /* Urgent alerts, errors, important notices */
```

### **Typography**
- **Arabic**: Cairo, Changa (Google Fonts)
- **English**: Poppins, Inter (fallbacks)
- **RTL Support**: Complete right-to-left text flow

### **Islamic Design Elements**
- **Geometric Patterns**: Subtle background animations
- **Mashrabiya Borders**: Traditional Islamic architectural elements
- **Cultural Sensitivity**: Respectful use of Islamic design principles

## 🌍 Internationalization

### **RTL (Right-to-Left) Support**
- Complete Arabic text support
- RTL-aware spacing and margins
- Proper icon and layout orientation
- Arabic number formatting

### **Language Features**
- Primary language: Arabic
- Secondary language: English
- Mixed content support
- Cultural date/time formatting

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 768px (single column, touch-optimized)
- **Tablet**: 768px - 1024px (two columns, hybrid navigation)
- **Desktop**: > 1024px (multi-column, full navigation)

### **Mobile Features**
- Sticky WhatsApp contact button
- Collapsible navigation menu
- Touch-friendly card interactions
- Optimized image loading

## 🔧 Development

### **Code Style**
- **ESLint**: Enforced code quality rules
- **TypeScript**: Strict type checking enabled
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

### **State Management**
- **React Hooks**: useState, useEffect for local state
- **Props Interface**: TypeScript interfaces for all components
- **Event Handling**: Proper event typing and handling

### **Performance Optimizations**
- **Vite**: Fast development and optimized builds
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Responsive images with proper loading
- **Animation Performance**: GPU-accelerated animations

## 📦 Deployment

### **Build Process**
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### **Deployment Options**
- **Vercel**: Recommended for React applications
- **Netlify**: Great for static site deployment
- **GitHub Pages**: Free hosting for open source projects
- **Traditional Hosting**: Any static file hosting service

### **Environment Variables**
Create a `.env` file for environment-specific configuration:
```env
VITE_WHATSAPP_NUMBER=+201234567890
VITE_CONTACT_EMAIL=info@islamicmissioncity.com
VITE_API_BASE_URL=https://api.islamicmissioncity.com
```

## 🤝 Contributing

We welcome contributions from the Islamic Mission City community!

### **How to Contribute**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Add TypeScript types for all new components
- Include Arabic translations for all user-facing text
- Test on both desktop and mobile devices
- Respect Islamic cultural values and sensitivities

### **Areas for Contribution**
- 🌐 **Backend Integration**: API connections and data management
- 🔐 **Authentication**: User login and profile management
- 💬 **Real-time Chat**: Student communication features
- 📊 **Analytics**: Usage tracking and insights
- 🎨 **UI/UX**: Design improvements and accessibility
- 🌍 **Localization**: Additional language support

## � Security & Privacy

### **Data Protection**
- No personal data stored locally
- WhatsApp integration uses public APIs only
- All communications are end-to-end encrypted through WhatsApp
- No tracking or analytics without user consent

### **Content Moderation**
- Community-driven content reporting
- Islamic values and cultural sensitivity guidelines
- Automated content filtering for inappropriate material
- Regular community guidelines updates

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] RTL layout displays correctly
- [ ] Arabic fonts load properly
- [ ] All animations work smoothly
- [ ] WhatsApp links open correctly
- [ ] Responsive design on all devices
- [ ] Search and filter functionality
- [ ] Navigation between sections

### **Browser Compatibility**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### **Common Issues**

**Development server won't start:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Arabic fonts not loading:**
- Check internet connection for Google Fonts
- Verify UnoCSS configuration includes web fonts preset
- Clear browser cache

**WhatsApp links not working:**
- Ensure phone numbers are in international format (+20...)
- Test on mobile devices where WhatsApp is installed
- Check URL encoding for Arabic text

**Build errors:**
```bash
# Type check without emitting
npx tsc --noEmit

# Check for unused imports
npm run lint
```

## 📊 Performance Metrics

### **Lighthouse Scores** (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### **Bundle Size** (Optimized)
- **Initial Bundle**: < 200KB gzipped
- **Total Assets**: < 1MB
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## 🔮 Roadmap

### **Phase 1: Foundation** ✅
- [x] Basic website structure
- [x] Cultural Exchange section
- [x] Student Marketplace
- [x] News & Announcements
- [x] Food Today section
- [x] Mobile responsiveness

### **Phase 2: Enhanced Features** 🚧
- [ ] User authentication system
- [ ] Real-time notifications
- [ ] Advanced search with filters
- [ ] Image upload for marketplace
- [ ] Event calendar integration
- [ ] Multi-language support (English/Arabic toggle)

### **Phase 3: Community Features** 📋
- [ ] Student forums and discussions
- [ ] Study group formation
- [ ] Roommate matching system
- [ ] Transportation sharing
- [ ] Academic resource sharing
- [ ] Mentorship program

### **Phase 4: Advanced Integration** 🔮
- [ ] Payment gateway integration
- [ ] University system integration
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Analytics dashboard
- [ ] API for third-party integrations

## 🏆 Acknowledgments

### **Design Inspiration**
- Islamic geometric patterns from traditional architecture
- Modern Arabic typography trends
- Middle Eastern color palettes
- Cultural sensitivity guidelines from Islamic design principles

### **Community Contributors**
- **Students of Islamic Mission City** - Feature requests and feedback
- **Nigerian Student Community** - Cultural insights and testing
- **International Students** - Multi-cultural perspective
- **Local Egyptian Students** - Cultural bridge and language support

### **Technical Resources**
- [UnoCSS Documentation](https://unocss.dev/) - Atomic CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Documentation](https://react.dev/) - React framework
- [Islamic Design Patterns](https://islamicart.com/) - Cultural design reference

## 📞 Support & Contact

### **Technical Support**
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/IbnSulyyman/Islamic-Mission-City/issues)
- **Email**: tech-support@islamicmissioncity.com
- **WhatsApp**: +20 123 456 7890

### **Community Support**
- **Student WhatsApp Group**: [Join Community](https://wa.me/group/...)
- **Facebook Page**: [Islamic Mission City Students](https://facebook.com/...)
- **Telegram Channel**: [Daily Updates](https://t.me/...)

### **Academic Support**
- **University Liaison**: academic@islamicmissioncity.com
- **Housing Support**: housing@islamicmissioncity.com
- **Emergency Contact**: +20 100 000 0000

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### **Third-Party Licenses**
- React: MIT License
- UnoCSS: MIT License
- Framer Motion: MIT License
- Lucide Icons: ISC License

---

<div align="center">

**Built with ❤️ for the Islamic Mission City community**

*صُمم بحب لمجتمع مدينة البحوث الإسلامية*

**May this platform bring students together and foster lasting friendships** 🤝

*عسى أن تجمع هذه المنصة الطلاب وتعزز الصداقات الدائمة*

[⬆ Back to Top](#-islamic-mission-city-website)

</div>
