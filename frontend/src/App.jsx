import React from 'react';
import Sidebar from './components/sidebar';
import MainContent from './components/mainContent';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar className="bg-gray-800 text-white basis-4" /> 
      <MainContent className="flex-1 bg-gray-100 p-4" />
    </div>
  );
}

export default App;