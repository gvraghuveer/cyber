import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LandingPage } from "./components/LandingPage.jsx";
import DashboardPage from "./components/DashboardPage.jsx";
import { AuthPage } from "./components/AuthPage.jsx";
import ScrollToTop from "./components/ui/ScrollToTop.jsx";
import { ThemeProvider } from "./lib/ThemeContext.jsx";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.992,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.992,
    filter: "blur(6px)",
    transition: {
      duration: 0.26,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <DashboardPage />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <AuthPage initialMode="login" />
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <AuthPage initialMode="signup" />
            </motion.div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}


