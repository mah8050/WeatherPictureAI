
import React, { useState, useEffect, useCallback } from 'react';
import { generateNatureImage } from './services/geminiService';
import Spinner from './components/Spinner';
import { RefreshIcon } from './components/Icons';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await generateNatureImage();
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
            Morning Radiance
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            AI-generated morning scenes with a warm greeting.
          </p>
        </header>

        <main className="relative w-full aspect-[16/9] bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center">
          {isLoading && <Spinner />}
          {error && !isLoading && (
            <div className="text-center p-8">
              <h2 className="text-xl font-semibold text-red-500">Generation Failed</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">{error}</p>
            </div>
          )}
          {imageUrl && !isLoading && (
            <>
              <img
                src={imageUrl}
                alt="AI generated nature scene"
                className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: isLoading ? 0.5 : 1 }}
              />
              <div className="absolute bottom-6 right-6 text-white text-5xl md:text-7xl font-serif font-bold" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                صبح بخیر
              </div>
            </>
          )}
        </main>
        
        <footer className="mt-6 text-center">
          <button
            onClick={fetchImage}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold rounded-lg shadow-md hover:from-emerald-600 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <RefreshIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Generating...' : 'Generate New Image'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
