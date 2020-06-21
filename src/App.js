import React from 'react';
import  World from './features/world'

function App() {
  alert("CONTROLS: Use arrow keys to move. Scroll down if you cannot see the actions during combat.")
  return (
    <div className="container">
      <div className="info">
        <p>
          Treasure Hunter
        </p>
      </div>
      <World />
    </div>
  )
}

export default App
