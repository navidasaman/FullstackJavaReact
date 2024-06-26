import React from 'react';
import Form from './components/Form';

const App: React.FC = () => {
  return (
  <div className="bg-gray-900 h-screen flex flex-col items-center justify-center">
    <p className="font-bold text-teal-500">Built with Java, React, TypeScript, TailwindCSS</p>
    <h1 className="text-2xl font-bold text-gray-400 mb-10">Employee Management System</h1>
    <Form/>
    <hr/>
  </div>
  );
};

export default App;