import React, { useState, useEffect } from 'react';
import { CalculatorConfig, LangCode } from '../types';

interface CalculatorEngineProps {
  config: CalculatorConfig;
  lang: LangCode;
}

export const CalculatorEngine: React.FC<CalculatorEngineProps> = ({ config, lang }) => {
  // Initialize state with default values
  const [values, setValues] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    config.inputs.forEach(input => {
      defaults[input.id] = input.defaultValue || '';
    });
    return defaults;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  // Real-time calculation effect
  useEffect(() => {
    try {
      const calculated = config.calculate(values);
      setResults(calculated);
    } catch (e) {
      console.error("Calculation error", e);
    }
  }, [values, config]);

  const handleChange = (id: string, val: string | number) => {
    setValues(prev => ({ ...prev, [id]: val }));
  };

  const formula = config.content.formula?.[lang];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 dark:text-white">
           <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
           </svg>
           {config.content.title[lang]}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left/Top: Inputs */}
        <div className="p-6 md:w-1/2 space-y-6">
          {config.inputs.map((input) => (
            <div key={input.id} className="group">
              <label className="block text-sm font-medium text-gray-500 mb-1.5 transition-colors group-focus-within:text-brand-600 dark:text-gray-400 dark:group-focus-within:text-brand-400">
                {input.label[lang]}
              </label>
              <div className="relative">
                {input.type === 'select' ? (
                  <div className="relative">
                    <select
                      value={values[input.id]}
                      onChange={(e) => handleChange(input.id, e.target.value)}
                      className="block w-full pl-3 pr-10 py-2.5 text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none sm:text-sm shadow-sm appearance-none cursor-pointer dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-brand-500/30 dark:focus:border-brand-500"
                    >
                      {input.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label[lang]}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <input
                    type={input.type}
                    value={values[input.id]}
                    onChange={(e) => handleChange(input.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2.5 text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none sm:text-sm shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-brand-500/30 dark:focus:border-brand-500"
                    placeholder={input.placeholder}
                  />
                )}
                
                {input.unit && input.type !== 'select' && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm font-medium dark:text-gray-500">{input.unit}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="md:w-px bg-gray-100 md:my-6 dark:bg-gray-700" />

        {/* Right/Bottom: Results */}
        <div className="p-6 md:w-1/2 bg-gray-50/50 flex flex-col justify-center dark:bg-gray-900/50">
          <div className="space-y-6">
            {config.outputs.map((output) => {
              const rawValue = results[output.id];
              
              // Handle output localization if the result is an object {en:..., zh-CN:...}
              const displayValue = (typeof rawValue === 'object' && rawValue !== null && rawValue[lang]) 
                ? rawValue[lang] 
                : rawValue;

              return (
                <div key={output.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 dark:text-gray-500">
                    {output.label[lang]}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold tracking-tight ${output.type === 'category' ? 'text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white'} ${output.type === 'text' ? 'text-xl' : ''}`}>
                      {displayValue !== undefined && displayValue !== null ? displayValue : '-'}
                    </span>
                    {output.unit && (
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{output.unit}</span>
                    )}
                  </div>
                  {/* Decorative background blob */}
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-50 rounded-full blur-xl opacity-60 dark:bg-brand-900/30"></div>
                </div>
              );
            })}
          </div>

          {/* Formula Display (Conditional) */}
          {formula && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Formula Used' : '计算公式'}
              </label>
              <div className="relative group">
                <input
                  type="text"
                  readOnly
                  value={formula}
                  className="block w-full px-3 py-2.5 text-sm font-mono text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 cursor-text select-all shadow-sm transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-brand-500/20"
                />
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};