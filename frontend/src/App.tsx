import React from 'react';
import './App.scss';
import APIReader from './APIReader'; 

const App: React.FC = () => {
  
  
  return (
    <>
      <div className="something">
        <APIReader searchTerm="xx" />
      </div>
    </>
  );
};

export default App;