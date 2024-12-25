# Data Science & ML Portfolio

A modern, responsive portfolio website showcasing data science projects and technical articles. Built with React, TypeScript, and Supabase, featuring a dynamic admin dashboard for content management.

![Portfolio Preview](https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)

## 🌟 Features

- **Dynamic Project Gallery**: Interactive showcase of data science and ML projects
- **Technical Blog**: MDX-powered articles with code syntax highlighting
- **Admin Dashboard**: Secure content management system
- **Dark Theme**: Modern UI with purple accents
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Code splitting, lazy loading, and asset compression
- **SEO Ready**: Meta tags and optimized content structure

## 🛠️ Tech Stack

### Core Technologies
- TypeScript
- React 18
- Vite
- Supabase

### Key Libraries
- Framer Motion (animations)
- React Query (data fetching)
- React Hook Form (form handling)
- Zod (validation)
- MDX (content rendering)
- Tailwind CSS (styling)

### Development & Build Tools
- ESLint
- PostCSS
- Terser
- Compression (Brotli & Gzip)

## 📦 Project Structure

```plain text
portfolio/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── data/          # Static data and content
│   ├── types/         # TypeScript definitions
│   └── utils/         # Helper functions
├── public/            # Static assets
└── supabase/          # Database configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.16.0 or higher)
- npm (v9.7.0 or higher)

### Installation

bash
Clone the repository
git clone https://github.com/CollinsNyatundo/V7.git
Navigate to project directory
cd portfolio
Install dependencies
npm install
Start development server
npm run dev

Visit `http://localhost:3000` to view the application.

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `netlify.toml` - Netlify deployment settings
- `.env` - Environment variables (create from .env.example)

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20.x

### Manual Deployment
bash
Build for production
npm run build
Preview production build
npm run preview

## ⚡ Performance Optimizations

- Code splitting via dynamic imports
- Image lazy loading and optimization
- Asset compression (Brotli & Gzip)
- Efficient state management with React Query
- Optimized bundle chunking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React ecosystem
- Tailwind CSS community
- Supabase team
- Netlify platform
- Open source contributors

---

Built with ❤️ by [Collins Nyagaka](https://github.com/CollinsNyatundo)