import React from 'react';
import { Link } from 'react-router-dom';
import { calculators } from '../services/calculatorRegistry';
import { LangCode } from '../types';

interface CategoriesPageProps {
  lang: LangCode;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ lang }) => {
  // Group calculators by category
  const categories = calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof calculators>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          {lang === 'en' ? 'All Calculators' : '所有计算器'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {lang === 'en' 
            ? 'Explore our collection of precise tools for finance, health, math, and everyday conversions.' 
            : '探索我们为您提供的金融、健康、数学等各类精准工具。'}
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(categories).map(([category, calcs]) => (
          <div key={category} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 capitalize mb-8 flex items-center gap-3 dark:text-white">
              <span className="w-1.5 h-8 bg-brand-500 rounded-full inline-block"></span>
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {calcs.map(calc => (
                <Link 
                  key={calc.slug}
                  to={`/${lang}/${calc.category}/${calc.slug}`}
                  className="group relative flex flex-col p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-brand-500/10 hover:ring-1 hover:ring-brand-100 transition-all duration-300 dark:bg-gray-900/50 dark:hover:bg-gray-700 dark:hover:ring-gray-600"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-600 border border-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-brand-400 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={calc.icon} />
                      </svg>
                    </div>
                    <span className="text-brand-600 dark:text-brand-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors dark:text-white dark:group-hover:text-brand-400">
                    {calc.content.title[lang]}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400 flex-grow">
                    {calc.content.description[lang]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};