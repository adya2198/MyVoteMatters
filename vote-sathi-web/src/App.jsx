import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { TopicDetail } from './pages/TopicDetail';
import { Services } from './pages/Services';
import { FAQ } from './pages/FAQ';
import { Assistant } from './pages/Assistant';
import { About } from './pages/About';
import { Auth } from './pages/Auth';
import { PollingLocator } from './pages/PollingLocator';
import { RegistrationChecker } from './pages/RegistrationChecker';
import { ElectionCalendar } from './pages/ElectionCalendar';
import { Quiz } from './pages/Quiz';
import { Candidates } from './pages/Candidates';
import { A11yControls } from './components/A11yControls';
import { motion, AnimatePresence } from 'framer-motion';

import { logUserAction } from './firebase';

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
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
