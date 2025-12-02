import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CalculatorPage } from './pages/CalculatorPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { LangCode } from './types';

// Wrapper to handle language state lifting and navigation
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine language from URL or default to 'en'
  const getCurrentLang = (): LangCode => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'zh-CN') return 'zh-CN';
    return 'en';
  };

  const [lang, setLang] = useState<LangCode>(getCurrentLang());

  // Sync state with URL
  useEffect(() => {
    setLang(getCurrentLang());
  }, [location]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLangChange = (newLang: LangCode) => {
    // Replace the language segment in the URL
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 1) {
      pathParts[0] = newLang;
      navigate(`/${pathParts.join('/')}`);
    } else {
      // Default fallback
      navigate(`/${newLang}/categories`);
    }
  };

  return (
    <Layout lang={lang} onLangChange={handleLangChange}>
      <Routes>
        {/* Redirect root to Categories page */}
        <Route path="/" element={<Navigate to="/en/categories" replace />} />

        {/* Categories List Page */}
        <Route path="/:lang/categories" element={<CategoriesPage lang={lang} />} />
        
        {/* Dynamic Calculator Route */}
        <Route 
          path="/:lang/:category/:slug" 
          element={<CalculatorPage lang={lang} />} 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/en/categories" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;