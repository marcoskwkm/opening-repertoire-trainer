import React from 'react'

import RandomAIBoard from './containers/RandomAIBoard'
import styles from './App.module.css'

const App: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen p-4 flex justify-center bg-gray-900">
      <RandomAIBoard className={styles.board} />
    </div>
  )
}

export default App
