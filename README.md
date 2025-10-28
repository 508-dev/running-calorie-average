# 🥗 Running Calorie Average Tracker

A simple, elegant web application for tracking daily calorie intake with rolling averages. Built as a collaborative learning project by the [508.dev](https://508.dev) software engineering co-op.

## 🎯 What It Does

Track your daily calorie intake and view intelligent rolling averages (3-day, 5-day, 2-week, and monthly) that help smooth out daily fluctuations. Perfect for flexible calorie management without strict daily limits.

**Example**: If you consumed 1000, 1000, and 2000 calories over the last 3 days, your 3-day average would be 1333 calories/day. This approach allows for natural variation - like enjoying a holiday meal while maintaining overall balance.

## ✨ Features

- 📅 **Interactive Calendar View** - Visual month-at-a-glance with calorie data
- 🎛️ **Date Picker Integration** - Quick navigation to any date
- 📊 **Multiple Rolling Averages** - 3-day, 5-day, 2-week, and monthly views
- 📱 **Mobile-Friendly** - Swipe gestures for date navigation
- 💾 **Local Storage** - Your data stays private on your device
- 🔄 **Data Import/Export** - Backup and restore your calorie history
- 🎨 **Clean UI** - Modern, intuitive interface built with SvelteKit

## 🚀 Live Demo

Try it now: [https://508-dev.github.io/running-calorie-average/](https://508-dev.github.io/running-calorie-average/)

## 🤝 About This Project

This is an **open-source collaborative project** by the 508.dev software engineering co-op.

- Perfect first contribution for learning our workflow
- Test new ideas and technologies
- Real-world experience with code reviews, issue management, and team development
- Create something useful while learning together

### 🌟 We're Growing!

This project is actively evolving and we're looking for contributors! Whether you're a seasoned developer or just starting out, there's a place for you here. **Who knows where this project will go** - maybe it becomes the go-to calorie tracking app, maybe it evolves into something completely different. That's the beauty of open-source collaboration!

### 🎓 Perfect for Learning

- **Beginners**: Start with documentation, bug fixes, or small features
- **Intermediate**: Add new features, improve UI/UX, or optimize performance
- **Advanced**: Architect new systems, mentor others, or lead feature development

**Tech Stack**: SvelteKit, TypeScript, Vite, CSS3

## 🛠️ Contributing

We welcome contributions from developers of all skill levels! Here's how to get involved:

### 🎯 Good First Issues

- 📝 Improve documentation or add code comments
- 🐛 Fix small bugs or UI inconsistencies
- 🎨 Enhance styling and user experience
- ✅ Add unit tests for existing functions
- 🌐 Improve accessibility features

### 💡 Feature Ideas

- 🔐 User authentication and cloud sync
- 📈 Advanced analytics and charts
- 🎯 Goal setting and achievement tracking
- 📱 Progressive Web App (PWA) features
- 🔗 Integration with fitness apps/devices
- 🍎 Food database integration
- 📤 More export formats (CSV, JSON, etc.)

### 📋 Development Workflow

1. **Fork & Clone** the repository
2. **Create a branch** for your feature: `git checkout -b feature/amazing-feature`
3. **Install dependencies**: `npm install`
4. **Start development**: `npm run dev`
5. **Make your changes** and test thoroughly
6. **Run checks**: `npm run lint` and `npm run check`
7. **Submit a Pull Request** with a clear description

### 🔧 Development Setup

**Prerequisites**: Node.js 16+ and npm

```bash
# Clone the repository
git clone https://github.com/508-dev/running-calorie-average.git
cd running-calorie-average

# Install dependencies
npm install

# Start development server
npm run dev
```

> 💡 **Tip**: If `npm install` fails, try deleting `package-lock.json` and `node_modules`, then run `npm install` again.

**Available Scripts**:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter
- `npm run check` - Type checking

## 🚀 Deployment

This app is automatically deployed to GitHub Pages from the `main` branch.

**Live URL**: [https://508-dev.github.io/running-calorie-average/](https://508-dev.github.io/running-calorie-average/)

## 📄 License

Licensed under AGPL-3.0. You're free to use, modify, and deploy this code for your own purposes.

## 🏗️ Architecture

- **Frontend**: SvelteKit with TypeScript
- **Styling**: CSS3 with custom properties
- **State Management**: Svelte stores
- **Storage**: Browser localStorage
- **Build Tool**: Vite
- **Deployment**: GitHub Pages (static generation)

## 🤔 Questions or Ideas?

- 💬 Join discussions in our GitHub Issues
- 🐛 Report bugs with detailed reproduction steps
- 💡 Suggest features - we love creative ideas!
- 📧 Contact the 508.dev team for collaboration opportunities

---

**Ready to contribute?** Check out our [open issues](https://github.com/508-dev/running-calorie-average/issues) and jump in! Every contribution, no matter how small, helps make this project better. 🚀
