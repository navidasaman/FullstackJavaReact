import React from 'react';
import Addform from './components/Addform';

const App: React.FC = () => {
  return (
  <div className="bg-gray-900 h-screen flex flex-col items-center justify-center">
    <p className="font-bold text-teal-500">Built with Java, React, TypeScript, TailwindCSS</p>
    <Addform/>
    <hr/>
  </div>
  );
};

export default App;