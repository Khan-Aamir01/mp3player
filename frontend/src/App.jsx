import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import MainContent from './components/mainContent';
import SongPage from './components/songPage';



function App() {
  return (
    <Router>
      
      <Routes>
        
        <Route
          path="/"
          element={ <MainContent /> }/>
        <Route path="/song/:id" element={<SongPage />} />
      </Routes>
    </Router>
  );
}

export default App;