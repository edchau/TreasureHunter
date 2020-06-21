import React from 'react';
import  World from './features/world'

function App() {
  return (
    <div className="container">
      <div className="info">
        <p>
          Treasure Hunter
        </p>
      </div>
      <div className="controls">
        <p>
          Use arrow keys to move.
        </p>
      </div>
      <World />
    </div>
  )
}

export default App
