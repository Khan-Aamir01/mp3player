import React from 'react';
import SongContainer from './songContainer';

function MainContent() {
  return (
    <div>
    <div className="ml-96 flex-grow bg-gray-100 p-4 overflow-x-hidden">
      <SongContainer />
      <SongContainer />
    </div>
    </div>
  );
}

export default MainContent;