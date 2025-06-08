# 🤝 Contributing to Islamic Mission City Website

Thank you for your interest in contributing to the Islamic Mission City community platform! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Cultural Guidelines](#cultural-guidelines)
- [Submitting Changes](#submitting-changes)
- [Community](#community)

## 📜 Code of Conduct

### Our Pledge
We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Islamic Values
- Respect for all community members
- Honesty and integrity in all interactions
- Constructive and helpful communication
- Cultural sensitivity and awareness
- Commitment to beneficial knowledge sharing

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- Git for version control
- Basic knowledge of React and TypeScript
- Understanding of Arabic RTL layout principles

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Islamic-Mission-City.git
   cd Islamic-Mission-City
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔄 Development Process

### Branch Naming Convention
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `style/ui-improvements` - UI/UX improvements
- `refactor/code-cleanup` - Code refactoring

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(marketplace): add price filter functionality
fix(navbar): resolve mobile menu toggle issue
docs(readme): update installation instructions
style(hero): improve Arabic typography spacing
```

## 💻 Coding Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all component props
- Avoid `any` type - use proper typing
- Use meaningful variable and function names

```typescript
// Good
interface StudentProfile {
  id: string
  name: string
  nationality: string
  languages: string[]
}

// Avoid
const data: any = {...}
```

### React Best Practices
- Use functional components with hooks
- Implement proper error boundaries
- Optimize re-renders with useMemo/useCallback when needed
- Follow React naming conventions

```tsx
// Good
const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="card-islamic">
      <h3>{student.name}</h3>
    </div>
  )
}

// Component file naming: PascalCase.tsx
```

### CSS/UnoCSS Guidelines
- Use UnoCSS utility classes
- Follow RTL-first approach
- Maintain consistent spacing scale
- Use semantic color names from design system

```tsx
// Good - RTL-aware, semantic classes
<div className="card-islamic text-arabic p-6 mr-4">

// Avoid - LTR-specific, arbitrary values
<div className="bg-white p-[24px] ml-4">
```

## 🕌 Cultural Guidelines

### Arabic Language Support
- All user-facing text must have Arabic translations
- Use proper Arabic typography (Cairo, Changa fonts)
- Implement RTL layout correctly
- Test with Arabic content of varying lengths

### Islamic Design Principles
- Respect Islamic aesthetic values
- Use geometric patterns appropriately
- Avoid inappropriate imagery
- Maintain cultural sensitivity in all content

### Content Guidelines
- Ensure all content is appropriate for a diverse Muslim community
- Use inclusive language
- Respect different cultural backgrounds within the Islamic community
- Provide context for cultural references

## 📝 Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Test your changes** thoroughly
3. **Run linting and type checking**
   ```bash
   npm run lint
   npx tsc --noEmit
   ```
4. **Create descriptive pull request**

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/UI improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested with Arabic content
- [ ] RTL layout verified

## Screenshots
[Add screenshots if applicable]

## Cultural Considerations
[Any cultural or religious considerations]
```

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Cultural review** for content changes
4. **Testing** on multiple devices/browsers
5. **Approval** and merge

## 🌟 Areas for Contribution

### High Priority
- **Accessibility improvements** (WCAG compliance)
- **Performance optimizations** (bundle size, loading speed)
- **Mobile experience** enhancements
- **Arabic localization** improvements

### Medium Priority
- **New features** from roadmap
- **UI/UX improvements**
- **Code refactoring** and cleanup
- **Documentation** updates

### Low Priority
- **Additional language support**
- **Advanced animations**
- **Third-party integrations**
- **Developer tooling** improvements

## 🏆 Recognition

### Contributor Levels
- **First-time Contributor**: Welcome package and recognition
- **Regular Contributor**: Listed in README acknowledgments
- **Core Contributor**: Direct collaboration access
- **Maintainer**: Full repository access and decision-making

### Rewards
- Recognition in project documentation
- LinkedIn recommendations for significant contributions
- Potential internship/job opportunities
- Community leadership roles

## 💬 Community

### Communication Channels
- **GitHub Discussions**: Technical discussions and Q&A
- **WhatsApp Group**: Real-time community chat
- **Email**: formal communications and support

### Getting Help
- Check existing issues and documentation first
- Ask questions in GitHub Discussions
- Join community WhatsApp group for quick help
- Contact maintainers directly for urgent issues

### Mentorship
- New contributors are paired with experienced mentors
- Regular code review sessions
- Technical guidance and career advice
- Islamic values integration in technology

---

## 🤲 Final Note

*"And whoever saves a life, it is as if he has saved all of mankind"* - Quran 5:32

Your contributions to this platform help build a stronger, more connected Islamic community. Every line of code, every bug fix, and every improvement makes a difference in the lives of students far from home.

**جزاكم الله خيراً** (May Allah reward you with good) for your contributions!

---

**Questions?** Feel free to reach out to the maintainers or open a discussion on GitHub.
