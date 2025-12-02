import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getCalculator, calculators } from '../services/calculatorRegistry';
import { CalculatorEngine } from '../components/CalculatorEngine';
import { LangCode } from '../types';

interface CalculatorPageProps {
  lang: LangCode;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ lang }) => {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Find config based on slug
  const config = getCalculator(slug || '');

  // Reset search term when navigating to a new calculator
  useEffect(() => {
    setSearchTerm('');
  }, [slug]);

  // Simulate SEO Metadata Injection (Document Head)
  useEffect(() => {
    if (config) {
      document.title = `${config.content.title[lang]} | CalcFlow`;
      
      // Update meta description safely
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', config.content.description[lang]);

      // Simple structured data injection (JSON-LD)
      const scriptId = 'structured-data';
      let scriptTag = document.getElementById(scriptId);
      if (!scriptTag) {
         scriptTag = document.createElement('script');
         scriptTag.id = scriptId;
         scriptTag.setAttribute('type', 'application/ld+json');
         document.head.appendChild(scriptTag);
      }
      const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": config.content.title[lang],
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web"
      };
      scriptTag.textContent = JSON.stringify(schema);
    }
  }, [config, lang]);

  if (!config) {
    // Fallback if slug not found, redirect to default (simulated 404 handling)
    return <Navigate to={`/${lang}/health/bmi-calculator`} replace />;
  }

  // Determine displayed calculators based on search or category
  let displayedCalculators = [];
  let sectionTitle = '';

  if (searchTerm.trim()) {
    const lowerTerm = searchTerm.toLowerCase();
    displayedCalculators = calculators.filter(c => 
      c.slug !== config.slug && (
        c.content.title[lang].toLowerCase().includes(lowerTerm) || 
        c.category.toLowerCase().includes(lowerTerm)
      )
    );
    sectionTitle = lang === 'en' ? `Search Results for "${searchTerm}"` : `"${searchTerm}" 的搜索结果`;
  } else {
    // Default "Related" logic
    const sameCategoryCalculators = calculators.filter(c => c.category === config.category && c.slug !== config.slug);
    
    displayedCalculators = sameCategoryCalculators.length > 0 
      ? sameCategoryCalculators 
      : calculators.filter(c => c.slug !== config.slug);

    sectionTitle = sameCategoryCalculators.length > 0 
      ? (lang === 'en' ? 'Related Calculators' : '相关计算器')
      : (lang === 'en' ? 'Other Calculators' : '其他计算器');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-6 dark:text-gray-400">
        <Link to={`/${lang}/categories`} className="hover:text-brand-600 transition-colors dark:hover:text-brand-400">
          {lang === 'en' ? 'All Calculators' : '所有计算器'}
        </Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{config.category}</span>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900 dark:text-white">{config.content.title[lang]}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Main Column: Calculator */}
        <div className="lg:col-span-7 space-y-8">
          <CalculatorEngine config={config} lang={lang} />
          
          {/* Related / Search Section */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {sectionTitle}
              </h3>
              
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition duration-150 ease-in-out dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-brand-500 dark:focus:border-brand-500"
                  placeholder={lang === 'en' ? "Search calculators..." : "搜索计算器..."}
                />
              </div>
            </div>

            {displayedCalculators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedCalculators.map(c => (
                  <Link 
                    key={c.slug} 
                    to={`/${lang}/${c.category}/${c.slug}`}
                    className="group block p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:shadow-md transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-brand-500/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors dark:bg-brand-900/30 dark:text-brand-400 dark:group-hover:bg-brand-500 dark:group-hover:text-white">
                         {/* Render Icon Path if string, usually SVG path d */}
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon} />
                         </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors dark:text-white dark:group-hover:text-brand-400">
                          {c.content.title[lang]}
                        </h4>
                        <p className="text-xs text-gray-500 capitalize dark:text-gray-400">{c.category}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-800 dark:text-gray-400">
                {lang === 'en' ? 'No calculators found matching your search.' : '未找到匹配的计算器。'}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Content/SEO Article */}
        <aside className="lg:col-span-5 mt-10 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">
              {lang === 'en' ? 'About this Calculator' : '关于此计算器'}
            </h2>
            
            {/* Render HTML Content safely */}
            <div 
              className="prose prose-sm prose-blue text-gray-600 max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold 
                prose-a:text-brand-600 hover:prose-a:text-brand-700
                dark:text-gray-300 dark:prose-headings:text-white dark:prose-a:text-brand-400 dark:hover:prose-a:text-brand-300"
              dangerouslySetInnerHTML={{ __html: config.content.article[lang] }}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};