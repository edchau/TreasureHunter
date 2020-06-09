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
          Use arrow keys to move. Each turn, you can either heal or attack the enemy.
          At the end of your turn, the monster will attack you.
        </p>
      </div>
      <World />
    </div>
  )
}

export default App
