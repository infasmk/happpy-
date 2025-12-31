import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import MainContent from './components/MainContent';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ClickSparkles from './components/ClickSparkles';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* Interactive Click Effects */}
      <ClickSparkles />

      {/* Scroll Progress Bar */}
      {started && <ScrollProgress />}

      {/* Ambient Background */}
      <Background />
      
      {/* Custom Cursor for desktop */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Main Flow */}
      <AnimatePresence mode="wait">
        {!started ? (
          <IntroScreen key="intro" onStart={handleStart} />
        ) : (
          <MainContent key="main" />
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default App;