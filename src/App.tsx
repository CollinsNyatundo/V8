import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/admin';
import { LoadingSpinner } from './components/admin';

// Eagerly load critical components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';

// Lazy load non-critical components
const BlogDetail = lazy(() => import('./components/BlogDetail'));
const ProjectsGallery = lazy(() => import('./pages/ProjectsGallery'));
const ArticlesGallery = lazy(() => import('./pages/ArticlesGallery'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const BlogPosts = lazy(() => import('./pages/admin/BlogPosts'));
const BlogPostView = lazy(() => import('./pages/admin/BlogPostView'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const Messages = lazy(() => import('./pages/admin/Messages'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const AuthGuard = lazy(() => import('./components/admin/AuthGuard'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <About />
                  <Projects />
                  <Blog />
                  <Contact />
                </>
              }
            />
            <Route path="/projects" element={<ProjectsGallery />} />
            <Route path="/articles" element={<ArticlesGallery />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AuthGuard>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/posts" element={<BlogPosts />} />
                    <Route path="/posts/:id" element={<BlogPostView />} />
                    <Route path="/projects" element={<AdminProjects />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </AuthGuard>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;