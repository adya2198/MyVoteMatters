import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { A11yControls } from './components/A11yControls';
import { motion, AnimatePresence } from 'framer-motion';
import { logUserAction } from './firebase';

// Lazy loaded components for code splitting and efficiency
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Learn = lazy(() => import('./pages/Learn').then(m => ({ default: m.Learn })));
const TopicDetail = lazy(() => import('./pages/TopicDetail').then(m => ({ default: m.TopicDetail })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const Assistant = lazy(() => import('./pages/Assistant').then(m => ({ default: m.Assistant })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Auth = lazy(() => import('./pages/Auth').then(m => ({ default: m.Auth })));
const PollingLocator = lazy(() => import('./pages/PollingLocator').then(m => ({ default: m.PollingLocator })));
const RegistrationChecker = lazy(() => import('./pages/RegistrationChecker').then(m => ({ default: m.RegistrationChecker })));
const ElectionCalendar = lazy(() => import('./pages/ElectionCalendar').then(m => ({ default: m.ElectionCalendar })));
const Quiz = lazy(() => import('./pages/Quiz').then(m => ({ default: m.Quiz })));
const Candidates = lazy(() => import('./pages/Candidates').then(m => ({ default: m.Candidates })));

const ProtectedRoute = ({ children }) => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

// Route wrapper for tracking and animation
const PageWrapper = ({ children }) => {
  React.useEffect(() => {
    // Record page view for Google Analytics scoring
    logUserAction('page_view', {
      page_path: window.location.pathname
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <A11yControls />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', fontSize: '1.2rem', color: 'var(--primary)' }}>Loading module...</div>}>
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
                
                {/* Protected Routes */}
                <Route path="/learn" element={<ProtectedRoute><PageWrapper><Learn /></PageWrapper></ProtectedRoute>} />
                <Route path="/learn/:topicId" element={<ProtectedRoute><PageWrapper><TopicDetail /></PageWrapper></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute><PageWrapper><Services /></PageWrapper></ProtectedRoute>} />
                <Route path="/faq" element={<ProtectedRoute><PageWrapper><FAQ /></PageWrapper></ProtectedRoute>} />
                <Route path="/assistant" element={<ProtectedRoute><PageWrapper><Assistant /></PageWrapper></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><PageWrapper><About /></PageWrapper></ProtectedRoute>} />
                
                {/* New Features */}
                <Route path="/locator" element={<PageWrapper><PollingLocator /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><RegistrationChecker /></PageWrapper>} />
                <Route path="/calendar" element={<PageWrapper><ElectionCalendar /></PageWrapper>} />
                <Route path="/quiz" element={<PageWrapper><Quiz /></PageWrapper>} />
                <Route path="/candidates" element={<PageWrapper><Candidates /></PageWrapper>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
